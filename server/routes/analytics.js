const express = require('express');
const router = express.Router();
const { queryAll, queryOne } = require('../db');

// GET /api/analytics/overview - executive dashboard KPIs
router.get('/overview', (req, res) => {
  try {
    const totalStudents = queryOne("SELECT COUNT(*) AS c FROM students WHERE status = 'active'").c;
    const totalClasses = queryOne('SELECT COUNT(*) AS c FROM classes').c;

    // Overall attendance percentage across system
    const allAttendance = queryOne(`
      SELECT 
        COUNT(id) AS total,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_count,
        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS late_count,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
        SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) AS excused_count
      FROM attendance
    `);

    const totalRecords = allAttendance.total || 0;
    const effectivePresent = (allAttendance.present_count || 0) + (allAttendance.late_count || 0) * 0.7;
    const overallRate = totalRecords > 0 ? Math.round((effectivePresent / totalRecords) * 100) : 100;

    // Today's attendance stats
    const todayStr = new Date().toISOString().split('T')[0];
    const todayStats = queryOne(`
      SELECT 
        COUNT(a.id) AS total,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN a.status = 'excused' THEN 1 ELSE 0 END) AS excused
      FROM attendance a
      JOIN sessions s ON s.id = a.session_id
      WHERE s.date = ?
    `, [todayStr]);

    // Count of students at risk (< 75% attendance)
    const atRiskCount = queryAll(`
      SELECT s.id,
        COUNT(a.id) AS total_sessions,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count
      FROM students s
      JOIN attendance a ON a.student_id = s.id
      WHERE s.status = 'active'
      GROUP BY s.id
      HAVING total_sessions >= 3 AND (((present_count + late_count * 0.7) * 1.0 / total_sessions) * 100) < 75
    `).length;

    res.json({
      success: true,
      data: {
        total_students: totalStudents,
        total_classes: totalClasses,
        overall_attendance_rate: overallRate,
        at_risk_count: atRiskCount,
        breakdown: {
          present: allAttendance.present_count || 0,
          late: allAttendance.late_count || 0,
          absent: allAttendance.absent_count || 0,
          excused: allAttendance.excused_count || 0
        },
        today: {
          date: todayStr,
          total: todayStats.total || 0,
          present: todayStats.present || 0,
          late: todayStats.late || 0,
          absent: todayStats.absent || 0,
          excused: todayStats.excused || 0
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/trends - daily attendance timeline
router.get('/trends', (req, res) => {
  try {
    const { days = 14 } = req.query;

    const trends = queryAll(`
      SELECT 
        s.date,
        COUNT(a.id) AS total_marked,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN a.status = 'excused' THEN 1 ELSE 0 END) AS excused
      FROM sessions s
      JOIN attendance a ON a.session_id = s.id
      GROUP BY s.date
      ORDER BY s.date ASC
    `);

    // Calculate daily percentage
    const formatted = trends.map(t => {
      const total = t.total_marked || 0;
      const effective = (t.present || 0) + (t.late || 0) * 0.7;
      const rate = total > 0 ? Math.round((effective / total) * 100) : 100;
      return {
        ...t,
        attendance_rate: rate
      };
    });

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/class-comparison - attendance comparison across classes
router.get('/class-comparison', (req, res) => {
  try {
    const classes = queryAll(`
      SELECT 
        c.id,
        c.name,
        c.code,
        COUNT(a.id) AS total,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent,
        SUM(CASE WHEN a.status = 'excused' THEN 1 ELSE 0 END) AS excused
      FROM classes c
      LEFT JOIN sessions s ON s.class_id = c.id
      LEFT JOIN attendance a ON a.session_id = s.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    const result = classes.map(c => {
      const total = c.total || 0;
      const effective = (c.present || 0) + (c.late || 0) * 0.7;
      const rate = total > 0 ? Math.round((effective / total) * 100) : 100;

      return {
        ...c,
        attendance_rate: rate
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/at-risk - list students needing immediate attention
router.get('/at-risk', (req, res) => {
  try {
    const atRisk = queryAll(`
      SELECT 
        s.id,
        s.student_id,
        s.first_name,
        s.last_name,
        s.email,
        s.phone,
        s.avatar,
        c.name AS class_name,
        c.code AS class_code,
        COUNT(a.id) AS total_sessions,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS present_count,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) AS late_count,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) AS absent_count,
        SUM(CASE WHEN a.status = 'excused' THEN 1 ELSE 0 END) AS excused_count
      FROM students s
      JOIN classes c ON c.id = s.class_id
      JOIN attendance a ON a.student_id = s.id
      WHERE s.status = 'active'
      GROUP BY s.id
      HAVING total_sessions >= 3
      ORDER BY absent_count DESC
    `).map(s => {
      const total = s.total_sessions || 0;
      const effective = (s.present_count || 0) + (s.late_count || 0) * 0.7;
      const rate = total > 0 ? Math.round((effective / total) * 100) : 100;
      return {
        ...s,
        attendance_rate: rate
      };
    }).filter(s => s.attendance_rate < 75);

    res.json({ success: true, data: atRisk });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/analytics/export-csv - generate CSV attendance report
router.get('/export-csv', (req, res) => {
  try {
    const { class_id } = req.query;
    let sql = `
      SELECT 
        s.student_id AS Student_ID,
        s.first_name AS First_Name,
        s.last_name AS Last_Name,
        c.code AS Class_Code,
        sess.date AS Date,
        sess.session_type AS Session_Type,
        a.status AS Attendance_Status,
        a.check_in_time AS Check_In_Time,
        a.method AS Method,
        a.remark AS Remarks
      FROM attendance a
      JOIN students s ON s.id = a.student_id
      JOIN sessions sess ON sess.id = a.session_id
      JOIN classes c ON c.id = sess.class_id
      WHERE 1=1
    `;
    const params = [];
    if (class_id) {
      sql += ' AND c.id = ?';
      params.push(class_id);
    }
    sql += ' ORDER BY sess.date DESC, s.last_name ASC';

    const rows = queryAll(sql, params);

    if (rows.length === 0) {
      return res.status(404).send('No records found for export');
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    for (const r of rows) {
      const values = headers.map(h => {
        const val = r[h] !== null && r[h] !== undefined ? String(r[h]) : '';
        return `"${val.replace(/"/g, '""')}"`;
      });
      csvLines.push(values.join(','));
    }

    const csvContent = csvLines.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="attendance_report_${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
