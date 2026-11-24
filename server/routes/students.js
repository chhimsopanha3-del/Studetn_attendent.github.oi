const express = require('express');
const router = express.Router();
const { queryAll, queryOne, run } = require('../db');

// GET /api/students - list students with filters and attendance rate
router.get('/', (req, res) => {
  try {
    const { class_id, search, status } = req.query;
    let sql = `
      SELECT 
        s.*,
        c.name AS class_name,
        c.code AS class_code,
        COUNT(a.id) AS total_sessions,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
        SUM(CASE WHEN a.status = 'excused' THEN 1 ELSE 0 END) AS excused_count
      FROM students s
      JOIN classes c ON c.id = s.class_id
      LEFT JOIN attendance a ON a.student_id = s.id
      WHERE 1=1
    `;
    const params = [];

    if (class_id) {
      sql += ' AND s.class_id = ?';
      params.push(class_id);
    }
    if (status) {
      sql += ' AND s.status = ?';
      params.push(status);
    }
    if (search) {
      sql += ` AND (
        s.first_name LIKE ? OR 
        s.last_name LIKE ? OR 
        s.student_id LIKE ? OR 
        s.email LIKE ?
      )`;
      const pattern = `%${search}%`;
      params.push(pattern, pattern, pattern, pattern);
    }

    sql += ' GROUP BY s.id ORDER BY s.last_name ASC, s.first_name ASC';

    const students = queryAll(sql, params).map(st => {
      const total = st.total_sessions || 0;
      // Formula: (present + 0.7 * late) / total sessions
      const effectivePresent = (st.present_count || 0) + (st.late_count || 0) * 0.7;
      const rate = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;

      return {
        ...st,
        attendance_rate: rate,
        is_at_risk: rate < 75 && total >= 3
      };
    });

    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/students/:id - student profile with attendance history
router.get('/:id', (req, res) => {
  try {
    const studentId = req.params.id;
    const student = queryOne(`
      SELECT s.*, c.name AS class_name, c.code AS class_code 
      FROM students s
      JOIN classes c ON c.id = s.class_id
      WHERE s.id = ?
    `, [studentId]);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    const attendanceRecords = queryAll(`
      SELECT 
        a.id,
        a.status,
        a.remark,
        a.check_in_time,
        a.method,
        sess.date,
        sess.session_type,
        sess.topic
      FROM attendance a
      JOIN sessions sess ON sess.id = a.session_id
      WHERE a.student_id = ?
      ORDER BY sess.date DESC
    `, [studentId]);

    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const excused = attendanceRecords.filter(r => r.status === 'excused').length;
    const effectivePresent = present + late * 0.7;
    const rate = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;

    const leaveRequests = queryAll(`
      SELECT * FROM leave_requests 
      WHERE student_id = ? 
      ORDER BY created_at DESC
    `, [studentId]);

    const todayStr = new Date().toISOString().split('T')[0];
    const todaySession = queryOne(`
      SELECT s.*, a.status AS attendance_status, a.check_in_time, a.method
      FROM sessions s
      LEFT JOIN attendance a ON a.session_id = s.id AND a.student_id = ?
      WHERE s.class_id = ? AND s.date = ?
      ORDER BY s.id DESC
      LIMIT 1
    `, [studentId, student.class_id, todayStr]);

    res.json({
      success: true,
      data: {
        ...student,
        stats: {
          total_sessions: total,
          present_count: present,
          late_count: late,
          absent_count: absent,
          excused_count: excused,
          attendance_rate: rate,
          is_at_risk: rate < 75 && total >= 3
        },
        records: attendanceRecords,
        leave_requests: leaveRequests,
        today_session: todaySession
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/students - create student
router.post('/', (req, res) => {
  try {
    const { student_id, first_name, last_name, gender, email, phone, class_id } = req.body;

    if (!student_id || !first_name || !last_name || !email || !class_id) {
      return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${first_name}${last_name}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

    const result = run(`
      INSERT INTO students (student_id, first_name, last_name, gender, email, phone, avatar, class_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `, [student_id, first_name, last_name, gender || 'Male', email, phone || '', avatar, class_id]);

    const created = queryOne('SELECT * FROM students WHERE id = ?', [result.lastInsertRowid]);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/students/:id - update student
router.put('/:id', (req, res) => {
  try {
    const studentId = req.params.id;
    const { first_name, last_name, gender, email, phone, class_id, status } = req.body;

    run(`
      UPDATE students 
      SET first_name = ?, last_name = ?, gender = ?, email = ?, phone = ?, class_id = ?, status = ?
      WHERE id = ?
    `, [first_name, last_name, gender, email, phone, class_id, status, studentId]);

    const updated = queryOne('SELECT * FROM students WHERE id = ?', [studentId]);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/students/:id - delete student
router.delete('/:id', (req, res) => {
  try {
    const studentId = req.params.id;
    run('DELETE FROM students WHERE id = ?', [studentId]);
    res.json({ success: true, message: 'Student removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
