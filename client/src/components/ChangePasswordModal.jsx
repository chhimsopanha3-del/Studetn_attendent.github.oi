import React, { useState } from 'react';
import { 
  KeyRound, 
  Lock, 
  ShieldCheck, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Save, 
  Eye, 
  EyeOff,
  User
} from 'lucide-react';
import { api } from '../api';
import { useLanguage } from '../i18n/LanguageContext';

export default function ChangePasswordModal({ isOpen, onClose, currentUser, onSuccess }) {
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Strict validation
    if (!currentPassword.trim()) {
      setErrorMsg(t('staffPasswordRequired'));
      return;
    }

    if (!newPassword.trim()) {
      setErrorMsg('Please enter a new password');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg(t('passwordLengthError'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t('passwordMismatch'));
      return;
    }

    try {
      setLoading(true);
      const staffIdentifier = currentUser?.staff_id || currentUser?.id || currentUser?.email;
      const res = await api.changePassword({
        staff_id: staffIdentifier,
        current_password: currentPassword,
        new_password: newPassword
      });

      if (res.success) {
        setSuccessMsg(t('passwordChangedSuccess'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (onSuccess) {
          onSuccess(t('passwordChangedSuccess'));
        }
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 1800);
      } else {
        setErrorMsg(res.error || 'Failed to change password');
      }
    } catch (err) {
      setErrorMsg('Network error while updating password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 mx-auto flex items-center justify-center mb-3">
            <KeyRound className="w-6 h-6 text-indigo-300" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">{t('changePasswordTitle')}</h3>
          <p className="text-xs text-slate-300 mt-1">{t('changePasswordDesc')}</p>
        </div>

        {/* User Card */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {currentUser?.full_name || currentUser?.name || 'Staff Member'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {currentUser?.staff_id || currentUser?.email || 'STAFF'} • {currentUser?.role || 'Staff'}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            Active
          </span>
        </div>

        {/* Form Body */}
        <div className="p-6">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {t('currentPassword')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showCurrent ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {t('newPassword')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Minimum 6 characters</p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                {t('confirmNewPassword')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer"
              >
                {t('cancelBtn')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-md shadow-indigo-100 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? t('updatingPassword') : t('saveNewPassword')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
