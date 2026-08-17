import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { useApp } from '../../context/AppContext'
import { CLASSES, SUBJECTS, TEACHERS, STUDENTS, ATTENDANCE, EXAMS, RESULTS, ASSIGNMENTS, TIMETABLE } from '../../data/mockData'

interface ClassesPageProps {
  canManage?: boolean
}

export function ClassesPage({ canManage }: ClassesPageProps) {
  const { user, toast } = useApp()
  const teacher = TEACHERS.find(t => t.name === user?.name) ?? TEACHERS[0]

  const myClasses = CLASSES.filter(c => c.teacher === teacher.name)

  const [selectedClass, setSelectedClass] = useState(myClasses[0] || CLASSES[0])

  const getSubjectForClass = (className: string) => {
    const subject = SUBJECTS.find(s => s.classes > 0 && s.teacher === teacher.name)
    return subject?.name || 'Mathematics'
  }

  const getAttendanceStatus = (className: string) => {
    const today = new Date().toISOString().split('T')[0]
    const records = ATTENDANCE.filter(a => a.date === today && a.class === className)
    const present = records.filter(a => a.status === 'Present').length
    const total = records.length
    if (total === 0) return 'No records'
    const pct = Math.round((present / total) * 100)
    return `${pct}% attendance`
  }

  const statusColorClass = (status: string) => {
    switch (status) {
      case 'Present': return 'badge-green'
      case 'Absent': return 'badge-red'
      case 'Late': return 'badge-amber'
      case 'Excused': return 'badge-blue'
      default: return 'badge-gray'
    }
  }

  const renderClassTable = () => {
    return (
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>My Classes</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Students</th>
              <th>Next class</th>
              <th>Attendance status</th>
            </tr>
          </thead>
          <tbody>
            {myClasses.map((cls, i) => (
              <tr key={cls.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ fontWeight: 600 }}>{cls.name}</td>
                <td>{getSubjectForClass(cls.name)}</td>
                <td>{cls.students}</td>
                <td>
                  {myClasses[i + 1] ? `${myClasses[i + 1].name} (next slot)` : '—'}
                </td>
                <td>{getAttendanceStatus(cls.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderClassDetail = () => {
    const cls = myClasses.find(c => c.name === selectedClass.name) || myClasses[0] || CLASSES[0]
    const subject = getSubjectForClass(cls.name)

    const classStudents = STUDENTS.filter(s => s.class === cls.name.split(' ')[1] || cls.name)

    const today = new Date().toISOString().split('T')[0]
    const todayAttendance = ATTENDANCE.filter(a => a.date === today && a.class === cls.name)

    const classResults = RESULTS.filter(r => r.class === cls.name)

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: Students list */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>{cls.name} — Students</div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Recent Mark</th>
                  <th>Report Status</th>
                  <th>Attendance Today</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((s, i) => {
                  const attendanceRec = todayAttendance.find(a => a.studentId === s.id)
                  const result = classResults.find(r => r.studentName === s.name)
                  const recentMark = result ? `${result.marks} (${result.grade})` : '—'
                  const reportStatus = i % 4 === 0 ? 'Submitted' : i % 4 === 1 ? 'Draft' : i % 4 === 2 ? 'Pending' : 'Under Review'
                  const attendanceStatus = attendanceRec ? attendanceRec.status : '—'

                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="avatar" style={{ width: 28, height: 28, fontSize: 10 }}>
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{s.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${result ? 'badge-blue' : 'badge-gray'}`}>{recentMark}</span>
                      </td>
                      <td>
                        <span className={`badge ${reportStatus === 'Submitted' ? 'badge-green' : reportStatus === 'Draft' ? 'badge-amber' : reportStatus === 'Pending' ? 'badge-red' : 'badge-purple'}`}>
                          {reportStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${statusColorClass(attendanceStatus)}`}>
                          {attendanceStatus}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Subject, Timetable, Attendance, Marks, Reports */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>{cls.name} — Details</div>

          {/* Subject info */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#3b82f6', marginBottom: 6 }}>{subject}</div>
            <div style={{ display: 'flex', gap: 8, color: '#64748b' }}>
              <span>Teacher: {teacher.name}</span>
              <span>Classes: {cls.students} students</span>
            </div>
          </div>

          {/* Timetable */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Timetable</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TIMETABLE.slice(0, 3).map(row => {
                const timeRow = row as any
                return (
                  <div key={row.time} style={{ fontSize: 12, color: '#64748b' }}>
                    {row.time}: {row.Monday?.subject || '—'}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Attendance summary */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Attendance</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {todayAttendance.map(a => (
                <span key={a.studentId} className={`badge ${a.status === 'Present' ? 'badge-green' : a.status === 'Absent' ? 'badge-red' : a.status === 'Late' ? 'badge-amber' : 'badge-blue'}`}>
                  {a.studentName}: {a.status}
                </span>
              ))}
            </div>
          </div>

          {/* Marks */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Marks</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {classResults.slice(0, 3).map(r => (
                <div key={r.id} style={{ fontSize: 12, color: '#64748b' }}>
                  {r.studentName}: {r.marks}
                </div>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div style={{ marginBottom: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>Reports</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Create Report</button>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Send to Parent</button>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>Send to Admin</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Classes</div>
          <div className="page-subtitle">Classes assigned to you</div>
        </div>
        {canManage && <button className="btn-primary" onClick={() => toast('success', 'Create new class')}>
          <Icon.Plus /> Add Class
        </button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {renderClassTable()}
        {renderClassDetail()}
      </div>
    </div>
  )
}