import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal, { ConfirmModal } from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { StudentRegistrationModal } from '../../components/FormModals'
import { ReportCardPreview } from '../../components/DocumentPreviews'
import { STUDENTS, initials } from '../../data/mockData'
import type { Student } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function StudentsPage({ canManage = true }: { canManage?: boolean }) {
  const { toast } = useApp()
  const [addOpen, setAddOpen] = useState(false)
  const [view, setView] = useState<Student | null>(null)
  const [del, setDel] = useState<Student | null>(null)
  const [card, setCard] = useState<Student | null>(null)
  const [rows, setRows] = useState(STUDENTS)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Students</div>
          <div className="page-subtitle">{rows.length} students enrolled</div>
        </div>
        {canManage && <button className="btn-primary" onClick={() => setAddOpen(true)}><Icon.Plus /> Register Student</button>}
      </div>
      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchPlaceholder="Search students by name or ID..."
        searchKeys={['name', 'studentId', 'class', 'parent']}
        exportName="students"
        emptyTitle="No students found."
        emptyMessage="No students have been registered yet."
        emptyAction={canManage ? '+ Register Student' : undefined}
        onEmptyAction={() => setAddOpen(true)}
        allowDelete={canManage}
        columns={[
          { key: 'name', label: 'Student', render: r => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar">{initials(String(r.name))}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                <div className="muted" style={{ fontSize: 11 }}>DOB: {String(r.dob)}</div>
              </div>
            </div>
          ) },
          { key: 'studentId', label: 'Student ID' },
          { key: 'class', label: 'Class', render: r => `${r.class} · ${r.section}` },
          { key: 'attendance', label: 'Attendance', render: r => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 52, height: 5, background: 'var(--border-subtle)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ width: `${Number(r.attendance)}%`, height: '100%', background: Number(r.attendance) >= 90 ? '#22c55e' : Number(r.attendance) >= 75 ? '#f59e0b' : '#f87171' }} />
              </div>
              <span style={{ fontSize: 12 }}>{String(r.attendance)}%</span>
            </div>
          ) },
          { key: 'fees', label: 'Fees', render: r => <span className={`badge ${r.fees === 'Paid' ? 'badge-green' : r.fees === 'Pending' ? 'badge-amber' : 'badge-red'}`}>{String(r.fees)}</span> },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'Transferred' ? 'badge-blue' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
        actions={r => {
          const s = r as unknown as Student
          return (
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="btn-icon" title="View" onClick={() => setView(s)}><Icon.Eye /></button>
              {canManage && <button className="btn-icon" title="Edit" onClick={() => toast('info', 'Edit form opened.')}><Icon.Edit /></button>}
              <button className="btn-icon" title="Print" onClick={() => setCard(s)}><Icon.Print /></button>
              <button className="btn-icon" title="Export" onClick={() => toast('success', 'Excel file generated successfully.')}><Icon.Download /></button>
              {canManage && <button className="btn-icon" title="Archive" style={{ color: '#dc2626' }} onClick={() => setDel(s)}><Icon.Trash /></button>}
            </div>
          )
        }}
      />
      <StudentRegistrationModal open={addOpen} onClose={() => setAddOpen(false)} />
      <ReportCardPreview open={!!card} onClose={() => setCard(null)} student={card} />
      <ConfirmModal open={!!del} onClose={() => setDel(null)} title="Archive student" message={`Archive ${del?.name}? They will be removed from the active register.`} confirmLabel="Archive" onConfirm={() => { setRows(r => r.filter(x => x.id !== del?.id)); toast('success', 'Student archived.') }} />
      <Modal open={!!view} onClose={() => setView(null)} title="Student Profile" size="lg" footer={<><button className="btn-secondary" onClick={() => setCard(view)}>Print profile</button><button className="btn-primary" onClick={() => setView(null)}>Close</button></>}>
        {view && (
          <div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg-muted)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div className="avatar" style={{ width: 60, height: 60, fontSize: 20 }}>{initials(view.name)}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{view.name}</div>
                <div className="muted">{view.studentId} · {view.class} {view.section}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Gender', view.gender], ['Date of Birth', view.dob], ['Parent', view.parent], ['Phone', view.phone], ['Email', view.email], ['Address', view.address], ['Attendance', `${view.attendance}%`], ['Fees', view.fees]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                  <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
