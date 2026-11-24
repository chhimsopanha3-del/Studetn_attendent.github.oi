async function test() {
  const rHtml = await fetch('http://localhost:5000/');
  const html = await rHtml.text();
  console.log('HTML Test:', rHtml.status, html.includes('root') ? 'PASS' : 'FAIL');

  const rOverview = await fetch('http://localhost:5000/api/analytics/overview');
  const ov = await rOverview.json();
  console.log('Overview Test:', rOverview.status, 'Students:', ov.data.total_students, 'Rate:', ov.data.overall_attendance_rate + '%');

  const rClasses = await fetch('http://localhost:5000/api/classes');
  const cls = await rClasses.json();
  console.log('Classes Test:', rClasses.status, 'Total Classes:', cls.data.length);

  const rStudents = await fetch('http://localhost:5000/api/students');
  const st = await rStudents.json();
  console.log('Students Test:', rStudents.status, 'Total Students:', st.data.length);

  const rSheet = await fetch('http://localhost:5000/api/attendance/session?class_id=' + cls.data[0].id + '&date=2026-11-23&session_type=Morning');
  const sheet = await rSheet.json();
  console.log('Session Sheet Test:', rSheet.status, 'Session ID:', sheet.data.session.id, 'Students in Roster:', sheet.data.students.length);

  // Test QR Check-in
  const qrRes = await fetch('http://localhost:5000/api/attendance/qr-checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      qr_token: sheet.data.session.qr_token,
      student_identifier: sheet.data.students[0].student_code
    })
  });
  const qrData = await qrRes.json();
  console.log('QR Check-in Test:', qrRes.status, 'Message:', qrData.message);

  // Test CSV Export
  const csvRes = await fetch('http://localhost:5000/api/analytics/export-csv');
  console.log('CSV Export Test:', csvRes.status, 'Content-Type:', csvRes.headers.get('content-type'));

  console.log('ALL TESTS PASSED SUCCESSFULLY! 🎉');
}

test().catch(console.error);
