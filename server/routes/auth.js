const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { queryAll, queryOne, run } = require('../db');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

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

// POST /api/auth/faculty-login (and /api/auth/staff-login)
// Enforces strict ID + Password authentication. If password is missing or wrong, CANNOT login!
router.post('/faculty-login', handleStaffLogin);
router.post('/staff-login', handleStaffLogin);

function handleStaffLogin(req, res) {
  try {
    const { staff_id, email, password } = req.body;
    const identifier = (staff_id || email || '').trim();

    // 1. If staff does not have password or ID, cannot login!
    if (!identifier) {
      return res.status(400).json({ 
        success: false, 
        error: 'Staff ID or Email is required to log in.' 
      });
    }

    if (!password || !password.trim()) {
      return res.status(401).json({ 
        success: false, 
        error: 'Password is required. Staff and teachers without a designated password cannot log in. (តម្រូវឱ្យមានពាក្យសម្ងាត់ដែលបានកំណត់)' 
      });
    }

    // 2. Query staff table by staff_id or email
    const staff = queryOne(`
      SELECT * FROM staff 
      WHERE (LOWER(staff_id) = LOWER(?) OR LOWER(email) = LOWER(?))
    `, [identifier, identifier]);

    if (!staff) {
      return res.status(401).json({ 
        success: false, 
        error: 'Account not found. Only pre-configured university Admin and Teacher accounts can access this system. (គណនី ឬអ៊ីមែលនេះមិនទាន់បានកំណត់ក្នុងប្រព័ន្ធទេ)' 
      });
    }

    // 3. Verify password hash
    const inputHash = hashPassword(password.trim());
    if (staff.password_hash !== inputHash) {
      return res.status(401).json({ 
        success: false, 
        error: 'Incorrect password. Please enter the designated password configured for your account. (ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ)' 
      });
    }

    // 4. Return staff payload
    const userPayload = {
      id: staff.id,
      staff_id: staff.staff_id,
      name: staff.full_name,
      full_name: staff.full_name,
      email: staff.email,
      role: staff.role || 'faculty',
      department: staff.department,
      phone: staff.phone,
      avatar: staff.avatar,
      title: staff.role === 'admin' ? 'Senior Faculty Dean & Admin' : 'Course Instructor'
    };

    res.json({
      success: true,
      message: `Welcome back, ${staff.full_name}!`,
      user: userPayload,
      token: `staff-token-${staff.id}-${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// POST /api/auth/change-password
// Allows staff to change their password securely
router.post('/change-password', (req, res) => {
  try {
    const { staff_id, current_password, new_password } = req.body;

    if (!staff_id || !current_password || !new_password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Staff ID, current password, and new password are all required.' 
      });
    }

    if (new_password.trim().length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: 'New password must be at least 6 characters long.' 
      });
    }

    // Find staff
    const staff = queryOne(`
      SELECT * FROM staff WHERE (LOWER(staff_id) = LOWER(?) OR id = ?)
    `, [staff_id.trim(), staff_id]);

    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff account not found.' });
    }

    // Verify current password
    const currentHash = hashPassword(current_password.trim());
    if (staff.password_hash !== currentHash) {
      return res.status(401).json({ 
        success: false, 
        error: 'Current password is incorrect. Verification failed.' 
      });
    }

    // Update with new password hash
    const newHash = hashPassword(new_password.trim());
    run('UPDATE staff SET password_hash = ? WHERE id = ?', [newHash, staff.id]);

    res.json({
      success: true,
      message: 'Password changed successfully! You can now log in with your new password.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/staff-list - list all registered staff accounts for admin management
router.get('/staff-list', (req, res) => {
  try {
    const staffList = queryAll(`
      SELECT id, staff_id, full_name, email, role, department, phone, avatar, created_at 
      FROM staff 
      ORDER BY id ASC
    `);
    res.json({ success: true, data: staffList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/create-staff - register a newly authorized staff/teacher account
router.post('/create-staff', (req, res) => {
  try {
    const { staff_id, full_name, email, role, department, phone, password } = req.body;

    if (!staff_id || !full_name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Staff ID, full name, email, and designated password are all required.' 
      });
    }

    // Check if staff_id or email already exists
    const existing = queryOne(`
      SELECT id FROM staff WHERE LOWER(staff_id) = LOWER(?) OR LOWER(email) = LOWER(?)
    `, [staff_id.trim(), email.trim()]);

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        error: 'Staff ID or Email is already registered in the system.' 
      });
    }

    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${full_name.replace(/\s+/g, '')}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    const hashed = hashPassword(password.trim());

    const result = run(`
      INSERT INTO staff (staff_id, full_name, email, password_hash, role, department, phone, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      staff_id.trim().toUpperCase(),
      full_name.trim(),
      email.trim().toLowerCase(),
      hashed,
      role || 'teacher',
      department || 'Information Technology',
      phone || '',
      avatar
    ]);

    const newStaff = queryOne(`
      SELECT id, staff_id, full_name, email, role, department, phone, avatar 
      FROM staff WHERE id = ?
    `, [result.lastInsertRowid]);

    res.status(201).json({
      success: true,
      message: `Staff account ${newStaff.full_name} (${newStaff.email}) registered successfully!`,
      data: newStaff
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/set-staff-password - Admin resets/configures password for a staff member
router.post('/set-staff-password', (req, res) => {
  try {
    const { staff_id, new_password } = req.body;

    if (!staff_id || !new_password || !new_password.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Staff ID and new designated password are required.' 
      });
    }

    const staff = queryOne('SELECT id, full_name FROM staff WHERE staff_id = ? OR id = ?', [staff_id, staff_id]);
    if (!staff) {
      return res.status(404).json({ success: false, error: 'Staff account not found.' });
    }

    const hashed = hashPassword(new_password.trim());
    run('UPDATE staff SET password_hash = ? WHERE id = ?', [hashed, staff.id]);

    res.json({
      success: true,
      message: `Designated password updated successfully for ${staff.full_name}!`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/auth/demo-staff - list staff accounts for quick testing
router.get('/demo-staff', (req, res) => {
  try {
    const staffList = queryAll(`
      SELECT id, staff_id, full_name, email, role, department, avatar 
      FROM staff 
      ORDER BY id ASC
    `);

    res.json({ success: true, data: staffList });
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
