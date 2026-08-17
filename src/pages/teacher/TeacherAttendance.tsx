import { useState } from 'react'
import { ATTENDANCE } from '../../data/mockData'
import { Icon } from '../../components/Icons'

type AttStatus = 'Present' | 'Absent' | 'Late' | 'Leave'

export default function TeacherAttendance() {
  const [records, setRecords] = useState(
    ATTENDANCE.filter(a => ['Grade 7A', 'Grade 8B'].includes(a.class))
  )
  const [selectedClass, setSelectedClass] = useState('Grade 7A')
  const [saved, setSaved] = useState(false)

  const filtered = records.filter(r => r.class === selectedClass)
  const updateStatus = (id: string, status: AttStatus) => {
    setSaved(false)
    setRecords(prev => prev.map(r => r.studentId === id ? { ...r, status } : r))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const stats = {
    P: filtered.filter(r => r.status === 'Present').length,
    A: filtered.filter(r => r.status === 'Absent').length,
    L: filtered.filter(r => r.status === 'Late').length,
    V: filtered.filter(r => r.status === 'Leave').length,
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Mark Attendance</div>
          <div className="page-subtitle">Saturday, August 16, 2026</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {saved && <span style={{ background: '#dcfce7', color: '#16a34a', padding: '9px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>✓ Saved</span>}
          <button className="btn-primary" onClick={handleSave}>Save Attendance</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {['Grade 7A', 'Grade 8B'].map(cls => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            style={{
              padding: '8px 18px', borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
              background: selectedClass === cls ? '#2563eb' : 'white',
              color: selectedClass === cls ? 'white' : '#475569',
              border: selectedClass === cls ? 'none' : '1px solid #e2e8f0',
            }}
          >{cls}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Present', value: stats.P, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Absent', value: stats.A, color: '#ef4444', bg: '#fee2e2' },
          { label: 'Late', value: stats.L, color: '#f59e0b', bg: '#fef3c7' },
          { label: 'Leave', value: stats.V, color: '#3b82f6', bg: '#dbeafe' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Status</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record, idx) => (
                <tr key={record.studentId}>
                  <td style={{ color: '#94a3b8', width: 40 }}>{idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div className="avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
                        {record.studentName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 13, color: '#1e293b' }}>{record.studentName}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${record.status === 'Present' ? 'badge-green' : record.status === 'Absent' ? 'badge-red' : record.status === 'Late' ? 'badge-amber' : 'badge-blue'}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {(['Present', 'Absent', 'Late', 'Leave'] as AttStatus[]).map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(record.studentId, s)}
                          style={{
                            padding: '5px 12px', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.1s',
                            background: record.status === s
                              ? s === 'Present' ? '#22c55e' : s === 'Absent' ? '#ef4444' : s === 'Late' ? '#f59e0b' : '#3b82f6'
                              : '#f8fafc',
                            color: record.status === s ? 'white' : '#64748b',
                            border: record.status === s ? 'none' : '1px solid #e2e8f0',
                          }}
                        >{s}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
