import { useState } from 'react'
import { Icon } from '../../components/Icons'
import { FEES } from '../../data/mockData'
import type { FeeRecord } from '../../data/mockData'
import { CreateFeeModal, RecordPaymentModal } from '../../components/FormModals'
import { InvoicePreview } from '../../components/DocumentPreviews'
import { useApp } from '../../context/AppContext'
import DataTable from '../../components/DataTable'

export default function FeesPage() {
  const { toast } = useApp()
  const [create, setCreate] = useState(false)
  const [pay, setPay] = useState(false)
  const [invoice, setInvoice] = useState<FeeRecord | null>(null)
  const [rows, setRows] = useState(FEES)

  const totalCollected = rows.filter(f => f.status === 'Paid').reduce((s, f) => s + f.amount, 0)
  const totalPending = rows.filter(f => f.status === 'Pending').reduce((s, f) => s + f.amount, 0)
  const totalOverdue = rows.filter(f => f.status === 'Overdue').reduce((s, f) => s + f.amount, 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Fees</div>
          <div className="page-subtitle">Manage student fee collection and invoices</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPay(true)}>Record Payment</button>
          <button className="btn-primary" onClick={() => setCreate(true)}><Icon.Plus /> Create Fee</button>
        </div>
      </div>
      <div className="grid-stats">
        <div className="stat-card" style={{ borderLeft: '4px solid #22c55e' }}>
          <div className="muted">Total Collected</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 800, color: '#16a34a' }}>${totalCollected.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div className="muted">Pending</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 800, color: '#b45309' }}>${totalPending.toLocaleString()}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="muted">Overdue</div>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 24, fontWeight: 800, color: '#dc2626' }}>${totalOverdue.toLocaleString()}</div>
        </div>
      </div>
      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={['studentName', 'feeType', 'invoiceId']}
        exportName="fees"
        columns={[
          { key: 'studentName', label: 'Student' },
          { key: 'class', label: 'Class' },
          { key: 'feeType', label: 'Fee Type' },
          { key: 'amount', label: 'Amount', render: r => `$${Number(r.amount).toLocaleString()}` },
          { key: 'dueDate', label: 'Due Date' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Paid' ? 'badge-green' : r.status === 'Pending' ? 'badge-amber' : 'badge-red'}`}>{String(r.status)}</span> },
        ]}
        actions={r => {
          const fee = r as unknown as FeeRecord
          return (
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-icon" onClick={() => setInvoice(fee)}><Icon.Eye /></button>
              <button className="btn-icon" onClick={() => setInvoice(fee)}><Icon.Print /></button>
              {fee.status !== 'Paid' && (
                <button className="btn-primary" style={{ padding: '5px 10px', fontSize: 12 }} onClick={() => { setRows(list => list.map(x => x.id === fee.id ? { ...x, status: 'Paid', paidDate: '2026-08-16' } : x)); toast('success', 'Payment recorded successfully.') }}>Mark Paid</button>
              )}
            </div>
          )
        }}
      />
      <CreateFeeModal open={create} onClose={() => setCreate(false)} />
      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
      <InvoicePreview open={!!invoice} onClose={() => setInvoice(null)} fee={invoice} />
    </div>
  )
}
