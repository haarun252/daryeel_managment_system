import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from './Icons'
import { useApp } from '../context/AppContext'
import { STUDENTS, TEACHERS, PARENTS, CLASSES, PAYMENTS, FEES, ANNOUNCEMENTS } from '../data/mockData'

interface TopNavProps {
  onNavigate: (page: string) => void
  title: string
}

const ROLE_LABEL: Record<string, string> = {
  superadmin: 'Super Admin',
  schooladmin: 'School Admin',
  teacher: 'Teacher',
  parent: 'Parent',
}

export default function TopNav({ onNavigate, title }: TopNavProps) {
  const { user, role, tenant, theme, toggleTheme, toggleSidebar, setMobileOpen, logout, toast } = useApp()
  const [q, setQ] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [notifs, setNotifs] = useState([
    { id: 'n1', cat: 'Attendance', title: 'Noah Garcia marked absent', time: '08:42 AM', read: false },
    { id: 'n2', cat: 'Fees', title: 'Overdue fee reminder — Oliver Patel', time: '08:10 AM', read: false },
    { id: 'n3', cat: 'Exams', title: 'Mid-term timetable published', time: 'Yesterday', read: false },
    { id: 'n4', cat: 'Assignments', title: 'New assignment posted for Grade 7A', time: 'Yesterday', read: true },
    { id: 'n5', cat: 'Announcements', title: 'Sports Day reminder', time: '2 days ago', read: true },
    { id: 'n6', cat: 'System', title: 'Nightly backup completed', time: '2 days ago', read: true },
  ])
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setSearchOpen(false); setNotifOpen(false); setUserOpen(false); setHelpOpen(false)
      }
    }
    window.addEventListener('mousedown', close)
    return () => window.removeEventListener('mousedown', close)
  }, [])

  const results = useMemo(() => {
    if (q.trim().length < 1) return null
    const s = q.toLowerCase()
    return {
      Students: STUDENTS.filter(x => x.name.toLowerCase().includes(s) || x.studentId.toLowerCase().includes(s)).slice(0, 4).map(x => ({ label: x.name, meta: x.studentId, page: 'ad-students' })),
      Teachers: TEACHERS.filter(x => x.name.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.name, meta: x.subjects.join(', '), page: 'ad-teachers' })),
      Parents: PARENTS.filter(x => x.name.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.name, meta: x.phone, page: 'ad-parents' })),
      Classes: CLASSES.filter(x => x.name.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.name, meta: x.teacher, page: 'ad-classes' })),
      Payments: PAYMENTS.filter(x => x.studentName.toLowerCase().includes(s) || x.invoiceId.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.invoiceId, meta: x.studentName, page: 'ad-payments' })),
      Invoices: FEES.filter(x => x.invoiceId.toLowerCase().includes(s) || x.studentName.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.invoiceId, meta: x.studentName, page: 'ad-invoices' })),
      Announcements: ANNOUNCEMENTS.filter(x => x.title.toLowerCase().includes(s)).slice(0, 3).map(x => ({ label: x.title, meta: x.date, page: 'ad-announcements' })),
    }
  }, [q])

  const unread = notifs.filter(n => !n.read).length
  const profilePage = role === 'superadmin' ? 'sa-profile' : role === 'schooladmin' ? 'ad-profile' : role === 'teacher' ? 'te-profile' : 'pa-profile'
  const settingsPage = role === 'superadmin' ? 'sa-settings' : role === 'schooladmin' ? 'ad-settings' : role === 'teacher' ? 'te-settings' : 'pa-settings'
  const notifPage = role === 'superadmin' ? 'sa-notifications' : role === 'schooladmin' ? 'ad-notifications' : role === 'teacher' ? 'te-notifications' : 'pa-notifications'

  return (
    <header ref={root} style={{
      height: 80,
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px 0 0',
      gap: 20,
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <button className="btn-icon mobile-menu-btn" onClick={() => setMobileOpen(true)}><Icon.Menu /></button>
      <button className="btn-icon hide-md" onClick={toggleSidebar} title="Collapse sidebar" style={{ marginLeft: 8 }}><Icon.Menu /></button>

      {/* Search Bar - Center styled like reference */}
      <div className="search-bar" style={{ flex: 1, maxWidth: 480, margin: '0 20px', position: 'relative' }}>
        <span className="search-icon" style={{ left: 16, color: '#3b82f6' }}><Icon.Search /></span>
        <input
          style={{
            width: '100%',
            padding: '12px 16px 12px 46px',
            background: 'rgba(255,255,255,0.5)',
            border: 'none',
            borderRadius: 20,
            fontSize: 14,
            color: 'var(--text)',
            outline: 'none',
            fontFamily: "'Inter', sans-serif",
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          placeholder="Search for orders, products, customers..."
          value={q}
          onChange={e => { setQ(e.target.value); setSearchOpen(true) }}
          onFocus={(e) => {
            setSearchOpen(true);
            e.currentTarget.style.background = 'rgba(255,255,255,0.8)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {searchOpen && results && (
          <div className="dropdown-panel" style={{ left: 0, right: 0, width: 'auto', maxHeight: 420, overflowY: 'auto', marginTop: 8, borderRadius: 20 }}>
            {Object.entries(results).map(([cat, items]) => items.length === 0 ? null : (
              <div key={cat}>
                <div style={{ padding: '12px 16px 4px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat}</div>
                {items.map(item => (
                  <button key={item.label} onClick={() => { onNavigate(item.page); setSearchOpen(false); setQ('') }} style={{ width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.meta}</div>
                  </button>
                ))}
              </div>
            ))}
            {Object.values(results).every(x => x.length === 0) && (
              <div style={{ padding: 20, fontSize: 14, color: 'var(--text-muted)', textAlign: 'center' }}>No matches for “{q}”</div>
            )}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} /> {/* Spacer */}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <button
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: '50%',
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#64748b', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onClick={() => { setNotifOpen(v => !v); setUserOpen(false) }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
          >
            <Icon.Bell />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0, width: 10, height: 10,
                borderRadius: '50%', background: '#ec4899', // Pink dot like reference
                border: '2px solid rgba(255,255,255,0.8)'
              }} />
            )}
          </button>
          {notifOpen && (
            <div className="dropdown-panel" style={{ width: 340, right: 0, top: 'calc(100% + 12px)', borderRadius: 20 }}>
              <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
                <b style={{ fontSize: 15 }}>Notifications</b>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }} onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>Mark all read</button>
              </div>
              {notifs.slice(0, 5).map(n => (
                <div key={n.id} style={{ padding: '12px 16px', background: n.read ? 'transparent' : 'rgba(239,246,255,0.5)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? 'transparent' : '#3b82f6', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
              <button onClick={() => { onNavigate(notifPage); setNotifOpen(false) }} style={{ width: '100%', padding: 14, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>View all notifications</button>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setUserOpen(v => !v); setNotifOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0
            }}
          >
            {/* Reference avatar is an illustrated face with yellow background. We'll simulate with a solid color + initial if no image */}
            <div className="avatar" style={{
              width: 40, height: 40, fontSize: 14, background: '#fef08a', color: '#854d0e',
              border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <Icon.ChevronDown />
          </button>
          {userOpen && (
            <div className="dropdown-panel" style={{ width: 220, right: 0, top: 'calc(100% + 12px)', borderRadius: 20, padding: 8 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 4 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{user.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ROLE_LABEL[role]}</div>
              </div>
              {[
                { label: 'My Profile', fn: () => onNavigate(profilePage), IconComp: Icon.Profile },
                { label: 'Settings', fn: () => onNavigate(settingsPage), IconComp: Icon.Settings },
                { label: 'Theme Toggle', fn: toggleTheme, IconComp: theme === 'dark' ? Icon.Sun : Icon.Moon },
              ].map(({ label, fn, IconComp }) => (
                <button key={label} onClick={() => { fn(); setUserOpen(false) }} style={{
                  width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none',
                  cursor: 'pointer', fontSize: 14, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10,
                  borderRadius: 12, transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ color: '#64748b' }}>{IconComp && <IconComp />}</span>
                  {label as string}
                </button>
              ))}
              <div style={{ height: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />
              <button onClick={logout} style={{
                width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: 14, color: '#dc2626', display: 'flex', alignItems: 'center', gap: 10,
                borderRadius: 12, transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(254,226,226,0.5)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ color: '#dc2626' }}><Icon.Logout /></span>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
