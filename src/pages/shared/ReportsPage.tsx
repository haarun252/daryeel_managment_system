import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { DocumentPreview } from '../../components/DataTable'
import { useApp } from '../../context/AppContext'
import { STUDENTS, ATTENDANCE, FEES, RESULTS } from '../../data/mockData'

const GROUPS = [
  { title: 'Student Reports', items: ['Student List', 'Student Profile', 'Enrollment Report'] },
  { title: 'Attendance Reports', items: ['Daily Attendance', 'Monthly Attendance', 'Class Attendance'] },
  { title: 'Finance Reports', items: ['Fee Collection', 'Outstanding Fees', 'Payment History'] },
  { title: 'Academic Reports', items: ['Exam Results', 'Grade Report', 'Report Cards'] },
]

export function ReportsPage({ preset }: { preset?: string }) {
  const { toast, tenant } = useApp()
  const [report, setReport] = useState(preset ?? 'Student List')
  const [preview, setPreview] = useState(false)

  const rows = report.includes('Attendance')
    ? ATTENDANCE.map(a => ({ a: a.studentName, b: a.class, c: a.status }))
    : report.includes('Fee') || report.includes('Payment') || report.includes('Outstanding')
      ? FEES.map(f => ({ a: f.studentName, b: f.feeType, c: f.status }))
      : report.includes('Exam') || report.includes('Grade') || report.includes('Report Card')
        ? RESULTS.map(r => ({ a: r.studentName, b: r.subject, c: r.grade }))
        : STUDENTS.map(s => ({ a: s.name, b: s.class, c: s.status }))

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Reports</div>
          <div className="page-subtitle">{tenant.name} · {report}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => setPreview(true)}><Icon.Eye /> Preview</button>
          <button className="btn-secondary" onClick={() => toast('success', 'Excel file generated successfully.')}><Icon.Download /> Export Excel</button>
          <button className="btn-secondary" onClick={() => toast('success', 'PDF generated successfully.')}><Icon.File /> Export PDF</button>
          <button className="btn-primary" onClick={() => window.print()}><Icon.Print /> Print</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 12 }}>
          {GROUPS.map(g => (
            <div key={g.title} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '6px 8px' }}>{g.title}</div>
              {g.items.map(item => (
                <button key={item} onClick={() => setReport(item)} className={`sidebar-link${report === item ? ' active' : ''}`}>{item}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <select className="input-field" style={{ maxWidth: 160 }}><option>2025–2026</option></select>
            <select className="input-field" style={{ maxWidth: 140 }}><option>All classes</option><option>Grade 7</option></select>
            <input className="input-field" type="date" style={{ maxWidth: 160 }} defaultValue="2026-08-16" />
          </div>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Detail</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}><td style={{ fontWeight: 600 }}>{r.a}</td><td>{r.b}</td><td><span className="badge badge-blue">{r.c}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DocumentPreview open={preview} onClose={() => setPreview(false)} title={report} columns={['Name', 'Detail', 'Status']} rows={rows} />
    </div>
  )
}
