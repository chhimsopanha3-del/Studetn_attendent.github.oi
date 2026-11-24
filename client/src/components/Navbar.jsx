import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  QrCode, 
  Users, 
  GraduationCap, 
  FileSpreadsheet, 
  CalendarClock, 
  RefreshCw, 
  Clock,
  Sparkles,
  School,
  LogIn,
  LogOut,
  UserCheck,
  ShieldCheck,
  User,
  Languages,
  KeyRound
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onReseed, 
  isReseeding, 
  currentUser, 
  onOpenLogin,
  onLogout,
  onOpenChangePassword
}) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isStudent = currentUser?.role === 'student';

  // Navigation Items per role using localized labels
  const facultyNavItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'mark', label: t('markAttendance'), icon: ClipboardCheck },
    { id: 'qr', label: t('qrStation'), icon: QrCode },
    { id: 'students', label: t('students'), icon: Users },
    { id: 'classes', label: t('classes'), icon: GraduationCap },
    { id: 'reports', label: t('reports'), icon: FileSpreadsheet },
    { id: 'leave', label: t('leaveRequests'), icon: CalendarClock },
  ];

  const studentNavItems = [
    { id: 'my-portal', label: t('myPortal'), icon: GraduationCap },
    { id: 'qr', label: t('qrSelfCheckin'), icon: QrCode },
    { id: 'leave', label: t('leaveRequests'), icon: CalendarClock },
  ];

  const currentNavItems = isStudent ? studentNavItems : facultyNavItems;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab(isStudent ? 'my-portal' : 'dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">{t('brandTitle')}</span>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                  isStudent 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  {isStudent ? t('studentPortalBadge') : t('facultyAdminBadge')}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">{t('brandSubtitle')}</p>
            </div>
          </div>

          {/* Right Controls: Language Selector, User Profile & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Khmer / English Toggle Button */}
            <button
              onClick={toggleLanguage}
              title={lang === 'km' ? 'Switch to English' : 'ប្តូរជាភាសាខ្មែរ'}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition cursor-pointer shadow-2xs"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'km' ? '🇰🇭 ខ្មែរ' : '🇬🇧 EN'}</span>
            </button>

            {/* Live Time */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-medium text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            {/* Current User Pill & Switcher */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 p-1 pl-2 rounded-xl">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt="" className="w-7 h-7 rounded-lg border border-slate-300 bg-white" />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                )}
                
                <div className="hidden sm:block text-left pr-2">
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {currentUser.full_name || currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {currentUser.student_id ? `${currentUser.student_id}` : (currentUser.staff_id || 'Staff Account')}
                  </span>
                </div>

                {!isStudent && onOpenChangePassword && (
                  <button
                    onClick={onOpenChangePassword}
                    title={t('changePassword')}
                    className="px-2 py-1 bg-white hover:bg-indigo-50 text-indigo-700 hover:text-indigo-900 text-xs font-semibold rounded-lg border border-indigo-200 transition cursor-pointer flex items-center space-x-1"
                  >
                    <KeyRound className="w-3 h-3 text-indigo-600" />
                    <span className="hidden md:inline">{t('changePassword')}</span>
                  </button>
                )}

                <button
                  onClick={onOpenLogin}
                  title="Switch User / Login"
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-indigo-600 hover:text-indigo-800 text-xs font-semibold rounded-lg border border-slate-200 transition cursor-pointer"
                >
                  {t('switchAccount')}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('signIn')}</span>
              </button>
            )}

            {/* Reset Demo Data Button */}
            <button
              onClick={onReseed}
              disabled={isReseeding}
              title={t('resetDemo')}
              className="p-2 text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition shadow-2xs disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReseeding ? 'animate-spin text-indigo-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 py-1">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
