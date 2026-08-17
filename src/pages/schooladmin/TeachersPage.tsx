import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { TeacherRegistrationModal } from '../../components/FormModals'
import { TEACHERS, initials } from '../../data/mockData'
import type { Teacher } from '../../data/mockData'

export default function TeachersPage({ canManage = true }: { canManage?: boolean }) {
  const [view, setView] = useState<Teacher | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">{canManage ? 'Teachers' : 'My Classes & Staff'}</div>
          <div className="page-subtitle">{TEACHERS.length} teachers</div>
        </div>
        {canManage && <button className="btn-primary" onClick={() => setAddOpen(true)}><Icon.Plus /> Add Teacher</button>}
      </div>
      <DataTable
        data={TEACHERS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'email', 'teacherId']}
        exportName="teachers"
        emptyTitle="No teachers found."
        emptyMessage="No teachers have been registered yet."
        emptyAction={canManage ? '+ Add Teacher' : undefined}
        onEmptyAction={() => setAddOpen(true)}
        columns={[
          { key: 'name', label: 'Teacher', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar" style={{ background: '#f0fdf4', color: '#15803d' }}>{initials(String(r.name))}</div><div><div style={{ fontWeight: 600 }}>{String(r.name)}</div><div className="muted" style={{ fontSize: 11 }}>{String(r.email)}</div></div></div> },
          { key: 'teacherId', label: 'Employee ID' },
          { key: 'subjects', label: 'Subjects', render: r => <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{(r.subjects as string[]).map(s => <span key={s} className="badge badge-blue">{s}</span>)}</div> },
          { key: 'classes', label: 'Classes', render: r => (r.classes as string[]).join(', ') },
          { key: 'qualification', label: 'Qualification' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'On Leave' ? 'badge-amber' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
        actions={r => (
          <div style={{ display: 'flex' }}>
            <button className="btn-icon" onClick={() => setView(r as unknown as Teacher)}><Icon.Eye /></button>
            {canManage && <button className="btn-icon"><Icon.Edit /></button>}
            <button className="btn-icon"><Icon.Print /></button>
          </div>
        )}
      />
      <TeacherRegistrationModal open={addOpen} onClose={() => setAddOpen(false)} />
      <Modal open={!!view} onClose={() => setView(null)} title="Teacher Profile">
        {view && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{view.name}</div>
            {[['Email', view.email], ['Phone', view.phone], ['Qualification', view.qualification], ['Subjects', view.subjects.join(', ')], ['Classes', view.classes.join(', ')], ['Joined', view.joinDate]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ width: 120, color: 'var(--text-muted)' }}>{k}</span><span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
