-- USEA Student Attendance Database Dump
-- Generated for Navicat Premium
PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE
);

INSERT INTO departments (id, name, code) VALUES (1, 'Faculty of Science and Information Technology', 'FSIT');
INSERT INTO departments (id, name, code) VALUES (2, 'Department of Information Technology', 'DIT');
INSERT INTO departments (id, name, code) VALUES (3, 'Department of E-Business Systems', 'DEBS');
INSERT INTO departments (id, name, code) VALUES (4, 'Department of Software Engineering', 'DSE');

DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL DEFAULT 'Computer Science',
  room TEXT NOT NULL DEFAULT 'Lab 101',
  teacher_name TEXT NOT NULL,
  schedule_time TEXT NOT NULL DEFAULT '08:00 AM - 11:15 AM',
  academic_year TEXT NOT NULL DEFAULT '2024-2025',
  semester TEXT NOT NULL DEFAULT 'Semester 1',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
, major TEXT DEFAULT 'Information Technology', year_level TEXT DEFAULT 'Year 2');

INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (1, 'Database Management System', 'IT-211', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (2, 'Data Communication and Networking', 'IT-212', 'Information Technology', 'Lab 401 (Innovation Hub)', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (3, 'UX and UI Design', 'IT-213', 'Information Technology', 'Room 205 (Building B)', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (4, 'Web App Development II', 'IT-214', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (5, 'Chinese Language III', 'LANG-211', 'General Education', 'Room 102 (Building C)', 'Ms. Meili Zhang', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (6, 'English Language III', 'LANG-212', 'General Education', 'Room 103 (Building C)', 'Mr. David Miller', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (7, 'Database Management System (EBS)', 'EBS-211', 'E-Business Systems', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (8, 'Business and Technology', 'EBS-212', 'E-Business Systems', 'Room 204 (Building B)', 'Prof. Sophea Chan', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (9, 'UX and UI Design (EBS)', 'EBS-213', 'E-Business Systems', 'Room 205 (Building B)', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (10, 'Web App Development II (EBS)', 'EBS-214', 'E-Business Systems', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (11, '.NET Technology', 'IT-221', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (12, 'Cisco Networking I', 'IT-222', 'Information Technology', 'Cisco Lab (Building A)', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (13, 'Data Structure and Algorithms with C++', 'IT-223', 'Information Technology', 'Room 205 (Building B)', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (14, 'Web App Framework', 'IT-224', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (15, 'Principle of Modern Marketing', 'EBS-221', 'E-Business Systems', 'Room 201 (Building B)', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (16, 'Business Communication and Responsible', 'EBS-222', 'E-Business Systems', 'Room 202 (Building B)', 'Dr. Emily Zhao', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (17, 'Data Structure and Algorithms with C++ (EBS)', 'EBS-223', 'E-Business Systems', 'Room 205 (Building B)', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 2');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (18, 'Database Administration', 'IT-311', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (19, 'Cisco Networking II', 'IT-312', 'Information Technology', 'Cisco Lab (Building A)', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (20, 'Java Programming', 'IT-313', 'Information Technology', 'Room 205 (Building B)', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (21, 'System Analysis and Design', 'IT-314', 'Information Technology', 'Room 204 (Building B)', 'Dr. Emily Zhao', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (22, 'Accounting Information System', 'EBS-311', 'E-Business Systems', 'Room 202 (Building B)', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (23, 'Cambodian Business Law', 'EBS-312', 'E-Business Systems', 'Room 203 (Building B)', 'Dr. Emily Zhao', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (24, 'Entrepreneurship & Innovation', 'EBS-313', 'E-Business Systems', 'Innovation Hub', 'Prof. Sophea Chan', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (25, 'Data Science', 'IT-321', 'Information Technology', 'AI Research Center', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (26, 'Research Methodology I', 'IT-322', 'Information Technology', 'Room 205 (Building B)', 'Prof. Sophea Chan', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (27, 'Android App Development', 'IT-323', 'Information Technology', 'Mobile Lab 301', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (28, 'Network Administration I', 'IT-324', 'Information Technology', 'Lab 401 (Innovation Hub)', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (29, 'Marketing Management', 'EBS-323', 'E-Business Systems', 'Room 201 (Building B)', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (30, 'Project Management', 'EBS-324', 'E-Business Systems', 'Room 204 (Building B)', 'Prof. Sophea Chan', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 3');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (31, 'Hybrid App Development', 'IT-412', 'Information Technology', 'Mobile Lab 301', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (32, 'Cyber Security', 'IT-413', 'Information Technology', 'Security Lab 402', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (33, 'Internet of Things (IoT)', 'IT-414', 'Information Technology', 'IoT Maker Space', 'Eng. Alex Seng', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (34, 'Network Administration II', 'IT-415', 'Information Technology', 'Lab 401 (Innovation Hub)', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (35, 'Artificial Intelligence for Business', 'EBS-414', 'E-Business Systems', 'AI Center', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (36, 'Global Supplied Chain Management', 'EBS-415', 'E-Business Systems', 'Room 202 (Building B)', 'Dr. Emily Zhao', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 1', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (37, 'Management Information System', 'IT-421', 'Information Technology', 'Lab 302 (Building A)', 'Mr. Chhem Sopanha', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (38, 'E-Commerce and Digital Marketing', 'EBS-422', 'E-Business Systems', 'Innovation Hub', 'Dr. Emily Zhao', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (39, 'Machine Learning', 'IT-424', 'Information Technology', 'AI Research Center', 'Dr. Emily Zhao', '08:00 AM - 11:15 AM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (40, 'DevOps & Cloud Deployment', 'IT-425', 'Information Technology', 'Cloud Lab 401', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'Information Technology', 'Year 4');
INSERT INTO classes (id, name, code, department, room, teacher_name, schedule_time, academic_year, semester, created_at, major, year_level) VALUES (41, 'Cloud Computing for Digital Business', 'EBS-425', 'E-Business Systems', 'Cloud Lab 401', 'Eng. Alex Seng', '01:00 PM - 04:15 PM', '2024-2025', 'Semester 2', '2026-11-24 08:59:10', 'E-Business Systems', 'Year 4');

DROP TABLE IF EXISTS students;
CREATE TABLE students (
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

INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (1, 'USEA-2024-001', 'Sopanha', 'Chhem', 'Male', 'chhem.sopanha@usea.edu.kh', '012-345-678', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SopanhaChhem&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (3, 'USEA-2024-003', 'Vireak', 'Khem', 'Male', 'vireak.khem@usea.edu.kh', '077-112-233', 'https://api.dicebear.com/7.x/avataaars/svg?seed=VireakKhem&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (4, 'USEA-2024-004', 'Dany', 'Meng', 'Female', 'dany.meng@usea.edu.kh', '085-445-566', 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanyMeng&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (5, 'USEA-2024-005', 'Rithy', 'Pich', 'Male', 'rithy.pich@usea.edu.kh', '011-998-877', 'https://api.dicebear.com/7.x/avataaars/svg?seed=RithyPich&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (6, 'USEA-2024-006', 'Sreynich', 'Chea', 'Female', 'sreynich.chea@usea.edu.kh', '069-332-211', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SreynichChea&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (7, 'USEA-2024-007', 'Piseth', 'Keo', 'Male', 'piseth.keo@usea.edu.kh', '015-667-788', 'https://api.dicebear.com/7.x/avataaars/svg?seed=PisethKeo&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (8, 'USEA-2024-008', 'Thida', 'Ros', 'Female', 'thida.ros@usea.edu.kh', '089-223-344', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThidaRos&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (9, 'USEA-2024-009', 'Visal', 'Heng', 'Male', 'visal.heng@usea.edu.kh', '093-556-677', 'https://api.dicebear.com/7.x/avataaars/svg?seed=VisalHeng&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (10, 'USEA-2024-010', 'Nary', 'Chan', 'Female', 'nary.chan@usea.edu.kh', '012-778-899', 'https://api.dicebear.com/7.x/avataaars/svg?seed=NaryChan&backgroundColor=b6e3f4,c0aede,d1d4f9', 1, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (11, 'USEA-2024-011', 'Panha', 'Ouk', 'Male', 'panha.ouk@usea.edu.kh', '010-443-322', 'https://api.dicebear.com/7.x/avataaars/svg?seed=PanhaOuk&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (12, 'USEA-2024-012', 'Kalyan', 'Lim', 'Female', 'kalyan.lim@usea.edu.kh', '070-554-433', 'https://api.dicebear.com/7.x/avataaars/svg?seed=KalyanLim&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (13, 'USEA-2024-013', 'Sovann', 'Yim', 'Male', 'sovann.yim@usea.edu.kh', '016-665-544', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SovannYim&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (14, 'USEA-2024-014', 'Socheata', 'Kong', 'Female', 'socheata.kong@usea.edu.kh', '086-776-655', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SocheataKong&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (15, 'USEA-2024-015', 'Vanna', 'Ly', 'Male', 'vanna.ly@usea.edu.kh', '092-887-766', 'https://api.dicebear.com/7.x/avataaars/svg?seed=VannaLy&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (16, 'USEA-2024-016', 'Kunthea', 'Tep', 'Female', 'kunthea.tep@usea.edu.kh', '095-998-877', 'https://api.dicebear.com/7.x/avataaars/svg?seed=KuntheaTep&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (17, 'USEA-2024-017', 'Dara', 'Choun', 'Male', 'dara.choun@usea.edu.kh', '017-112-299', 'https://api.dicebear.com/7.x/avataaars/svg?seed=DaraChoun&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (18, 'USEA-2024-018', 'Channary', 'Noun', 'Female', 'channary.noun@usea.edu.kh', '078-223-388', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChannaryNoun&backgroundColor=b6e3f4,c0aede,d1d4f9', 2, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (19, 'USEA-2024-019', 'Borey', 'Sin', 'Male', 'borey.sin@usea.edu.kh', '088-334-477', 'https://api.dicebear.com/7.x/avataaars/svg?seed=BoreySin&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (20, 'USEA-2024-020', 'Mony', 'Chhit', 'Female', 'mony.chhit@usea.edu.kh', '097-445-566', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MonyChhit&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (21, 'USEA-2024-021', 'Rothana', 'Sar', 'Male', 'rothana.sar@usea.edu.kh', '012-556-655', 'https://api.dicebear.com/7.x/avataaars/svg?seed=RothanaSar&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (22, 'USEA-2024-022', 'Neary', 'Pao', 'Female', 'neary.pao@usea.edu.kh', '071-667-744', 'https://api.dicebear.com/7.x/avataaars/svg?seed=NearyPao&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (23, 'USEA-2024-023', 'Phanith', 'San', 'Male', 'phanith.san@usea.edu.kh', '015-778-833', 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhanithSan&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (24, 'USEA-2024-024', 'Leakhena', 'Mam', 'Female', 'leakhena.mam@usea.edu.kh', '093-889-922', 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeakhenaMam&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (25, 'USEA-2024-025', 'Ratanak', 'Seng', 'Male', 'ratanak.seng@usea.edu.kh', '011-990-011', 'https://api.dicebear.com/7.x/avataaars/svg?seed=RatanakSeng&backgroundColor=b6e3f4,c0aede,d1d4f9', 3, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (26, 'USEA-2024-026', 'Samnang', 'Touch', 'Male', 'samnang.touch@usea.edu.kh', '068-123-456', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamnangTouch&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (27, 'USEA-2024-027', 'Sreymao', 'Chhin', 'Female', 'sreymao.chhin@usea.edu.kh', '085-234-567', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SreymaoChhin&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (28, 'USEA-2024-028', 'Monineath', 'Pen', 'Female', 'monineath.pen@usea.edu.kh', '016-345-678', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MonineathPen&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (29, 'USEA-2024-029', 'Sovath', 'Meas', 'Male', 'sovath.meas@usea.edu.kh', '077-456-789', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SovathMeas&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (30, 'USEA-2024-030', 'Kosal', 'Yun', 'Male', 'kosal.yun@usea.edu.kh', '092-567-890', 'https://api.dicebear.com/7.x/avataaars/svg?seed=KosalYun&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (31, 'USEA-2024-031', 'Chantrea', 'Prum', 'Female', 'chantrea.prum@usea.edu.kh', '098-678-901', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChantreaPrum&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');
INSERT INTO students (id, student_id, first_name, last_name, gender, email, phone, avatar, class_id, status, created_at) VALUES (32, 'USEA-2024-032', 'Vutha', 'Roeun', 'Male', 'vutha.roeun@usea.edu.kh', '070-789-012', 'https://api.dicebear.com/7.x/avataaars/svg?seed=VuthaRoeun&backgroundColor=b6e3f4,c0aede,d1d4f9', 4, 'active', '2026-11-24 08:59:10');

DROP TABLE IF EXISTS staff;
CREATE TABLE staff (
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

INSERT INTO staff (id, staff_id, full_name, email, password_hash, role, department, phone, avatar, created_at) VALUES (1, 'STAFF-001', 'Mr. Chhem Sopanha', 'c.sopanha@usea.edu.kh', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin', 'Software Engineering', '012-888-001', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChhemSopanha&backgroundColor=b6e3f4', '2026-11-24 08:59:10');
INSERT INTO staff (id, staff_id, full_name, email, password_hash, role, department, phone, avatar, created_at) VALUES (2, 'STAFF-002', 'Prof. Sophea Chan', 's.chan@usea.edu.kh', 'cde383eee8ee7a4400adf7a15f716f179a2eb97646b37e089eb8d6d04e663416', 'teacher', 'Computer Science', '012-888-002', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SopheaChan&backgroundColor=c0aede', '2026-11-24 08:59:10');
INSERT INTO staff (id, staff_id, full_name, email, password_hash, role, department, phone, avatar, created_at) VALUES (3, 'STAFF-003', 'Eng. Alex Seng', 'a.seng@usea.edu.kh', 'cde383eee8ee7a4400adf7a15f716f179a2eb97646b37e089eb8d6d04e663416', 'teacher', 'Information Technology', '012-888-003', 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexSeng&backgroundColor=d1d4f9', '2026-11-24 08:59:10');
INSERT INTO staff (id, staff_id, full_name, email, password_hash, role, department, phone, avatar, created_at) VALUES (4, 'STAFF-004', 'Dr. Emily Zhao', 'e.zhao@usea.edu.kh', 'cde383eee8ee7a4400adf7a15f716f179a2eb97646b37e089eb8d6d04e663416', 'teacher', 'Artificial Intelligence', '012-888-004', 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyZhao&backgroundColor=ffd5dc', '2026-11-24 08:59:10');
INSERT INTO staff (id, staff_id, full_name, email, password_hash, role, department, phone, avatar, created_at) VALUES (5, 'STAFF-005', 'Prof. Sok Dara', 'd.sok@usea.edu.kh', '6f7b431de9b3e88a116d7c2e08cd34dce4169da7cfc0d18165ff216826b69fcf', 'teacher', 'Information Technology', '', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prof.SokDara&backgroundColor=b6e3f4,c0aede,d1d4f9', '2026-11-24 09:04:23');

DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  session_type TEXT NOT NULL DEFAULT 'Morning',
  topic TEXT,
  qr_token TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(class_id, date, session_type)
);

INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (1, 1, '2026-10-30', 'Morning', 'Module 1: Core Concepts & Lab Practical #1', 'QR-IT-211-2026-10-30-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (2, 1, '2026-11-02', 'Morning', 'Module 1: Core Concepts & Lab Practical #2', 'QR-IT-211-2026-11-02-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (3, 1, '2026-11-03', 'Morning', 'Module 1: Core Concepts & Lab Practical #3', 'QR-IT-211-2026-11-03-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (4, 1, '2026-11-04', 'Morning', 'Module 2: Core Concepts & Lab Practical #4', 'QR-IT-211-2026-11-04-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (5, 1, '2026-11-05', 'Morning', 'Module 2: Core Concepts & Lab Practical #5', 'QR-IT-211-2026-11-05-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (6, 1, '2026-11-06', 'Morning', 'Module 2: Core Concepts & Lab Practical #6', 'QR-IT-211-2026-11-06-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (7, 1, '2026-11-09', 'Morning', 'Module 3: Core Concepts & Lab Practical #7', 'QR-IT-211-2026-11-09-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (8, 1, '2026-11-10', 'Morning', 'Module 3: Core Concepts & Lab Practical #8', 'QR-IT-211-2026-11-10-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (9, 1, '2026-11-11', 'Morning', 'Module 3: Core Concepts & Lab Practical #9', 'QR-IT-211-2026-11-11-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (10, 1, '2026-11-12', 'Morning', 'Module 4: Core Concepts & Lab Practical #10', 'QR-IT-211-2026-11-12-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (11, 1, '2026-11-13', 'Morning', 'Module 4: Core Concepts & Lab Practical #11', 'QR-IT-211-2026-11-13-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (12, 1, '2026-11-16', 'Morning', 'Module 4: Core Concepts & Lab Practical #12', 'QR-IT-211-2026-11-16-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (13, 1, '2026-11-17', 'Morning', 'Module 5: Core Concepts & Lab Practical #13', 'QR-IT-211-2026-11-17-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (14, 1, '2026-11-18', 'Morning', 'Module 5: Core Concepts & Lab Practical #14', 'QR-IT-211-2026-11-18-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (15, 1, '2026-11-19', 'Morning', 'Module 5: Core Concepts & Lab Practical #15', 'QR-IT-211-2026-11-19-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (16, 2, '2026-10-30', 'Morning', 'Module 1: Core Concepts & Lab Practical #1', 'QR-IT-212-2026-10-30-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (17, 2, '2026-11-02', 'Morning', 'Module 1: Core Concepts & Lab Practical #2', 'QR-IT-212-2026-11-02-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (18, 2, '2026-11-03', 'Morning', 'Module 1: Core Concepts & Lab Practical #3', 'QR-IT-212-2026-11-03-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (19, 2, '2026-11-04', 'Morning', 'Module 2: Core Concepts & Lab Practical #4', 'QR-IT-212-2026-11-04-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (20, 2, '2026-11-05', 'Morning', 'Module 2: Core Concepts & Lab Practical #5', 'QR-IT-212-2026-11-05-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (21, 2, '2026-11-06', 'Morning', 'Module 2: Core Concepts & Lab Practical #6', 'QR-IT-212-2026-11-06-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (22, 2, '2026-11-09', 'Morning', 'Module 3: Core Concepts & Lab Practical #7', 'QR-IT-212-2026-11-09-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (23, 2, '2026-11-10', 'Morning', 'Module 3: Core Concepts & Lab Practical #8', 'QR-IT-212-2026-11-10-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (24, 2, '2026-11-11', 'Morning', 'Module 3: Core Concepts & Lab Practical #9', 'QR-IT-212-2026-11-11-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (25, 2, '2026-11-12', 'Morning', 'Module 4: Core Concepts & Lab Practical #10', 'QR-IT-212-2026-11-12-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (26, 2, '2026-11-13', 'Morning', 'Module 4: Core Concepts & Lab Practical #11', 'QR-IT-212-2026-11-13-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (27, 2, '2026-11-16', 'Morning', 'Module 4: Core Concepts & Lab Practical #12', 'QR-IT-212-2026-11-16-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (28, 2, '2026-11-17', 'Morning', 'Module 5: Core Concepts & Lab Practical #13', 'QR-IT-212-2026-11-17-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (29, 2, '2026-11-18', 'Morning', 'Module 5: Core Concepts & Lab Practical #14', 'QR-IT-212-2026-11-18-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (30, 2, '2026-11-19', 'Morning', 'Module 5: Core Concepts & Lab Practical #15', 'QR-IT-212-2026-11-19-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (31, 3, '2026-10-30', 'Morning', 'Module 1: Core Concepts & Lab Practical #1', 'QR-IT-213-2026-10-30-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (32, 3, '2026-11-02', 'Morning', 'Module 1: Core Concepts & Lab Practical #2', 'QR-IT-213-2026-11-02-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (33, 3, '2026-11-03', 'Morning', 'Module 1: Core Concepts & Lab Practical #3', 'QR-IT-213-2026-11-03-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (34, 3, '2026-11-04', 'Morning', 'Module 2: Core Concepts & Lab Practical #4', 'QR-IT-213-2026-11-04-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (35, 3, '2026-11-05', 'Morning', 'Module 2: Core Concepts & Lab Practical #5', 'QR-IT-213-2026-11-05-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (36, 3, '2026-11-06', 'Morning', 'Module 2: Core Concepts & Lab Practical #6', 'QR-IT-213-2026-11-06-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (37, 3, '2026-11-09', 'Morning', 'Module 3: Core Concepts & Lab Practical #7', 'QR-IT-213-2026-11-09-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (38, 3, '2026-11-10', 'Morning', 'Module 3: Core Concepts & Lab Practical #8', 'QR-IT-213-2026-11-10-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (39, 3, '2026-11-11', 'Morning', 'Module 3: Core Concepts & Lab Practical #9', 'QR-IT-213-2026-11-11-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (40, 3, '2026-11-12', 'Morning', 'Module 4: Core Concepts & Lab Practical #10', 'QR-IT-213-2026-11-12-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (41, 3, '2026-11-13', 'Morning', 'Module 4: Core Concepts & Lab Practical #11', 'QR-IT-213-2026-11-13-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (42, 3, '2026-11-16', 'Morning', 'Module 4: Core Concepts & Lab Practical #12', 'QR-IT-213-2026-11-16-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (43, 3, '2026-11-17', 'Morning', 'Module 5: Core Concepts & Lab Practical #13', 'QR-IT-213-2026-11-17-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (44, 3, '2026-11-18', 'Morning', 'Module 5: Core Concepts & Lab Practical #14', 'QR-IT-213-2026-11-18-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (45, 3, '2026-11-19', 'Morning', 'Module 5: Core Concepts & Lab Practical #15', 'QR-IT-213-2026-11-19-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (46, 4, '2026-10-30', 'Morning', 'Module 1: Core Concepts & Lab Practical #1', 'QR-IT-214-2026-10-30-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (47, 4, '2026-11-02', 'Morning', 'Module 1: Core Concepts & Lab Practical #2', 'QR-IT-214-2026-11-02-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (48, 4, '2026-11-03', 'Morning', 'Module 1: Core Concepts & Lab Practical #3', 'QR-IT-214-2026-11-03-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (49, 4, '2026-11-04', 'Morning', 'Module 2: Core Concepts & Lab Practical #4', 'QR-IT-214-2026-11-04-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (50, 4, '2026-11-05', 'Morning', 'Module 2: Core Concepts & Lab Practical #5', 'QR-IT-214-2026-11-05-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (51, 4, '2026-11-06', 'Morning', 'Module 2: Core Concepts & Lab Practical #6', 'QR-IT-214-2026-11-06-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (52, 4, '2026-11-09', 'Morning', 'Module 3: Core Concepts & Lab Practical #7', 'QR-IT-214-2026-11-09-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (53, 4, '2026-11-10', 'Morning', 'Module 3: Core Concepts & Lab Practical #8', 'QR-IT-214-2026-11-10-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (54, 4, '2026-11-11', 'Morning', 'Module 3: Core Concepts & Lab Practical #9', 'QR-IT-214-2026-11-11-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (55, 4, '2026-11-12', 'Morning', 'Module 4: Core Concepts & Lab Practical #10', 'QR-IT-214-2026-11-12-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (56, 4, '2026-11-13', 'Morning', 'Module 4: Core Concepts & Lab Practical #11', 'QR-IT-214-2026-11-13-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (57, 4, '2026-11-16', 'Morning', 'Module 4: Core Concepts & Lab Practical #12', 'QR-IT-214-2026-11-16-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (58, 4, '2026-11-17', 'Morning', 'Module 5: Core Concepts & Lab Practical #13', 'QR-IT-214-2026-11-17-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (59, 4, '2026-11-18', 'Morning', 'Module 5: Core Concepts & Lab Practical #14', 'QR-IT-214-2026-11-18-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (60, 4, '2026-11-19', 'Morning', 'Module 5: Core Concepts & Lab Practical #15', 'QR-IT-214-2026-11-19-M', '2026-11-24 08:59:10');
INSERT INTO sessions (id, class_id, date, session_type, topic, qr_token, created_at) VALUES (61, 11, '2026-11-24', 'Morning', 'Class Session (Morning)', 'ATT-IT-221-2026-11-24-Morning', '2026-11-24 09:00:29');

DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
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

INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (1, 1, 1, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (3, 1, 3, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (4, 1, 4, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (5, 1, 5, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (6, 1, 6, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (7, 1, 7, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (8, 1, 8, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (9, 1, 9, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (10, 1, 10, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (11, 2, 1, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (13, 2, 3, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (14, 2, 4, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (15, 2, 5, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (16, 2, 6, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (17, 2, 7, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (18, 2, 8, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (19, 2, 9, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (20, 2, 10, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (21, 3, 1, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (23, 3, 3, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (24, 3, 4, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (25, 3, 5, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (26, 3, 6, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (27, 3, 7, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (28, 3, 8, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (29, 3, 9, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (30, 3, 10, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (31, 4, 1, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (33, 4, 3, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (34, 4, 4, 'late', 'Arrived late to class', '08:17 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (35, 4, 5, 'late', 'Arrived late to class', '08:07 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (36, 4, 6, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (37, 4, 7, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (38, 4, 8, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (39, 4, 9, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (40, 4, 10, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (41, 5, 1, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (43, 5, 3, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (44, 5, 4, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (45, 5, 5, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (46, 5, 6, 'late', 'Arrived late to class', '08:15 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (47, 5, 7, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (48, 5, 8, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (49, 5, 9, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (50, 5, 10, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (51, 6, 1, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (53, 6, 3, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (54, 6, 4, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (55, 6, 5, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (56, 6, 6, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (57, 6, 7, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (58, 6, 8, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (59, 6, 9, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (60, 6, 10, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (61, 7, 1, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (63, 7, 3, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (64, 7, 4, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (65, 7, 5, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (66, 7, 6, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (67, 7, 7, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (68, 7, 8, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (69, 7, 9, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (70, 7, 10, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (71, 8, 1, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (73, 8, 3, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (74, 8, 4, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (75, 8, 5, 'late', 'Arrived late to class', '08:10 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (76, 8, 6, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (77, 8, 7, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (78, 8, 8, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (79, 8, 9, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (80, 8, 10, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (81, 9, 1, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (83, 9, 3, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (84, 9, 4, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (85, 9, 5, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (86, 9, 6, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (87, 9, 7, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (88, 9, 8, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (89, 9, 9, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (90, 9, 10, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (91, 10, 1, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (93, 10, 3, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (94, 10, 4, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (95, 10, 5, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (96, 10, 6, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (97, 10, 7, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (98, 10, 8, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (99, 10, 9, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (100, 10, 10, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (101, 11, 1, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (103, 11, 3, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (104, 11, 4, 'late', 'Arrived late to class', '08:14 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (105, 11, 5, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (106, 11, 6, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (107, 11, 7, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (108, 11, 8, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (109, 11, 9, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (110, 11, 10, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (111, 12, 1, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (113, 12, 3, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (114, 12, 4, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (115, 12, 5, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (116, 12, 6, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (117, 12, 7, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (118, 12, 8, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (119, 12, 9, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (120, 12, 10, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (121, 13, 1, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (123, 13, 3, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (124, 13, 4, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (125, 13, 5, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (126, 13, 6, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (127, 13, 7, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (128, 13, 8, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (129, 13, 9, 'late', 'Arrived late to class', '08:10 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (130, 13, 10, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (131, 14, 1, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (133, 14, 3, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (134, 14, 4, 'late', 'Arrived late to class', '08:09 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (135, 14, 5, 'late', 'Arrived late to class', '08:05 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (136, 14, 6, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (137, 14, 7, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (138, 14, 8, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (139, 14, 9, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (140, 14, 10, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (141, 15, 1, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (143, 15, 3, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (144, 15, 4, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (145, 15, 5, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (146, 15, 6, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (147, 15, 7, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (148, 15, 8, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (149, 15, 9, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (150, 15, 10, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (151, 16, 11, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (152, 16, 12, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (153, 16, 13, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (154, 16, 14, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (155, 16, 15, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (156, 16, 16, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (157, 16, 17, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (158, 16, 18, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (159, 17, 11, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (160, 17, 12, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (161, 17, 13, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (162, 17, 14, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (163, 17, 15, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (164, 17, 16, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (165, 17, 17, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (166, 17, 18, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (167, 18, 11, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (168, 18, 12, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (169, 18, 13, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (170, 18, 14, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (171, 18, 15, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (172, 18, 16, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (173, 18, 17, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (174, 18, 18, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (175, 19, 11, 'late', 'Arrived late to class', '08:11 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (176, 19, 12, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (177, 19, 13, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (178, 19, 14, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (179, 19, 15, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (180, 19, 16, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (181, 19, 17, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (182, 19, 18, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (183, 20, 11, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (184, 20, 12, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (185, 20, 13, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (186, 20, 14, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (187, 20, 15, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (188, 20, 16, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (189, 20, 17, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (190, 20, 18, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (191, 21, 11, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (192, 21, 12, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (193, 21, 13, 'late', 'Arrived late to class', '08:12 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (194, 21, 14, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (195, 21, 15, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (196, 21, 16, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (197, 21, 17, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (198, 21, 18, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (199, 22, 11, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (200, 22, 12, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (201, 22, 13, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (202, 22, 14, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (203, 22, 15, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (204, 22, 16, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (205, 22, 17, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (206, 22, 18, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (207, 23, 11, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (208, 23, 12, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (209, 23, 13, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (210, 23, 14, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (211, 23, 15, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (212, 23, 16, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (213, 23, 17, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (214, 23, 18, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (215, 24, 11, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (216, 24, 12, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (217, 24, 13, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (218, 24, 14, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (219, 24, 15, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (220, 24, 16, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (221, 24, 17, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (222, 24, 18, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (223, 25, 11, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (224, 25, 12, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (225, 25, 13, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (226, 25, 14, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (227, 25, 15, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (228, 25, 16, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (229, 25, 17, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (230, 25, 18, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (231, 26, 11, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (232, 26, 12, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (233, 26, 13, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (234, 26, 14, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (235, 26, 15, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (236, 26, 16, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (237, 26, 17, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (238, 26, 18, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (239, 27, 11, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (240, 27, 12, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (241, 27, 13, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (242, 27, 14, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (243, 27, 15, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (244, 27, 16, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (245, 27, 17, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (246, 27, 18, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (247, 28, 11, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (248, 28, 12, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (249, 28, 13, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (250, 28, 14, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (251, 28, 15, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (252, 28, 16, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (253, 28, 17, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (254, 28, 18, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (255, 29, 11, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (256, 29, 12, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (257, 29, 13, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (258, 29, 14, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (259, 29, 15, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (260, 29, 16, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (261, 29, 17, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (262, 29, 18, 'late', 'Arrived late to class', '08:19 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (263, 30, 11, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (264, 30, 12, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (265, 30, 13, 'late', 'Arrived late to class', '08:24 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (266, 30, 14, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (267, 30, 15, 'late', 'Arrived late to class', '08:05 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (268, 30, 16, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (269, 30, 17, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (270, 30, 18, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (271, 31, 19, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (272, 31, 20, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (273, 31, 21, 'present', '', '07:53 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (274, 31, 22, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (275, 31, 23, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (276, 31, 24, 'late', 'Arrived late to class', '08:21 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (277, 31, 25, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (278, 32, 19, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (279, 32, 20, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (280, 32, 21, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (281, 32, 22, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (282, 32, 23, 'late', 'Arrived late to class', '08:10 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (283, 32, 24, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (284, 32, 25, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (285, 33, 19, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (286, 33, 20, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (287, 33, 21, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (288, 33, 22, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (289, 33, 23, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (290, 33, 24, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (291, 33, 25, 'present', '', '07:53 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (292, 34, 19, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (293, 34, 20, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (294, 34, 21, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (295, 34, 22, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (296, 34, 23, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (297, 34, 24, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (298, 34, 25, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (299, 35, 19, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (300, 35, 20, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (301, 35, 21, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (302, 35, 22, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (303, 35, 23, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (304, 35, 24, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (305, 35, 25, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (306, 36, 19, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (307, 36, 20, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (308, 36, 21, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (309, 36, 22, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (310, 36, 23, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (311, 36, 24, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (312, 36, 25, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (313, 37, 19, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (314, 37, 20, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (315, 37, 21, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (316, 37, 22, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (317, 37, 23, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (318, 37, 24, 'late', 'Arrived late to class', '08:09 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (319, 37, 25, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (320, 38, 19, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (321, 38, 20, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (322, 38, 21, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (323, 38, 22, 'late', 'Arrived late to class', '08:07 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (324, 38, 23, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (325, 38, 24, 'present', '', '07:53 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (326, 38, 25, 'late', 'Arrived late to class', '08:07 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (327, 39, 19, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (328, 39, 20, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (329, 39, 21, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (330, 39, 22, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (331, 39, 23, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (332, 39, 24, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (333, 39, 25, 'present', '', '07:49 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (334, 40, 19, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (335, 40, 20, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (336, 40, 21, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (337, 40, 22, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (338, 40, 23, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (339, 40, 24, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (340, 40, 25, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (341, 41, 19, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (342, 41, 20, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (343, 41, 21, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (344, 41, 22, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (345, 41, 23, 'late', 'Arrived late to class', '08:23 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (346, 41, 24, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (347, 41, 25, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (348, 42, 19, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (349, 42, 20, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (350, 42, 21, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (351, 42, 22, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (352, 42, 23, 'late', 'Arrived late to class', '08:19 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (353, 42, 24, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (354, 42, 25, 'late', 'Arrived late to class', '08:19 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (355, 43, 19, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (356, 43, 20, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (357, 43, 21, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (358, 43, 22, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (359, 43, 23, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (360, 43, 24, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (361, 43, 25, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (362, 44, 19, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (363, 44, 20, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (364, 44, 21, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (365, 44, 22, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (366, 44, 23, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (367, 44, 24, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (368, 44, 25, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (369, 45, 19, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (370, 45, 20, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (371, 45, 21, 'present', '', '07:52 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (372, 45, 22, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (373, 45, 23, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (374, 45, 24, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (375, 45, 25, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (376, 46, 26, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (377, 46, 27, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (378, 46, 28, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (379, 46, 29, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (380, 46, 30, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (381, 46, 31, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (382, 46, 32, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (383, 47, 26, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (384, 47, 27, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (385, 47, 28, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (386, 47, 29, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (387, 47, 30, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (388, 47, 31, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (389, 47, 32, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (390, 48, 26, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (391, 48, 27, 'excused', 'Family emergency', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (392, 48, 28, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (393, 48, 29, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (394, 48, 30, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (395, 48, 31, 'present', '', '07:56 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (396, 48, 32, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (397, 49, 26, 'present', '', '07:54 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (398, 49, 27, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (399, 49, 28, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (400, 49, 29, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (401, 49, 30, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (402, 49, 31, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (403, 49, 32, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (404, 50, 26, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (405, 50, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (406, 50, 28, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (407, 50, 29, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (408, 50, 30, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (409, 50, 31, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (410, 50, 32, 'present', '', '07:53 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (411, 51, 26, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (412, 51, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (413, 51, 28, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (414, 51, 29, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (415, 51, 30, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (416, 51, 31, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (417, 51, 32, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (418, 52, 26, 'late', 'Arrived late to class', '08:06 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (419, 52, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (420, 52, 28, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (421, 52, 29, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (422, 52, 30, 'late', 'Arrived late to class', '08:19 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (423, 52, 31, 'absent', 'Absent without prior notice', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (424, 52, 32, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (425, 53, 26, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (426, 53, 27, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (427, 53, 28, 'present', '', '07:51 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (428, 53, 29, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (429, 53, 30, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (430, 53, 31, 'present', '', '07:50 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (431, 53, 32, 'present', '', '07:56 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (432, 54, 26, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (433, 54, 27, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (434, 54, 28, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (435, 54, 29, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (436, 54, 30, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (437, 54, 31, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (438, 54, 32, 'present', '', '07:51 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (439, 55, 26, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (440, 55, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (441, 55, 28, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (442, 55, 29, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (443, 55, 30, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (444, 55, 31, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (445, 55, 32, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (446, 56, 26, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (447, 56, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (448, 56, 28, 'present', '', '07:57 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (449, 56, 29, 'present', '', '07:46 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (450, 56, 30, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (451, 56, 31, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (452, 56, 32, 'present', '', '07:55 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (453, 57, 26, 'present', '', '07:53 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (454, 57, 27, 'late', 'Traffic congestion', '08:25 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (455, 57, 28, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (456, 57, 29, 'late', 'Arrived late to class', '08:24 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (457, 57, 30, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (458, 57, 31, 'present', '', '07:48 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (459, 57, 32, 'late', 'Arrived late to class', '08:18 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (460, 58, 26, 'present', '', '07:47 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (461, 58, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (462, 58, 28, 'present', '', '07:45 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (463, 58, 29, 'excused', 'Medical note submitted', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (464, 58, 30, 'present', '', '07:49 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (465, 58, 31, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (466, 58, 32, 'present', '', '07:58 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (467, 59, 26, 'present', '', '07:48 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (468, 59, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (469, 59, 28, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (470, 59, 29, 'present', '', '07:55 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (471, 59, 30, 'present', '', '07:45 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (472, 59, 31, 'present', '', '07:52 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (473, 59, 32, 'present', '', '07:46 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (474, 60, 26, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (475, 60, 27, 'absent', 'Unexcused absence', NULL, 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (476, 60, 28, 'present', '', '07:54 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (477, 60, 29, 'present', '', '07:58 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (478, 60, 30, 'present', '', '07:57 AM', 'manual', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (479, 60, 31, 'present', '', '07:50 AM', 'qr_code', '2026-11-24 08:59:10');
INSERT INTO attendance (id, session_id, student_id, status, remark, check_in_time, method, created_at) VALUES (480, 60, 32, 'present', '', '07:47 AM', 'manual', '2026-11-24 08:59:10');

DROP TABLE IF EXISTS leave_requests;
CREATE TABLE leave_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  approved_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO leave_requests (id, student_id, start_date, end_date, reason, status, approved_by, created_at) VALUES (1, 1, '2026-11-03', '2026-11-04', 'National Hackathon Competition representation', 'approved', 'Mr. Chhem Sopanha', '2026-11-24 08:59:10');
INSERT INTO leave_requests (id, student_id, start_date, end_date, reason, status, approved_by, created_at) VALUES (2, 4, '2026-11-06', '2026-11-06', 'Medical appointment with physician note', 'approved', 'Dean Office', '2026-11-24 08:59:10');
INSERT INTO leave_requests (id, student_id, start_date, end_date, reason, status, approved_by, created_at) VALUES (3, 11, '2026-11-11', '2026-11-12', 'Severe fever and recovery', 'approved', 'Prof. Sophea Chan', '2026-11-24 08:59:10');
INSERT INTO leave_requests (id, student_id, start_date, end_date, reason, status, approved_by, created_at) VALUES (4, 16, '2026-11-19', '2026-11-19', 'Attending sibling graduation ceremony', 'pending', NULL, '2026-11-24 08:59:10');

PRAGMA foreign_keys = ON;
