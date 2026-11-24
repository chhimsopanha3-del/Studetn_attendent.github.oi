const express = require('express');
const router = express.Router();
const { queryAll, queryOne } = require('../db');

// POST /api/auth/student-login
router.post('/student-login', (req, res) => {
  try {
    const { student_id, password } = req.body;

    if (!student_id) {
      return res.status(400).json({ success: false, error: 'Student ID is required' });
    }

    const trimmedId = student_id.trim();

    // Find student by student_id or email
    const student = queryOne(`
      SELECT 
        s.*, 
        c.name AS class_name, 
        c.code AS class_code, 
        c.department, 
        c.room, 
        c.teacher_name, 
        c.schedule_time
      FROM students s
      JOIN classes c ON c.id = s.class_id
      WHERE (s.student_id = ? OR LOWER(s.email) = LOWER(?)) AND s.status = 'active'
    `, [trimmedId, trimmedId]);

    if (!student) {
      return res.status(401).json({
        success: false,
        error: 'Student ID not found in system or inactive account. Try e.g. USEA-2024-001'
      });
    }

    // In educational demo, default password is 'password123' or student's own ID
    // If a password was supplied, we accept standard password or allow direct login
    const userPayload = {
      id: student.id,
      student_id: student.student_id,
      first_name: student.first_name,
      last_name: student.last_name,
      full_name: `${student.last_name} ${student.first_name}`,
      email: student.email,
      avatar: student.avatar,
      gender: student.gender,
      phone: student.phone,
      class_id: student.class_id,
      class_name: student.class_name,
      class_code: student.class_code,
      department: student.department,
      room: student.room,
      teacher_name: student.teacher_name,
      schedule_time: student.schedule_time,
      role: 'student'
    };

    res.json({
      success: true,
      message: `Welcome back, ${student.first_name}!`,
      user: userPayload,
      token: `demo-token-${student.id}-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/faculty-login
router.post('/faculty-login', (req, res) => {
  try {
    const { email } = req.body;
    const userPayload = {
      id: 999,
      name: 'Dr. Robert Vance',
      email: email || 'r.vance@usea.edu.kh',
      role: 'faculty',
      title: 'Senior Academic Faculty & Dean'
    };

    res.json({
      success: true,
      message: 'Logged in as Faculty Administrator',
      user: userPayload,
      token: `faculty-token-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/demo-students - quick selection for testers
router.get('/demo-students', (req, res) => {
  try {
    const students = queryAll(`
      SELECT 
        s.id, 
        s.student_id, 
        s.first_name, 
        s.last_name, 
        s.avatar,
        c.code AS class_code,
        c.name AS class_name
      FROM students s
      JOIN classes c ON c.id = s.class_id
      ORDER BY s.student_id ASC
      LIMIT 8
    `);

    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
