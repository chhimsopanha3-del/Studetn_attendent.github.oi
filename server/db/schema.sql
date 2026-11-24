-- Student Attendance Database Schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL DEFAULT 'Computer Science',
  major TEXT NOT NULL DEFAULT 'Information Technology',
  year_level TEXT NOT NULL DEFAULT 'Year 2',
  room TEXT NOT NULL DEFAULT 'Lab 101',
  teacher_name TEXT NOT NULL,
  schedule_time TEXT NOT NULL DEFAULT '08:00 AM - 11:15 AM',
  academic_year TEXT NOT NULL DEFAULT '2024-2025',
  semester TEXT NOT NULL DEFAULT 'Semester 1',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK(gender IN ('Male', 'Female', 'Other')),
  email TEXT NOT NULL,
  phone TEXT,
  avatar TEXT,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'Morning',
  topic TEXT,
  qr_token TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, date, session_type)
);

CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK(status IN ('present', 'late', 'absent', 'excused')),
  remark TEXT,
  check_in_time TEXT,
  method TEXT NOT NULL DEFAULT 'manual' CHECK(method IN ('manual', 'qr_code', 'rfid', 'bulk')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(session_id, student_id)
);

CREATE TABLE IF NOT EXISTS leave_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  approved_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  staff_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'teacher' CHECK(role IN ('admin', 'teacher', 'officer')),
  department TEXT NOT NULL DEFAULT 'Computer Science',
  phone TEXT,
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_sessions_class_date ON sessions(class_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_session ON attendance(session_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status);
CREATE INDEX IF NOT EXISTS idx_leave_student ON leave_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_staff_id ON staff(staff_id);
CREATE INDEX IF NOT EXISTS idx_staff_email ON staff(email);
