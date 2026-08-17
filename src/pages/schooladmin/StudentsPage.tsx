import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal, { ConfirmModal } from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { StudentRegistrationModal, RecordPaymentModal } from '../../components/FormModals'
import { STUDENTS, ATTENDANCE, PARENTS, TIMETABLE_ENTRIES, RESULTS, SCHOOL_REPORTS, FEES, PAYMENTS, BUS_ASSIGNMENTS, CLASSES, EXAMS, initials } from '../../data/mockData'
import type { Student } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const TABS = ['Overview', 'Parent/Guardian', 'Enrollment', 'Attendance', 'Timetable', 'Exams & Marks', 'Reports', 'Fees & Payments', 'Transport', 'Medical/Emergency', 'Activity'] as const

const BLOOD = ['O+', 'A+', 'B+', 'AB+']
const ALLERGIES = ['None', 'Peanuts', 'Penicillin', 'None']

export default function StudentsPage({ canManage = true }: { canManage?: boolean }) {
  const { toast } = useApp()
  const [addOpen, setAddOpen] = useState(false)
  const [view, setView] = useState<Student | null>(null)
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const [del, setDel] = useState<Student | null>(null)
  const [transfer, setTransfer] = useState<Student | null>(null)
  const [payFor, setPayFor] = useState<Student | null>(null)
  const [rows, setRows] = useState(STUDENTS)
  const [fClass, setFClass] = useState('All')
  const [fStatus, setFStatus] = useState('All')
  const [fGender, setFGender] = useState('All')
  const [fBus, setFBus] = useState('All')
  const [fFee, setFFee] = useState('All')
  const [fYear, setFYear] = useState('All')

  const attendanceToday = Object.fromEntries(ATTENDANCE.map(a => [a.studentId, a.status]))
  const classes = ['All', ...Array.from(new Set(STUDENTS.map(s => `${s.class} ${s.section}`)))]
  const buses = ['All', ...Array.from(new Set(BUS_ASSIGNMENTS.map(a => a.bus))), 'None']
  const years = ['All', ...Array.from(new Set(STUDENTS.map(s => s.academicYear)))]

  const filtered = rows.filter(s => {
    if (fClass !== 'All' && `${s.class} ${s.section}` !== fClass) return false
    if (fStatus !== 'All' && s.status !== fStatus) return false
    if (fGender !== 'All' && s.gender !== fGender) return false
    if (fFee !== 'All' && s.fees !== fFee) return false
    if (fYear !== 'All' && s.academicYear !== fYear) return false
    if (fBus !== 'All') {
      const b = BUS_ASSIGNMENTS.find(a => a.studentName === s.name)?.bus
      if (fBus === 'None' ? !!b : b !== fBus) return false
    }
    return true
  })

  const feeStatusBadge = (status: string) => {
    const cls = status === 'Paid' ? 'badge-green' : status === 'Pending' ? 'badge-amber' : 'badge-red'
    return <span className={`badge ${cls}`}>{status}</span>
  }

  const studentRecords = (s: Student) => ({
    fees: FEES.filter(f => f.studentName === s.name),
    payments: PAYMENTS.filter(p => p.studentName === s.name),
    results: RESULTS.filter(r => r.studentName === s.name),
    reports: SCHOOL_REPORTS.filter(r => r.className === `${s.class} ${s.section}`),
    timetable: TIMETABLE_ENTRIES.filter(t => t.className === `${s.class} ${s.section}`),
    transport: BUS_ASSIGNMENTS.filter(a => a.studentName === s.name),
    attendance: ATTENDANCE.filter(a => a.studentId === s.id),
    parent: PARENTS.find(p => p.name === s.parent),
  })

  const openStudent = (s: Student) => { setTab('Overview'); setView(s) }

  const statsFor = (s: Student) => {
    const idx = STUDENTS.findIndex(x => x.id === s.id)
    return {
      blood: BLOOD[idx % BLOOD.length],
      allergy: ALLERGIES[idx % ALLERGIES.length],
      emergency: s.parent,
      emergencyPhone: s.phone,
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Students</div>
          <div className="page-subtitle">{rows.length} students enrolled · {rows.filter(s => s.status === 'Active').length} active</div>
        </div>
        {canManage && <button className="btn-primary" onClick={() => setAddOpen(true)}><Icon.Plus /> Add Student</button>}
      </div>
      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search students by name, ID or parent..."
        searchKeys={['name', 'studentId', 'class', 'parent']}
        exportName="students"
        emptyTitle="No students found."
        emptyMessage="Adjust the filters or register a new student."
        emptyAction={canManage ? '+ Add Student' : undefined}
        onEmptyAction={() => setAddOpen(true)}
        filters={
          <>
            <select className="input-field" style={{ width: 130 }} value={fClass} onChange={e => setFClass(e.target.value)}>{classes.map(c => <option key={c}>{c}</option>)}</select>
            <select className="input-field" style={{ width: 110 }} value={fStatus} onChange={e => setFStatus(e.target.value)}><option>Status: All</option><option>Active</option><option>Inactive</option><option>Transferred</option></select>
            <select className="input-field" style={{ width: 110 }} value={fGender} onChange={e => setFGender(e.target.value)}><option>Gender: All</option><option>Male</option><option>Female</option></select>
            <select className="input-field" style={{ width: 120 }} value={fBus} onChange={e => setFBus(e.target.value)}>{buses.map(b => <option key={b}>{b}</option>)}</select>
            <select className="input-field" style={{ width: 120 }} value={fFee} onChange={e => setFFee(e.target.value)}><option>Fees: All</option><option>Paid</option><option>Pending</option><option>Overdue</option></select>
            <select className="input-field" style={{ width: 120 }} value={fYear} onChange={e => setFYear(e.target.value)}>{years.map(y => <option key={y}>{y}</option>)}</select>
          </>
        }
        columns={[
          { key: 'name', label: 'Student', render: r => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar">{initials(String(r.name))}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                <div className="muted" style={{ fontSize: 11 }}>{String(r.studentId)}</div>
              </div>
            </div>
          ) },
          { key: 'parent', label: 'Parent' },
          { key: 'class', label: 'Class', render: r => `${r.class} · ${r.section}` },
          { key: 'id', label: 'Attendance today', render: r => {
            const st = attendanceToday[String(r.id)]
            if (!st) return <span className="muted">—</span>
            const cls = st === 'Present' ? 'badge-green' : st === 'Late' ? 'badge-amber' : st === 'Leave' ? 'badge-blue' : 'badge-red'
            return <span className={`badge ${cls}`}>{st}</span>
          } },
          { key: 'fees', label: 'Fee status', render: r => feeStatusBadge(String(r.fees)) },
          { key: 'id', label: 'Bus', render: r => {
            const b = BUS_ASSIGNMENTS.find(a => a.studentName === String(r.name))
            return b ? <span className="badge badge-blue">{b.bus}</span> : <span className="muted">—</span>
          } },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'Transferred' ? 'badge-blue' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
        actions={r => {
          const s = r as unknown as Student
          return (
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="btn-icon" title="View" onClick={() => openStudent(s)}><Icon.Eye /></button>
              {canManage && <button className="btn-icon" title="Edit" onClick={() => toast('info', 'Edit form opened.')}><Icon.Edit /></button>}
              {canManage && <button className="btn-icon" title="Transfer class" onClick={() => setTransfer(s)}><Icon.Class /></button>}
              {canManage && <button className="btn-icon" title="Record payment" onClick={() => setPayFor(s)}><Icon.Payment /></button>}
              {canManage && <button className="btn-icon" title="Archive" style={{ color: '#dc2626' }} onClick={() => setDel(s)}><Icon.Trash /></button>}
            </div>
          )
        }}
      />

      <StudentRegistrationModal open={addOpen} onClose={() => setAddOpen(false)} />
      <RecordPaymentModal open={!!payFor} onClose={() => setPayFor(null)} />

      <ConfirmModal open={!!del} onClose={() => setDel(null)} title="Archive student" message={`Archive ${del?.name}? They will be removed from the active register.`} confirmLabel="Archive" onConfirm={() => { setRows(r => r.filter(x => x.id !== del?.id)); toast('success', 'Student archived.') }} />

      <Modal open={!!transfer} onClose={() => setTransfer(null)} title="Transfer class" footer={<><button className="btn-secondary" onClick={() => setTransfer(null)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', `${transfer?.name} transferred to new class.`); setTransfer(null) }}>Confirm transfer</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <div><label className="field-label">Student</label><input className="input-field" value={transfer?.name ?? ''} readOnly /></div>
          <div><label className="field-label">New class</label><select className="input-field">{CLASSES.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
          <div><label className="field-label">Effective date</label><input className="input-field" type="date" defaultValue="2026-08-17" /></div>
          <div><label className="field-label">Reason</label><input className="input-field" placeholder="e.g. Academic placement" /></div>
        </div>
      </Modal>

      {/* Detail modal with tabs */}
      <Modal open={!!view} onClose={() => setView(null)} title="Student Profile" size="lg" footer={<><button className="btn-secondary" onClick={() => toast('info', 'Print profile opened.')}>Print profile</button><button className="btn-primary" onClick={() => setView(null)}>Close</button></>}>
        {view && (() => {
          const rec = studentRecords(view)
          const med = statsFor(view)
          return (
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg-muted)', borderRadius: 12, padding: 16, marginBottom: 14 }}>
                <div className="avatar" style={{ width: 60, height: 60, fontSize: 20 }}>{initials(view.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 18, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{view.name}</div>
                  <div className="muted">{view.studentId} · {view.class} {view.section}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {feeStatusBadge(view.fees)}
                  <span className={`badge ${view.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{view.status}</span>
                </div>
              </div>

              <div className="tab-bar" style={{ marginBottom: 16 }}>
                {TABS.map(t => <div key={t} className={`tab-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</div>)}
              </div>

              {tab === 'Overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['Gender', view.gender], ['Date of Birth', view.dob], ['Nationality', view.nationality], ['Phone', view.phone], ['Email', view.email], ['Address', view.address], ['Attendance Rate', `${view.attendance}%`], ['Academic Year', view.academicYear], ['Enrolled', view.enrollDate], ['Bus', rec.transport[0]?.bus ?? '—']].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                      <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Parent/Guardian' && (
                <div>
                  {rec.parent ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[['Name', rec.parent.name], ['Relationship', rec.parent.relationship], ['Phone', rec.parent.phone], ['Email', rec.parent.email], ['Occupation', rec.parent.occupation], ['Address', rec.parent.address], ['Account', rec.parent.status]].map(([k, v]) => (
                        <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                          <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                          <div style={{ fontWeight: 600 }}>{v}</div>
                        </div>
                      ))}
                      <div style={{ gridColumn: '1 / -1', background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                        <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Other children</div>
                        <div style={{ fontWeight: 600 }}>{rec.parent.children.filter(c => c !== view.name).join(', ') || 'None'}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="muted">No parent/guardian linked to this student.</div>
                  )}
                  <button className="btn-secondary" style={{ marginTop: 14 }} onClick={() => toast('success', 'Guardian invitation sent.')}><Icon.Mail /> Invite parent</button>
                </div>
              )}

              {tab === 'Enrollment' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['Enrollment date', view.enrollDate], ['Academic year', view.academicYear], ['Class', `${view.class} ${view.section}`], ['Status', view.status], ['Previous school', view.previousSchool ?? '—'], ['Nationality', view.nationality], ['Address', view.address]].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                      <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Attendance' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
                    {[['Today', rec.attendance[0]?.status ?? '—'], ['Monthly rate', `${view.attendance}%`], ['Records', `${rec.attendance.length} this term`]].map(([k, v]) => (
                      <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '12px' }}>
                        <div className="muted" style={{ fontSize: 11, fontWeight: 700 }}>{k.toUpperCase()}</div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <table className="data-table">
                    <thead><tr><th>Date</th><th>Status</th></tr></thead>
                    <tbody>
                      {rec.attendance.map(a => (
                        <tr key={a.studentId + a.date}>
                          <td>{a.date}</td>
                          <td><span className={`badge ${a.status === 'Present' ? 'badge-green' : a.status === 'Late' ? 'badge-amber' : a.status === 'Leave' ? 'badge-blue' : 'badge-red'}`}>{a.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'Timetable' && (
                <div>
                  {rec.timetable.length === 0 ? <div className="muted">No timetable entries for {view.class} {view.section}.</div> : (
                    <table className="data-table">
                      <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead>
                      <tbody>
                        {rec.timetable.map(t => (
                          <tr key={t.id}><td>{t.day}</td><td>{t.start} – {t.end}</td><td>{t.subject}</td><td>{t.teacher}</td><td>{t.location}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {tab === 'Exams & Marks' && (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Marks</div>
                  {rec.results.length === 0 ? <div className="muted" style={{ marginBottom: 14 }}>No marks recorded yet.</div> : (
                    <table className="data-table" style={{ marginBottom: 16 }}>
                      <thead><tr><th>Subject</th><th>Marks</th><th>Grade</th><th>Remarks</th></tr></thead>
                      <tbody>
                        {rec.results.map(r => (
                          <tr key={r.id}><td>{r.subject}</td><td>{r.marks}</td><td><span className="badge badge-blue">{r.grade}</span></td><td>{r.remarks}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Upcoming exams</div>
                  {EXAMS.filter(e => e.class === view.class || e.class === 'All Grades').map(e => (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{e.name}</span>
                      <span className="muted">{e.date} · {e.time}</span>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Reports' && (
                <div>
                  {rec.reports.length === 0 ? <div className="muted">No reports for this student's class.</div> : (
                    <table className="data-table">
                      <thead><tr><th>Report</th><th>Date</th><th>Prepared by</th><th>Status</th></tr></thead>
                      <tbody>
                        {rec.reports.map(r => (
                          <tr key={r.id}><td>{r.title}</td><td>{r.date}</td><td>{r.preparedBy}</td><td><span className={`badge ${r.status === 'Approved' ? 'badge-green' : r.status === 'Sent' ? 'badge-blue' : r.status === 'Archived' ? 'badge-gray' : 'badge-amber'}`}>{r.status}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {tab === 'Fees & Payments' && (
                <div>
                  <table className="data-table" style={{ marginBottom: 16 }}>
                    <thead><tr><th>Fee</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead>
                    <tbody>
                      {rec.fees.length === 0 && <tr><td colSpan={4} className="muted">No fees issued.</td></tr>}
                      {rec.fees.map(f => (
                        <tr key={f.id}><td>{f.feeType}</td><td>${f.amount.toLocaleString()}</td><td>{f.dueDate}</td><td>{feeStatusBadge(f.status)}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <table className="data-table">
                    <thead><tr><th>Receipt</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
                    <tbody>
                      {rec.payments.length === 0 && <tr><td colSpan={4} className="muted">No payments recorded.</td></tr>}
                      {rec.payments.map(p => (
                        <tr key={p.id}><td>{p.reference}</td><td>${p.amount.toLocaleString()}</td><td>{p.method}</td><td>{p.date}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button className="btn-secondary" onClick={() => { setPayFor(view); }}><Icon.Payment /> Record payment</button>
                    <button className="btn-secondary" onClick={() => toast('success', 'Reminder sent to parent.')}><Icon.Bell /> Send reminder</button>
                  </div>
                </div>
              )}

              {tab === 'Transport' && (
                <div>
                  {rec.transport.length === 0 ? (
                    <div className="muted">This student is not assigned to any bus.</div>
                  ) : rec.transport.map(a => (
                    <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[['Bus', a.bus], ['Route', a.route], ['Pickup stop', a.stop], ['Status', 'Active']].map(([k, v]) => (
                        <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                          <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                          <div style={{ fontWeight: 600 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button className="btn-secondary" style={{ marginTop: 14 }} onClick={() => toast('success', `${view.name} assigned to BUS-01.`)}><Icon.Bus /> Assign to bus</button>
                </div>
              )}

              {tab === 'Medical/Emergency' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['Blood group', med.blood], ['Allergies', med.allergy], ['Emergency contact', med.emergency], ['Emergency phone', med.emergencyPhone], ['Medical notes', 'None on file'], ['Insurance', 'School covers basic care']].map(([k, v]) => (
                    <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                      <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontWeight: 600 }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Activity' && (
                <div>
                  {[
                    { text: 'Student registered', date: view.enrollDate },
                    { text: 'Attendance recorded — today', date: '2026-08-16' },
                    ...(rec.payments.map(p => ({ text: `Payment ${p.reference} — $${p.amount.toLocaleString()}`, date: p.date }))),
                    { text: 'Profile updated', date: '2026-08-02' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{a.text}</span>
                      <span className="muted" style={{ fontSize: 12 }}>{a.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}