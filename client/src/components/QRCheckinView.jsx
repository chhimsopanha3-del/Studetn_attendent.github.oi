import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Smartphone, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { api } from '../api';

export default function QRCheckinView() {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [sessionType, setSessionType] = useState('Morning');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [qrToken, setQrToken] = useState('');
  const [recentCheckins, setRecentCheckins] = useState([]);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [checkinStatus, setCheckinStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const res = await api.getClasses();
        if (res.success && res.data.length > 0) {
          setClasses(res.data);
          setSelectedClassId(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (!selectedClassId) return;
    loadClassAndSession();
  }, [selectedClassId, sessionType, date]);

  async function loadClassAndSession() {
    try {
      const cls = classes.find(c => String(c.id) === String(selectedClassId));
      const code = cls ? cls.code : 'CLS';
      const token = `ATT-${code}-${date}-${sessionType}`;
      setQrToken(token);

      // Load session sheet to see current checked-in students
      const res = await api.getSessionSheet(selectedClassId, date, sessionType);
      if (res.success) {
        setClassStudents(res.data.students);
        const checkedIn = res.data.students.filter(s => s.status === 'present');
        setRecentCheckins(checkedIn);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCheckin(identifier) {
    const idToUse = identifier || studentIdInput.trim();
    if (!idToUse) return;

    try {
      setLoading(true);
      setCheckinStatus(null);
      const res = await api.qrCheckIn(qrToken, idToUse);
      
      if (res.success) {
        setCheckinStatus({
          type: 'success',
          message: res.message,
          student: res.student,
          time: res.check_in_time || 'Just now'
        });
        setStudentIdInput('');
        loadClassAndSession(); // refresh live list
      } else {
        setCheckinStatus({
          type: 'error',
          message: res.error || 'Check-in failed. Please verify student ID.'
        });
      }
    } catch (err) {
      setCheckinStatus({
        type: 'error',
        message: 'Network error connecting to check-in server.'
      });
    } finally {
      setLoading(false);
    }
  }

  const selectedClass = classes.find(c => String(c.id) === String(selectedClassId));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <QrCode className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">QR Code Self Check-in Station</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Display this QR code in class or project it on screen for fast, contactless student attendance.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
            ))}
          </select>

          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Projector QR on Left, Student Kiosk Scanner on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Projector Display */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4 border border-emerald-200 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live Session Active</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {selectedClass?.name || 'Class Attendance'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {selectedClass?.code} • {selectedClass?.room} • Teacher: {selectedClass?.teacher_name}
          </p>

          {/* High Visibility Dynamic QR Code Card */}
          <div className="my-6 p-6 bg-white rounded-2xl border-4 border-slate-900 shadow-xl inline-block relative group">
            {/* SVG Visual QR Matrix Representation */}
            <div className="w-56 h-56 bg-slate-950 p-3 rounded-xl flex flex-col justify-between items-center text-white relative">
              {/* Corner Position Detection Patterns */}
              <div className="w-full flex justify-between">
                <div className="w-12 h-12 border-4 border-white bg-slate-950 p-1.5 flex items-center justify-center">
                  <div className="w-5 h-5 bg-white"></div>
                </div>
                <div className="w-12 h-12 border-4 border-white bg-slate-950 p-1.5 flex items-center justify-center">
                  <div className="w-5 h-5 bg-white"></div>
                </div>
              </div>

              {/* Center Logo & Pattern */}
              <div className="flex flex-col items-center justify-center my-auto space-y-1">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-300">
                  {selectedClass?.code || 'ATT'}
                </span>
              </div>

              {/* Bottom Pattern */}
              <div className="w-full flex justify-between items-end">
                <div className="w-12 h-12 border-4 border-white bg-slate-950 p-1.5 flex items-center justify-center">
                  <div className="w-5 h-5 bg-white"></div>
                </div>
                <div className="flex space-x-1 mb-1">
                  <div className="w-2 h-2 bg-indigo-400"></div>
                  <div className="w-2 h-2 bg-white"></div>
                  <div className="w-2 h-2 bg-indigo-400"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] font-mono text-slate-500 block">Session Token:</span>
              <span className="text-xs font-mono font-bold text-slate-900">{qrToken}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 max-w-sm">
            Scan using phone camera or type your Student ID in the check-in station beside.
          </p>
        </div>

        {/* Right: Student Self Check-in Kiosk / Simulator */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Check-in Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Student Self Check-in Terminal</h3>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckin();
              }} 
              className="mt-4 space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Enter Student ID or Scan Barcode
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    placeholder="e.g. USEA-2024-001"
                    className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={loading || !studentIdInput.trim()}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Checking...' : 'Check In'}
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              {checkinStatus && (
                <div className={`p-3.5 rounded-xl text-xs flex items-start space-x-2.5 border ${
                  checkinStatus.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {checkinStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{checkinStatus.message}</p>
                    {checkinStatus.student && (
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        {checkinStatus.student.student_id} • {checkinStatus.time}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Check-in Chips for Testing Demo */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-2">
                  1-Click Test Simulation (Click any student):
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-slate-200">
                  {classStudents.map(st => {
                    const isDone = st.status === 'present';
                    return (
                      <button
                        key={st.student_id}
                        type="button"
                        onClick={() => handleCheckin(st.student_code)}
                        className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition cursor-pointer flex items-center space-x-1 ${
                          isDone 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        <span>{st.last_name} {st.first_name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* Live Check-in Feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-slate-900 text-sm">Real-time Check-ins</h4>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {recentCheckins.length} Present
              </span>
            </div>

            <div className="mt-3 divide-y divide-slate-100 max-h-56 overflow-y-auto">
              {recentCheckins.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No check-ins yet for this session.</p>
              ) : (
                recentCheckins.map((s, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <img src={s.avatar} alt="" className="w-6 h-6 rounded-full bg-slate-100" />
                      <div>
                        <span className="font-semibold text-slate-800">{s.last_name} {s.first_name}</span>
                        <span className="text-slate-400 block text-[10px] font-mono">{s.student_code}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-600 font-semibold text-[11px]">Present</span>
                      <span className="text-slate-400 block text-[10px]">{s.check_in_time || '08:00 AM'}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
