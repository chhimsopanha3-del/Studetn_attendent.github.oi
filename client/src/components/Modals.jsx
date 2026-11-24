import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Mail, 
  Phone,
  GraduationCap
} from 'lucide-react';
import { api } from '../api';

// 1. Student Detail & History Modal
export function StudentDetailModal({ studentId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;
    async function fetchDetail() {
      try {
        setLoading(true);
        const res = await api.getStudent(studentId);
        if (res.success) setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [studentId]);

  if (!studentId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Student Academic Profile & Attendance History</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {loading || !data ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-xs font-medium">Loading student history...</p>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6">
            {/* Student Info Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-4">
                <img src={data.avatar} alt="" className="w-14 h-14 rounded-full border border-slate-300 bg-white" />
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{data.last_name} {data.first_name}</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-500 font-mono">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold text-slate-700">
                      {data.student_id}
                    </span>
                    <span>•</span>
                    <span>{data.class_code} - {data.class_name}</span>
                  </div>
                </div>
              </div>

              {/* Attendance Rate Pill */}
              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
                <span className="text-xs text-slate-500 block font-medium">Overall Rate</span>
                <span className={`text-2xl font-bold ${
                  data.stats.attendance_rate >= 80 ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {data.stats.attendance_rate}%
                </span>
              </div>
            </div>

            {/* Quick Summary Numbers */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-xs text-slate-500 block font-medium">Present</span>
                <span className="text-lg font-bold text-emerald-700">{data.stats.present_count}</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-xs text-slate-500 block font-medium">Late</span>
                <span className="text-lg font-bold text-amber-700">{data.stats.late_count}</span>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <span className="text-xs text-slate-500 block font-medium">Absent</span>
                <span className="text-lg font-bold text-rose-700">{data.stats.absent_count}</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-xs text-slate-500 block font-medium">Excused</span>
                <span className="text-lg font-bold text-blue-700">{data.stats.excused_count}</span>
              </div>
            </div>

            {/* Attendance History Timeline */}
            <div>
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-3">
                Session Logs ({data.records.length} Recorded)
              </h5>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {data.records.map((r, i) => {
                  const isP = r.status === 'present';
                  const isL = r.status === 'late';
                  const isA = r.status === 'absent';
                  const isE = r.status === 'excused';

                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white text-xs hover:bg-slate-50 transition">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-slate-500 font-medium">{r.date}</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-700 font-medium">{r.topic || `Session (${r.session_type})`}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        {r.check_in_time && (
                          <span className="text-slate-400 text-[11px] font-mono">{r.check_in_time}</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full font-semibold capitalize ${
                          isP ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          isL ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          isA ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Add Student Modal
export function AddStudentModal({ isOpen, onClose, onCreated, classes }) {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [classId, setClassId] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (classes && classes.length > 0 && !classId) {
      setClassId(classes[0].id);
    }
  }, [classes]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentId || !firstName || !lastName || !email || !classId) return;

    try {
      setSaving(true);
      const res = await api.createStudent({
        student_id: studentId,
        first_name: firstName,
        last_name: lastName,
        gender,
        email,
        phone,
        class_id: classId
      });
      if (res.success) {
        onCreated();
        onClose();
      }
    } catch (err) {
      alert('Failed to create student: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg">Enroll New Student</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Student ID</label>
            <input
              type="text"
              required
              placeholder="e.g. USEA-2024-033"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">First Name</label>
              <input
                type="text"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Last Name</label>
              <input
                type="text"
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Assigned Class</label>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="student@usea.edu.kh"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="012-345-678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 3. Add Class Modal
export function AddClassModal({ isOpen, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [room, setRoom] = useState('Lab 101');
  const [teacherName, setTeacherName] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00 AM - 11:15 AM');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !code || !teacherName) return;

    try {
      setSaving(true);
      const res = await api.createClass({
        name,
        code,
        department,
        room,
        teacher_name: teacherName,
        schedule_time: scheduleTime
      });
      if (res.success) {
        onCreated();
        onClose();
      }
    } catch (err) {
      alert('Failed to create class: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg">Create New Class & Section</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Course Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Distributed Cloud Systems"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Code</label>
              <input
                type="text"
                required
                placeholder="e.g. CS-409"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Instructor / Professor</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Robert Vance"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Room / Lab</label>
              <input
                type="text"
                required
                placeholder="e.g. Lab 304 (Building A)"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Schedule Time</label>
              <input
                type="text"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
