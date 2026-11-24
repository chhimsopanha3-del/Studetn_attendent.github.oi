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
  Info,
  Printer,
  X,
  Filter,
  ShieldCheck,
  CalendarClock
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function StudentPortalView({ currentUser, onOpenCheckin, onOpenPermissions }) {
  const { t } = useLanguage();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quickCode, setQuickCode] = useState('');
  const [checkinMessage, setCheckinMessage] = useState(null);
  const [submittingCheckin, setSubmittingCheckin] = useState(false);

  // Status Filter for personal attendance: 'all' | 'present' | 'late' | 'absent' | 'excused'
  const [statusFilter, setStatusFilter] = useState('all');

  // Print Certificate Modal
  const [showCertificate, setShowCertificate] = useState(false);

  // Leave Request Form State
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveCategory, setLeaveCategory] = useState('medical');
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
      const categoryPrefix = 
        leaveCategory === 'medical' ? `[${t('medicalLeave')}] ` :
        leaveCategory === 'family' ? `[${t('familyUrgent')}] ` :
        leaveCategory === 'duty' ? `[${t('universityDuty')}] ` : `[${t('officialMission')}] `;

      const res = await api.submitLeaveRequest({
        student_id: currentUser.id,
        start_date: leaveStart,
        end_date: leaveEnd,
        reason: categoryPrefix + leaveReason.trim()
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
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const { stats, records, leave_requests } = studentData;
  const isAtRisk = stats.attendance_rate < 75;

  // Filter records based on selected filter
  const filteredRecords = records.filter(r => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

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
                {t('welcomeBack')}, {currentUser.first_name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {currentUser.department} • University of South-East Asia (USEA)
              </p>

              {/* Quick Actions in Banner */}
              <div className="flex flex-wrap gap-2.5 mt-4">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('printStatement')}</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('permissions-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>{t('myPermissions')} ({leave_requests?.length || 0})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Rate Pill in Banner */}
          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15 flex items-center space-x-4 self-start md:self-auto">
            <div>
              <span className="text-xs text-slate-300 block font-medium">{t('overallAttendanceLabel')}</span>
              <span className={`text-3xl font-extrabold ${
                !isAtRisk ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {stats.attendance_rate}%
              </span>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div>
              <span className="text-[11px] text-slate-300 block">{t('statusStandingLabel')}</span>
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                !isAtRisk 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
              }`}>
                {!isAtRisk ? t('goodStanding') : t('atRisk')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter(statusFilter === 'present' ? 'all' : 'present')}
          className={`bg-white p-4 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'present' ? 'ring-2 ring-emerald-500 border-emerald-500 shadow-md' : 'border-slate-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('present')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.present_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{t('classesAttendedOnTime')}</p>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'late' ? 'all' : 'late')}
          className={`bg-white p-4 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'late' ? 'ring-2 ring-amber-500 border-amber-500 shadow-md' : 'border-slate-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('late')}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.late_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{t('tardyArrivals')}</p>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'absent' ? 'all' : 'absent')}
          className={`bg-white p-4 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'absent' ? 'ring-2 ring-rose-500 border-rose-500 shadow-md' : 'border-slate-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('absent')}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <h3 className={`text-2xl font-bold ${stats.absent_count > 2 ? 'text-rose-600' : 'text-slate-900'} mt-2`}>
            {stats.absent_count}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{t('unexcusedMisses')}</p>
        </div>

        <div 
          onClick={() => setStatusFilter(statusFilter === 'excused' ? 'all' : 'excused')}
          className={`bg-white p-4 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'excused' ? 'ring-2 ring-blue-500 border-blue-500 shadow-md' : 'border-slate-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('excused')}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{stats.excused_count}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{t('approvedLeaves')}</p>
        </div>
      </div>

      {/* Main Grid: Today's Live Check-in & Course Info */}
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
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('todaySelfCheckinTitle')}</h3>
                  <p className="text-xs text-slate-500">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {t('morningSlot').slice(0, 9)}
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
                  {t('enterQrLabel')}
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
                    <span>{submittingCheckin ? t('verifyingBtn') : t('checkInBtn')}</span>
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
            {t('scanInstructions')}
          </p>
        </div>

        {/* Right: Enrolled Class Details & Leave Request CTA */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('courseInfoTitle')}</h3>
              <button
                onClick={() => setShowLeaveForm(!showLeaveForm)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('applyNewPermission')}</span>
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
                <h4 className="text-xs font-bold uppercase text-slate-700">{t('submitLeaveTitle')}</h4>
                
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">{t('leaveCategory')}</label>
                  <select
                    value={leaveCategory}
                    onChange={(e) => setLeaveCategory(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                  >
                    <option value="medical">🏥 {t('medicalLeave')}</option>
                    <option value="family">👨‍👩‍👧 {t('familyUrgent')}</option>
                    <option value="duty">🏆 {t('universityDuty')}</option>
                    <option value="official">📋 {t('officialMission')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">{t('startDateLabel')}</label>
                    <input
                      type="date"
                      value={leaveStart}
                      onChange={(e) => setLeaveStart(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 block mb-1">{t('endDateLabel')}</label>
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
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">{t('reasonLabel')}</label>
                  <textarea
                    rows="2"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    required
                    placeholder="..."
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowLeaveForm(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    {t('cancelBtn')}
                  </button>
                  <button
                    type="submit"
                    disabled={leaveSubmitting}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                  >
                    {leaveSubmitting ? t('savingBtn') : t('submitRequestBtn')}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-3 text-xs text-slate-600">
                <div className="flex items-center space-x-2.5">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t('leadInstructor')}: <strong className="text-slate-800">{currentUser.teacher_name}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t('classroomLab')}: <strong className="text-slate-800">{currentUser.room}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t('scheduleTimeLabel')}: <strong className="text-slate-800">{currentUser.schedule_time}</strong></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{t('academicYearLabel')}: <strong className="text-slate-800">2024-2025 (Semester 1)</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Approved leave counts as <strong>Excused (គ្មានការកាត់ពិន្ទុ)</strong></span>
            <button
              onClick={() => setShowCertificate(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('printStatement')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Permissions / Leave Requests Section */}
      <div id="permissions-section" className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <CalendarClock className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('myPermissions')}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t('permissionStatusDesc')}</p>
          </div>

          <button
            onClick={() => setShowLeaveForm(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('applyNewPermission')}</span>
          </button>
        </div>

        {leave_requests && leave_requests.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {leave_requests.map((lr) => {
              const isApproved = lr.status === 'approved';
              const isPending = lr.status === 'pending';
              const isRejected = lr.status === 'rejected';

              return (
                <div key={lr.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        isPending ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' :
                        'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {isPending && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                        {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        <span>{isApproved ? t('approvedStatus') : isPending ? t('pendingStatus') : t('rejectedStatus')}</span>
                      </span>

                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                        {lr.start_date} {lr.start_date !== lr.end_date ? `→ ${lr.end_date}` : ''}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">{lr.reason}</p>
                    
                    {lr.approved_by && (
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('reviewedBy')}: <strong className="text-slate-700">{lr.approved_by}</strong></span>
                      </p>
                    )}
                  </div>

                  {isApproved && (
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 self-start sm:self-auto">
                      Excused from Attendance ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No permissions submitted yet.
          </div>
        )}
      </div>

      {/* Attendance History Timeline Table with Status Filtering */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('myCompleteHistory')}</h3>
            <p className="text-xs text-slate-500">{t('historyDesc')}</p>
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
            <span className="text-slate-400 mr-1 flex items-center space-x-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                statusFilter === 'all' 
                  ? 'bg-slate-900 text-white font-bold' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t('filterAll')} ({records.length})
            </button>
            <button
              onClick={() => setStatusFilter('present')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                statusFilter === 'present' 
                  ? 'bg-emerald-600 text-white font-bold' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {t('present')} ({stats.present_count})
            </button>
            <button
              onClick={() => setStatusFilter('late')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                statusFilter === 'late' 
                  ? 'bg-amber-600 text-white font-bold' 
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {t('late')} ({stats.late_count})
            </button>
            <button
              onClick={() => setStatusFilter('absent')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                statusFilter === 'absent' 
                  ? 'bg-rose-600 text-white font-bold' 
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              {t('absent')} ({stats.absent_count})
            </button>
            <button
              onClick={() => setStatusFilter('excused')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                statusFilter === 'excused' 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              {t('excused')} ({stats.excused_count})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Topic / Session</th>
                <th className="py-3 px-4 text-center">{t('statusCol')}</th>
                <th className="py-3 px-4">Check-in Time</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">{t('remarksCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No sessions match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r, idx) => {
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
                          <span>{isP ? t('present') : isL ? t('late') : isA ? t('absent') : t('excused')}</span>
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Attendance & Permission Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95">
            <button 
              onClick={() => setShowCertificate(false)}
              className="absolute right-5 top-5 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* University Letterhead Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900">
              <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-700 block mb-1">
                Kingdom of Cambodia • Nation Religion King
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                UNIVERSITY OF SOUTH-EAST ASIA (USEA)
              </h2>
              <p className="text-xs text-slate-500">Department of Academic Affairs & Student Records • Siem Reap Campus</p>
              
              <div className="mt-4 inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-slate-300">
                {t('statementTitle')}
              </div>
            </div>

            {/* Student Info Details */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-200 text-xs">
              <div>
                <p className="text-slate-400 uppercase text-[10px] font-semibold">Student Name:</p>
                <p className="font-bold text-slate-900 text-sm">{currentUser.full_name}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-[10px] font-semibold">Student ID (អត្តលេខ):</p>
                <p className="font-mono font-bold text-slate-900 text-sm">{currentUser.student_id}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-[10px] font-semibold">Enrolled Course:</p>
                <p className="font-semibold text-slate-800">{currentUser.class_code} - {currentUser.class_name}</p>
              </div>
              <div>
                <p className="text-slate-400 uppercase text-[10px] font-semibold">Academic Term:</p>
                <p className="font-semibold text-slate-800">2024-2025 (Semester 1)</p>
              </div>
            </div>

            {/* Attendance Standing Metrics */}
            <div className="py-6 border-b border-slate-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">Attendance Standing Breakdown</h4>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Sessions</span>
                  <span className="text-lg font-bold text-slate-900">{stats.total_sessions}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[11px] text-emerald-700 block">Present</span>
                  <span className="text-lg font-bold text-emerald-800">{stats.present_count}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-[11px] text-blue-700 block">Excused (Permissions)</span>
                  <span className="text-lg font-bold text-blue-800">{stats.excused_count}</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <span className="text-[11px] text-indigo-700 block">Overall Score</span>
                  <span className="text-lg font-bold text-indigo-900">{stats.attendance_rate}%</span>
                </div>
              </div>
            </div>

            {/* Permissions Summary Note */}
            <div className="py-4 text-xs text-slate-600">
              <p>
                <strong>Official Note:</strong> This document certifies that student <u>{currentUser.full_name}</u> ({currentUser.student_id}) maintains an attendance rate of <strong>{stats.attendance_rate}%</strong> with <strong>{stats.excused_count}</strong> approved leave permissions recorded by the faculty.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 flex items-center justify-between text-center text-xs text-slate-600">
              <div>
                <p className="text-[11px] text-slate-400">Date Issued:</p>
                <p className="font-mono font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <div className="w-16 h-16 border-2 border-indigo-900 rounded-full flex items-center justify-center mx-auto text-[9px] font-bold text-indigo-900 uppercase p-1 leading-tight rotate-12">
                  USEA ACADEMIC SEAL
                </div>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Office of the Dean:</p>
                <p className="font-bold text-slate-800">Dr. Robert Vance</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
