import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import { useApp } from '../../context/AppContext'
import { LOGIN_HISTORY } from '../../data/mockData'
import { NOTIFICATIONS, MESSAGES } from '../../data/mockData'

export function ProfilePage() {
  const { user, role, toast } = useApp()
  const [edit, setEdit] = useState(false)
  const [pwd, setPwd] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Profile</div>
          <div className="page-subtitle">Manage your personal information</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPwd(true)}><Icon.Lock /> Change Password</button>
          <button className="btn-primary" onClick={() => setEdit(true)}><Icon.Edit /> Edit Profile</button>
        </div>
      </div>
      <div className="card" style={{ padding: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="avatar" style={{ width: 88, height: 88, fontSize: 28, margin: '0 auto 10px' }}>{user.name.split(' ').map(n => n[0]).join('')}</div>
          <button className="btn-secondary" onClick={() => toast('success', 'Avatar updated.')}><Icon.Upload /> Upload Avatar</button>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minWidth: 240 }}>
          {[
            ['Full name', user.name],
            ['Email', user.email],
            ['Phone', user.phone ?? '—'],
            ['Role', role],
            ['Account status', user.status ?? 'Active'],
            ['Last login', user.lastLogin ?? '—'],
          ].map(([k, v]) => (
            <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 10, padding: '12px 14px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontWeight: 700, marginTop: 4, textTransform: k === 'Role' ? 'capitalize' : undefined }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <Modal open={edit} onClose={() => setEdit(false)} title="Edit Profile" footer={<><button className="btn-secondary" onClick={() => setEdit(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Profile updated.'); setEdit(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <label className="field-label">Full name</label><input className="input-field" defaultValue={user.name} />
          <label className="field-label">Email</label><input className="input-field" defaultValue={user.email} />
          <label className="field-label">Phone</label><input className="input-field" defaultValue={user.phone} />
        </div>
      </Modal>
      <Modal open={pwd} onClose={() => setPwd(false)} title="Change Password" size="sm" footer={<><button className="btn-secondary" onClick={() => setPwd(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Password updated.'); setPwd(false) }}>Update</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input className="input-field" type="password" placeholder="Current password" />
          <input className="input-field" type="password" placeholder="New password" />
          <input className="input-field" type="password" placeholder="Confirm new password" />
        </div>
      </Modal>
    </div>
  )
}

export function SettingsPage({ variant = 'school', initialTab }: { variant?: 'school' | 'platform' | 'user'; initialTab?: string }) {
  const { theme, setTheme, toast, tenant } = useApp()
  const [tab, setTab] = useState(initialTab ?? (variant === 'user' ? 'Appearance' : 'General'))
  const tabs = variant === 'platform'
    ? ['General', 'Notifications', 'Security', 'Appearance', 'Billing']
    : variant === 'user'
      ? ['Notifications', 'Security', 'Appearance']
      : ['General', 'Academic', 'Notifications', 'Security', 'Appearance', 'Billing']

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">{variant === 'platform' ? 'Platform configuration' : `${tenant.name} settings`}</div>
        </div>
      </div>
      <div className="tab-bar">
        {tabs.map(t => <div key={t} className={`tab-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</div>)}
      </div>
      <div className="card" style={{ padding: 22 }}>
        {tab === 'General' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 720 }}>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">School name</label><input className="input-field" defaultValue={tenant.name} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Logo</label><button className="btn-secondary"><Icon.Upload /> Upload logo</button></div>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Address</label><input className="input-field" defaultValue={tenant.address} /></div>
            <div><label className="field-label">Phone</label><input className="input-field" defaultValue={tenant.phone} /></div>
            <div><label className="field-label">Email</label><input className="input-field" defaultValue={tenant.email} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Website</label><input className="input-field" defaultValue={tenant.website ?? ''} /></div>
            <button className="btn-primary" onClick={() => toast('success', 'Settings saved.')}>Save changes</button>
          </div>
        )}
        {tab === 'Academic' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 560 }}>
            <div><label className="field-label">Academic year</label><select className="input-field"><option>2025–2026</option><option>2024–2025</option></select></div>
            <div><label className="field-label">Terms</label><select className="input-field"><option>3 terms</option><option>2 semesters</option></select></div>
            <div><label className="field-label">Grading system</label><select className="input-field"><option>A–F (percent)</option><option>GPA 4.0</option></select></div>
            <div><label className="field-label">Classes</label><input className="input-field" defaultValue="Grade 6, 7, 8, 9" /></div>
            <div><label className="field-label">Sections</label><input className="input-field" defaultValue="A, B, C" /></div>
            <button className="btn-primary" onClick={() => toast('success', 'Academic settings saved.')}>Save</button>
          </div>
        )}
        {tab === 'Notifications' && (
          <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
            {['Email notifications', 'SMS notifications', 'Push notifications', 'Fee reminders', 'Attendance alerts'].map(item => (
              <label key={item} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                {item} <input type="checkbox" defaultChecked />
              </label>
            ))}
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Notification preferences saved.')}>Save</button>
          </div>
        )}
        {tab === 'Security' && (
          <div style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
            <div><label className="field-label">Password</label><button className="btn-secondary">Change password</button></div>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Two-factor authentication <input type="checkbox" /></label>
            <div><label className="field-label">Session timeout</label><select className="input-field" style={{ maxWidth: 240 }}><option>30 minutes</option><option>1 hour</option><option>4 hours</option></select></div>
            <div>
              <div className="field-label">Login history</div>
              <table className="data-table">
                <thead><tr><th>Device</th><th>IP</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {LOGIN_HISTORY.map(l => (
                    <tr key={l.id}><td>{l.device}</td><td>{l.ip}</td><td>{l.date}</td><td><span className={`badge ${l.status === 'Success' ? 'badge-green' : 'badge-red'}`}>{l.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 'Appearance' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 420 }}>
            <div>
              <label className="field-label">Theme</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={theme === 'light' ? 'btn-primary' : 'btn-secondary'} onClick={() => setTheme('light')}>Light</button>
                <button className={theme === 'dark' ? 'btn-primary' : 'btn-secondary'} onClick={() => setTheme('dark')}>Dark</button>
              </div>
            </div>
            <div><label className="field-label">Sidebar style</label><select className="input-field"><option>Expanded</option><option>Compact</option></select></div>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Compact mode <input type="checkbox" /></label>
            <div><label className="field-label">Font size</label><select className="input-field"><option>Default</option><option>Large</option></select></div>
            <button className="btn-primary" onClick={() => toast('success', 'Appearance saved.')}>Save</button>
          </div>
        )}
        {tab === 'Billing' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 18 }}>
              <div className="stat-card"><div className="muted">Current plan</div><div style={{ fontWeight: 800, fontSize: 22 }}>{tenant.plan}</div></div>
              <div className="stat-card"><div className="muted">Billing cycle</div><div style={{ fontWeight: 800, fontSize: 22 }}>Monthly</div></div>
              <div className="stat-card"><div className="muted">Status</div><span className={`badge ${tenant.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{tenant.status}</span></div>
            </div>
            <table className="data-table">
              <thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>2026-08-01</td><td>{tenant.plan} subscription</td><td>${tenant.plan === 'Premium' ? 499 : tenant.plan === 'Standard' ? 249 : 99}</td><td><span className="badge badge-green">Paid</span></td></tr>
                <tr><td>2026-07-01</td><td>{tenant.plan} subscription</td><td>${tenant.plan === 'Premium' ? 499 : tenant.plan === 'Standard' ? 249 : 99}</td><td><span className="badge badge-green">Paid</span></td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export function NotificationsPage() {
  const [items, setItems] = useState(NOTIFICATIONS)
  const [cat, setCat] = useState('All')
  const cats = ['All', 'Attendance', 'Fees', 'Exams', 'Assignments', 'Announcements', 'System']
  const filtered = items.filter(n => cat === 'All' || n.category === cat)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Notifications</div><div className="page-subtitle">Stay up to date across the school</div></div>
        <button className="btn-secondary" onClick={() => setItems(i => i.map(n => ({ ...n, read: true })))}>Mark all as read</button>
      </div>
      <div className="tab-bar">{cats.map(c => <div key={c} className={`tab-item${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</div>)}</div>
      <div className="card">
        {filtered.map(n => (
          <div key={n.id} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: 12, background: n.read ? 'transparent' : 'var(--primary-soft)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>{n.category}</div>
              <div style={{ fontWeight: 700 }}>{n.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{n.body}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.time}</div>
            <button className="btn-icon" onClick={() => setItems(i => i.map(x => x.id === n.id ? { ...x, read: true } : x))}><Icon.Check /></button>
            <button className="btn-icon" onClick={() => setItems(i => i.filter(x => x.id !== n.id))}><Icon.Trash /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MessagesPage() {
  const { toast } = useApp()
  const [selected, setSelected] = useState(MESSAGES[0])
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Messages</div><div className="page-subtitle">Internal school communication</div></div>
        <button className="btn-primary" onClick={() => toast('success', 'Message sent.')}><Icon.Send /> New Message</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }} className="max-lg:grid-cols-1">
        <div className="card">
          {MESSAGES.map(m => (
            <button key={m.id} onClick={() => setSelected(m)} style={{ width: '100%', textAlign: 'left', padding: 14, background: selected.id === m.id ? 'var(--primary-soft)' : 'none', border: 'none', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{m.subject}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.from} · {m.date}</div>
            </button>
          ))}
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 18 }}>{selected.subject}</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{selected.from} → {selected.to} · {selected.date}</div>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)' }}>{selected.preview} Please confirm once you have reviewed this in Xanaano.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <input className="input-field" placeholder="Write a reply..." />
            <button className="btn-primary" onClick={() => toast('success', 'Reply sent.')}><Icon.Send /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
