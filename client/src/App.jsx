import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import MarkAttendanceView from './components/MarkAttendanceView';
import QRCheckinView from './components/QRCheckinView';
import StudentsView from './components/StudentsView';
import ClassesView from './components/ClassesView';
import ReportsView from './components/ReportsView';
import LeaveView from './components/LeaveView';
import StudentPortalView from './components/StudentPortalView';
import StudentPermissionsView from './components/StudentPermissionsView';
import LoginModal from './components/LoginModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import { StudentDetailModal, AddStudentModal, AddClassModal } from './components/Modals';
import { api } from './api';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { t } = useLanguage();

  // Current user state (persisted in localStorage or default to student)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edutrack_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: 1,
      student_id: 'USEA-2024-001',
      first_name: 'Sopanha',
      last_name: 'Chhem',
      full_name: 'Chhem Sopanha',
      email: 'chhem.sopanha@usea.edu.kh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SopanhaChhem&backgroundColor=b6e3f4,c0aede,d1d4f9',
      gender: 'Male',
      phone: '012-345-678',
      class_id: 1,
      class_name: 'Full-Stack Web Engineering',
      class_code: 'SE-301',
      department: 'Software Engineering',
      room: 'Lab 302 (Building A)',
      teacher_name: 'Mr. Chhem Sopanha',
      schedule_time: '08:00 AM - 11:15 AM',
      role: 'student'
    };
  });

  const [activeTab, setActiveTab] = useState(currentUser?.role === 'student' ? 'my-portal' : 'dashboard');
  const [preselectedClassId, setPreselectedClassId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [classesList, setClassesList] = useState([]);
  const [isReseeding, setIsReseeding] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist user in localStorage
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('edutrack_user', JSON.stringify(currentUser));
      } catch (e) {}
    }
  }, [currentUser]);

  // Fetch available classes for modals
  async function loadClasses() {
    try {
      const res = await api.getClasses();
      if (res.success) setClassesList(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }

  // Handle successful login
  function handleLoginSuccess(user) {
    setCurrentUser(user);
    if (user.role === 'student') {
      setActiveTab('my-portal');
      showToast(`${t('welcomeBack')}, ${user.first_name}!`);
    } else {
      setActiveTab('dashboard');
      showToast(`Signed in: ${user.name}`);
    }
  }

  function handleLogout() {
    setIsLoginModalOpen(true);
  }

  // Quick navigation from classes card to attendance marking
  function handleSelectClassForAttendance(classId) {
    setPreselectedClassId(classId);
    setActiveTab('mark');
  }

  // Handle re-seed
  async function handleReseed() {
    if (!window.confirm('Reset and re-seed sample database with 4 classes, 32 students, and 15 days of attendance history?')) {
      return;
    }

    try {
      setIsReseeding(true);
      const res = await api.reseedDatabase();
      if (res.success) {
        showToast('Database successfully re-seeded with realistic records!');
        loadClasses();
        window.location.reload();
      } else {
        alert('Failed to reseed database');
      }
    } catch (err) {
      alert('Error connecting to system API');
    } finally {
      setIsReseeding(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onReseed={handleReseed}
        isReseeding={isReseeding}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenChangePassword={() => setIsChangePasswordOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-bounce">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Student Portal View */}
        {activeTab === 'my-portal' && (
          <StudentPortalView 
            currentUser={currentUser}
            onOpenCheckin={() => setActiveTab('qr')}
          />
        )}

        {/* Faculty & Shared Views */}
        {activeTab === 'dashboard' && (
          <DashboardView 
            onNavigate={setActiveTab} 
            onSelectStudent={setSelectedStudentId} 
          />
        )}

        {activeTab === 'mark' && (
          <MarkAttendanceView 
            preselectedClassId={preselectedClassId} 
          />
        )}

        {activeTab === 'qr' && (
          <QRCheckinView />
        )}

        {activeTab === 'students' && (
          <StudentsView 
            onSelectStudent={setSelectedStudentId} 
            onOpenAddStudent={() => setIsAddStudentOpen(true)}
          />
        )}

        {activeTab === 'classes' && (
          <ClassesView 
            onSelectClassForAttendance={handleSelectClassForAttendance}
            onOpenAddClass={() => setIsAddClassOpen(true)}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView />
        )}

        {activeTab === 'leave' && (
          currentUser?.role === 'student' ? (
            <StudentPermissionsView currentUser={currentUser} />
          ) : (
            <LeaveView />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} EduTrack Pro • University of South-East Asia (USEA)</p>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="font-medium text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
            >
              {t('switchAccount')}
            </button>
            <span>•</span>
            <span>Node.js 24 + Express 5 + SQLite + React 19</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        currentUser={currentUser}
        onSuccess={(msg) => showToast(msg)}
      />

      <StudentDetailModal 
        studentId={selectedStudentId} 
        onClose={() => setSelectedStudentId(null)} 
      />

      <AddStudentModal 
        isOpen={isAddStudentOpen} 
        onClose={() => setIsAddStudentOpen(false)} 
        onCreated={() => {
          showToast('Student enrolled successfully!');
          loadClasses();
        }}
        classes={classesList}
      />

      <AddClassModal 
        isOpen={isAddClassOpen} 
        onClose={() => setIsAddClassOpen(false)} 
        onCreated={() => {
          showToast('Class section created successfully!');
          loadClasses();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
