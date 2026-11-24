import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Calendar, 
  Clock, 
  BookOpen, 
  Check, 
  X, 
  AlertCircle, 
  Save, 
  Sparkles, 
  CheckCheck,
  UserCheck,
  QrCode,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';
import { api } from '../api';

export default function MarkAttendanceView({ preselectedClassId }) {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(preselectedClassId || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionType, setSessionType] = useState('Morning');
  const [sessionData, setSessionData] = useState(null);
  const [students, setStudents] = useState([]);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Load Classes List
  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await api.getClasses();
        if (res.success && res.data.length > 0) {
          setClasses(res.data);
          if (!selectedClassId) {
            setSelectedClassId(res.data[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    }
    fetchClasses();
  }, []);

  // 2. Load Attendance Sheet when Class, Date, or Session changes
  useEffect(() => {
    if (!selectedClassId || !date) return;
    loadAttendanceSheet();
  }, [selectedClassId, date, sessionType]);

  async function loadAttendanceSheet() {
    try {
      setLoading(true);
      setErrorMsg('');
      setSaveSuccess(false);

      const res = await api.getSessionSheet(selectedClassId, date, sessionType);
      if (res.success) {
        setSessionData(res.data.session);
        setTopic(res.data.session.topic || '');
        setStudents(res.data.students);
      } else {
        setErrorMsg(res.error || 'Failed to load attendance session');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to attendance API');
    } finally {
      setLoading(false);
    }
  }

  // Fast single toggle
  function handleStatusChange(studentId, newStatus) {
    setStudents(prev => prev.map(s => {
      if (s.student_id === studentId) {
        return {
          ...s,
          status: s.status === newStatus ? 'unmarked' : newStatus,
          check_in_time: (newStatus === 'present' || newStatus === 'late') ? (s.check_in_time || 'Just now') : null
        };
      }
      return s;
    }));
  }

  function handleRemarkChange(studentId, remark) {
    setStudents(prev => prev.map(s => {
      if (s.student_id === studentId) {
        return { ...s, remark };
      }
      return s;
    }));
  }

  // Batch actions
  function markAll(status) {
    setStudents(prev => prev.map(s => ({
      ...s,
      status: status,
      check_in_time: (status === 'present' || status === 'late') ? (s.check_in_time || '08:00 AM') : null
    })));
  }

  function resetAll() {
    setStudents(prev => prev.map(s => ({
      ...s,
      status: 'unmarked',
      check_in_time: null
    })));
  }

  // Save all changes to backend
  async function handleSaveSheet() {
    if (!sessionData) return;
    try {
      setSaving(true);
      setErrorMsg('');

      const records = students.map(s => ({
        student_id: s.student_id,
        status: s.status,
        remark: s.remark,
        check_in_time: s.check_in_time,
        method: s.method || 'manual'
      }));

      const res = await api.saveBatchAttendance(sessionData.id, records);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setErrorMsg(res.error || 'Failed to save attendance records');
      }
    } catch (err) {
      setErrorMsg('Error saving attendance records');
    } finally {
      setSaving(false);
    }
  }

  // Compute live counts
  const presentCount = students.filter(s => s.status === 'present').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const excusedCount = students.filter(s => s.status === 'excused').length;
  const unmarkedCount = students.filter(s => s.status === 'unmarked').length;
  const totalCount = students.length || 1;
  const liveRate = Math.round(((presentCount + lateCount * 0.7) / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Class Attendance Roster</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Record, toggle, and finalize daily attendance for course sessions.
          </p>
        </div>

        {sessionData && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
              Session #{sessionData.id}
            </span>
            <button
              onClick={handleSaveSheet}
              disabled={saving}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Sheet'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Session Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        {/* Class Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Class / Course</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name} ({c.room})
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Attendance Date</label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Session Type */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Session Slot</label>
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Morning">Morning (08:00 AM - 11:15 AM)</option>
            <option value="Afternoon">Afternoon (01:00 PM - 04:15 PM)</option>
            <option value="Evening">Evening (05:30 PM - 08:30 PM)</option>
          </select>
        </div>
      </div>

      {/* Live Status Bar & Batch Controls */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Counters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium">
          <span className="text-slate-400">Roster ({students.length}):</span>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{presentCount} Present</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{lateCount} Late</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>{absentCount} Absent</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>{excusedCount} Excused</span>
          </span>
          {unmarkedCount > 0 && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs">
              <span>{unmarkedCount} Unmarked</span>
            </span>
          )}
        </div>

        {/* Batch Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => markAll('present')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll('absent')}
            className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition cursor-pointer"
          >
            Mark All Absent
          </button>
          <button
            onClick={resetAll}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition cursor-pointer border border-slate-700"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Error / Success Alerts */}
      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs flex items-center space-x-2 border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-xs flex items-center space-x-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span className="font-medium">Attendance sheet successfully saved and persisted!</span>
        </div>
      )}

      {/* Students Attendance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading class roster...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No students enrolled in this class</p>
            <p className="text-xs text-slate-400 mt-1">Add students to this class in the Students directory.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Attendance Status</th>
                  <th className="py-3 px-4">Time / Method</th>
                  <th className="py-3 px-4">Remarks / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st, idx) => {
                  const isPresent = st.status === 'present';
                  const isLate = st.status === 'late';
                  const isAbsent = st.status === 'absent';
                  const isExcused = st.status === 'excused';

                  return (
                    <tr 
                      key={st.student_id} 
                      className={`hover:bg-slate-50/70 transition ${
                        isAbsent ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center text-slate-400 font-mono text-xs">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={st.avatar} 
                            alt={st.first_name} 
                            className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50 shrink-0" 
                          />
                          <div>
                            <span className="font-semibold text-slate-900 block">
                              {st.last_name} {st.first_name}
                            </span>
                            <span className="text-[11px] text-slate-400">{st.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 text-xs font-medium">
                        {st.student_code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 space-x-1">
                          {/* Present */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.student_id, 'present')}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                              isPresent 
                                ? 'bg-emerald-600 text-white shadow-xs' 
                                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            Present
                          </button>
                          {/* Late */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.student_id, 'late')}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                              isLate 
                                ? 'bg-amber-500 text-white shadow-xs' 
                                : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
                            }`}
                          >
                            Late
                          </button>
                          {/* Absent */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.student_id, 'absent')}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                              isAbsent 
                                ? 'bg-rose-600 text-white shadow-xs' 
                                : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
                            }`}
                          >
                            Absent
                          </button>
                          {/* Excused */}
                          <button
                            type="button"
                            onClick={() => handleStatusChange(st.student_id, 'excused')}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                              isExcused 
                                ? 'bg-blue-600 text-white shadow-xs' 
                                : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                            }`}
                          >
                            Excused
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        {st.check_in_time ? (
                          <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{st.check_in_time}</span>
                            {st.method === 'qr_code' && (
                              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                QR
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">--</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={st.remark || ''}
                          placeholder="Add note (optional)..."
                          onChange={(e) => handleRemarkChange(st.student_id, e.target.value)}
                          className="w-full max-w-[200px] text-xs px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating Save Footer */}
      {students.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-medium">
            Session rate: <strong className="text-indigo-600">{liveRate}%</strong> | Marked: {students.length - unmarkedCount} of {students.length} students
          </p>
          <button
            onClick={handleSaveSheet}
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Attendance Sheet'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
