import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { useApp } from '../../context/AppContext'
import { ATTENDANCE, initials } from '../../data/mockData'
import { myTeacher, myClassNames, myStudentsOf } from './TeacherClassesStudents'

type AttStatus = 'Present' | 'Absent' | 'Late' | 'Excused'

interface AuditEntry {
  id: string
  className: string
  date: string
  session: string
  counts: Record<AttStatus, number>
  by: string
  time: string
}

const STATUS_BADGE: Record<AttStatus, string> = {
  Present: 'badge-green',
  Absent: 'badge-red',
  Late: 'badge-amber',
  Excused: 'badge-blue',
}

export default function TeacherAttendance() {
  const { user, toast } = useApp()
  const teacher = myTeacher(user?.name)
  const classes = myClassNames(user?.name)
  const myStudents = myStudentsOf(user?.name)

  const [selectedClass, setSelectedClass] = useState(classes[0] ?? 'Grade 7A')
  const [date, setDate] = useState('2026-08-17')
  const [session, setSession] = useState('Morning')
  const [marks, setMarks] = useState<Record<string, AttStatus>>({})
  const [saved, setSaved] = useState(false)
  const [audit, setAudit] = useState<AuditEntry[]>([])

  const students = myStudents.filter(s => `${s.class}${s.section}` === selectedClass)
  const initial = (id: string) => marks[id] ?? (ATTENDANCE.find(a => a.studentId === id && a.class === selectedClass)?.status as AttStatus) ?? 'Present'

  const counts: Record<AttStatus, number> = {
    Present: students.filter(s => initial(s.id) === 'Present').length,
    Absent: students.filter(s => initial(s.id) === 'Absent').length,
    Late: students.filter(s => initial(s.id) === 'Late').length,
    Excused: students.filter(s => initial(s.id) === 'Excused').length,
  }

  const saveAttendance = () => {
    setAudit(list => [{
      id: `at${Date.now()}`,
      className: selectedClass,
      date,
      session,
      counts: { ...counts },
      by: user?.name ?? teacher.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }, ...list])
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
    toast('success', `Attendance saved for ${selectedClass} — ${session} session.`)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-subtitle">{teacher.name} — mark and submit daily attendance</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {saved && <span className="badge badge-green">Saved</span>}
          <button className="btn-primary" onClick={saveAttendance}><Icon.Check /> Submit Attendance</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <label className="field-label">Class</label>
          <select className="input-field" style={{ width: 150 }} value={selectedClass} onChange={e => { setSelectedClass(e.target.value); setMarks({}) }}>
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="field-label">Date</label>
          <input className="input-field" type="date" style={{ width: 160 }} value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label className="field-label">Session</label>
          <select className="input-field" style={{ width: 130 }} value={session} onChange={e => setSession(e.target.value)}>
            <option>Morning</option><option>Afternoon</option>
          </select>
        </div>
        <div style={{ alignSelf: 'flex-end' }}>
          <button className="btn-secondary" onClick={() => { setMarks(Object.fromEntries(students.map(s => [s.id, 'Present' as AttStatus]))); toast('info', 'All students marked present.') }}>Mark all present</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {(['Present', 'Absent', 'Late', 'Excused'] as AttStatus[]).map(s => (
          <div key={s} style={{ background: s === 'Present' ? '#f0fdf4' : s === 'Absent' ? '#fee2e2' : s === 'Late' ? '#fef3c7' : '#dbeafe', borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: s === 'Present' ? '#22c55e' : s === 'Absent' ? '#ef4444' : s === 'Late' ? '#f59e0b' : '#3b82f6' }}>{counts[s]}</div>
            <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{s}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Student</th><th>ID</th><th>Status</th><th>Mark attendance</th></tr>
            </thead>
            <tbody>
              {students.map(s => {
                const status = initial(s.id)
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className="avatar">{initials(s.name)}</div>
                        <span style={{ fontWeight: 600 }}>{s.name}</span>
                      </div>
                    </td>
                    <td className="muted">{s.studentId}</td>
                    <td><span className={`badge ${STATUS_BADGE[status]}`}>{status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {(['Present', 'Absent', 'Late', 'Excused'] as AttStatus[]).map(st => (
                          <button
                            key={st}
                            onClick={() => setMarks(prev => ({ ...prev, [s.id]: st }))}
                            style={{
                              padding: '5px 12px', borderRadius: 7, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', transition: 'all 0.1s',
                              background: status === st ? (st === 'Present' ? '#22c55e' : st === 'Absent' ? '#ef4444' : st === 'Late' ? '#f59e0b' : '#3b82f6') : 'var(--bg-muted)',
                              color: status === st ? 'white' : 'var(--text-secondary)',
                              border: status === st ? 'none' : '1px solid var(--border-subtle)',
                            }}
                          >{st}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {students.length === 0 && <tr><td colSpan={4} className="muted" style={{ textAlign: 'center', padding: 20 }}>No students in this class.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Icon.Clipboard />
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14 }}>Audit History</div>
          <span className="muted" style={{ fontSize: 12 }}>Every submission is preserved</span>
        </div>
        {audit.length === 0 ? (
          <div className="muted" style={{ fontSize: 13 }}>No submissions yet — submit attendance to build the audit trail.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Time</th><th>Class</th><th>Date</th><th>Session</th><th>P / A / L / E</th><th>By</th></tr></thead>
            <tbody>
              {audit.map(a => (
                <tr key={a.id}>
                  <td className="muted">{a.time}</td>
                  <td style={{ fontWeight: 600 }}>{a.className}</td>
                  <td>{a.date}</td>
                  <td>{a.session}</td>
                  <td><span className="badge badge-green">{a.counts.Present}</span> <span className="badge badge-red">{a.counts.Absent}</span> <span className="badge badge-amber">{a.counts.Late}</span> <span className="badge badge-blue">{a.counts.Excused}</span></td>
                  <td>{a.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}