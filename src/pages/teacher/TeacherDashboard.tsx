import { Icon } from '../../components/Icons'
import StatCard from '../../components/StatCard'
import { STUDENTS, ATTENDANCE, EXAMS, ANNOUNCEMENTS } from '../../data/mockData'

interface Props {
  onNavigate: (page: string) => void
}

const MY_CLASSES = [
  { name: 'Grade 7A', subject: 'Mathematics', students: 32, time: '08:00 AM', room: 'Room 201' },
  { name: 'Grade 8B', subject: 'Physics', students: 29, time: '10:00 AM', room: 'Room 105' },
  { name: 'Grade 7A', subject: 'Mathematics', students: 32, time: '01:00 PM', room: 'Room 201' },
]

const MY_STUDENTS = STUDENTS.filter(s => ['Grade 7', 'Grade 8'].some(c => s.class.startsWith(c))).slice(0, 8)
const TODAY_ATTENDANCE = ATTENDANCE.filter(a => ['Grade 7A', 'Grade 8B'].includes(a.class))

export default function TeacherDashboard({ onNavigate }: Props) {
  const present = TODAY_ATTENDANCE.filter(a => a.status === 'Present').length
  const total = TODAY_ATTENDANCE.length

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Teacher Dashboard</div>
          <div className="page-subtitle">James Okonkwo · Mathematics & Physics · Saturday, Aug 16, 2026</div>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('te-attendance')}><Icon.Attendance /> Mark Attendance</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        <StatCard label="My Classes" value={2} icon={<Icon.Class />} iconBg="#dbeafe" iconColor="#1d4ed8" />
        <StatCard label="Total Students" value={MY_STUDENTS.length} icon={<Icon.Student />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Today's Classes" value={MY_CLASSES.length} icon={<Icon.Timetable />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Today's Attendance" value={`${Math.round((present / total) * 100)}%`} icon={<Icon.Attendance />} iconBg="#f0fdf4" iconColor="#16a34a" subtitle={`${present}/${total} present`} />
        <StatCard label="Pending Assignments" value={3} icon={<Icon.Assignment />} iconBg="#f3e8ff" iconColor="#7c3aed" />
        <StatCard label="Upcoming Exams" value={EXAMS.filter(e => e.status === 'Upcoming').length} icon={<Icon.Exam />} iconBg="#e0f2fe" iconColor="#0369a1" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Today's schedule */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 16 }}>Today's Schedule</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MY_CLASSES.map((cls, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center',
                padding: '12px 14px',
                background: i === 1 ? '#eff6ff' : '#f8fafc',
                borderRadius: 10,
                border: i === 1 ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: i === 1 ? '#2563eb' : '#e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: i === 1 ? 'white' : '#64748b', flexShrink: 0,
                }}>
                  <Icon.Class />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>{cls.subject} — {cls.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{cls.time} · {cls.room} · {cls.students} students</div>
                </div>
                {i === 1 && <span className="badge badge-blue">Now</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Attendance summary */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 16 }}>Today's Attendance</div>
          {TODAY_ATTENDANCE.map(a => (
            <div key={a.studentId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                  {a.studentName.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{a.studentName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{a.class}</span>
                <span className={`badge ${a.status === 'Present' ? 'badge-green' : a.status === 'Absent' ? 'badge-red' : a.status === 'Late' ? 'badge-amber' : 'badge-blue'}`}>
                  {a.status}
                </span>
              </div>
            </div>
          ))}
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => onNavigate('te-attendance')}>
            <Icon.Edit /> Edit Attendance
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* My students */}
        <div className="card">
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a' }}>My Students</div>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => onNavigate('te-students')}>View all</button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Class</th><th>Attendance</th><th>Performance</th></tr>
              </thead>
              <tbody>
                {MY_STUDENTS.slice(0, 6).map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{s.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: '#64748b' }}>{s.class} {s.section}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ width: 44, height: 5, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ width: `${s.attendance}%`, height: '100%', background: s.attendance >= 90 ? '#22c55e' : s.attendance >= 75 ? '#f59e0b' : '#ef4444', borderRadius: 10 }} />
                        </div>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{s.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.attendance >= 90 ? 'badge-green' : s.attendance >= 75 ? 'badge-amber' : 'badge-red'}`}>
                        {s.attendance >= 90 ? 'Excellent' : s.attendance >= 75 ? 'Good' : 'Needs Attn'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 14 }}>Announcements</div>
          {ANNOUNCEMENTS.map(a => (
            <div key={a.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #f8fafc' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>{a.title}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{a.date}</span>
                <span className="badge badge-gray" style={{ fontSize: 10 }}>{a.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
