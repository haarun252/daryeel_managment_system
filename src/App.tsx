import { useEffect, useState } from 'react'
import type { User } from './data/mockData'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard'
import SchoolsPage from './pages/superadmin/SchoolsPage'
import SubscriptionsPage from './pages/superadmin/SubscriptionsPage'
import { AdminsPage, UsersPage, PlatformPaymentsPage, RevenuePage, AuditLogsPage, SupportPage, RolesPage, ActivityLogsPage, PlatformAnnouncementsPage, PlatformReportsPage, SystemAnalyticsPage } from './pages/superadmin/PlatformPages'

import SchoolDashboard from './pages/schooladmin/SchoolDashboard'
import StudentsPage from './pages/schooladmin/StudentsPage'
import TeachersPage from './pages/schooladmin/TeachersPage'
import AttendancePage from './pages/schooladmin/AttendancePage'
import FeesPage from './pages/schooladmin/FeesPage'
import TransportPage from './pages/schooladmin/TransportPage'
import StaffPage from './pages/schooladmin/StaffPage'
import IncomePage from './pages/schooladmin/IncomePage'
import FinancePage from './pages/schooladmin/FinancePage'
import { ParentsPage, ClassesPage, SectionsPage, SubjectsPage, InvoicesPage, SchoolPaymentsPage, ExpensesPage } from './pages/schooladmin/EntityPages'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherAttendance from './pages/teacher/TeacherAttendance'
import TeacherTimetable from './pages/teacher/TimetablePage'
import { TeacherClassesPage, TeacherStudentsPage } from './pages/teacher/TeacherClassesStudents'
import { TeacherExamsPage, TeacherReportsPage } from './pages/teacher/TeacherExamsReports'
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
  'sa-dashboard': 'Overview',
  'sa-schools': 'Schools / Tenants',
  'sa-admins': 'School Admins',
  'sa-users': 'Users',
  'sa-plans': 'Subscription Plans',
  'sa-subscriptions': 'Subscriptions',
  'sa-payments': 'Payments',
  'sa-revenue': 'Platform Revenue',
  'sa-analytics': 'System Analytics',
  'sa-reports': 'Reports',
  'sa-notifications': 'Notifications',
  'sa-announcements': 'Platform Announcements',
  'sa-support': 'Support',
  'sa-activity': 'Activity Logs',
  'sa-settings': 'Platform Settings',
  'sa-roles': 'Roles & Permissions',
  'sa-audit': 'Audit Logs',
  'sa-profile': 'Profile',
  'ad-dashboard': 'Dashboard',
  'ad-students': 'Students',
  'ad-teachers': 'Teachers',
  'ad-parents': 'Parents',
  'ad-classes': 'Classes',
  'ad-subjects': 'Subjects',
  'ad-attendance': 'Attendance',
  'ad-timetable': 'Timetable',
  'ad-exams': 'Exams & Marks',
  'ad-reports': 'Reports',
  'ad-transport': 'Transport',
  'ad-staff': 'Staff',
  'ad-fees': 'Fees',
  'ad-payments': 'Payments',
  'ad-income': 'Income',
  'ad-expenses': 'Expenses',
  'ad-finance': 'Finance',
  'ad-notifications': 'Notifications',
  'ad-settings': 'School Settings',
  'ad-profile': 'Profile',
  'te-dashboard': 'Dashboard',
  'te-classes': 'My Classes',
  'te-students': 'My Students',
  'te-attendance': 'Attendance',
  'te-timetable': 'My Timetable',
  'te-exams': 'Exams & Marks',
  'te-reports': 'Student Reports',
  'te-notifications': 'Notifications',
  'te-profile': 'My Profile',
  'pa-dashboard': 'Dashboard',
  'pa-children': 'My Children',
  'pa-attendance': 'Attendance',
  'pa-assignments': 'Assignments',
  'pa-exams': 'Exams',
  'pa-results': 'Results',
  'pa-timetable': 'Timetable',
  'pa-fees': 'Fees',
  'pa-reports': 'Reports',
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
      case 'sa-analytics': return <SystemAnalyticsPage />
      case 'sa-reports': return <PlatformReportsPage />
      case 'sa-notifications': return <NotificationsPage variant="platform" />
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
      case 'ad-subjects': return <SubjectsPage />
      case 'ad-attendance': return <AttendancePage />
      case 'ad-timetable': return <TimetablePage />
      case 'ad-exams': return <ExamsPage />
      case 'ad-reports': return <ReportsPage />
      case 'ad-transport': return <TransportPage />
      case 'ad-staff': return <StaffPage />
      case 'ad-fees': return <FeesPage />
      case 'ad-payments': return <SchoolPaymentsPage />
      case 'ad-income': return <IncomePage />
      case 'ad-expenses': return <ExpensesPage />
      case 'ad-finance': return <FinancePage />
      case 'ad-notifications': return <NotificationsPage />
      case 'ad-settings': return <SettingsPage key="ad-settings" variant="school" />
      case 'ad-profile': return <ProfilePage />

      case 'te-dashboard': return <TeacherDashboard onNavigate={navigate} />
      case 'te-classes': return <TeacherClassesPage />
      case 'te-students': return <TeacherStudentsPage />
      case 'te-attendance': return <TeacherAttendance />
      case 'te-timetable': return <TeacherTimetable />
      case 'te-exams': return <TeacherExamsPage />
      case 'te-reports': return <TeacherReportsPage />
      case 'te-notifications': return <NotificationsPage variant="teacher" />
      case 'te-profile': return <ProfilePage />

      case 'pa-dashboard': return <ParentDashboard onNavigate={navigate} />
      case 'pa-children': return <ChildrenPage />
      case 'pa-attendance': return <AttendancePage variant="view" />
      case 'pa-assignments': return <AssignmentsPage canCreate={false} />
      case 'pa-exams': return <ExamsPage canManage={false} />
      case 'pa-results': return <ResultsPage />
      case 'pa-timetable': return <TimetablePage canManage={false} />
      case 'pa-fees': return <FeesPage canManage={false} />
      case 'pa-reports': return <ReportsPage variant="parent" />
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
