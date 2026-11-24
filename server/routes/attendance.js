const express = require('express');
const router = express.Router();
const { queryAll, queryOne, run, transaction } = require('../db');

// Helper to format 12-hour time (e.g., 08:30 AM)
function getCurrentTimeString() {
  const d = new Date();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

// GET /api/attendance/session - get or initialize attendance sheet
router.get('/session', (req, res) => {
  try {
    const { class_id, date, session_type } = req.query;

    if (!class_id || !date) {
      return res.status(400).json({ success: false, error: 'class_id and date are required' });
    }

    const sType = session_type || 'Morning';

    // Find or create session
    let session = queryOne(`
      SELECT * FROM sessions 
      WHERE class_id = ? AND date = ? AND session_type = ?
    `, [class_id, date, sType]);

    if (!session) {
      const cls = queryOne('SELECT code FROM classes WHERE id = ?', [class_id]);
      const classCode = cls ? cls.code : 'CLS';
      const qrToken = `ATT-${classCode}-${date}-${sType}`;

      const resInsert = run(`
        INSERT INTO sessions (class_id, date, session_type, topic, qr_token)
        VALUES (?, ?, ?, ?, ?)
      `, [class_id, date, sType, `Class Session (${sType})`, qrToken]);

      session = queryOne('SELECT * FROM sessions WHERE id = ?', [resInsert.lastInsertRowid]);
    }

    // Fetch all active students in class with their attendance status for this session
    const studentsWithAttendance = queryAll(`
      SELECT 
        s.id AS student_id,
        s.student_id AS student_code,
        s.first_name,
        s.last_name,
        s.gender,
        s.avatar,
        s.email,
        a.id AS attendance_id,
        COALESCE(a.status, 'unmarked') AS status,
        a.remark,
        a.check_in_time,
        a.method
      FROM students s
      LEFT JOIN attendance a ON a.student_id = s.id AND a.session_id = ?
      WHERE s.class_id = ? AND s.status = 'active'
      ORDER BY s.last_name ASC, s.first_name ASC
    `, [session.id, class_id]);

    res.json({
      success: true,
      data: {
        session,
        students: studentsWithAttendance
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/attendance/batch - save or update full class attendance sheet
router.post('/batch', (req, res) => {
  try {
    const { session_id, records } = req.body;

    if (!session_id || !Array.isArray(records)) {
      return res.status(400).json({ success: false, error: 'session_id and records array are required' });
    }

    transaction((db) => {
      const upsertStmt = db.prepare(`
        INSERT INTO attendance (session_id, student_id, status, remark, check_in_time, method)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(session_id, student_id) DO UPDATE SET
          status = excluded.status,
          remark = excluded.remark,
          check_in_time = COALESCE(excluded.check_in_time, attendance.check_in_time),
          method = excluded.method
      `);

      for (const rec of records) {
        if (!rec.student_id || !rec.status || rec.status === 'unmarked') continue;

        let checkInTime = rec.check_in_time;
        if (!checkInTime && (rec.status === 'present' || rec.status === 'late')) {
          checkInTime = getCurrentTimeString();
        }

        upsertStmt.run(
          session_id,
          rec.student_id,
          rec.status,
          rec.remark || '',
          checkInTime || null,
          rec.method || 'manual'
        );
      }
    });

    res.json({ success: true, message: 'Attendance records saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/attendance/mark-single - fast single student toggle
router.post('/mark-single', (req, res) => {
  try {
    const { session_id, student_id, status, remark, method } = req.body;

    if (!session_id || !student_id || !status) {
      return res.status(400).json({ success: false, error: 'session_id, student_id, and status are required' });
    }

    let checkInTime = null;
    if (status === 'present' || status === 'late') {
      checkInTime = getCurrentTimeString();
    }

    run(`
      INSERT INTO attendance (session_id, student_id, status, remark, check_in_time, method)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(session_id, student_id) DO UPDATE SET
        status = excluded.status,
        remark = excluded.remark,
        check_in_time = COALESCE(excluded.check_in_time, attendance.check_in_time),
        method = excluded.method
    `, [session_id, student_id, status, remark || '', checkInTime, method || 'manual']);

    const record = queryOne(`
      SELECT * FROM attendance WHERE session_id = ? AND student_id = ?
    `, [session_id, student_id]);

    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/attendance/qr-checkin - QR Code / Barcode scan check-in
router.post('/qr-checkin', (req, res) => {
  try {
    const { qr_token, student_identifier } = req.body;

    if (!qr_token || !student_identifier) {
      return res.status(400).json({ success: false, error: 'qr_token and student_identifier are required' });
    }

    // Find session by QR token
    const session = queryOne('SELECT * FROM sessions WHERE qr_token = ?', [qr_token]);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Invalid or expired QR session token' });
    }

    // Find student by id or student_id string (e.g. USEA-2024-001)
    const student = queryOne(`
      SELECT * FROM students 
      WHERE (student_id = ? OR id = ?) AND class_id = ? AND status = 'active'
    `, [student_identifier, student_identifier, session.class_id]);

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found in this class roster or inactive' });
    }

    // Check if already checked in
    const existing = queryOne('SELECT * FROM attendance WHERE session_id = ? AND student_id = ?', [session.id, student.id]);
    if (existing && existing.status === 'present') {
      return res.json({ 
        success: true, 
        message: `${student.first_name} ${student.last_name} is already checked in as Present!`,
        already_checked_in: true,
        student
      });
    }

    const checkInTime = getCurrentTimeString();

    run(`
      INSERT INTO attendance (session_id, student_id, status, remark, check_in_time, method)
      VALUES (?, ?, 'present', 'QR Self Check-in', ?, 'qr_code')
      ON CONFLICT(session_id, student_id) DO UPDATE SET
        status = 'present',
        remark = 'QR Self Check-in',
        check_in_time = excluded.check_in_time,
        method = 'qr_code'
    `, [session.id, student.id, checkInTime]);

    res.json({
      success: true,
      message: `Check-in successful! Welcome, ${student.first_name} ${student.last_name}.`,
      student,
      check_in_time: checkInTime
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
