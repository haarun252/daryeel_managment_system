import { useEffect, useState } from 'react'
import type { User } from './data/mockData'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import SchoolsPage from './pages/superadmin/SchoolsPage'
import SubscriptionsPage from './pages/superadmin/SubscriptionsPage'
import { AdminsPage, UsersPage, PlatformPaymentsPage, RevenuePage, AuditLogsPage, SupportPage, RolesPage, ActivityLogsPage, PlatformAnnouncementsPage, PlatformReportsPage } from './pages/superadmin/PlatformPages'

import SchoolDashboard from './pages/schooladmin/SchoolDashboard'
import StudentsPage from './pages/schooladmin/StudentsPage'
import TeachersPage from './pages/schooladmin/TeachersPage'
import AttendancePage from './pages/schooladmin/AttendancePage'
import FeesPage from './pages/schooladmin/FeesPage'
import { ParentsPage, ClassesPage, SectionsPage, SubjectsPage, InvoicesPage, SchoolPaymentsPage, ExpensesPage } from './pages/schooladmin/EntityPages'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherAttendance from './pages/teacher/TeacherAttendance'
import ParentDashboard from './pages/parent/ParentDashboard'
import ChildrenPage from './pages/parent/ChildrenPage'

import { ProfilePage, SettingsPage, NotificationsPage, MessagesPage } from './pages/shared/AccountPages'
import { TimetablePage, AssignmentsPage, ExamsPage, ResultsPage, ReportCardsPage } from './pages/shared/AcademicPages'
import { AnnouncementsPage, EventsPage } from './pages/shared/CommPages'
import { ReportsPage } from './pages/shared/ReportsPage'

const DEFAULT_PAGES: Record<string, string> = {
  superadmin: 'sa-dashboard',
  schooladmin: 'ad-dashboard',
  teacher: 'te-dashboard',
  parent: 'pa-dashboard',
}

const PAGE_TITLES: Record<string, string> = {
  'sa-dashboard': 'Dashboard',
  'sa-schools': 'Schools / Tenants',
  'sa-admins': 'School Admins',
  'sa-users': 'Users',
  'sa-plans': 'Subscription Plans',
  'sa-subscriptions': 'Subscriptions',
  'sa-payments': 'Payments',
  'sa-revenue': 'Revenue',
  'sa-reports': 'Reports',
  'sa-notifications': 'Notifications',
  'sa-announcements': 'Platform Announcements',
  'sa-support': 'Support',
  'sa-activity': 'Activity Logs',
  'sa-settings': 'Settings',
  'sa-roles': 'Roles & Permissions',
  'sa-audit': 'Audit Logs',
  'sa-profile': 'Profile',
  'ad-dashboard': 'Dashboard',
  'ad-students': 'Students',
  'ad-teachers': 'Teachers',
  'ad-parents': 'Parents',
  'ad-classes': 'Classes',
  'ad-sections': 'Sections',
  'ad-subjects': 'Subjects',
  'ad-attendance': 'Attendance',
  'ad-timetable': 'Timetable',
  'ad-assignments': 'Assignments',
  'ad-exams': 'Exams',
  'ad-results': 'Results',
  'ad-reportcards': 'Report Cards',
  'ad-fees': 'Fees',
  'ad-payments': 'Payments',
  'ad-invoices': 'Invoices',
  'ad-expenses': 'Expenses',
  'ad-announcements': 'Announcements',
  'ad-events': 'Events',
  'ad-messages': 'Messages',
  'ad-notifications': 'Notifications',
  'ad-reports': 'Reports',
  'ad-reports-students': 'Student Reports',
  'ad-reports-attendance': 'Attendance Reports',
  'ad-reports-fees': 'Fee Reports',
  'ad-reports-academic': 'Academic Reports',
  'ad-settings': 'School Settings',
  'ad-settings-academic': 'Academic Settings',
  'ad-settings-notifications': 'Notification Settings',
  'ad-profile': 'Profile',
  'te-dashboard': 'Dashboard',
  'te-classes': 'My Classes',
  'te-students': 'My Students',
  'te-attendance': 'Attendance',
  'te-assignments': 'Assignments',
  'te-exams': 'Exams',
  'te-results': 'Results',
  'te-timetable': 'Timetable',
  'te-announcements': 'Announcements',
  'te-messages': 'Messages',
  'te-notifications': 'Notifications',
  'te-profile': 'Profile',
  'te-settings': 'Settings',
  'pa-dashboard': 'Dashboard',
  'pa-children': 'My Children',
  'pa-attendance': 'Attendance',
  'pa-assignments': 'Assignments',
  'pa-exams': 'Exams',
  'pa-results': 'Results',
  'pa-timetable': 'Timetable',
  'pa-fees': 'Fees',
  'pa-payments': 'Payments',
  'pa-invoices': 'Invoices',
  'pa-announcements': 'Announcements',
  'pa-events': 'Events',
  'pa-messages': 'Messages',
  'pa-notifications': 'Notifications',
  'pa-profile': 'Profile',
  'pa-settings': 'Settings',
}

function AppContent({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGES[user.role])
  const navigate = (page: string) => setCurrentPage(page)
  const title = PAGE_TITLES[currentPage] ?? 'Xanaano'

  const renderPage = () => {
    switch (currentPage) {
      case 'sa-dashboard': return <SuperAdminDashboard onNavigate={navigate} />
      case 'sa-schools': return <SchoolsPage />
      case 'sa-admins': return <AdminsPage />
      case 'sa-users': return <UsersPage />
      case 'sa-plans':
      case 'sa-subscriptions': return <SubscriptionsPage />
      case 'sa-payments': return <PlatformPaymentsPage />
      case 'sa-revenue': return <RevenuePage />
      case 'sa-reports': return <PlatformReportsPage />
      case 'sa-notifications': return <NotificationsPage />
      case 'sa-announcements': return <PlatformAnnouncementsPage />
      case 'sa-support': return <SupportPage />
      case 'sa-activity': return <ActivityLogsPage />
      case 'sa-settings': return <SettingsPage variant="platform" />
      case 'sa-roles': return <RolesPage />
      case 'sa-audit': return <AuditLogsPage />
      case 'sa-profile': return <ProfilePage />

      case 'ad-dashboard': return <SchoolDashboard onNavigate={navigate} />
      case 'ad-students': return <StudentsPage />
      case 'ad-teachers': return <TeachersPage />
      case 'ad-parents': return <ParentsPage />
      case 'ad-classes': return <ClassesPage />
      case 'ad-sections': return <SectionsPage />
      case 'ad-subjects': return <SubjectsPage />
      case 'ad-attendance': return <AttendancePage />
      case 'ad-timetable': return <TimetablePage />
      case 'ad-assignments': return <AssignmentsPage />
      case 'ad-exams': return <ExamsPage />
      case 'ad-results': return <ResultsPage />
      case 'ad-reportcards': return <ReportCardsPage />
      case 'ad-fees': return <FeesPage />
      case 'ad-payments': return <SchoolPaymentsPage />
      case 'ad-invoices': return <InvoicesPage />
      case 'ad-expenses': return <ExpensesPage />
      case 'ad-announcements': return <AnnouncementsPage />
      case 'ad-events': return <EventsPage />
      case 'ad-messages': return <MessagesPage />
      case 'ad-notifications': return <NotificationsPage />
      case 'ad-reports': return <ReportsPage />
      case 'ad-reports-students': return <ReportsPage preset="Student List" />
      case 'ad-reports-attendance': return <ReportsPage preset="Daily Attendance" />
      case 'ad-reports-fees': return <ReportsPage preset="Fee Collection" />
      case 'ad-reports-academic': return <ReportsPage preset="Exam Results" />
      case 'ad-settings': return <SettingsPage key="ad-settings" variant="school" />
      case 'ad-settings-academic': return <SettingsPage key="ad-academic" variant="school" initialTab="Academic" />
      case 'ad-settings-notifications': return <SettingsPage key="ad-notif" variant="school" initialTab="Notifications" />
      case 'ad-profile': return <ProfilePage />

      case 'te-dashboard': return <TeacherDashboard onNavigate={navigate} />
      case 'te-classes': return <ClassesPage canManage={false} />
      case 'te-students': return <StudentsPage canManage={false} />
      case 'te-attendance': return <TeacherAttendance />
      case 'te-assignments': return <AssignmentsPage canCreate />
      case 'te-exams': return <ExamsPage />
      case 'te-results': return <ResultsPage />
      case 'te-timetable': return <TimetablePage />
      case 'te-announcements': return <AnnouncementsPage canManage={false} />
      case 'te-messages': return <MessagesPage />
      case 'te-notifications': return <NotificationsPage />
      case 'te-profile': return <ProfilePage />
      case 'te-settings': return <SettingsPage variant="user" />

      case 'pa-dashboard': return <ParentDashboard onNavigate={navigate} />
      case 'pa-children': return <ChildrenPage />
      case 'pa-attendance': return <AttendancePage />
      case 'pa-assignments': return <AssignmentsPage canCreate={false} />
      case 'pa-exams': return <ExamsPage />
      case 'pa-results': return <ResultsPage />
      case 'pa-timetable': return <TimetablePage />
      case 'pa-fees': return <FeesPage />
      case 'pa-payments': return <SchoolPaymentsPage />
      case 'pa-invoices': return <InvoicesPage />
      case 'pa-announcements': return <AnnouncementsPage canManage={false} />
      case 'pa-events': return <EventsPage />
      case 'pa-messages': return <MessagesPage />
      case 'pa-notifications': return <NotificationsPage />
      case 'pa-profile': return <ProfilePage />
      case 'pa-settings': return <SettingsPage variant="user" />
      default: return <ProfilePage />
    }
  }

  return (
    <AppProvider user={user} onLogout={onLogout}>
      <Layout currentPage={currentPage} onNavigate={navigate} title={title}>
        {renderPage()}
      </Layout>
    </AppProvider>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', localStorage.getItem('xanaano-theme') === 'dark')
    } catch { /* ignore */ }
  }, [])

  if (!user) return <LoginPage onLogin={setUser} />
  return <AppContent user={user} onLogout={() => setUser(null)} />
}
