import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  User,
  GraduationCap
} from 'lucide-react';
import { api } from '../api';

export default function LeaveView() {
  const [requests, setRequests] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form State
  const [studentId, setStudentId] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [lRes, sRes] = await Promise.all([
        api.getLeaveRequests(),
        api.getStudents()
      ]);
      if (lRes.success) setRequests(lRes.data);
      if (sRes.success) {
        setStudents(sRes.data);
        if (sRes.data.length > 0) setStudentId(sRes.data[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(id, newStatus) {
    try {
      const res = await api.updateLeaveStatus(id, newStatus, 'Academic Affairs Office');
      if (res.success) {
        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, approved_by: 'Academic Affairs Office' } : r));
      }
    } catch (err) {
      alert('Failed to update leave request status');
    }
  }

  async function handleSubmitLeave(e) {
    e.preventDefault();
    if (!studentId || !startDate || !endDate || !reason.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.submitLeaveRequest({
        student_id: studentId,
        start_date: startDate,
        end_date: endDate,
        reason: reason.trim()
      });
      if (res.success) {
        setShowSubmitModal(false);
        setReason('');
        loadData();
      }
    } catch (err) {
      alert('Failed to submit leave request');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarClock className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Student Leave & Absence Requests</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage excused leave permissions, medical notes, and official university representation absences.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Leave Request</span>
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-2">
            <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CalendarClock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No leave requests recorded</p>
            <p className="text-xs text-slate-400 mt-1">Submitted student leaves will appear here for academic review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Date Range</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((r) => {
                  const isApproved = r.status === 'approved';
                  const isPending = r.status === 'pending';
                  const isRejected = r.status === 'rejected';

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img src={r.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-200 bg-slate-50" />
                          <div>
                            <span className="font-semibold text-slate-900 block">{r.last_name} {r.first_name}</span>
                            <span className="text-xs text-slate-400 font-mono">{r.student_code}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800">{r.class_code}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs font-mono">
                        {r.start_date} {r.start_date !== r.end_date && `→ ${r.end_date}`}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                        <p className="text-xs line-clamp-2">{r.reason}</p>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isApproved 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : isPending 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {isApproved && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {isPending && <Clock className="w-3 h-3 text-amber-600" />}
                          {isRejected && <XCircle className="w-3 h-3 text-rose-600" />}
                          <span className="capitalize">{r.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {isPending ? (
                          <div className="inline-flex space-x-1.5">
                            <button
                              onClick={() => handleStatusUpdate(r.id, 'approved')}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md transition cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(r.id, 'rejected')}
                              className="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md transition cursor-pointer"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            By {r.approved_by || 'Officer'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submit Leave Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Submit Student Leave Request</h3>
            
            <form onSubmit={handleSubmitLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Student</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.student_id} - {s.last_name} {s.first_name} ({s.class_code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Reason / Notes</label>
                <textarea
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide details for official leave approval..."
                  required
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
