import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  QrCode, 
  FileText, 
  MapPin, 
  User, 
  Plus, 
  Send,
  Sparkles,
  Download,
  Info
} from 'lucide-react';
import { api } from '../api';

export default function StudentPortalView({ currentUser, onOpenCheckin }) {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quickCode, setQuickCode] = useState('');
  const [checkinMessage, setCheckinMessage] = useState(null);
  const [submittingCheckin, setSubmittingCheckin] = useState(false);

  // Leave Request Form State
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveStart, setLeaveStart] = useState(new Date().toISOString().split('T')[0]);
  const [leaveEnd, setLeaveEnd] = useState(new Date().toISOString().split('T')[0]);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSubmitting, setLeaveSubmitting] = useState(false);
  const [leaveSuccess, setLeaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser?.id) {
      loadStudentPortal();
    }
  }, [currentUser]);

  async function loadStudentPortal() {
    try {
      setLoading(true);
      const res = await api.getStudent(currentUser.id);
      if (res.success) {
        setStudentData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Handle direct QR or manual check-in
  async function handleQuickCheckin(e) {
    if (e) e.preventDefault();
    const token = quickCode.trim() || `ATT-${currentUser.class_code}-${new Date().toISOString().split('T')[0]}-Morning`;

    try {
      setSubmittingCheckin(true);
      setCheckinMessage(null);
      const res = await api.qrCheckIn(token, currentUser.student_id);
      
      if (res.success) {
        setCheckinMessage({
          type: 'success',
          text: res.message
        });
        setQuickCode('');
        loadStudentPortal();
      } else {
        setCheckinMessage({
          type: 'error',
          text: res.error || 'Check-in failed'
        });
      }
    } catch (err) {
      setCheckinMessage({
        type: 'error',
        text: 'Error submitting check-in'
      });
    } finally {
      setSubmittingCheckin(false);
    }
  }

  // Handle student leave submission
  async function handleLeaveSubmit(e) {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    try {
      setLeaveSubmitting(true);
      const res = await api.submitLeaveRequest({
        student_id: currentUser.id,
        start_date: leaveStart,
        end_date: leaveEnd,
        reason: leaveReason.trim()
      });

      if (res.success) {
        setLeaveSuccess(true);
        setLeaveReason('');
        setShowLeaveForm(false);
        loadStudentPortal();
        setTimeout(() => setLeaveSuccess(false), 4000);
      }
    } catch (err) {
      alert('Failed to submit leave request');
    } finally {
      setLeaveSubmitting(false);
    }
  }

  if (loading || !studentData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Loading your student portal...</p>
        </div>
      </div>
    );
  }

  const { stats, records, leave_requests, today_session } = studentData;
  const isAtRisk = stats.attendance_rate < 75;

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
          <GraduationCap className="w-56 h-56" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.first_name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-indigo-400/40 bg-white shadow-lg shrink-0" 
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold border border-indigo-400/30 font-mono">
                  {currentUser.student_id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-medium">
                  {currentUser.class_code} • {currentUser.class_name}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {currentUser.first_name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {currentUser.department} • University of South-East Asia (USEA)
              </p>
            </div>
          </div>

          {/* Quick Rate Pill in Banner */}
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 flex items-center space-x-4 self-start md:self-auto">
            <div>
              <span className="text-xs text-slate-300 block font-medium">Overall Attendance</span>
              <span className={`text-3xl font-extrabold ${
                !isAtRisk ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stats.attendance_rate}%
              </span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div>
              <span className="text-[11px] text-slate-300 block">Status Standing:</span>
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                !isAtRisk 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
              }`}>
                {!isAtRisk ? 'Good Standing' : 'At-Risk (<75%)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Present</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.present_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Classes attended on time</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Late</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.late_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Tardy arrivals</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Absent</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${stats.absent_count > 2 ? 'text-rose-600' : 'text-slate-900'} mt-2`}>
            {stats.absent_count}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Unexcused misses</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Excused</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.excused_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Approved medical/leave</p>
        </div>
      </div>

      {/* Main Grid: Today's Self Check-in & Course Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Live Check-in Station */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <QrCode className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Today's Class Self Check-in</h3>
                  <p className="text-xs text-slate-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Morning Slot
              </span>
            </div>

            {/* Check-in Status */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{currentUser.class_name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{currentUser.room} • {currentUser.schedule_time}</p>
                </div>
                <span className="text-xs font-mono font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                  {currentUser.class_code}
                </span>
              </div>

              {/* Instant Check-in Action */}
              <form onSubmit={handleQuickCheckin} className="mt-4 space-y-2">
                <label className="block text-xs font-semibold text-slate-600">
                  Enter Session QR Token or 1-Click Check In:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value)}
                    placeholder={`e.g. ATT-${currentUser.class_code}-...`}
                    className="flex-1 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submittingCheckin}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition disabled:opacity-50 cursor-pointer flex items-center space-x-1"
                  >
                    <span>{submittingCheckin ? 'Verifying...' : 'Check In'}</span>
                  </button>
                </div>
              </form>

              {checkinMessage && (
                <div className={`mt-3 p-3 rounded-xl text-xs flex items-center space-x-2 border ${
                  checkinMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {checkinMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-medium">{checkinMessage.text}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 text-center">
            You can also scan the projector screen in class using your smartphone camera.
          </p>
        </div>

        {/* Right: Enrolled Class Details & Leave Request CTA */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Course Information</h3>
              <button
                onClick={() => setShowLeaveForm(!showLeaveForm)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Request Leave</span>
              </button>
            </div>

            {/* Leave Success Notification */}
            {leaveSuccess && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center space-x-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Leave request submitted for academic approval!</span>
              </div>
            )}

            {/* Inline Leave Request Form */}
            {showLeaveForm ? (
              <form onSubmit={handleLeaveSubmit} className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-700">Submit Excused Absence Request</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">Start Date</label>
                    <input
                      type="date"
                      value={leaveStart}
                      onChange={(e) => setLeaveStart(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">End Date</label>
                    <input
                      type="date"
                      value={leaveEnd}
                      onChange={(e) => setLeaveEnd(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Reason (Medical / Official)</label>
                  <textarea
                    rows="2"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    required
                    placeholder="Describe reason for leave..."
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowLeaveForm(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={leaveSubmitting}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                  >
                    {leaveSubmitting ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-3 text-xs text-slate-600">
                <div className="flex items-center space-x-2.5">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Lead Instructor: <strong className="text-slate-800">{currentUser.teacher_name}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Classroom / Lab: <strong className="text-slate-800">{currentUser.room}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Schedule: <strong className="text-slate-800">{currentUser.schedule_time}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Academic Term: <strong className="text-slate-800">2024-2025 (Semester 1)</strong></span>
                </div>
              </div>
            )}
          </div>

          {/* Leave Requests Log */}
          {leave_requests && leave_requests.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block mb-2">My Leave Requests:</span>
              <div className="space-y-1.5">
                {leave_requests.map((lr) => (
                  <div key={lr.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <span className="font-semibold text-slate-800">{lr.reason}</span>
                      <span className="text-slate-400 block text-[11px] font-mono">{lr.start_date} → {lr.end_date}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      lr.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      lr.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {lr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attendance History Timeline Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">My Complete Attendance History</h3>
            <p className="text-xs text-slate-500">Chronological audit log of all recorded lectures and lab sessions</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
            {records.length} Recorded Sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Topic / Session</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Check-in Time</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Teacher Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((r, idx) => {
                const isP = r.status === 'present';
                const isL = r.status === 'late';
                const isA = r.status === 'absent';
                const isE = r.status === 'excused';

                return (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {r.date}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      <span className="font-semibold block">{r.topic || `Lecture Session (${r.session_type})`}</span>
                      <span className="text-[11px] text-slate-400">{r.session_type} Session</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${
                        isP ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        isL ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        isA ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {isP && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {isL && <Clock className="w-3 h-3 text-amber-600" />}
                        {isA && <XCircle className="w-3 h-3 text-rose-600" />}
                        <span>{r.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-600">
                      {r.check_in_time || '--'}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {r.method === 'qr_code' ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 text-[10px]">
                          <QrCode className="w-3 h-3" />
                          <span>QR Scan</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 capitalize">{r.method || 'Manual'}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs italic">
                      {r.remark || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
