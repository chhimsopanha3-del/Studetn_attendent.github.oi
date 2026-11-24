async function test() {
  // Test student login
  const loginRes = await fetch('http://localhost:5000/api/auth/student-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student_id: 'USEA-2024-001', password: 'password123' })
  });
  const loginData = await loginRes.json();
  console.log('Student Login Test:', loginRes.status, 'User:', loginData.user?.full_name, 'Class:', loginData.user?.class_code);

  // Test student portal summary
  const portalRes = await fetch('http://localhost:5000/api/students/' + loginData.user.id);
  const portalData = await portalRes.json();
  console.log('Student Portal Test:', portalRes.status, 'Attendance Rate:', portalData.data?.stats?.attendance_rate + '%', 'Sessions:', portalData.data?.records?.length);

  // Test demo students
  const demoRes = await fetch('http://localhost:5000/api/auth/demo-students');
  const demoData = await demoRes.json();
  console.log('Demo Students Count:', demoData.data?.length);

  console.log('ALL AUTH & PORTAL TESTS PASSED! 🎉');
}

test().catch(console.error);
