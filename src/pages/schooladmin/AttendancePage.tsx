import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { ATTENDANCE, initials } from '../../data/mockData'
import { useApp } from '../../context/AppContext'
import { DocumentPreview } from '../../components/DataTable'

type AttStatus = 'Present' | 'Absent' | 'Late' | 'Leave'

export default function AttendancePage() {
  const { toast } = useApp()
  const [date, setDate] = useState('2026-08-16')
  const [classFilter, setClassFilter] = useState('All')
  const [section, setSection] = useState('All')
  const [teacher, setTeacher] = useState('All')
  const [records, setRecords] = useState(ATTENDANCE)
  const [preview, setPreview] = useState(false)

  const classes = ['All', ...Array.from(new Set(ATTENDANCE.map(r => r.class)))]
  const filtered = records.filter(r => classFilter === 'All' || r.class === classFilter)
  const stats = {
    present: filtered.filter(r => r.status === 'Present').length,
    absent: filtered.filter(r => r.status === 'Absent').length,
    late: filtered.filter(r => r.status === 'Late').length,
    leave: filtered.filter(r => r.status === 'Leave').length,
  }

  const updateStatus = (studentId: string, status: AttStatus) => {
    setRecords(prev => prev.map(r => r.studentId === studentId ? { ...r, status } : r))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-subtitle">Mark and review daily attendance</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={() => { setRecords(r => r.map(x => classFilter === 'All' || x.class === classFilter ? { ...x, status: 'Present' } : x)); toast('info', 'All visible students marked present.') }}>Mark All Present</button>
          <button className="btn-secondary" onClick={() => toast('success', 'Excel file generated successfully.')}><Icon.Download /> Export Excel</button>
          <button className="btn-secondary" onClick={() => toast('success', 'PDF generated successfully.')}><Icon.File /> Export PDF</button>
          <button className="btn-secondary" onClick={() => setPreview(true)}><Icon.Print /> Print</button>
          <button className="btn-primary" onClick={() => toast('success', 'Attendance saved.')}>Save Attendance</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div><label className="field-label">Date</label><input type="date" className="input-field" style={{ width: 160 }} value={date} onChange={e => setDate(e.target.value)} /></div>
        <div><label className="field-label">Class</label><select className="input-field" style={{ width: 140 }} value={classFilter} onChange={e => setClassFilter(e.target.value)}>{classes.map(c => <option key={c}>{c}</option>)}</select></div>
        <div><label className="field-label">Section</label><select className="input-field" style={{ width: 120 }} value={section} onChange={e => setSection(e.target.value)}><option>All</option><option>A</option><option>B</option><option>C</option></select></div>
        <div><label className="field-label">Teacher</label><select className="input-field" style={{ width: 180 }} value={teacher} onChange={e => setTeacher(e.target.value)}><option>All</option><option>James Okonkwo</option><option>Angela Morrison</option></select></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { label: 'Present', value: stats.present, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Absent', value: stats.absent, color: '#ef4444', bg: '#fee2e2' },
          { label: 'Late', value: stats.late, color: '#f59e0b', bg: '#fef3c7' },
          { label: 'Leave', value: stats.leave, color: '#3b82f6', bg: '#dbeafe' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th><th>Student ID</th><th>Present</th><th>Absent</th><th>Late</th><th>Leave</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(record => (
                <tr key={record.studentId}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div className="avatar">{initials(record.studentName)}</div>
                      <span style={{ fontWeight: 600 }}>{record.studentName}</span>
                    </div>
                  </td>
                  <td className="muted">{record.studentId}</td>
                  {(['Present', 'Absent', 'Late', 'Leave'] as AttStatus[]).map(s => (
                    <td key={s}>
                      <input type="radio" name={record.studentId} checked={record.status === s} onChange={() => updateStatus(record.studentId, s)} />
                      {record.status === s && <span className={`badge ${s === 'Present' ? 'badge-green' : s === 'Absent' ? 'badge-red' : s === 'Late' ? 'badge-amber' : 'badge-blue'}`} style={{ marginLeft: 6 }}>{s}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DocumentPreview open={preview} onClose={() => setPreview(false)} title="Daily Attendance" columns={['Student', 'Class', 'Status']} rows={filtered as unknown as Record<string, unknown>[]} />
    </div>
  )
}
