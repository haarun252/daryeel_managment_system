import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import DataTable from '../../components/DataTable'
import StatCard from '../../components/StatCard'
import { Icon } from '../../components/Icons'
import { SCHOOL_ADMINS, PLATFORM_USERS, PLATFORM_PAYMENTS, REVENUE_DATA, REVENUE_BY_PLAN, REVENUE_BY_SCHOOL, AUDIT_LOGS, SUPPORT_TICKETS, ROLES, ANNOUNCEMENTS, SCHOOLS, TEACHERS, PARENTS, DAU_WEEKLY, MODULE_USAGE, DELIVERY_DATA, API_ERRORS, initials } from '../../data/mockData'
import { ReportsPage } from '../shared/ReportsPage'
import { AnnouncementsPage } from '../shared/CommPages'

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
        {payload.map((p: any, i: number) => (
          <div key={i} style={{ fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: '#94a3b8' }}>{p.name}: </span>{prefix}{Number(p.value).toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function AdminsPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">School Admins</div><div className="page-subtitle">Tenant administrators</div></div></div>
      <DataTable
        data={SCHOOL_ADMINS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'school', 'email']}
        exportName="admins"
        columns={[
          { key: 'name', label: 'Admin', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar">{initials(String(r.name))}</div>{String(r.name)}</div> },
          { key: 'school', label: 'School' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'lastLogin', label: 'Last login' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'Suspended' ? 'badge-red' : 'badge-amber'}`}>{String(r.status)}</span> },
        ]}
      />
    </div>
  )
}

const statusBadge = (status: string) => {
  if (status === 'Active') return <span className="badge badge-green">Active</span>
  if (status === 'Invited') return <span className="badge badge-blue">Invited</span>
  if (status === 'Suspended') return <span className="badge badge-red">Suspended</span>
  return <span className="badge badge-gray">{status}</span>
}

export function UsersPage() {
  const [tab, setTab] = useState<'admins' | 'teachers' | 'parents'>('admins')

  const admins = SCHOOL_ADMINS
  const teachers = TEACHERS
  const parents = PARENTS

  const counts = {
    admins: { total: admins.length, active: admins.filter(u => u.status === 'Active').length, invited: admins.filter(u => u.status === 'Invited').length, suspended: admins.filter(u => u.status === 'Suspended').length },
    teachers: { total: teachers.length, active: teachers.filter(u => u.status === 'Active').length, invited: teachers.filter(u => u.status === 'Invited').length, suspended: 0 },
    parents: { total: parents.length, active: parents.filter(u => u.status === 'Active').length, invited: parents.filter(u => u.status === 'Invited').length, suspended: 0 },
  }

  return (
    <div>
      <div className="page-header"><div><div className="page-title">Users</div><div className="page-subtitle">All accounts across the platform</div></div></div>

      <div className="grid-stats" style={{ marginBottom: 20 }}>
        <StatCard label={`Total ${tab}`} value={counts[tab].total} icon={<Icon.Users />} iconBg="#dbeafe" iconColor="#1d4ed8" />
        <StatCard label="Active" value={counts[tab].active} icon={<Icon.CheckCircle />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Invited" value={counts[tab].invited} icon={<Icon.Send />} iconBg="#e0f2fe" iconColor="#0369a1" />
        <StatCard label="Suspended" value={counts[tab].suspended} icon={<Icon.AlertTriangle />} iconBg="#fee2e2" iconColor="#dc2626" />
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'var(--bg-muted)', padding: 4, borderRadius: 12, width: 'fit-content' }}>
        {([['admins', 'School Admins'], ['teachers', 'Teachers'], ['parents', 'Parents']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontSize: 13.5, fontWeight: 600,
              background: tab === key ? 'white' : 'transparent',
              color: tab === key ? '#1d4ed8' : '#64748b',
              boxShadow: tab === key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'admins' && (
        <DataTable
          data={admins as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'school', 'email']}
          exportName="school admins"
          columns={[
            { key: 'name', label: 'Admin', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar">{initials(String(r.name))}</div>{String(r.name)}</div> },
            { key: 'school', label: 'School' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'lastLogin', label: 'Last login' },
            { key: 'status', label: 'Status', render: r => statusBadge(String(r.status)) },
          ]}
        />
      )}
      {tab === 'teachers' && (
        <DataTable
          data={teachers as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'email', 'teacherId']}
          exportName="teachers"
          columns={[
            { key: 'name', label: 'Teacher', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar">{initials(String(r.name))}</div>{String(r.name)}</div> },
            { key: 'school', label: 'School', render: () => 'Green Valley Academy' },
            { key: 'subjects', label: 'Subjects', render: r => String((r.subjects as string[]).join(', ')) },
            { key: 'classes', label: 'Classes', render: r => String((r.classes as string[]).join(', ')) },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status', render: r => statusBadge(String(r.status)) },
          ]}
        />
      )}
      {tab === 'parents' && (
        <DataTable
          data={parents as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'email', 'phone']}
          exportName="parents"
          columns={[
            { key: 'name', label: 'Parent', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar">{initials(String(r.name))}</div>{String(r.name)}</div> },
            { key: 'school', label: 'School', render: () => 'Green Valley Academy' },
            { key: 'children', label: 'Children', render: r => String((r.children as string[]).join(', ') || '—') },
            { key: 'phone', label: 'Phone' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status', render: r => statusBadge(String(r.status)) },
          ]}
        />
      )}
    </div>
  )
}

export function PlatformPaymentsPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Payments</div><div className="page-subtitle">Tenant subscription payments</div></div></div>
      <DataTable
        data={PLATFORM_PAYMENTS as unknown as Record<string, unknown>[]}
        searchKeys={['school', 'plan']}
        exportName="payments"
        columns={[
          { key: 'school', label: 'School' },
          { key: 'plan', label: 'Plan' },
          { key: 'amount', label: 'Amount', render: r => `$${Number(r.amount)}` },
          { key: 'date', label: 'Date' },
          { key: 'method', label: 'Method' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Paid' ? 'badge-green' : r.status === 'Pending' ? 'badge-amber' : 'badge-red'}`}>{String(r.status)}</span> },
        ]}
      />
    </div>
  )
}

export function RevenuePage() {
  const today = 3180
  const month = 27900
  const year = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0)
  const outstanding = PLATFORM_PAYMENTS.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0)
  const refunds = 420
  const net = year - refunds

  return (
    <div>
      <div className="page-header"><div><div className="page-title">Platform Revenue</div><div className="page-subtitle">Full platform billing overview</div></div></div>

      <div className="grid-stats">
        <StatCard label="Today" value={`$${today.toLocaleString()}`} icon={<Icon.Dollar />} iconBg="#dbeafe" iconColor="#1d4ed8" />
        <StatCard label="This month" value={`$${month.toLocaleString()}`} icon={<Icon.Payment />} iconBg="#dcfce7" iconColor="#15803d" trend={{ value: '8.2%', positive: true }} />
        <StatCard label="This year" value={`$${year.toLocaleString()}`} icon={<Icon.Wallet />} iconBg="#e0f2fe" iconColor="#0369a1" trend={{ value: '12.6%', positive: true }} />
        <StatCard label="Outstanding" value={`$${outstanding.toLocaleString()}`} icon={<Icon.Clock />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Refunds" value={`$${refunds.toLocaleString()}`} icon={<Icon.XCircle />} iconBg="#fee2e2" iconColor="#dc2626" />
        <StatCard label="Net revenue" value={`$${net.toLocaleString()}`} icon={<Icon.TrendUp />} iconBg="#f0fdf4" iconColor="#16a34a" />
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Revenue by month</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} dy={10} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
            <Tooltip content={<CustomTooltip prefix="$" />} />
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revArea)" activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Revenue by plan</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={REVENUE_BY_PLAN} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <YAxis type="category" dataKey="plan" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ fill: 'rgba(241,245,249,0.4)' }} />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={18}>
                {REVENUE_BY_PLAN.map((entry, i) => (
                  <Cell key={i} fill={['#3b82f6', '#8b5cf6', '#10b981', '#94a3b8'][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Revenue by school</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={REVENUE_BY_SCHOOL} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="school" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={0} tickFormatter={(v) => v.split(' ')[0]} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ fill: 'rgba(241,245,249,0.4)' }} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Payment status</div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>School</th><th>Plan</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {PLATFORM_PAYMENTS.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, color: '#1e293b' }}>{p.school}</td>
                  <td><span className="badge badge-gray">{p.plan}</span></td>
                  <td style={{ fontWeight: 600 }}>${Number(p.amount).toLocaleString()}</td>
                  <td style={{ color: '#64748b' }}>{p.date}</td>
                  <td style={{ color: '#64748b' }}>{p.method}</td>
                  <td><span className={`badge ${p.status === 'Paid' ? 'badge-green' : p.status === 'Pending' ? 'badge-amber' : 'badge-red'}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function SystemAnalyticsPage() {
  const totalDau = DAU_WEEKLY.reduce((s, d) => s + d.dau, 0)
  const wau = Math.round(totalDau * 1.9)
  const mau = Math.round(totalDau * 3.4)
  const sentTotal = DELIVERY_DATA.reduce((s, d) => s + d.sent, 0)
  const deliveredTotal = DELIVERY_DATA.reduce((s, d) => s + d.delivered, 0)
  const failedTotal = DELIVERY_DATA.reduce((s, d) => s + d.failed, 0)

  return (
    <div>
      <div className="page-header"><div><div className="page-title">System Analytics</div><div className="page-subtitle">Usage, delivery and platform health</div></div></div>

      <div className="grid-stats">
        <StatCard label="DAU (7-day avg)" value={Math.round(totalDau / 7).toLocaleString()} icon={<Icon.Activity />} iconBg="#dbeafe" iconColor="#1d4ed8" trend={{ value: '4.1%', positive: true }} />
        <StatCard label="WAU" value={wau.toLocaleString()} icon={<Icon.Users />} iconBg="#f3e8ff" iconColor="#7c3aed" />
        <StatCard label="MAU" value={mau.toLocaleString()} icon={<Icon.Users />} iconBg="#e0f2fe" iconColor="#0369a1" />
        <StatCard label="Messages sent (7d)" value={sentTotal.toLocaleString()} icon={<Icon.Send />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Delivered" value={deliveredTotal.toLocaleString()} icon={<Icon.CheckCircle />} iconBg="#f0fdf4" iconColor="#16a34a" />
        <StatCard label="Failed" value={failedTotal.toLocaleString()} icon={<Icon.AlertTriangle />} iconBg="#fee2e2" iconColor="#dc2626" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Daily active users</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={DAU_WEEKLY}>
              <defs>
                <linearGradient id="dauArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="dau" name="DAU" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#dauArea)" activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Module usage</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={MODULE_USAGE} dataKey="value" nameKey="module" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {MODULE_USAGE.map((entry, i) => (
                  <Cell key={i} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'][i % 6]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Message delivery (7 days)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={DELIVERY_DATA} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="channel" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241,245,249,0.4)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="delivered" name="Delivered" stackId="a" fill="#16a34a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="failed" name="Failed" stackId="a" fill="#dc2626" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>API errors & job failures</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={API_ERRORS} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="errors" name="API errors" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="failures" name="Job failures" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>System status</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { name: 'API Gateway', status: 'Operational', ok: true },
            { name: 'Web App', status: 'Operational', ok: true },
            { name: 'Database', status: 'Operational', ok: true },
            { name: 'WhatsApp Provider', status: 'Degraded', ok: false },
            { name: 'Email Provider', status: 'Operational', ok: true },
            { name: 'SMS Provider', status: 'Operational', ok: true },
          ].map(s => (
            <div key={s.name} style={{ background: 'var(--bg-muted)', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.ok ? '#16a34a' : '#f59e0b' }} />
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</span>
              <span className={`badge ${s.ok ? 'badge-green' : 'badge-amber'}`} style={{ marginLeft: 'auto' }}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AuditLogsPage() {
  const [severity, setSeverity] = useState('All')
  const [status, setStatus] = useState('All')

  const filtered = AUDIT_LOGS.filter(l => (severity === 'All' || l.severity === severity) && (status === 'All' || l.status === status))

  return (
    <div>
      <div className="page-header"><div><div className="page-title">Audit Logs</div><div className="page-subtitle">Sensitive actions across the platform</div></div></div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 5 }}><Icon.Filter /> Filter</span>
        {['All', 'Info', 'Warning', 'Critical'].map(s => (
          <button
            key={s}
            onClick={() => setSeverity(s)}
            style={{
              padding: '6px 14px', borderRadius: 20, border: `1px solid ${severity === s ? 'var(--primary)' : '#e2e8f0'}`,
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              background: severity === s ? 'var(--primary)' : 'white',
              color: severity === s ? 'white' : '#64748b',
            }}
          >{s}</button>
        ))}
        <div style={{ width: 1, height: 20, background: '#e2e8f0', margin: '0 4px' }} />
        {['All', 'Success', 'Failed', 'Warning'].map(s => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: '6px 14px', borderRadius: 20, border: `1px solid ${status === s ? '#1e293b' : '#e2e8f0'}`,
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              background: status === s ? '#1e293b' : 'white',
              color: status === s ? 'white' : '#64748b',
            }}
          >{s}</button>
        ))}
      </div>

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        searchKeys={['user', 'action', 'module', 'school', 'resource']}
        exportName="audit logs"
        columns={[
          { key: 'user', label: 'User' },
          { key: 'school', label: 'School', render: r => String(r.school) === '—' ? <span style={{ color: '#94a3b8' }}>—</span> : String(r.school) },
          { key: 'action', label: 'Action' },
          { key: 'module', label: 'Module' },
          { key: 'resource', label: 'Resource', render: r => <span style={{ color: '#64748b', fontSize: 12.5 }}>{String(r.resource)}</span> },
          { key: 'severity', label: 'Severity', render: r => <span className={`badge ${r.severity === 'Critical' ? 'badge-red' : r.severity === 'Warning' ? 'badge-amber' : 'badge-gray'}`}>{String(r.severity)}</span> },
          { key: 'date', label: 'Date' },
          { key: 'ip', label: 'IP' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Success' ? 'badge-green' : r.status === 'Failed' ? 'badge-red' : 'badge-amber'}`}>{String(r.status)}</span> },
        ]}
      />
    </div>
  )
}

export function SupportPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Support</div><div className="page-subtitle">Tenant support tickets</div></div></div>
      <DataTable
        data={SUPPORT_TICKETS as unknown as Record<string, unknown>[]}
        searchKeys={['school', 'subject']}
        exportName="tickets"
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'school', label: 'School' },
          { key: 'subject', label: 'Subject' },
          { key: 'priority', label: 'Priority', render: r => <span className={`badge ${r.priority === 'Urgent' ? 'badge-red' : r.priority === 'High' ? 'badge-amber' : 'badge-gray'}`}>{String(r.priority)}</span> },
          { key: 'status', label: 'Status' },
          { key: 'date', label: 'Date' },
        ]}
      />
    </div>
  )
}

export function RolesPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Roles & Permissions</div><div className="page-subtitle">Frontend role matrix for the demo</div></div></div>
      <DataTable
        data={ROLES as unknown as Record<string, unknown>[]}
        searchKeys={['name']}
        exportName="roles"
        columns={[
          { key: 'name', label: 'Role' },
          { key: 'users', label: 'Users' },
          { key: 'description', label: 'Description' },
        ]}
      />
    </div>
  )
}

export function ActivityLogsPage() {
  return <AuditLogsPage />
}

export function PlatformAnnouncementsPage() {
  return <AnnouncementsPage />
}

export function PlatformReportsPage() {
  return <ReportsPage />
}

export function SuperAdminCharts() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={REVENUE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" fill="#2563eb" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}