import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal, { ConfirmModal } from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { STAFF, initials } from '../../data/mockData'
import type { StaffMember } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const CATEGORIES = ['Driver', 'Security', 'Cleaner', 'Cook', 'Accountant', 'Other'] as const

export default function StaffPage() {
  const { toast } = useApp()
  const [rows, setRows] = useState(STAFF)
  const [cat, setCat] = useState<string>('All')
  const [addOpen, setAddOpen] = useState(false)
  const [disable, setDisable] = useState<StaffMember | null>(null)
  const [showPay, setShowPay] = useState(false)

  const filtered = rows.filter(s => cat === 'All' || s.role === cat)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Staff</div>
          <div className="page-subtitle">Non-teaching school staff and compensation records</div>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}><Icon.Plus /> Add Staff</button>
      </div>

      <div className="grid-stats">
        <div className="stat-card"><div className="muted">Total Staff</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>{rows.length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Across all departments</div></div>
        <div className="stat-card"><div className="muted">Active</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#16a34a' }}>{rows.filter(s => s.status === 'Active').length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>On duty</div></div>
        <div className="stat-card"><div className="muted">On Leave</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#b45309' }}>{rows.filter(s => s.status === 'On Leave').length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Away from duty</div></div>
        <div className="stat-card"><div className="muted">Monthly Payroll</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>${rows.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.compensation, 0).toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Active staff only</div></div>
      </div>

      <div className="tab-bar">
        {['All', ...CATEGORIES].map(c => (
          <div key={c} className={`tab-item${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</div>
        ))}
      </div>

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'role', 'phone']}
        exportName="staff"
        emptyTitle="No staff found."
        emptyMessage="No staff members match this category."
        columns={[
          { key: 'name', label: 'Name', render: r => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div className="avatar" style={{ background: '#e0f2fe', color: '#0369a1' }}>{initials(String(r.name))}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                <div className="muted" style={{ fontSize: 11 }}>{String(r.phone)}</div>
              </div>
            </div>
          ) },
          { key: 'role', label: 'Role', render: r => <span className="badge badge-blue">{String(r.role)}</span> },
          { key: 'compensation', label: 'Monthly compensation', render: r => <span style={{ fontWeight: 600 }}>${Number(r.compensation).toLocaleString()}</span> },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'On Leave' ? 'badge-amber' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
        actions={r => {
          const s = r as unknown as StaffMember
          return (
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="btn-icon" title="View profile" onClick={() => toast('info', `${s.name}'s profile opened.`)}><Icon.Eye /></button>
              <button className="btn-icon" title="Edit" onClick={() => toast('info', 'Staff editor opened.')}><Icon.Edit /></button>
              {s.status !== 'Inactive' && (
                <button className="btn-icon" title="Disable" style={{ color: '#dc2626' }} onClick={() => setDisable(s)}><Icon.XCircle /></button>
              )}
            </div>
          )
        }}
      />

      <div className="card" style={{ padding: 16, marginTop: 16, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Icon.Shield />
        <div style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>
          Compensation records are visible to authorized roles only. Any change to compensation is logged to the audit trail.
        </div>
        <button className="btn-secondary" onClick={() => setShowPay(v => !v)}>{showPay ? 'Hide' : 'Show'} compensation</button>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Staff Member" footer={<><button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Staff member added.'); setAddOpen(false) }}>Save Staff</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><label className="field-label">Full name</label><input className="input-field" /></div>
          <div><label className="field-label">Role</label><select className="input-field">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="field-label">Phone</label><input className="input-field" /></div>
          <div><label className="field-label">Monthly compensation</label><input className="input-field" type="number" defaultValue={1200} /></div>
        </div>
      </Modal>

      <ConfirmModal open={!!disable} onClose={() => setDisable(null)} title="Disable staff account" message={`Disable ${disable?.name}? Their account will be deactivated and they will no longer appear on duty schedules.`} confirmLabel="Disable" onConfirm={() => { setRows(list => list.map(x => x.id === disable?.id ? { ...x, status: 'Inactive' } : x)); toast('warning', 'Staff account disabled.') }} />
    </div>
  )
}