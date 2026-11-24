const { db, queryAll, run, transaction } = require('./index');
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  transaction(() => {
    // Clear existing data in correct FK order
    db.exec('DELETE FROM attendance;');
    db.exec('DELETE FROM leave_requests;');
    db.exec('DELETE FROM sessions;');
    db.exec('DELETE FROM students;');
    db.exec('DELETE FROM classes;');
    db.exec('DELETE FROM departments;');
    db.exec('DELETE FROM staff;');
    try { db.exec('DELETE FROM sqlite_sequence;'); } catch (e) {}

    // 1. Departments
    const insertDept = db.prepare('INSERT INTO departments (name, code) VALUES (?, ?)');
    insertDept.run('Faculty of Science and Information Technology', 'FSIT');
    insertDept.run('Department of Information Technology', 'DIT');
    insertDept.run('Department of E-Business Systems', 'DEBS');
    insertDept.run('Department of Software Engineering', 'DSE');

    // 2. Classes based on official USEA Curriculum:
    // "២. កម្មវិធីអប់រំ នៃមុខជំនាញព័ត៌មានវិទ្យា និងមុខជំនាញប្រព័ន្ធអាជីវកម្មអេឡិចត្រូនិក"
    const insertClass = db.prepare(`
      INSERT INTO classes (name, code, department, major, year_level, room, teacher_name, schedule_time, academic_year, semester)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const curriculumClasses = [
      // --- Year 2, Semester 1 ---
      // IT
      { name: 'Database Management System', code: 'IT-211', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Data Communication and Networking', code: 'IT-212', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Lab 401 (Innovation Hub)', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'UX and UI Design', code: 'IT-213', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Web App Development II', code: 'IT-214', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'Chinese Language III', code: 'LANG-211', dept: 'General Education', major: 'Information Technology', yr: 'Year 2', room: 'Room 102 (Building C)', prof: 'Ms. Meili Zhang', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'English Language III', code: 'LANG-212', dept: 'General Education', major: 'Information Technology', yr: 'Year 2', room: 'Room 103 (Building C)', prof: 'Mr. David Miller', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      // EBS
      { name: 'Database Management System (EBS)', code: 'EBS-211', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Business and Technology', code: 'EBS-212', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Room 204 (Building B)', prof: 'Prof. Sophea Chan', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'UX and UI Design (EBS)', code: 'EBS-213', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Web App Development II (EBS)', code: 'EBS-214', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },

      // --- Year 2, Semester 2 ---
      // IT
      { name: '.NET Technology', code: 'IT-221', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Cisco Networking I', code: 'IT-222', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Cisco Lab (Building A)', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      { name: 'Data Structure and Algorithms with C++', code: 'IT-223', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Web App Framework', code: 'IT-224', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 2', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      // EBS
      { name: 'Principle of Modern Marketing', code: 'EBS-221', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Room 201 (Building B)', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Business Communication and Responsible', code: 'EBS-222', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Room 202 (Building B)', prof: 'Dr. Emily Zhao', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      { name: 'Data Structure and Algorithms with C++ (EBS)', code: 'EBS-223', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 2', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },

      // --- Year 3, Semester 1 ---
      // IT
      { name: 'Database Administration', code: 'IT-311', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Cisco Networking II', code: 'IT-312', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Cisco Lab (Building A)', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'Java Programming', code: 'IT-313', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'System Analysis and Design', code: 'IT-314', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Room 204 (Building B)', prof: 'Dr. Emily Zhao', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      // EBS
      { name: 'Accounting Information System', code: 'EBS-311', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 3', room: 'Room 202 (Building B)', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Cambodian Business Law', code: 'EBS-312', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 3', room: 'Room 203 (Building B)', prof: 'Dr. Emily Zhao', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'Entrepreneurship & Innovation', code: 'EBS-313', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 3', room: 'Innovation Hub', prof: 'Prof. Sophea Chan', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },

      // --- Year 3, Semester 2 ---
      // IT
      { name: 'Data Science', code: 'IT-321', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'AI Research Center', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Research Methodology I', code: 'IT-322', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Room 205 (Building B)', prof: 'Prof. Sophea Chan', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      { name: 'Android App Development', code: 'IT-323', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Mobile Lab 301', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Network Administration I', code: 'IT-324', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 3', room: 'Lab 401 (Innovation Hub)', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      // EBS
      { name: 'Marketing Management', code: 'EBS-323', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 3', room: 'Room 201 (Building B)', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'Project Management', code: 'EBS-324', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 3', room: 'Room 204 (Building B)', prof: 'Prof. Sophea Chan', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },

      // --- Year 4, Semester 1 ---
      // IT
      { name: 'Hybrid App Development', code: 'IT-412', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'Mobile Lab 301', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Cyber Security', code: 'IT-413', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'Security Lab 402', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      { name: 'Internet of Things (IoT)', code: 'IT-414', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'IoT Maker Space', prof: 'Eng. Alex Seng', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Network Administration II', code: 'IT-415', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'Lab 401 (Innovation Hub)', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },
      // EBS
      { name: 'Artificial Intelligence for Business', code: 'EBS-414', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 4', room: 'AI Center', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 1' },
      { name: 'Global Supplied Chain Management', code: 'EBS-415', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 4', room: 'Room 202 (Building B)', prof: 'Dr. Emily Zhao', time: '01:00 PM - 04:15 PM', sem: 'Semester 1' },

      // --- Year 4, Semester 2 ---
      { name: 'Management Information System', code: 'IT-421', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'Lab 302 (Building A)', prof: 'Dr. Robert Vance', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'E-Commerce and Digital Marketing', code: 'EBS-422', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 4', room: 'Innovation Hub', prof: 'Dr. Emily Zhao', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      { name: 'Machine Learning', code: 'IT-424', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'AI Research Center', prof: 'Dr. Emily Zhao', time: '08:00 AM - 11:15 AM', sem: 'Semester 2' },
      { name: 'DevOps & Cloud Deployment', code: 'IT-425', dept: 'Information Technology', major: 'Information Technology', yr: 'Year 4', room: 'Cloud Lab 401', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' },
      { name: 'Cloud Computing for Digital Business', code: 'EBS-425', dept: 'E-Business Systems', major: 'E-Business Systems', yr: 'Year 4', room: 'Cloud Lab 401', prof: 'Eng. Alex Seng', time: '01:00 PM - 04:15 PM', sem: 'Semester 2' }
    ];

    for (const c of curriculumClasses) {
      insertClass.run(c.name, c.code, c.dept, c.major, c.yr, c.room, c.prof, c.time, '2024-2025', c.sem);
    }

    const classes = queryAll('SELECT id, name, code FROM classes');
    console.log(` Created ${classes.length} classes`);

    // 3. Students
    const studentData = [
      // Class 1 (SE-301)
      { sid: 'USEA-2024-001', fn: 'Sopanha', ln: 'Chhem', g: 'Male', e: 'chhem.sopanha@usea.edu.kh', p: '012-345-678', c: classes[0].id },
      { sid: 'USEA-2024-002', fn: 'Bopha', ln: 'Sok', g: 'Female', e: 'sok.bopha@usea.edu.kh', p: '098-765-432', c: classes[0].id },
      { sid: 'USEA-2024-003', fn: 'Vireak', ln: 'Khem', g: 'Male', e: 'vireak.khem@usea.edu.kh', p: '077-112-233', c: classes[0].id },
      { sid: 'USEA-2024-004', fn: 'Dany', ln: 'Meng', g: 'Female', e: 'dany.meng@usea.edu.kh', p: '085-445-566', c: classes[0].id },
      { sid: 'USEA-2024-005', fn: 'Rithy', ln: 'Pich', g: 'Male', e: 'rithy.pich@usea.edu.kh', p: '011-998-877', c: classes[0].id },
      { sid: 'USEA-2024-006', fn: 'Sreynich', ln: 'Chea', g: 'Female', e: 'sreynich.chea@usea.edu.kh', p: '069-332-211', c: classes[0].id },
      { sid: 'USEA-2024-007', fn: 'Piseth', ln: 'Keo', g: 'Male', e: 'piseth.keo@usea.edu.kh', p: '015-667-788', c: classes[0].id },
      { sid: 'USEA-2024-008', fn: 'Thida', ln: 'Ros', g: 'Female', e: 'thida.ros@usea.edu.kh', p: '089-223-344', c: classes[0].id },
      { sid: 'USEA-2024-009', fn: 'Visal', ln: 'Heng', g: 'Male', e: 'visal.heng@usea.edu.kh', p: '093-556-677', c: classes[0].id },
      { sid: 'USEA-2024-010', fn: 'Nary', ln: 'Chan', g: 'Female', e: 'nary.chan@usea.edu.kh', p: '012-778-899', c: classes[0].id },

      // Class 2 (CS-202)
      { sid: 'USEA-2024-011', fn: 'Panha', ln: 'Ouk', g: 'Male', e: 'panha.ouk@usea.edu.kh', p: '010-443-322', c: classes[1].id },
      { sid: 'USEA-2024-012', fn: 'Kalyan', ln: 'Lim', g: 'Female', e: 'kalyan.lim@usea.edu.kh', p: '070-554-433', c: classes[1].id },
      { sid: 'USEA-2024-013', fn: 'Sovann', ln: 'Yim', g: 'Male', e: 'sovann.yim@usea.edu.kh', p: '016-665-544', c: classes[1].id },
      { sid: 'USEA-2024-014', fn: 'Socheata', ln: 'Kong', g: 'Female', e: 'socheata.kong@usea.edu.kh', p: '086-776-655', c: classes[1].id },
      { sid: 'USEA-2024-015', fn: 'Vanna', ln: 'Ly', g: 'Male', e: 'vanna.ly@usea.edu.kh', p: '092-887-766', c: classes[1].id },
      { sid: 'USEA-2024-016', fn: 'Kunthea', ln: 'Tep', g: 'Female', e: 'kunthea.tep@usea.edu.kh', p: '095-998-877', c: classes[1].id },
      { sid: 'USEA-2024-017', fn: 'Dara', ln: 'Choun', g: 'Male', e: 'dara.choun@usea.edu.kh', p: '017-112-299', c: classes[1].id },
      { sid: 'USEA-2024-018', fn: 'Channary', ln: 'Noun', g: 'Female', e: 'channary.noun@usea.edu.kh', p: '078-223-388', c: classes[1].id },

      // Class 3 (IT-401)
      { sid: 'USEA-2024-019', fn: 'Borey', ln: 'Sin', g: 'Male', e: 'borey.sin@usea.edu.kh', p: '088-334-477', c: classes[2].id },
      { sid: 'USEA-2024-020', fn: 'Mony', ln: 'Chhit', g: 'Female', e: 'mony.chhit@usea.edu.kh', p: '097-445-566', c: classes[2].id },
      { sid: 'USEA-2024-021', fn: 'Rothana', ln: 'Sar', g: 'Male', e: 'rothana.sar@usea.edu.kh', p: '012-556-655', c: classes[2].id },
      { sid: 'USEA-2024-022', fn: 'Neary', ln: 'Pao', g: 'Female', e: 'neary.pao@usea.edu.kh', p: '071-667-744', c: classes[2].id },
      { sid: 'USEA-2024-023', fn: 'Phanith', ln: 'San', g: 'Male', e: 'phanith.san@usea.edu.kh', p: '015-778-833', c: classes[2].id },
      { sid: 'USEA-2024-024', fn: 'Leakhena', ln: 'Mam', g: 'Female', e: 'leakhena.mam@usea.edu.kh', p: '093-889-922', c: classes[2].id },
      { sid: 'USEA-2024-025', fn: 'Ratanak', ln: 'Seng', g: 'Male', e: 'ratanak.seng@usea.edu.kh', p: '011-990-011', c: classes[2].id },

      // Class 4 (AI-405)
      { sid: 'USEA-2024-026', fn: 'Samnang', ln: 'Touch', g: 'Male', e: 'samnang.touch@usea.edu.kh', p: '068-123-456', c: classes[3].id },
      { sid: 'USEA-2024-027', fn: 'Sreymao', ln: 'Chhin', g: 'Female', e: 'sreymao.chhin@usea.edu.kh', p: '085-234-567', c: classes[3].id },
      { sid: 'USEA-2024-028', fn: 'Monineath', ln: 'Pen', g: 'Female', e: 'monineath.pen@usea.edu.kh', p: '016-345-678', c: classes[3].id },
      { sid: 'USEA-2024-029', fn: 'Sovath', ln: 'Meas', g: 'Male', e: 'sovath.meas@usea.edu.kh', p: '077-456-789', c: classes[3].id },
      { sid: 'USEA-2024-030', fn: 'Kosal', ln: 'Yun', g: 'Male', e: 'kosal.yun@usea.edu.kh', p: '092-567-890', c: classes[3].id },
      { sid: 'USEA-2024-031', fn: 'Chantrea', ln: 'Prum', g: 'Female', e: 'chantrea.prum@usea.edu.kh', p: '098-678-901', c: classes[3].id },
      { sid: 'USEA-2024-032', fn: 'Vutha', ln: 'Roeun', g: 'Male', e: 'vutha.roeun@usea.edu.kh', p: '070-789-012', c: classes[3].id }
    ];

    const insertStudent = db.prepare(`
      INSERT INTO students (student_id, first_name, last_name, gender, email, phone, avatar, class_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
    `);

    for (const s of studentData) {
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s.fn}${s.ln}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
      insertStudent.run(s.sid, s.fn, s.ln, s.g, s.e, s.p, avatar, s.c);
    }

    const students = queryAll('SELECT id, student_id, first_name, last_name, class_id FROM students');
    console.log(` Created ${students.length} students`);

    // 4. Generate past 15 academic days (excluding weekends)
    const today = new Date();
    const dates = [];
    let cur = new Date(today);
    cur.setDate(cur.getDate() - 25);

    while (dates.length < 15 && cur <= today) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) { // Mon - Fri
        dates.push(cur.toISOString().split('T')[0]);
      }
      cur.setDate(cur.getDate() + 1);
    }

    const insertSession = db.prepare(`
      INSERT INTO sessions (class_id, date, session_type, topic, qr_token)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertAttendance = db.prepare(`
      INSERT INTO attendance (session_id, student_id, status, remark, check_in_time, method)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    let totalAttendanceCount = 0;

    for (const cls of classes) {
      const classStudents = students.filter(s => s.class_id === cls.id);
      if (classStudents.length === 0) continue;

      // Designate one student in each class to have poor attendance (< 75%) to demonstrate "At-Risk" alerts
      const atRiskStudent = classStudents[1];

      for (let i = 0; i < dates.length; i++) {
        const dateStr = dates[i];
        const topic = `Module ${Math.floor(i / 3) + 1}: Core Concepts & Lab Practical #${i + 1}`;
        const qrToken = `QR-${cls.code}-${dateStr}-M`;

        const sessionResult = insertSession.run(cls.id, dateStr, 'Morning', topic, qrToken);
        const sessionId = sessionResult.lastInsertRowid;

        for (const st of classStudents) {
          let status = 'present';
          let checkInTime = '07:55 AM';
          let remark = '';
          let method = 'manual';

          // Simulate realistic attendance variance
          const isAtRisk = atRiskStudent && st.id === atRiskStudent.id;
          const rand = Math.random();

          if (isAtRisk) {
            if (rand < 0.45) {
              status = 'absent';
              checkInTime = null;
              remark = 'Unexcused absence';
            } else if (rand < 0.65) {
              status = 'late';
              checkInTime = '08:25 AM';
              remark = 'Traffic congestion';
            } else if (rand < 0.75) {
              status = 'excused';
              checkInTime = null;
              remark = 'Family emergency';
            } else {
              status = 'present';
              checkInTime = '07:58 AM';
            }
          } else {
            if (rand < 0.85) {
              status = 'present';
              checkInTime = '07:' + String(45 + Math.floor(Math.random() * 14)).padStart(2, '0') + ' AM';
              method = Math.random() > 0.4 ? 'qr_code' : 'manual';
            } else if (rand < 0.92) {
              status = 'late';
              checkInTime = '08:' + String(5 + Math.floor(Math.random() * 20)).padStart(2, '0') + ' AM';
              remark = 'Arrived late to class';
            } else if (rand < 0.96) {
              status = 'excused';
              checkInTime = null;
              remark = 'Medical note submitted';
            } else {
              status = 'absent';
              checkInTime = null;
              remark = 'Absent without prior notice';
            }
          }

          insertAttendance.run(sessionId, st.id, status, remark, checkInTime, method);
          totalAttendanceCount++;
        }
      }
    }

    console.log(` Created ${dates.length * classes.length} sessions`);
    console.log(` Generated ${totalAttendanceCount} attendance records`);

    // 5. Leave requests
    const insertLeave = db.prepare(`
      INSERT INTO leave_requests (student_id, start_date, end_date, reason, status, approved_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    insertLeave.run(students[0].id, dates[2], dates[3], 'National Hackathon Competition representation', 'approved', 'Dr. Robert Vance');
    insertLeave.run(students[3].id, dates[5], dates[5], 'Medical appointment with physician note', 'approved', 'Dean Office');
    insertLeave.run(students[10].id, dates[8], dates[9], 'Severe fever and recovery', 'approved', 'Prof. Sophea Chan');
    insertLeave.run(students[15].id, dates[dates.length - 1], dates[dates.length - 1], 'Attending sibling graduation ceremony', 'pending', null);

    console.log(' Generated sample leave requests');

    // 6. Staff / Faculty Accounts with secure credentials
    const insertStaff = db.prepare(`
      INSERT INTO staff (staff_id, full_name, email, password_hash, role, department, phone, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStaff.run(
      'STAFF-001',
      'Dr. Robert Vance',
      'r.vance@usea.edu.kh',
      hashPassword('admin123'),
      'admin',
      'Software Engineering',
      '012-888-001',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=RobertVance&backgroundColor=b6e3f4'
    );
    insertStaff.run(
      'STAFF-002',
      'Prof. Sophea Chan',
      's.chan@usea.edu.kh',
      hashPassword('teacher123'),
      'teacher',
      'Computer Science',
      '012-888-002',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=SopheaChan&backgroundColor=c0aede'
    );
    insertStaff.run(
      'STAFF-003',
      'Eng. Alex Seng',
      'a.seng@usea.edu.kh',
      hashPassword('teacher123'),
      'teacher',
      'Information Technology',
      '012-888-003',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexSeng&backgroundColor=d1d4f9'
    );
    insertStaff.run(
      'STAFF-004',
      'Dr. Emily Zhao',
      'e.zhao@usea.edu.kh',
      hashPassword('teacher123'),
      'teacher',
      'Artificial Intelligence',
      '012-888-004',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=EmilyZhao&backgroundColor=ffd5dc'
    );

    console.log(' Created 4 faculty staff accounts');
  });

  console.log('✅ Database successfully seeded and ready!');
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
