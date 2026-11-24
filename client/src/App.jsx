import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import MarkAttendanceView from './components/MarkAttendanceView';
import QRCheckinView from './components/QRCheckinView';
import StudentsView from './components/StudentsView';
import ClassesView from './components/ClassesView';
import ReportsView from './components/ReportsView';
import LeaveView from './components/LeaveView';
import { StudentDetailModal, AddStudentModal, AddClassModal } from './components/Modals';
import { api } from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [preselectedClassId, setPreselectedClassId] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [classesList, setClassesList] = useState([]);
  const [isReseeding, setIsReseeding] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
        // Force refresh by toggling tab or reloading
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

        {/* View Router */}
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
          <LeaveView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} EduTrack Pro • University of South-East Asia (USEA)</p>
          <p className="flex items-center space-x-1">
            <span>Engineered with Node.js, Express, SQLite, React & Tailwind CSS</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
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
