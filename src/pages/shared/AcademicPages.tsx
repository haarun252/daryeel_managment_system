import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { ReportCardPreview } from '../../components/DocumentPreviews'
import { useApp } from '../../context/AppContext'
import { TIMETABLE, ASSIGNMENTS, EXAMS, RESULTS, STUDENTS, CLASSES } from '../../data/mockData'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const

export function TimetablePage() {
  const { toast } = useApp()
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Timetable</div><div className="page-subtitle">Weekly class schedule — Grade 7A</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => toast('success', 'Excel file generated successfully.')}><Icon.Download /> Excel</button>
          <button className="btn-secondary" onClick={() => toast('success', 'PDF generated successfully.')}><Icon.File /> PDF</button>
          <button className="btn-primary" onClick={() => window.print()}><Icon.Print /> Print</button>
        </div>
      </div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              {DAYS.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {TIMETABLE.map((row) => (
              <tr key={row.time}>
                <td style={{ fontWeight: 700 }}>{row.time}</td>
                {DAYS.map(d => {
                  const cell = row[d]
                  const isBreak = cell.subject === 'Break'
                  return (
                    <td key={d}>
                      <div style={{ background: isBreak ? 'var(--bg-muted)' : 'var(--primary-soft)', borderRadius: 8, padding: '8px 10px', minWidth: 120 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{cell.subject}</div>
                        {!isBreak && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cell.teacher} · Rm {cell.room}</div>}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AssignmentsPage({ canCreate = true }: { canCreate?: boolean }) {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(ASSIGNMENTS)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Assignments</div><div className="page-subtitle">Track homework and classwork</div></div>
        {canCreate && <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Create assignment</button>}
      </div>
      <DataTable
        data={items as unknown as Record<string, unknown>[]}
        searchKeys={['title', 'class', 'subject']}
        exportName="assignments"
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'class', label: 'Class' },
          { key: 'subject', label: 'Subject' },
          { key: 'dueDate', label: 'Due' },
          { key: 'status', label: 'Status', render: (r) => {
            const s = String(r.status)
            const cls = s === 'Graded' ? 'badge-green' : s === 'Submitted' ? 'badge-blue' : s === 'Late' ? 'badge-red' : 'badge-amber'
            return <span className={`badge ${cls}`}>{s}</span>
          }},
          { key: 'submitted', label: 'Submitted', render: r => `${r.submitted}/${r.total}` },
        ]}
        actions={() => (
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="btn-icon"><Icon.Eye /></button>
            {canCreate && <button className="btn-icon"><Icon.Edit /></button>}
          </div>
        )}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create assignment" footer={<><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Assignment created.'); setItems(i => [...i, { id: 'asx', title: 'New assignment', class: 'Grade 7A', subject: 'Mathematics', teacher: 'James Okonkwo', dueDate: '2026-08-25', status: 'Pending', submitted: 0, total: 32 }]); setOpen(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <label className="field-label">Title</label><input className="input-field" />
          <label className="field-label">Class</label><select className="input-field">{CLASSES.map(c => <option key={c.id}>{c.name}</option>)}</select>
          <label className="field-label">Subject</label><select className="input-field"><option>Mathematics</option><option>English</option><option>Science</option></select>
          <label className="field-label">Description</label><textarea className="input-field" rows={3} />
          <label className="field-label">Due date</label><input className="input-field" type="date" />
          <button className="btn-secondary"><Icon.Paperclip /> Attach file</button>
        </div>
      </Modal>
    </div>
  )
}

export function ExamsPage() {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Exams</div><div className="page-subtitle">Exam schedules and status</div></div>
        <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Add Exam</button>
      </div>
      <DataTable
        data={EXAMS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'class']}
        exportName="exams"
        columns={[
          { key: 'name', label: 'Exam name' },
          { key: 'academicYear', label: 'Academic year' },
          { key: 'date', label: 'Start date' },
          { key: 'endDate', label: 'End date' },
          { key: 'class', label: 'Classes' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${String(r.status) === 'Completed' ? 'badge-green' : String(r.status) === 'Upcoming' ? 'badge-blue' : 'badge-amber'}`}>{String(r.status)}</span> },
        ]}
        actions={() => <button className="btn-icon"><Icon.Eye /></button>}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Add Exam" footer={<><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Exam added.'); setOpen(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input className="input-field" placeholder="Exam name" />
          <input className="input-field" type="date" />
          <input className="input-field" type="date" />
          <select className="input-field"><option>Grade 7</option><option>Grade 8</option><option>All Grades</option></select>
        </div>
      </Modal>
    </div>
  )
}

export function ResultsPage() {
  const { toast } = useApp()
  const [preview, setPreview] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Results</div><div className="page-subtitle">Marks, grades and remarks</div></div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => toast('info', 'Import started.')}><Icon.Upload /> Import Results</button>
          <button className="btn-secondary" onClick={() => setPreview(true)}><Icon.Eye /> Preview Report Card</button>
          <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Add Result</button>
        </div>
      </div>
      <DataTable
        data={RESULTS as unknown as Record<string, unknown>[]}
        searchKeys={['studentName', 'subject']}
        exportName="results"
        columns={[
          { key: 'studentName', label: 'Student' },
          { key: 'subject', label: 'Subject' },
          { key: 'marks', label: 'Marks' },
          { key: 'grade', label: 'Grade', render: r => <span className="badge badge-blue">{String(r.grade)}</span> },
          { key: 'remarks', label: 'Remarks' },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Add Result" footer={<><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Result added.'); setOpen(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <select className="input-field">{STUDENTS.map(s => <option key={s.id}>{s.name}</option>)}</select>
          <select className="input-field"><option>Mathematics</option><option>English</option><option>Science</option></select>
          <input className="input-field" type="number" placeholder="Marks" />
          <input className="input-field" placeholder="Grade" />
          <input className="input-field" placeholder="Remarks" />
        </div>
      </Modal>
      <ReportCardPreview open={preview} onClose={() => setPreview(false)} student={STUDENTS[0]} />
    </div>
  )
}

export function ReportCardsPage() {
  const [student, setStudent] = useState(STUDENTS[0])
  const [open, setOpen] = useState(false)
  const { toast } = useApp()
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Report Cards</div><div className="page-subtitle">Generate and preview term reports</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setOpen(true)}><Icon.Eye /> Preview</button>
          <button className="btn-secondary" onClick={() => toast('success', 'PDF generated successfully.')}><Icon.Download /> Download PDF</button>
          <button className="btn-primary" onClick={() => window.print()}><Icon.Print /> Print</button>
        </div>
      </div>
      <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <select className="input-field" style={{ maxWidth: 260 }} value={student.id} onChange={e => setStudent(STUDENTS.find(s => s.id === e.target.value) ?? STUDENTS[0])}>
          {STUDENTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select className="input-field" style={{ maxWidth: 200 }}><option>2025–2026 · Term 1</option></select>
      </div>
      <ReportCardPreview open={open} onClose={() => setOpen(false)} student={student} />
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>{student.name} — {student.class} {student.section}</div>
        <div className="muted">Use Preview to open the printable A4 report card.</div>
      </div>
    </div>
  )
}
