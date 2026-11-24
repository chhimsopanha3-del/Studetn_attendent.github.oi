const express = require('express');
const router = express.Router();
const { queryAll, queryOne, run } = require('../db');

// GET /api/classes - list all classes with aggregate metrics
router.get('/', (req, res) => {
  try {
    const classes = queryAll(`
      SELECT 
        c.*,
        COUNT(DISTINCT s.id) AS student_count
      FROM classes c
      LEFT JOIN students s ON s.class_id = c.id AND s.status = 'active'
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    // Compute average attendance rate for each class
    const enhancedClasses = classes.map(cls => {
      const stats = queryOne(`
        SELECT 
          COUNT(a.id) AS total_records,
          SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
          SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count
        FROM sessions sess
        JOIN attendance a ON a.session_id = sess.id
        WHERE sess.class_id = ?
      `, [cls.id]);

      const total = stats.total_records || 0;
      const effectivePresent = (stats.present_count || 0) + (stats.late_count || 0) * 0.7;
      const rate = total > 0 ? Math.round((effectivePresent / total) * 100) : 100;

      return {
        ...cls,
        attendance_rate: rate
      };
    });

    res.json({ success: true, data: enhancedClasses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/classes/:id - class details with students
router.get('/:id', (req, res) => {
  try {
    const classId = req.params.id;
    const cls = queryOne('SELECT * FROM classes WHERE id = ?', [classId]);
    if (!cls) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }

    const students = queryAll(`
      SELECT * FROM students 
      WHERE class_id = ? 
      ORDER BY last_name ASC, first_name ASC
    `, [classId]);

    const sessions = queryAll(`
      SELECT * FROM sessions 
      WHERE class_id = ? 
      ORDER BY date DESC 
      LIMIT 10
    `, [classId]);

    res.json({ success: true, data: { ...cls, students, recent_sessions: sessions } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/classes - create new class
router.post('/', (req, res) => {
  try {
    const { name, code, department, major, year_level, room, teacher_name, schedule_time, academic_year, semester } = req.body;

    if (!name || !code || !teacher_name) {
      return res.status(400).json({ success: false, error: 'name, code, and teacher_name are required' });
    }

    const result = run(`
      INSERT INTO classes (name, code, department, major, year_level, room, teacher_name, schedule_time, academic_year, semester)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name,
      code,
      department || 'Information Technology',
      major || 'Information Technology',
      year_level || 'Year 2',
      room || 'Lab 101',
      teacher_name,
      schedule_time || '08:00 AM - 11:15 AM',
      academic_year || '2024-2025',
      semester || 'Semester 1'
    ]);

    const newClass = queryOne('SELECT * FROM classes WHERE id = ?', [result.lastInsertRowid]);
    res.status(201).json({ success: true, data: newClass });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/classes/:id - update class
router.put('/:id', (req, res) => {
  try {
    const classId = req.params.id;
    const { name, code, department, major, year_level, room, teacher_name, schedule_time, academic_year, semester } = req.body;

    run(`
      UPDATE classes 
      SET name = ?, code = ?, department = ?, major = ?, year_level = ?, room = ?, teacher_name = ?, 
          schedule_time = ?, academic_year = ?, semester = ?
      WHERE id = ?
    `, [
      name, 
      code, 
      department || 'Information Technology', 
      major || 'Information Technology', 
      year_level || 'Year 2', 
      room, 
      teacher_name, 
      schedule_time, 
      academic_year, 
      semester, 
      classId
    ]);

    const updated = queryOne('SELECT * FROM classes WHERE id = ?', [classId]);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/classes/:id - delete class
router.delete('/:id', (req, res) => {
  try {
    const classId = req.params.id;
    run('DELETE FROM classes WHERE id = ?', [classId]);
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
