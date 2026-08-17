import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import StatCard from '../../components/StatCard'
import { Icon } from '../../components/Icons'
import DataTable from '../../components/DataTable'
import Modal from '../../components/Modal'
import { SCHOOLS, REVENUE_DATA, SCHOOL_GROWTH_DATA, SUBSCRIPTION_PLANS, RECENT_REGISTRATIONS, SCHOOLS_REQUIRING_ATTENTION, PLATFORM_ACTIVITY, planPrice, initials } from '../../data/mockData'
import type { School } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

interface Props {
  onNavigate: (page: string) => void
}

const CustomTooltip = ({ active, payload, label, prefix = '' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(25, 30, 40, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '10px 14px',
        borderRadius: 12,
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>
          {prefix}{Number(payload[0].value).toLocaleString()}
        </div>
      </div>
    )
  }
  return null
}

const planColors: Record<string, string> = { Premium: '#3b82f6', Standard: '#ec4899', Basic: '#10b981', Trial: '#94a3b8' }

export default function SuperAdminDashboard({ onNavigate }: Props) {
  const { toast } = useApp()
  const [schools, setSchools] = useState<School[]>(SCHOOLS)
  const [view, setView] = useState<School | null>(null)

  const totalStudents = schools.reduce((s, x) => s + x.students, 0)
  const totalTeachers = schools.reduce((s, x) => s + x.teachers, 0)
  const totalParents = Math.round(totalStudents * 0.58)
  const activeSchools = schools.filter(s => s.status === 'Active').length
  const trialSchools = schools.filter(s => s.plan === 'Trial').length
  const suspendedSchools = schools.filter(s => s.status === 'Suspended').length
  const mrr = schools.filter(s => s.status === 'Active').reduce((s, x) => s + planPrice(x.plan), 0)

  const planData = ['Premium', 'Standard', 'Basic', 'Trial'].map(name => ({
    name,
    value: schools.filter(s => s.plan === name).length,
  }))

  const toggleStatus = (school: School) => {
    setSchools(list => list.map(x => x.id === school.id ? { ...x, status: x.status === 'Suspended' ? 'Active' : 'Suspended' } : x))
    toast('success', `${school.name} ${school.status === 'Suspended' ? 'activated.' : 'suspended.'}`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingRight: 10 }}>
      {/* Header section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
          Overview
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
            borderRadius: 14, fontSize: 13, color: '#475569', fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.8)', cursor: 'pointer'
          }}>
            Last 30 days: 15 Nov – 14 Dec <Icon.ChevronDown />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
        <StatCard label="Total Schools" value={schools.length} icon={<Icon.School />} iconBg="#dbeafe" iconColor="#1d4ed8" />
        <StatCard label="Active Schools" value={activeSchools} icon={<Icon.CheckCircle />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Trial Schools" value={trialSchools} icon={<Icon.Timetable />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Suspended Schools" value={suspendedSchools} icon={<Icon.AlertTriangle />} iconBg="#fee2e2" iconColor="#dc2626" />
        <StatCard label="Total Students" value={totalStudents.toLocaleString()} icon={<Icon.Student />} iconBg="#e0f2fe" iconColor="#0369a1" />
        <StatCard label="Total Teachers" value={totalTeachers.toLocaleString()} icon={<Icon.Teacher />} iconBg="#f0fdf4" iconColor="#16a34a" />
        <StatCard label="Total Parents" value={totalParents.toLocaleString()} icon={<Icon.Parent />} iconBg="#f3e8ff" iconColor="#7c3aed" />
        <StatCard label="Monthly Recurring Revenue" value={`$${mrr.toLocaleString()}`} icon={<Icon.Dollar />} iconBg="#dbeafe" iconColor="#1d4ed8" trend={{ value: '10.4%', positive: true }} />
      </div>

      {/* Top row: revenue trend + subscription distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        <div className="card" style={{ padding: '24px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Revenue Trend</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, background: '#dcfce7', padding: '2px 8px', borderRadius: 20 }}>
                  <Icon.TrendUp /> 2.67%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} /> This year
                </div>
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => onNavigate('sa-revenue')}>
              Full Report <Icon.ChevronRight />
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.6)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription distribution */}
        <div className="card" style={{ padding: '24px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Subscription Distribution</span>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => onNavigate('sa-subscriptions')}>
              Manage <Icon.ChevronRight />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 160 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%', paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
              {planData.map(p => (
                <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 14, height: `${Math.max(10, p.value * 22)}%`, background: planColors[p.name], borderRadius: 6 }} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {planData.map(p => (
                <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: planColors[p.name] }} />
                    <span style={{ color: '#64748b' }}>{p.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle row: school growth + new schools */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: '24px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>School Growth</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon.TrendUp /> 5.52%
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SCHOOL_GROWTH_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.6)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} content={<CustomTooltip />} />
              <Bar dataKey="schools" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* New schools this month */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>New Schools This Month</div>
          {RECENT_REGISTRATIONS.map(r => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="avatar" style={{ background: '#dbeafe', color: '#1d4ed8' }}>{initials(r.school)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>{r.school}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{r.admin} · {r.date}</div>
              </div>
              <span className="badge badge-blue">{r.plan}</span>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('sa-schools')}>View all schools</button>
        </div>
      </div>

      {/* Bottom row: attention + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Schools Requiring Attention</div>
          {SCHOOLS_REQUIRING_ATTENTION.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
              <span className={`badge ${item.severity === 'Critical' ? 'badge-red' : 'badge-amber'}`} style={{ flexShrink: 0 }}>{item.severity}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1e293b' }}>{item.school}</div>
                <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{item.issue}</div>
              </div>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('sa-schools')}>Resolve</button>
        </div>

        <div className="card" style={{ padding: '20px 24px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Recent Platform Activity</div>
          {PLATFORM_ACTIVITY.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.Activity />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  <b style={{ color: '#1e293b' }}>{a.actor}</b> {a.action.toLowerCase()}
                </div>
                <div style={{ fontSize: 11.5, color: '#94a3b8' }}>{a.time} · {a.module}</div>
              </div>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onNavigate('sa-audit')}>View audit logs</button>
        </div>
      </div>

      {/* Schools table */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#0f172a' }}>Schools</div>
          <button className="btn-secondary" onClick={() => onNavigate('sa-schools')}>Manage schools</button>
        </div>
        <DataTable
          data={schools as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'admin']}
          exportName="schools"
          searchPlaceholder="Search schools..."
          columns={[
            { key: 'name', label: 'School', render: r => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar">{initials(String(r.name))}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>{String(r.email)}</div>
                </div>
              </div>
            ) },
            { key: 'admin', label: 'Admin' },
            { key: 'students', label: 'Students', render: r => Number(r.students).toLocaleString() },
            { key: 'plan', label: 'Plan', render: r => <span className={`badge ${r.plan === 'Premium' ? 'badge-blue' : r.plan === 'Standard' ? 'badge-purple' : 'badge-gray'}`}>{String(r.plan)}</span> },
            { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'Suspended' ? 'badge-red' : 'badge-amber'}`}>{String(r.status)}</span> },
            { key: 'createdDate', label: 'Created' },
            { key: 'renewalDate', label: 'Renewal' },
          ]}
          actions={r => {
            const s = r as unknown as School
            return (
              <div style={{ display: 'flex', gap: 2 }}>
                <button className="btn-icon" title="View" onClick={() => setView(s)}><Icon.Eye /></button>
                {s.status === 'Suspended'
                  ? <button className="btn-icon" title="Activate" style={{ color: '#16a34a' }} onClick={() => toggleStatus(s)}><Icon.Check /></button>
                  : <button className="btn-icon" title="Suspend" style={{ color: '#dc2626' }} onClick={() => toggleStatus(s)}><Icon.AlertTriangle /></button>}
              </div>
            )
          }}
        />
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title="School Overview" size="lg"
        footer={<>
          <button className="btn-secondary" onClick={() => setView(null)}>Close</button>
          <button className="btn-primary" onClick={() => { onNavigate('sa-schools'); setView(null) }}>Open full details</button>
        </>}>
        {view && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-muted)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>{initials(view.name)}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{view.name}</div>
                <div className="muted">{view.admin} · {view.plan} plan</div>
              </div>
              <span className={`badge ${view.status === 'Active' ? 'badge-green' : view.status === 'Suspended' ? 'badge-red' : 'badge-amber'}`} style={{ marginLeft: 'auto' }}>{view.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Students', view.students.toLocaleString()], ['Teachers', view.teachers], ['Renewal', view.renewalDate], ['Created', view.createdDate]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                  <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}