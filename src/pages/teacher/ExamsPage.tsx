import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { useApp } from '../../context/AppContext'
import { EXAMS, RESULTS, STUDENTS, CLASSES, TEACHERS } from '../../data/mockData'

export function ExamsPage() {
  const { user, toast } = useApp()
  const teacher = TEACHERS.find(t => t.name === user?.name) ?? TEACHERS[0]

  const myClasses = CLASSES.filter(c => c.teacher === teacher.name)

  const [view, setView] = useState<'upcoming' | 'entry' | 'completed'>('upcoming')
  const [selectedExam, setSelectedExam] = useState<{ id: string; name: string; class: string; date: string; duration: string } | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [newScore, setNewScore] = useState('')
  const [newComment, setNewComment] = useState('')
  const [records, setRecords] = useState<
    Array<{
      studentId: string
      studentName: string
      class: string
      subject: string
      marks: number
      grade: string
      comment?: string
    }>
  >(RESULTS)

  const upcomingExams = EXAMS.filter(e => e.status === 'Upcoming')
  const completedExams = EXAMS.filter(e => e.status === 'Completed')

  const calculateGrade = (score: number, total: number = 100): string => {
    const pct = Math.round((score / total) * 100)
    if (pct >= 90) return 'A+'
    if (pct >= 80) return 'A'
    if (pct >= 70) return 'B+'
    if (pct >= 60) return 'B'
    if (pct >= 50) return 'C'
    return 'F'
  }

  const renderUpcomingView = () => {
    if (upcomingExams.length === 0) return (
      <div style={{ padding: 20, color: '#64748b' }}>
        No upcoming exams scheduled.
      </div>
    )

    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>Upcoming Exams</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Class</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {upcomingExams.map((exam) => (
              <tr key={exam.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td>{exam.name}</td>
                <td>{exam.class}</td>
                <td>{exam.date}</td>
                <td>{exam.duration}</td>
                <td>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => setSelectedExam(exam)}>
                    Mark Entry
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderCompletedView = () => {
    if (completedExams.length === 0) return (
      <div style={{ padding: 20, color: '#64748b' }}>
        No completed exams.
      </div>
    )

    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>Completed Exams</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span>{completedExams.length} exams</span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Best: 92%</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Class</th>
              <th>Date</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {completedExams.map((exam) => {
              const grade = calculateGrade(85)
              return (
                <tr key={exam.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td>{exam.name}</td>
                  <td>{exam.class}</td>
                  <td>{exam.date}</td>
                  <td>
                    <input className="input-field" defaultValue="85" style={{ width: 80 }} />
                  </td>
                  <td><span className="badge badge-blue">{grade}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  const renderEntryView = () => {
    const exam = selectedExam ?? upcomingExams[0] ?? null

    if (!exam) return (
      <div style={{ padding: 20, color: '#64748b' }}>
        No exams available.
      </div>
    )

    const classStudents = STUDENTS.filter(s => s.class === exam.class)
    const existingResults = RESULTS.filter(r => r.class === exam.class)

    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 12 }}>
          Enter Marks — {exam.name} ({exam.class})
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{exam.date} · {exam.duration}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <select className="input-field" style={{ flex: 1, minWidth: 150 }}>
              <option>Select student</option>
              {classStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              className="input-field"
              placeholder="Score"
              style={{ flex: 1, minWidth: 100 }}
              defaultValue="0"
              onChange={e => setNewScore(e.target.value)}
            />
            <input
              className="input-field"
              placeholder="Comment"
              style={{ flex: 1, minWidth: 200 }}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: 13, marginLeft: 8 }}
              onClick={() => {
                const student = classStudents.find(s => s.id === 'st1') ?? classStudents[0]
                const score = parseInt(newScore) || 0
                const comment = newComment || ''
                const grade = calculateGrade(score)

                const result = existingResults.find(r => r.studentName === student.name)
                if (result) {
                  setRecords(prev =>
                    prev.map(r => (r.studentId === student.id ? { ...r, marks: score, grade, comment } : r))
                  )
                } else {
                  setRecords(prev => [...prev, { studentId: student.id, studentName: student.name, class: exam.class, subject: exam.name, marks: score, grade, comment }])
                }
                setNewScore(''), setNewComment('')
                setOpenModal(false)
                toast('success', `${student.name}'s mark recorded: ${score}`)
              }}
            >
              Record Marks
            </button>
          </div>
        </div>

        {/* Students table */}
        <div style={{ overflowX: 'auto', marginTop: 20 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((s, i) => {
                const result = existingResults.find(r => r.studentName === s.name)
                const currentScore = result ? result.marks : null
                const currentGrade = result ? result.grade : null
                const currentComment = result ? result.remarks : ''

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
                      <input
                        className="input-field"
                        defaultValue={currentScore ?? ''}
                        onChange={e => setNewScore(e.target.value)}
                        style={{ width: 60 }}
                      />
                    </td>
                    <td>
                      <span className={`badge ${currentGrade ?? 'badge-gray'}`}>
                        {currentGrade ?? '—'}
                      </span>
                    </td>
                    <td>
                      <input
                        className="input-field"
                        defaultValue={currentComment}
                        onChange={e => setNewComment(e.target.value)}
                        style={{ width: 200 }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Exams & Marks</div>
          <div className="page-subtitle">Exam schedules and mark entry</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          <button
            onClick={() => setView('upcoming')}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              background: view === 'upcoming' ? '#2563eb' : 'white',
              color: view === 'upcoming' ? 'white' : '#475569',
              border: view === 'upcoming' ? 'none' : '1px solid #e2e8f0',
            }}
          >
            Upcoming
          </button>
          <button
            onClick={() => setView('entry')}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              background: view === 'entry' ? '#2563eb' : 'white',
              color: view === 'entry' ? 'white' : '#475569',
              border: view === 'entry' ? 'none' : '1px solid #e2e8f0',
            }}
          >
            Mark Entry
          </button>
          <button
            onClick={() => setView('completed')}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              background: view === 'completed' ? '#2563eb' : 'white',
              color: view === 'completed' ? 'white' : '#475569',
              border: view === 'completed' ? 'none' : '1px solid #e2e8f0',
            }}
          >
            Completed
          </button>
        </div>
      </div>

      {view === 'upcoming' && renderUpcomingView()}
      {view === 'completed' && renderCompletedView()}
      {view === 'entry' && renderEntryView()}
    </div>
  )
}