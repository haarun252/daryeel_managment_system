import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import { useApp } from '../../context/AppContext'
import { LOGIN_HISTORY, BUSES, PLATFORM_USERS, TEACHER_NOTIFICATIONS, TEACHERS } from '../../data/mockData'
import { NOTIFICATIONS, MESSAGES, PLATFORM_NOTIFICATIONS } from '../../data/mockData'

export function ProfilePage() {
  const { user, role, toast } = useApp()
  const [edit, setEdit] = useState(false)
  const [pwd, setPwd] = useState(false)
  const teacher = role === 'teacher' ? TEACHERS.find(t => t.name === user.name) : null
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
      {teacher && (
        <div className="card" style={{ padding: 20, marginTop: 16 }}>
          <div className="field-label" style={{ marginBottom: 10 }}>Assigned subjects &amp; classes</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {teacher.subjects.map(s => <span key={s} className="badge badge-blue">{s}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {teacher.classes.map(c => <span key={c} className="badge badge-gray">{c}</span>)}
          </div>
        </div>
      )}
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
  const [tab, setTab] = useState(initialTab ?? (variant === 'platform' ? 'Identity' : variant === 'user' ? 'Appearance' : 'General'))
  const tabs = variant === 'platform'
    ? ['Identity', 'Subscription plans', 'Email provider', 'WhatsApp provider', 'Security', 'Feature flags', 'Maintenance', 'Audit configuration']
    : variant === 'user'
      ? ['Notifications', 'Security', 'Appearance']
      : ['General', 'Academic', 'Working days', 'Fees', 'Transport', 'Users', 'Notifications', 'Security', 'Appearance', 'Billing']

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
        {tab === 'Working days' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 560 }}>
            <div>
              <div className="field-label">School week</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => (
                  <label key={d} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 12px', background: i < 5 ? 'var(--primary-soft)' : 'var(--bg-muted)', borderRadius: 8 }}>
                    <input type="checkbox" defaultChecked={i < 5} /> {d}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="field-label">Start time</label><input className="input-field" defaultValue="08:00" /></div>
              <div><label className="field-label">End time</label><input className="input-field" defaultValue="14:00" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="field-label">Break start</label><input className="input-field" defaultValue="11:00" /></div>
              <div><label className="field-label">Break end</label><input className="input-field" defaultValue="12:00" /></div>
            </div>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Allow Saturday classes <input type="checkbox" /></label>
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Working days saved.')}>Save</button>
          </div>
        )}
        {tab === 'Fees' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 560 }}>
            <div><label className="field-label">Default fee types</label><input className="input-field" defaultValue="Tuition, Transport, Uniform, Activity" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label className="field-label">Late fee (%)</label><input className="input-field" type="number" defaultValue="5" /></div>
              <div><label className="field-label">Grace days</label><input className="input-field" type="number" defaultValue="7" /></div>
            </div>
            <div><label className="field-label">Receipt footer note</label><input className="input-field" defaultValue="Thank you for your payment. Green Valley Academy" /></div>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Auto-send reminders for overdue fees <input type="checkbox" defaultChecked /></label>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Allow partial payments <input type="checkbox" defaultChecked /></label>
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Fee settings saved.')}>Save</button>
          </div>
        )}
        {tab === 'Transport' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Enable school transport module <input type="checkbox" defaultChecked /></label>
            <table className="data-table">
              <thead><tr><th>Route</th><th>Bus</th><th>Capacity</th><th>Driver</th><th>Status</th></tr></thead>
              <tbody>
                {BUSES.map(b => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 600 }}>{b.route}</td>
                    <td>{b.plate}</td>
                    <td className="muted">{b.capacity} seats · {b.assigned} assigned</td>
                    <td className="muted">{b.driver}</td>
                    <td><span className={`badge ${b.status === 'Active' ? 'badge-green' : b.status === 'Maintenance' ? 'badge-amber' : 'badge-red'}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" onClick={() => toast('success', 'Route added.')}><Icon.Plus /> Add route</button>
              <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Transport settings saved.')}>Save</button>
            </div>
          </div>
        )}
        {tab === 'Users' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 640 }}>
            <table className="data-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last login</th></tr></thead>
              <tbody>
                {PLATFORM_USERS.filter(u => u.school === tenant.name).map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td className="muted">{u.email}</td>
                    <td><span className="badge badge-blue">{u.role}</span></td>
                    <td><span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{u.status}</span></td>
                    <td className="muted">{u.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={() => toast('success', 'Invitation sent.')}><Icon.Plus /> Invite user</button>
              <button className="btn-secondary" onClick={() => toast('success', 'Roles updated.')}>Manage roles</button>
            </div>
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
        {variant === 'platform' && tab === 'Identity' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 720 }}>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Platform name</label><input className="input-field" defaultValue="Xanaano" /></div>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Platform logo</label><button className="btn-secondary"><Icon.Upload /> Upload logo</button></div>
            <div><label className="field-label">Support email</label><input className="input-field" defaultValue="support@xanaano.com" /></div>
            <div><label className="field-label">Support phone</label><input className="input-field" defaultValue="+1 (555) 000-0000" /></div>
            <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Default tenant branding</label><input className="input-field" defaultValue="Powered by Xanaano" /></div>
            <button className="btn-primary" onClick={() => toast('success', 'Platform identity saved.')}>Save changes</button>
          </div>
        )}
        {variant === 'platform' && tab === 'Subscription plans' && (
          <div style={{ display: 'grid', gap: 12, maxWidth: 720 }}>
            {[
              { plan: 'Basic', price: '$99/mo', schools: '2 subscribers', note: 'Core modules' },
              { plan: 'Standard', price: '$249/mo', schools: '3 subscribers', note: '+ exams, results' },
              { plan: 'Premium', price: '$499/mo', schools: '2 subscribers', note: 'Everything incl. WhatsApp' },
              { plan: 'Trial', price: '$0 (30 days)', schools: '1 subscriber', note: 'Auto-converts to Basic' },
            ].map(p => (
              <div key={p.plan} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--bg-muted)', borderRadius: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{p.plan}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{p.note}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.price}</div>
                <span className="badge badge-gray">{p.schools}</span>
                <button className="btn-secondary" onClick={() => toast('success', `${p.plan} plan updated.`)}><Icon.Edit /></button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-primary" onClick={() => toast('success', 'Plans saved.')}>Save changes</button>
              <button className="btn-secondary"><Icon.Plus /> New plan</button>
            </div>
          </div>
        )}
        {variant === 'platform' && tab === 'Email provider' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 560 }}>
            <div><label className="field-label">Provider</label><select className="input-field"><option>SendGrid</option><option>Amazon SES</option><option>Mailgun</option></select></div>
            <div><label className="field-label">From address</label><input className="input-field" defaultValue="no-reply@xanaano.com" /></div>
            <div><label className="field-label">API key</label><input className="input-field" type="password" defaultValue="sg_live_••••••••••••" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-green">Connected</span>
              <button className="btn-secondary" onClick={() => toast('success', 'Test email sent.')}><Icon.Send /> Send test email</button>
            </div>
            <button className="btn-primary" onClick={() => toast('success', 'Email provider saved.')}>Save</button>
          </div>
        )}
        {variant === 'platform' && tab === 'WhatsApp provider' && (
          <div style={{ display: 'grid', gap: 14, maxWidth: 560 }}>
            <div><label className="field-label">Provider</label><select className="input-field"><option>Meta WhatsApp Business API</option><option>Twilio</option></select></div>
            <div><label className="field-label">Business phone number</label><input className="input-field" defaultValue="+1 (555) 111-2222" /></div>
            <div><label className="field-label">Access token</label><input className="input-field" type="password" defaultValue="EAAG••••••••••••" /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-amber">Degraded — last 18 messages failed (Riverside)</span>
              <button className="btn-secondary" onClick={() => toast('success', 'Test message sent.')}><Icon.Send /> Send test message</button>
            </div>
            <button className="btn-primary" onClick={() => toast('success', 'WhatsApp provider saved.')}>Save</button>
          </div>
        )}
        {variant === 'platform' && tab === 'Security' && (
          <div style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Require 2FA for platform admins <input type="checkbox" defaultChecked /></label>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Auto-block after 5 failed logins <input type="checkbox" defaultChecked /></label>
            <div><label className="field-label">Session timeout</label><select className="input-field" style={{ maxWidth: 240 }}><option>30 minutes</option><option>1 hour</option></select></div>
            <div style={{ background: 'var(--bg-muted)', borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Impersonation <span className="badge badge-gray" style={{ marginLeft: 6 }}>Off</span></div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Support agents may view a school as its admin to diagnose issues. Constraints: sessions stay within platform boundaries, an amber banner marks every impersonated session, all actions are written to the audit log with the impersonating agent, and destructive actions are blocked while impersonating.
              </div>
            </div>
            <button className="btn-primary" onClick={() => toast('success', 'Security settings saved.')}>Save</button>
          </div>
        )}
        {variant === 'platform' && tab === 'Feature flags' && (
          <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
            {[
              ['Impersonation', false],
              ['WhatsApp messaging', true],
              ['AI exam grading', false],
              ['Parent portal', true],
              ['Public school websites', true],
            ].map(([name, on]) => (
              <label key={name as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 8 }}>
                {name as string} <input type="checkbox" defaultChecked={on as boolean} />
              </label>
            ))}
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Feature flags updated.')}>Save</button>
          </div>
        )}
        {variant === 'platform' && tab === 'Maintenance' && (
          <div style={{ display: 'grid', gap: 16, maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg-muted)', borderRadius: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Nightly backups</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Last completed: today 03:10 UTC · Retention: 30 days</div>
              </div>
              <span className="badge badge-green">Healthy</span>
              <button className="btn-secondary" onClick={() => toast('success', 'Backup started.')}>Back up now</button>
            </div>
            <label style={{ display: 'flex', justifyContent: 'space-between' }}>Maintenance window <input type="checkbox" defaultChecked /></label>
            <div><label className="field-label">Scheduled window (UTC)</label><input className="input-field" defaultValue="Sat 02:00 – 04:00" /></div>
            <div><label className="field-label">Announcement banner</label><input className="input-field" defaultValue="Platform maintenance this Saturday 02:00–04:00 UTC" /></div>
            <button className="btn-primary" onClick={() => toast('success', 'Maintenance settings saved.')}>Save</button>
          </div>
        )}
        {variant === 'platform' && tab === 'Audit configuration' && (
          <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
            {[
              ['Log authentication events', true],
              ['Log role & permission changes', true],
              ['Log billing actions', true],
              ['Log impersonation sessions', true],
              ['Retain logs for 365 days', true],
            ].map(([name, on]) => (
              <label key={name as string} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '10px 12px', background: 'var(--bg-muted)', borderRadius: 8 }}>
                {name as string} <input type="checkbox" defaultChecked={on as boolean} />
              </label>
            ))}
            <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => toast('success', 'Audit configuration saved.')}>Save</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function NotificationsPage({ variant = 'school' }: { variant?: 'school' | 'platform' | 'teacher' }) {
  const source = variant === 'platform' ? PLATFORM_NOTIFICATIONS : variant === 'teacher' ? TEACHER_NOTIFICATIONS : NOTIFICATIONS
  const [items, setItems] = useState(source)
  const [cat, setCat] = useState('All')
  const [announce, setAnnounce] = useState(false)
  const [aTitle, setATitle] = useState('')
  const [aBody, setABody] = useState('')
  const [audience, setAudience] = useState('All')
  const [channels, setChannels] = useState<string[]>(['Email'])
  const cats = variant === 'platform'
    ? ['All', 'System', 'Billing', 'Security', 'Delivery']
    : variant === 'teacher'
      ? ['All', 'Admin', 'Schedule', 'Announcements', 'Reports', 'Exams']
      : ['All', 'Attendance', 'Fees', 'Exams', 'Reports', 'Transport', 'System']
  const filtered = items.filter(n => cat === 'All' || n.category === cat)
  const toggleChannel = (c: string) => setChannels(ch => ch.includes(c) ? ch.filter(x => x !== c) : [...ch, c])
  const publish = () => {
    if (!aTitle.trim()) return
    setItems(i => [{ id: `n${Date.now()}`, category: 'Announcements', title: aTitle, body: aBody || 'No additional details', time: 'Just now', read: false }, ...i])
    setAnnounce(false)
    setATitle('')
    setABody('')
    setAudience('All')
    setChannels(['Email'])
  }
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Notifications</div><div className="page-subtitle">{variant === 'platform' ? 'Platform-wide alerts, billing and system events' : 'Stay up to date across the school'}</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          {variant === 'school' && <button className="btn-primary" onClick={() => setAnnounce(true)}><Icon.Announcement /> New Announcement</button>}
          <button className="btn-secondary" onClick={() => setItems(i => i.map(n => ({ ...n, read: true })))}>Mark all as read</button>
        </div>
      </div>
      <div className="tab-bar">{cats.map(c => <div key={c} className={`tab-item${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</div>)}</div>
      <div className="card">
        {filtered.length === 0 && <div className="muted" style={{ padding: 24, textAlign: 'center' }}>No notifications in this category.</div>}
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
      <Modal open={announce} onClose={() => setAnnounce(false)} title="New announcement" footer={<>
        <button className="btn-secondary" onClick={() => setAnnounce(false)}>Cancel</button>
        <button className="btn-primary" disabled={!aTitle.trim()} onClick={publish}>Publish</button>
      </>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="field-label">Title</label><input className="input-field" value={aTitle} onChange={e => setATitle(e.target.value)} placeholder="e.g. School closed on Friday" /></div>
          <div><label className="field-label">Message</label><textarea className="input-field" rows={3} value={aBody} onChange={e => setABody(e.target.value)} /></div>
          <div><label className="field-label">Audience</label><select className="input-field" value={audience} onChange={e => setAudience(e.target.value)}><option>All</option><option>Students</option><option>Parents</option><option>Teachers</option><option>Specific class</option></select></div>
          {audience === 'Specific class' && <div><label className="field-label">Class</label><select className="input-field"><option>Grade 7A</option><option>Grade 8B</option><option>Grade 6A</option></select></div>}
          <div>
            <div className="field-label">Channels</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['Email', 'SMS', 'WhatsApp', 'Push'].map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '6px 10px', background: 'var(--bg-muted)', borderRadius: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={channels.includes(c)} onChange={() => toggleChannel(c)} /> {c}
                </label>
              ))}
            </div>
          </div>
          <div><label className="field-label">Priority</label><select className="input-field"><option>Normal</option><option>High</option><option>Urgent</option></select></div>
          <div className="muted" style={{ fontSize: 12 }}>{channels.join(', ') || 'No channels'} · {audience === 'Specific class' ? 'One class' : audience === 'All' ? 'Everyone' : audience}</div>
        </div>
      </Modal>
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
