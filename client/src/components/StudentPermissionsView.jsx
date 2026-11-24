import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Trash2, 
  ShieldCheck,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function StudentPermissionsView({ currentUser, onCreated }) {
  const { t } = useLanguage();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Form State
  const [leaveCategory, setLeaveCategory] = useState('medical');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    if (currentUser?.id) {
      loadMyRequests();
    }
  }, [currentUser]);

  async function loadMyRequests() {
    try {
      setLoading(true);
      const res = await api.getLeaveRequests(currentUser.id);
      if (res.success) {
        setRequests(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancelRequest(id) {
    if (!window.confirm(t('confirmedCancel'))) return;

    try {
      const res = await api.deleteLeaveRequest(id);
      if (res.success) {
        setRequests(prev => prev.filter(r => r.id !== id));
        setAlertMsg({ type: 'success', text: 'Leave request withdrawn.' });
        setTimeout(() => setAlertMsg(null), 3000);
      }
    } catch (err) {
      alert('Failed to cancel request');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!reason.trim()) return;

    try {
      setSubmitting(true);
      const categoryPrefix = 
        leaveCategory === 'medical' ? `[${t('medicalLeave')}] ` :
        leaveCategory === 'family' ? `[${t('familyUrgent')}] ` :
        leaveCategory === 'duty' ? `[${t('universityDuty')}] ` : `[${t('officialMission')}] `;

      const fullReason = categoryPrefix + reason.trim();

      const res = await api.submitLeaveRequest({
        student_id: currentUser.id,
        start_date: startDate,
        end_date: endDate,
        reason: fullReason
      });

      if (res.success) {
        setShowApplyModal(false);
        setReason('');
        setAlertMsg({
          type: 'success',
          text: 'Leave permission application submitted! Academic Affairs will review shortly.'
        });
        loadMyRequests();
        if (onCreated) onCreated();
        setTimeout(() => setAlertMsg(null), 4000);
      }
    } catch (err) {
      alert('Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  }

  // Summary counts
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarClock className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t('permissionStatusHub')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {t('permissionStatusDesc')}
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('applyNewPermission')}</span>
        </button>
      </div>

      {/* Alert Notification */}
      {alertMsg && (
        <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 border animate-in fade-in ${
          alertMsg.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{alertMsg.text}</span>
        </div>
      )}

      {/* KPI Cards: Total, Approved, Pending, Rejected */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Total Applications</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{requests.length}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Permissions submitted</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('approvedStatus')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2">{approvedCount}</h3>
          <p className="text-[11px] text-emerald-700 mt-0.5">Excused & no penalty</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('pendingStatus')}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-amber-600 mt-2">{pendingCount}</h3>
          <p className="text-[11px] text-amber-700 mt-0.5">Under faculty review</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">{t('rejectedStatus')}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{rejectedCount}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Unexcused requests</p>
        </div>
      </div>

      {/* Permissions Tracking Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t('myPermissions')}</h3>
            <p className="text-xs text-slate-500">Track permission review history and faculty feedback</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
            {currentUser.student_id}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading permissions...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CalendarClock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700">No leave requests submitted yet</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Whenever you need to take sick leave or attend university events, click "Apply for Leave Permission" above.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {requests.map((r) => {
              const isApproved = r.status === 'approved';
              const isPending = r.status === 'pending';
              const isRejected = r.status === 'rejected';

              return (
                <div key={r.id} className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        isApproved 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : isPending 
                          ? 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse' 
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {isApproved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {isPending && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                        {isRejected && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        <span>
                          {isApproved ? t('approvedStatus') : isPending ? t('pendingStatus') : t('rejectedStatus')}
                        </span>
                      </span>

                      <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {r.start_date} {r.start_date !== r.end_date ? `→ ${r.end_date}` : ''}
                      </span>

                      <span className="text-[11px] text-slate-400">
                        Submitted: {new Date(r.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 mt-1">
                      {r.reason}
                    </p>

                    {r.approved_by && (
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t('reviewedBy')}: <strong className="text-slate-700">{r.approved_by}</strong></span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 self-start md:self-center">
                    {isPending && (
                      <button
                        onClick={() => handleCancelRequest(r.id)}
                        className="inline-flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition cursor-pointer font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t('cancelPendingRequest')}</span>
                      </button>
                    )}
                    {isApproved && (
                      <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Excused from Class ✓
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-95">
            <h3 className="font-bold text-slate-900 text-lg mb-1">{t('applyNewPermission')}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Submit your absence note to your instructor and faculty administration for approval.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  {t('leaveCategory')}
                </label>
                <select
                  value={leaveCategory}
                  onChange={(e) => setLeaveCategory(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="medical">🏥 {t('medicalLeave')}</option>
                  <option value="family">👨‍👩‍👧 {t('familyUrgent')}</option>
                  <option value="duty">🏆 {t('universityDuty')}</option>
                  <option value="official">📋 {t('officialMission')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    {t('startDateLabel')}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    {t('endDateLabel')}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  {t('reasonLabel')}
                </label>
                <textarea
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide reason, physician name, or event details..."
                  required
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  {t('cancelBtn')}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-100 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? t('savingBtn') : t('submitRequestBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
