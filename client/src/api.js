const API_BASE = '/api';

export const api = {
  // Analytics
  getOverview: () => fetch(`${API_BASE}/analytics/overview`).then(r => r.json()),
  getTrends: (days = 14) => fetch(`${API_BASE}/analytics/trends?days=${days}`).then(r => r.json()),
  getClassComparison: () => fetch(`${API_BASE}/analytics/class-comparison`).then(r => r.json()),
  getAtRisk: () => fetch(`${API_BASE}/analytics/at-risk`).then(r => r.json()),
  getExportCsvUrl: (classId = '') => `${API_BASE}/analytics/export-csv${classId ? `?class_id=${classId}` : ''}`,

  // Classes
  getClasses: () => fetch(`${API_BASE}/classes`).then(r => r.json()),
  getClass: (id) => fetch(`${API_BASE}/classes/${id}`).then(r => r.json()),
  createClass: (data) => fetch(`${API_BASE}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateClass: (id, data) => fetch(`${API_BASE}/classes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  deleteClass: (id) => fetch(`${API_BASE}/classes/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Students
  getStudents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/students${query ? `?${query}` : ''}`).then(r => r.json());
  },
  getStudent: (id) => fetch(`${API_BASE}/students/${id}`).then(r => r.json()),
  createStudent: (data) => fetch(`${API_BASE}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateStudent: (id, data) => fetch(`${API_BASE}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  deleteStudent: (id) => fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' }).then(r => r.json()),

  // Attendance
  getSessionSheet: (classId, date, sessionType = 'Morning') => 
    fetch(`${API_BASE}/attendance/session?class_id=${classId}&date=${date}&session_type=${encodeURIComponent(sessionType)}`).then(r => r.json()),
  saveBatchAttendance: (sessionId, records) => fetch(`${API_BASE}/attendance/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, records })
  }).then(r => r.json()),
  markSingleAttendance: (data) => fetch(`${API_BASE}/attendance/mark-single`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  qrCheckIn: (qrToken, studentIdentifier) => fetch(`${API_BASE}/attendance/qr-checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qr_token: qrToken, student_identifier: studentIdentifier })
  }).then(r => r.json()),

  // Leave Requests
  getLeaveRequests: () => fetch(`${API_BASE}/leave`).then(r => r.json()),
  submitLeaveRequest: (data) => fetch(`${API_BASE}/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateLeaveStatus: (id, status, approvedBy) => fetch(`${API_BASE}/leave/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, approved_by: approvedBy })
  }).then(r => r.json()),

  // System
  reseedDatabase: () => fetch(`${API_BASE}/system/reseed`, { method: 'POST' }).then(r => r.json())
};
