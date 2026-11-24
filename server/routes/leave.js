const express = require('express');
const router = express.Router();
const { queryAll, queryOne, run } = require('../db');

// GET /api/leave - list all leave requests (supports ?student_id=...)
router.get('/', (req, res) => {
  try {
    const { student_id } = req.query;
    let sql = `
      SELECT 
        l.*,
        s.student_id AS student_code,
        s.first_name,
        s.last_name,
        s.avatar,
        c.name AS class_name,
        c.code AS class_code
      FROM leave_requests l
      JOIN students s ON s.id = l.student_id
      JOIN classes c ON c.id = s.class_id
      WHERE 1=1
    `;
    const params = [];

    if (student_id) {
      sql += ' AND l.student_id = ?';
      params.push(student_id);
    }

    sql += ' ORDER BY l.created_at DESC';

    const requests = queryAll(sql, params);
    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/leave/:id - cancel a leave request
router.delete('/:id', (req, res) => {
  try {
    const leaveId = req.params.id;
    run('DELETE FROM leave_requests WHERE id = ?', [leaveId]);
    res.json({ success: true, message: 'Leave request cancelled successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/leave - submit a leave request
router.post('/', (req, res) => {
  try {
    const { student_id, start_date, end_date, reason } = req.body;

    if (!student_id || !start_date || !end_date || !reason) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const result = run(`
      INSERT INTO leave_requests (student_id, start_date, end_date, reason, status)
      VALUES (?, ?, ?, ?, 'pending')
    `, [student_id, start_date, end_date, reason]);

    const created = queryOne('SELECT * FROM leave_requests WHERE id = ?', [result.lastInsertRowid]);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/leave/:id/status - approve or reject request
router.patch('/:id/status', (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status, approved_by } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    run(`
      UPDATE leave_requests 
      SET status = ?, approved_by = ?
      WHERE id = ?
    `, [status, approved_by || 'Academic Officer', leaveId]);

    const updated = queryOne('SELECT * FROM leave_requests WHERE id = ?', [leaveId]);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
