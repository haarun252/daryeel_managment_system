import { useState } from 'react'
import { Icon } from '../../components/Icons'
import DataTable from '../../components/DataTable'
import { ParentRegistrationModal, ClassCreationModal, CreateFeeModal, RecordPaymentModal } from '../../components/FormModals'
import { InvoicePreview } from '../../components/DocumentPreviews'
import { PARENTS, CLASSES, SECTIONS, SUBJECTS, PAYMENTS, FEES, EXPENSES, initials } from '../../data/mockData'
import type { FeeRecord } from '../../data/mockData'

export function ParentsPage() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Parents</div><div className="page-subtitle">{PARENTS.length} registered guardians</div></div>
        <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Add Parent</button>
      </div>
      <DataTable
        data={PARENTS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'email', 'phone']}
        exportName="parents"
        emptyTitle="No parents found."
        emptyMessage="No parents have been registered yet."
        emptyAction="+ Register Parent"
        onEmptyAction={() => setOpen(true)}
        columns={[
          { key: 'name', label: 'Parent', render: r => <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><div className="avatar">{initials(String(r.name))}</div><div><div style={{ fontWeight: 600 }}>{String(r.name)}</div><div className="muted" style={{ fontSize: 12 }}>{String(r.email)}</div></div></div> },
          { key: 'relationship', label: 'Relationship' },
          { key: 'phone', label: 'Phone' },
          { key: 'occupation', label: 'Occupation' },
          { key: 'children', label: 'Children', render: r => (r.children as string[]).join(', ') },
          { key: 'status', label: 'Status', render: r => <span className="badge badge-green">{String(r.status)}</span> },
        ]}
        actions={() => <div style={{ display: 'flex' }}><button className="btn-icon"><Icon.Eye /></button><button className="btn-icon"><Icon.Edit /></button><button className="btn-icon"><Icon.Print /></button></div>}
      />
      <ParentRegistrationModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export function ClassesPage({ canManage = true }: { canManage?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">{canManage ? 'Classes' : 'My Classes'}</div><div className="page-subtitle">{CLASSES.length} classes this academic year</div></div>
        {canManage && <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Create Class</button>}
      </div>
      <DataTable
        data={CLASSES as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'teacher']}
        exportName="classes"
        columns={[
          { key: 'name', label: 'Class' },
          { key: 'grade', label: 'Grade' },
          { key: 'section', label: 'Section' },
          { key: 'teacher', label: 'Class teacher' },
          { key: 'room', label: 'Room' },
          { key: 'students', label: 'Students', render: r => `${r.students}/${r.capacity}` },
          { key: 'academicYear', label: 'Year' },
        ]}
        actions={() => <div style={{ display: 'flex' }}><button className="btn-icon"><Icon.Eye /></button><button className="btn-icon"><Icon.Edit /></button></div>}
      />
      <ClassCreationModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export function SectionsPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Sections</div><div className="page-subtitle">Class streams and capacity</div></div></div>
      <DataTable
        data={SECTIONS as unknown as Record<string, unknown>[]}
        searchKeys={['name']}
        exportName="sections"
        columns={[
          { key: 'name', label: 'Section' },
          { key: 'classes', label: 'Classes' },
          { key: 'students', label: 'Students' },
          { key: 'description', label: 'Description' },
        ]}
      />
    </div>
  )
}

export function SubjectsPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Subjects</div><div className="page-subtitle">Curriculum subjects</div></div></div>
      <DataTable
        data={SUBJECTS as unknown as Record<string, unknown>[]}
        searchKeys={['name', 'code', 'teacher']}
        exportName="subjects"
        columns={[
          { key: 'name', label: 'Subject' },
          { key: 'code', label: 'Code' },
          { key: 'teacher', label: 'Lead teacher' },
          { key: 'classes', label: 'Classes' },
          { key: 'type', label: 'Type', render: r => <span className={`badge ${r.type === 'Core' ? 'badge-blue' : 'badge-purple'}`}>{String(r.type)}</span> },
        ]}
      />
    </div>
  )
}

export function InvoicesPage() {
  const [fee, setFee] = useState<FeeRecord | null>(null)
  const [pay, setPay] = useState(false)
  const [create, setCreate] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Invoices</div><div className="page-subtitle">Student fee invoices</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPay(true)}>Record Payment</button>
          <button className="btn-primary" onClick={() => setCreate(true)}><Icon.Plus /> Create Fee</button>
        </div>
      </div>
      <DataTable
        data={FEES as unknown as Record<string, unknown>[]}
        searchKeys={['studentName', 'invoiceId']}
        exportName="invoices"
        columns={[
          { key: 'invoiceId', label: 'Invoice' },
          { key: 'studentName', label: 'Student' },
          { key: 'feeType', label: 'Fee' },
          { key: 'amount', label: 'Amount', render: r => `$${Number(r.amount).toLocaleString()}` },
          { key: 'dueDate', label: 'Due' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Paid' ? 'badge-green' : r.status === 'Pending' ? 'badge-amber' : 'badge-red'}`}>{String(r.status)}</span> },
        ]}
        actions={r => <button className="btn-icon" onClick={() => setFee(r as unknown as FeeRecord)}><Icon.Eye /></button>}
      />
      <InvoicePreview open={!!fee} onClose={() => setFee(null)} fee={fee} />
      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
      <CreateFeeModal open={create} onClose={() => setCreate(false)} />
    </div>
  )
}

export function SchoolPaymentsPage() {
  const [pay, setPay] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Payments</div><div className="page-subtitle">Recorded fee payments</div></div>
        <button className="btn-primary" onClick={() => setPay(true)}><Icon.Plus /> Record Payment</button>
      </div>
      <DataTable
        data={PAYMENTS as unknown as Record<string, unknown>[]}
        searchKeys={['studentName', 'invoiceId', 'reference']}
        exportName="payments"
        columns={[
          { key: 'studentName', label: 'Student' },
          { key: 'invoiceId', label: 'Invoice' },
          { key: 'amount', label: 'Amount', render: r => `$${Number(r.amount).toLocaleString()}` },
          { key: 'method', label: 'Method' },
          { key: 'date', label: 'Date' },
          { key: 'reference', label: 'Reference' },
          { key: 'status', label: 'Status', render: r => <span className="badge badge-green">{String(r.status)}</span> },
        ]}
      />
      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
    </div>
  )
}

export function ExpensesPage() {
  return (
    <div>
      <div className="page-header"><div><div className="page-title">Expenses</div><div className="page-subtitle">School operating expenses</div></div></div>
      <DataTable
        data={EXPENSES as unknown as Record<string, unknown>[]}
        searchKeys={['title', 'category']}
        exportName="expenses"
        columns={[
          { key: 'title', label: 'Expense' },
          { key: 'category', label: 'Category' },
          { key: 'amount', label: 'Amount', render: r => `$${Number(r.amount).toLocaleString()}` },
          { key: 'date', label: 'Date' },
          { key: 'paidTo', label: 'Paid to' },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Paid' ? 'badge-green' : 'badge-amber'}`}>{String(r.status)}</span> },
        ]}
      />
    </div>
  )
}
