import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { INCOME } from '../../data/mockData'
import type { IncomeRecord } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const CATEGORIES = ['Student Fees', 'Registration', 'Transport', 'Donations', 'Other'] as const

export default function IncomePage() {
  const { toast } = useApp()
  const [rows, setRows] = useState(INCOME)
  const [cat, setCat] = useState<string>('All')
  const [addOpen, setAddOpen] = useState(false)

  const filtered = rows.filter(r => cat === 'All' || r.category === cat)
  const total = rows.reduce((s, r) => s + r.amount, 0)
  const thisMonth = rows.filter(r => r.date.startsWith('2026-08')).reduce((s, r) => s + r.amount, 0)
  const topCategory = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => { acc[r.category] = (acc[r.category] ?? 0) + r.amount; return acc }, {})
  ).sort((a, b) => b[1] - a[1])[0]

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Income</div>
          <div className="page-subtitle">Non-fee income sources across the school</div>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}><Icon.Plus /> Record Income</button>
      </div>

      <div className="grid-stats">
        <div className="stat-card"><div className="muted">Total Income</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#16a34a' }}>${total.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>All recorded income</div></div>
        <div className="stat-card"><div className="muted">This Month</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>${thisMonth.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>August 2026</div></div>
        <div className="stat-card"><div className="muted">Top Source</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 20, fontWeight: 800 }}>{topCategory?.[0] ?? '—'}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>${(topCategory?.[1] ?? 0).toLocaleString()} recorded</div></div>
        <div className="stat-card"><div className="muted">Transactions</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>{rows.length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Records this period</div></div>
      </div>

      <div className="tab-bar">
        {['All', ...CATEGORIES].map(c => (
          <div key={c} className={`tab-item${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</div>
        ))}
      </div>

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        searchKeys={['source', 'category', 'reference', 'notes']}
        exportName="income"
        emptyTitle="No income records found."
        emptyMessage="Record income entries from fees, registration, transport, donations and other sources."
        columns={[
          { key: 'date', label: 'Date' },
          { key: 'amount', label: 'Amount', render: r => <span style={{ fontWeight: 700, color: '#16a34a' }}>${Number(r.amount).toLocaleString()}</span> },
          { key: 'category', label: 'Category', render: r => <span className="badge badge-blue">{String(r.category)}</span> },
          { key: 'source', label: 'Source' },
          { key: 'reference', label: 'Reference' },
          { key: 'notes', label: 'Notes', render: r => r.notes ? String(r.notes) : <span className="muted">—</span> },
        ]}
        actions={r => (
          <div style={{ display: 'flex', gap: 2 }}>
            <button className="btn-icon" onClick={() => toast('info', 'Receipt opened.')}><Icon.Receipt /></button>
            <button className="btn-icon" onClick={() => toast('info', 'Edit income record opened.')}><Icon.Edit /></button>
          </div>
        )}
      />

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Record Income" footer={<><button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Income recorded.'); setAddOpen(false) }}>Save Income</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><label className="field-label">Date</label><input className="input-field" type="date" defaultValue="2026-08-16" /></div>
          <div><label className="field-label">Amount</label><input className="input-field" type="number" defaultValue={500} /></div>
          <div><label className="field-label">Category</label><select className="input-field">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="field-label">Source</label><input className="input-field" placeholder="Who paid / where from" /></div>
          <div><label className="field-label">Reference</label><input className="input-field" placeholder="TXN-xxxxx" /></div>
          <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Notes</label><input className="input-field" /></div>
        </div>
      </Modal>
    </div>
  )
}