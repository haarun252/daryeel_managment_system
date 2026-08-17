import { useEffect, useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import StatCard from '../../components/StatCard'
import { Icon } from '../../components/Icons'
import { STUDENTS, TEACHERS, ATTENDANCE_WEEKLY, FEE_MONTHLY, ANNOUNCEMENTS, EVENTS, EXAMS, STUDENT_GROWTH_DATA, ENROLLMENT_MONTHLY } from '../../data/mockData'
import { SkeletonCards, SkeletonChart } from '../../components/EmptyState'
import { useApp } from '../../context/AppContext'

interface Props {
  onNavigate: (page: string) => void
}

export default function SchoolDashboard({ onNavigate }: Props) {
  const { tenant } = useApp()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(t)
  }, [])

  const presentToday = 782
  const totalStudents = 842
  const attendancePct = Math.round((presentToday / totalStudents) * 100)

  if (loading) {
    return (
      <div>
        <div className="page-title" style={{ marginBottom: 18 }}>School Dashboard</div>
        <SkeletonCards />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <SkeletonChart /><SkeletonChart />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">School Dashboard</div>
          <div className="page-subtitle">{tenant.name} — Academic Year 2025–2026</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => onNavigate('ad-reports')}><Icon.Report /> Reports</button>
          <button className="btn-primary" onClick={() => onNavigate('ad-students')}><Icon.Plus /> Add Student</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Students" value={totalStudents} icon={<Icon.Student />} iconBg="#dbeafe" iconColor="#1d4ed8" trend={{ value: '5.2%', positive: true }} />
        <StatCard label="Total Teachers" value={TEACHERS.length} icon={<Icon.Teacher />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Total Parents" value="638" icon={<Icon.Parent />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Total Classes" value="24" icon={<Icon.Class />} iconBg="#e0f2fe" iconColor="#0369a1" />
        <StatCard label="Today's Attendance" value={`${attendancePct}%`} icon={<Icon.Attendance />} iconBg="#f0fdf4" iconColor="#16a34a" subtitle={`${presentToday} present`} />
        <StatCard label="Pending Fees" value="$18,400" icon={<Icon.Fees />} iconBg="#fee2e2" iconColor="#dc2626" subtitle="32 students" />
        <StatCard label="Upcoming Exams" value="3" icon={<Icon.Exam />} iconBg="#f3e8ff" iconColor="#7c3aed" subtitle="This week" />
        <StatCard label="Upcoming Events" value={EVENTS.length} icon={<Icon.Event />} iconBg="#fdf2f8" iconColor="#be185d" subtitle="Next 30 days" />
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>Weekly Attendance</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Present / Absent / Late this week</div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={ATTENDANCE_WEEKLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend />
              <Bar dataKey="present" fill="#22c55e" radius={[3, 3, 0, 0]} name="Present" />
              <Bar dataKey="late" fill="#f59e0b" name="Late" />
              <Bar dataKey="absent" fill="#f87171" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>Fee Collection</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Collected vs pending per month</div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={FEE_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="collected" stroke="#2563eb" strokeWidth={2} fill="#dbeafe" name="Collected" />
              <Area type="monotone" dataKey="pending" stroke="#f87171" strokeWidth={2} fill="none" strokeDasharray="4 3" name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Student Growth</div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 12 }}>Enrollment over time</div>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={STUDENT_GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="students" stroke="#2563eb" fill="#dbeafe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Enrollment</div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 12 }}>Monthly student enrollment</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={ENROLLMENT_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="students" fill="#2563eb" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Attendance Overview</div>
          <div className="muted" style={{ fontSize: 12, marginBottom: 12 }}>Present / Absent / Late</div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={[{ name: 'Present', value: 782 }, { name: 'Absent', value: 42 }, { name: 'Late', value: 18 }]} dataKey="value" innerRadius={40} outerRadius={64} paddingAngle={3}>
                <Cell fill="#22c55e" /><Cell fill="#f87171" /><Cell fill="#f59e0b" />
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Recent students */}
        <div className="card">
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Recent Students</div>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => onNavigate('ad-students')}>View all</button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Class</th><th>Attendance</th><th>Fees</th></tr>
              </thead>
              <tbody>
                {STUDENTS.slice(0, 6).map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{s.name}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>{s.class} {s.section}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ flex: 1, height: 5, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden', minWidth: 50 }}>
                          <div style={{ width: `${s.attendance}%`, height: '100%', background: s.attendance >= 90 ? '#22c55e' : s.attendance >= 75 ? '#f59e0b' : '#f87171', borderRadius: 10 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#64748b', flexShrink: 0 }}>{s.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.fees === 'Paid' ? 'badge-green' : s.fees === 'Pending' ? 'badge-amber' : 'badge-red'}`}>
                        {s.fees}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar events & announcements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Upcoming exams */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>Upcoming Exams</div>
            {EXAMS.filter(e => e.status === 'Upcoming').map(exam => (
              <div key={exam.id} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, background: '#f3e8ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', flexShrink: 0 }}>
                  <Icon.Exam />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{exam.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{exam.date} · {exam.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>Recent Announcements</div>
            {ANNOUNCEMENTS.slice(0, 3).map(a => (
              <div key={a.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {a.urgent && <span className="badge badge-red" style={{ fontSize: 10, padding: '2px 6px', flexShrink: 0 }}>Urgent</span>}
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', lineHeight: 1.4 }}>{a.title}</div>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{a.date} · {a.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
