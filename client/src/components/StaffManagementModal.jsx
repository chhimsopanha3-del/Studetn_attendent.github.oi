import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Lock, 
  KeyRound, 
  X, 
  Mail, 
  Building, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Save,
  RotateCcw
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function StaffManagementModal({ isOpen, onClose, currentUser, onToast }) {
  const { t, lang } = useLanguage();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Staff Form State
  const [fullName, setFullName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('teacher');
  const [department, setDepartment] = useState('Information Technology');
  const [phone, setPhone] = useState('012-888-005');
  const [designatedPassword, setDesignatedPassword] = useState('teacher123');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password reset inline state
  const [resettingId, setResettingId] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState('usea2024');

  useEffect(() => {
    if (isOpen) {
      loadStaff();
    }
  }, [isOpen]);

  async function loadStaff() {
    try {
      setLoading(true);
      const res = await api.getStaffList();
      if (res.success) {
        setStaffList(res.data);
        // Auto-generate next staff ID
        const nextNum = (res.data.length + 1).toString().padStart(3, '0');
        setStaffId(`STAFF-${nextNum}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  async function handleCreateStaff(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim() || !staffId.trim() || !email.trim() || !designatedPassword.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    try {
      setSaving(true);
      const res = await api.createStaff({
        staff_id: staffId.trim(),
        full_name: fullName.trim(),
        email: email.trim(),
        role,
        department,
        phone,
        password: designatedPassword.trim()
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setFullName('');
        setEmail('');
        loadStaff();
        setShowAddForm(false);
        if (onToast) onToast(res.message);
      } else {
        setErrorMsg(res.error || 'Failed to create staff account');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to API');
    } finally {
      setSaving(false);
    }
  }

  async function handleSetPassword(staff) {
    if (!newPasswordVal.trim()) return;
    try {
      const res = await api.setStaffPassword({
        staff_id: staff.staff_id,
        new_password: newPasswordVal.trim()
      });
      if (res.success) {
        setResettingId(null);
        if (onToast) onToast(`Password updated for ${staff.full_name}!`);
        loadStaff();
      } else {
        alert(res.error || 'Failed to update password');
      }
    } catch (err) {
      alert('Error updating password');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                {t('staffListTitle')}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {t('staffListDesc')}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200/80 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-medium">
              {t('staffAuthNotice')}
            </span>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer shrink-0 ml-3"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'View List' : t('addNewStaff')}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center space-x-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center space-x-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {showAddForm ? (
            /* Register New Staff Form */
            <form onSubmit={handleCreateStaff} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="font-bold text-slate-800 text-sm">
                  {t('addNewStaff')}
                </h4>
                <span className="text-[10px] text-indigo-600 font-mono bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  Pre-configured Authorization
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Prof. Meng Heng"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Staff ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="e.g. STAFF-005"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Designated University Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. m.heng@usea.edu.kh"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Designated Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designatedPassword}
                    onChange={(e) => setDesignatedPassword(e.target.value)}
                    placeholder="Initial designated password"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Role / Position
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="teacher">Teacher / Instructor</option>
                    <option value="admin">Administrator / Dean</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Information Technology">Information Technology (ព័ត៌មានវិទ្យា)</option>
                    <option value="E-Business Systems">E-Business Systems (ប្រព័ន្ធអាជីវកម្មអេឡិចត្រូនិក)</option>
                    <option value="Computer Science">Computer Science (វិទ្យាសាស្ត្រកុំព្យូទ័រ)</option>
                    <option value="Software Engineering">Software Engineering (វិស្វកម្មសូហ្វវែរ)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-indigo-100 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Registering...' : 'Save Authorized Staff'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Staff Registry Table */
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider font-bold">
                    <th className="p-3">Staff Member</th>
                    <th className="p-3">Staff ID</th>
                    <th className="p-3">Official Email</th>
                    <th className="p-3">Role & Dept</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staffList.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-3">
                        <div className="flex items-center space-x-2.5">
                          <img 
                            src={st.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${st.staff_id}`} 
                            alt="" 
                            className="w-8 h-8 rounded-lg border border-slate-200 bg-white" 
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">{st.full_name}</span>
                            <span className="text-[10px] text-slate-500">{st.phone || 'No phone'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-mono font-bold text-slate-700">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                          {st.staff_id}
                        </span>
                      </td>

                      <td className="p-3 font-mono text-slate-800 font-medium">
                        {st.email}
                      </td>

                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          st.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          {st.role === 'admin' ? 'Administrator' : 'Teacher'}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{st.department}</span>
                      </td>

                      <td className="p-3 text-right">
                        {resettingId === st.id ? (
                          <div className="flex items-center justify-end space-x-1">
                            <input
                              type="text"
                              value={newPasswordVal}
                              onChange={(e) => setNewPasswordVal(e.target.value)}
                              placeholder="New password"
                              className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-lg font-mono"
                            />
                            <button
                              onClick={() => handleSetPassword(st)}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setResettingId(null)}
                              className="px-1.5 py-1 text-slate-400 hover:text-slate-600 text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setResettingId(st.id);
                              setNewPasswordVal('teacher123');
                            }}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] transition cursor-pointer"
                            title="Set/Reset designated password"
                          >
                            <KeyRound className="w-3 h-3 text-indigo-600" />
                            <span>Set Password</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Total Authorized Staff: <strong>{staffList.length}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
