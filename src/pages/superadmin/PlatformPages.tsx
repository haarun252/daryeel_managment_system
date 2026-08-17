import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import DataTable from '../../components/DataTable'
import StatCard from '../../components/StatCard'
import { Icon } from '../../components/Icons'
import { SCHOOL_ADMINS, PLATFORM_USERS, PLATFORM_PAYMENTS, REVENUE_DATA, AUDIT_LOGS, SUPPORT_TICKETS, ROLES, ANNOUNCEMENTS, SCHOOLS, initials } from '../../data/mockData'
import { ReportsPage } from '../shared/ReportsPage'
import { AnnouncementsPage } from '../shared/CommPages'

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
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
      />
    </div>
  )
}

export function UsersPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Users</div><div className="page-subtitle">All platform accounts</div></div></div>
      <DataTable
        data={PLATFORM_USERS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'email', 'role', 'school']}
        exportName="users"
        columns={[
          { key: 'name', label: 'User' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'school', label: 'School / tenant' },
          { key: 'lastLogin', label: 'Last login' },
          { key: 'status', label: 'Status', render: r => <span className="badge badge-green">{String(r.status)}</span> },
        ]}
      />
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
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Revenue</div><div className="page-subtitle">Platform billing overview</div></div></div>
      <div className="grid-stats">
        <StatCard label="MRR" value="$78,400" icon={<Icon.Dollar />} iconBg="#dbeafe" iconColor="#1d4ed8" trend={{ value: '10.4%', positive: true }} />
        <StatCard label="Active schools" value={SCHOOLS.filter(s => s.status === 'Active').length} icon={<Icon.School />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Pending" value="$4,200" icon={<Icon.Payment />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Failed" value="$99" icon={<Icon.AlertTriangle />} iconBg="#fee2e2" iconColor="#dc2626" />
      </div>
      <div className="card" style={{ padding: 20 }}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#dbeafe" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function AuditLogsPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Audit Logs</div><div className="page-subtitle">Sensitive actions across the platform</div></div></div>
      <DataTable
        data={AUDIT_LOGS as unknown as Record<string, unknown>[]}
        searchKeys={['user', 'action', 'module']}
        exportName="audit logs"
        columns={[
          { key: 'user', label: 'User' },
          { key: 'action', label: 'Action' },
          { key: 'module', label: 'Module' },
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
