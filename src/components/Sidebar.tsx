import { Icon } from './Icons'
import type { Role } from '../data/mockData'
import { SCHOOLS } from '../data/mockData'
import { useApp } from '../context/AppContext'

interface NavItem {
  label: string
  icon: keyof typeof Icon
  page: string
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

const SUPER_ADMIN: NavSection[] = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: 'Dashboard', page: 'sa-dashboard' },
    { label: 'Schools', icon: 'School', page: 'sa-schools', badge: 5 },
    { label: 'School Admins', icon: 'Profile', page: 'sa-admins' },
    { label: 'Users', icon: 'Users', page: 'sa-users' },
  ]},
  { title: 'Finance', items: [
    { label: 'Plans', icon: 'Subscription', page: 'sa-plans' },
    { label: 'Subscriptions', icon: 'Layers', page: 'sa-subscriptions' },
    { label: 'Payments', icon: 'Payment', page: 'sa-payments' },
    { label: 'Revenue', icon: 'Dollar', page: 'sa-revenue' },
  ]},
  { title: 'Management', items: [
    { label: 'Reports', icon: 'Report', page: 'sa-reports' },
    { label: 'Notifications', icon: 'Bell', page: 'sa-notifications' },
    { label: 'Announcements', icon: 'Announcement', page: 'sa-announcements' },
    { label: 'Support', icon: 'Support', page: 'sa-support' },
    { label: 'Activity Logs', icon: 'Activity', page: 'sa-activity' },
  ]},
  { title: 'System', items: [
    { label: 'Settings', icon: 'Settings', page: 'sa-settings' },
    { label: 'Roles', icon: 'Shield', page: 'sa-roles' },
    { label: 'Audit Logs', icon: 'Clipboard', page: 'sa-audit' },
  ]},
]

const SCHOOL_ADMIN: NavSection[] = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: 'Dashboard', page: 'ad-dashboard' },
    { label: 'Students', icon: 'Student', page: 'ad-students' },
    { label: 'Teachers', icon: 'Teacher', page: 'ad-teachers' },
    { label: 'Parents', icon: 'Parent', page: 'ad-parents' },
    { label: 'Classes', icon: 'Class', page: 'ad-classes' },
    { label: 'Sections', icon: 'Layers', page: 'ad-sections' },
    { label: 'Subjects', icon: 'Subject', page: 'ad-subjects' },
  ]},
  { title: 'Academic', items: [
    { label: 'Attendance', icon: 'Attendance', page: 'ad-attendance' },
    { label: 'Timetable', icon: 'Timetable', page: 'ad-timetable' },
    { label: 'Assignments', icon: 'Assignment', page: 'ad-assignments' },
    { label: 'Exams', icon: 'Exam', page: 'ad-exams' },
    { label: 'Results', icon: 'Results', page: 'ad-results' },
    { label: 'Report Cards', icon: 'Report', page: 'ad-reportcards' },
  ]},
  { title: 'Finance', items: [
    { label: 'Fees', icon: 'Fees', page: 'ad-fees' },
    { label: 'Payments', icon: 'Payment', page: 'ad-payments' },
    { label: 'Invoices', icon: 'File', page: 'ad-invoices' },
    { label: 'Expenses', icon: 'Wallet', page: 'ad-expenses' },
  ]},
  { title: 'Communication', items: [
    { label: 'Announcements', icon: 'Announcement', page: 'ad-announcements' },
    { label: 'Events', icon: 'Event', page: 'ad-events' },
    { label: 'Messages', icon: 'Message', page: 'ad-messages' },
    { label: 'Notifications', icon: 'Bell', page: 'ad-notifications' },
  ]},
  { title: 'Reports', items: [
    { label: 'Student Reports', icon: 'Student', page: 'ad-reports-students' },
    { label: 'Attendance Reports', icon: 'Attendance', page: 'ad-reports-attendance' },
    { label: 'Fee Reports', icon: 'Fees', page: 'ad-reports-fees' },
    { label: 'Academic Reports', icon: 'Results', page: 'ad-reports-academic' },
  ]},
  { title: 'Settings', items: [
    { label: 'School Settings', icon: 'Settings', page: 'ad-settings' },
    { label: 'Academic Settings', icon: 'Class', page: 'ad-settings-academic' },
    { label: 'Notification Settings', icon: 'Bell', page: 'ad-settings-notifications' },
  ]},
]

const TEACHER: NavSection[] = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: 'Dashboard', page: 'te-dashboard' },
    { label: 'My Classes', icon: 'Class', page: 'te-classes' },
    { label: 'My Students', icon: 'Student', page: 'te-students' },
    { label: 'Attendance', icon: 'Attendance', page: 'te-attendance' },
    { label: 'Assignments', icon: 'Assignment', page: 'te-assignments' },
    { label: 'Exams', icon: 'Exam', page: 'te-exams' },
    { label: 'Results', icon: 'Results', page: 'te-results' },
    { label: 'Timetable', icon: 'Timetable', page: 'te-timetable' },
  ]},
  { title: 'Communication', items: [
    { label: 'Announcements', icon: 'Announcement', page: 'te-announcements' },
    { label: 'Messages', icon: 'Message', page: 'te-messages' },
    { label: 'Notifications', icon: 'Bell', page: 'te-notifications' },
  ]},
  { title: 'Account', items: [
    { label: 'Profile', icon: 'Profile', page: 'te-profile' },
    { label: 'Settings', icon: 'Settings', page: 'te-settings' },
  ]},
]

const PARENT: NavSection[] = [
  { title: 'Main', items: [
    { label: 'Dashboard', icon: 'Dashboard', page: 'pa-dashboard' },
    { label: 'My Children', icon: 'Users', page: 'pa-children' },
    { label: 'Attendance', icon: 'Attendance', page: 'pa-attendance' },
    { label: 'Assignments', icon: 'Assignment', page: 'pa-assignments' },
    { label: 'Exams', icon: 'Exam', page: 'pa-exams' },
    { label: 'Results', icon: 'Results', page: 'pa-results' },
    { label: 'Timetable', icon: 'Timetable', page: 'pa-timetable' },
  ]},
  { title: 'Finance', items: [
    { label: 'Fees', icon: 'Fees', page: 'pa-fees' },
    { label: 'Payments', icon: 'Payment', page: 'pa-payments' },
    { label: 'Invoices', icon: 'File', page: 'pa-invoices' },
  ]},
  { title: 'Communication', items: [
    { label: 'Announcements', icon: 'Announcement', page: 'pa-announcements' },
    { label: 'Events', icon: 'Event', page: 'pa-events' },
    { label: 'Messages', icon: 'Message', page: 'pa-messages' },
    { label: 'Notifications', icon: 'Bell', page: 'pa-notifications' },
  ]},
  { title: 'Account', items: [
    { label: 'Profile', icon: 'Profile', page: 'pa-profile' },
    { label: 'Settings', icon: 'Settings', page: 'pa-settings' },
  ]},
]

const NAV: Record<Role, NavSection[]> = {
  superadmin: SUPER_ADMIN,
  schooladmin: SCHOOL_ADMIN,
  teacher: TEACHER,
  parent: PARENT,
}

const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Platform Admin',
  schooladmin: 'School Admin',
  teacher: 'Teacher Portal',
  parent: 'Parent Portal',
}

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { role, sidebarCollapsed, mobileOpen, setMobileOpen, tenant, setTenantId, logout } = useApp()
  const sections = NAV[role]
  const width = sidebarCollapsed ? 88 : 260
  const showLabels = !sidebarCollapsed

  const go = (page: string) => { onNavigate(page); setMobileOpen(false) }

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside
        style={{
          width,
          minHeight: '100vh',
          background: 'transparent', // Let the app-shell background show through
          borderRight: '1px solid rgba(255,255,255,0.1)', // Very subtle border
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0, left: 0, bottom: 0,
          zIndex: 50,
          transform: undefined,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          paddingTop: 24,
          paddingLeft: 16,
          paddingRight: 16,
        }}
        className={`app-sidebar ${mobileOpen ? 'open' : ''}`}
      >
        <div style={{ paddingBottom: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Outlet/Tenant Selector - Styled like the reference "Outlet 1" dropdown */}
          {showLabels ? (
            <div style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                cursor: role === 'superadmin' ? 'pointer' : 'default',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, background: '#2563eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Icon.Building />
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}>
                    {tenant.name}
                  </div>
                </div>
                {role === 'superadmin' && <Icon.ChevronDown />}
              </div>

              {/* Hidden select overlay for functionality without changing custom UI */}
              {role === 'superadmin' && (
                <select
                  style={{
                    position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%'
                  }}
                  value={tenant.id}
                  onChange={e => setTenantId(e.target.value)}
                >
                  {SCHOOLS.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: '#2563eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
              }}>
                <span style={{ color: 'white', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 18 }}>X</span>
              </div>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sections.map((section, sIdx) => (
            <div key={section.title} style={{ marginBottom: sIdx === sections.length - 1 ? 0 : 16 }}>
              {/* Very subtle section headers, mostly hidden like in reference, but kept for structure */}
              {showLabels && sIdx !== 0 && (
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(15,23,42,0.4)',
                  padding: '4px 12px 8px', textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  {section.title}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {section.items.map(item => {
                  const IC = Icon[item.icon]
                  const active = currentPage === item.page
                  return (
                    <button
                      key={item.page}
                      title={item.label}
                      onClick={() => go(item.page)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: showLabels ? '12px 16px' : '14px',
                        borderRadius: 14,
                        background: active ? 'rgba(255,255,255,0.8)' : 'transparent',
                        border: active ? '1px solid rgba(255,255,255,0.9)' : '1px solid transparent',
                        color: active ? '#2563eb' : '#475569',
                        fontWeight: active ? 600 : 500,
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: active ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
                        width: '100%',
                        justifyContent: showLabels ? 'flex-start' : 'center',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.color = '#0f172a'
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.color = '#475569'
                      }}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: active ? '#2563eb' : '#64748b',
                        transition: 'color 0.2s'
                      }}>
                        <IC />
                      </span>
                      {showLabels && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                      
                      {/* Reference has cute little pink notification badges on sidebar items */}
                      {item.badge && showLabels && (
                        <span style={{
                          background: '#ec4899', // Pink badge
                          color: 'white',
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 10,
                          minWidth: 20,
                          textAlign: 'center'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div style={{ paddingBottom: 24, paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {role !== 'teacher' && role !== 'parent' && (
            <button
              onClick={() => go(role === 'superadmin' ? 'sa-profile' : 'ad-profile')}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: showLabels ? '12px 16px' : '14px',
                borderRadius: 14, background: 'transparent', border: '1px solid transparent',
                color: '#475569', fontWeight: 500, fontSize: 14, cursor: 'pointer',
                justifyContent: showLabels ? 'flex-start' : 'center', transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
            >
              <span style={{ color: '#64748b' }}><Icon.Settings /></span>
              {showLabels && <span>Settings</span>}
            </button>
          )}
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: showLabels ? '12px 16px' : '14px',
              borderRadius: 14, background: 'transparent', border: '1px solid transparent',
              color: '#475569', fontWeight: 500, fontSize: 14, cursor: 'pointer',
              justifyContent: showLabels ? 'flex-start' : 'center', transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#dc2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
          >
            <span style={{ color: '#64748b' }}><Icon.Logout /></span>
            {showLabels && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
