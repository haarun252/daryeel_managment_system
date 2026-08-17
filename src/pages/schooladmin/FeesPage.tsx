import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal, { ConfirmModal } from "../../components/Modal"
import { FEES } from "../../data/mockData"
import type { FeeRecord } from "../../data/mockData"
import { CreateFeeModal, RecordPaymentModal } from "../../components/FormModals"
import { InvoicePreview } from "../../components/DocumentPreviews"
import { useApp } from "../../context/AppContext"
import DataTable from "../../components/DataTable"

const VIEWS = ["By student", "By class", "By month"] as const

export default function FeesPage({
  canManage = true,
}: {
  canManage?: boolean
}) {
  const { toast } = useApp()
  const [create, setCreate] = useState(false)
  const [pay, setPay] = useState(false)
  const [invoice, setInvoice] = useState<FeeRecord | null>(null)
  const [rows, setRows] = useState(FEES)
  const [view, setView] = useState<typeof VIEWS[number]>("By student")
  const [partialFor, setPartialFor] = useState<FeeRecord | null>(null)
  const [partialAmount, setPartialAmount] = useState(0)
  const [adjust, setAdjust] = useState<FeeRecord | null>(null)

  const expected = rows.reduce((s, f) => s + f.amount, 0)
  const collected = rows
    .filter((f) => f.status === "Paid")
    .reduce((s, f) => s + (f.paid ?? f.amount), 0)
  const outstanding = rows
    .filter((f) => f.status !== "Paid")
    .reduce((s, f) => s + (f.amount - (f.paid ?? 0)), 0)
  const partial = rows.filter(
    (f) => f.status === "Partial" || (f.status !== "Paid" && (f.paid ?? 0) > 0),
  )
  const overdue = rows.filter(
    (f) =>
      f.status === "Overdue" ||
      (f.status === "Partial" && f.dueDate < "2026-08-16"),
  )

  const statusBadge = (s: string) => (
    <span
      className={`badge ${
        s === "Paid"
          ? "badge-green"
          : s === "Partial"
            ? "badge-purple"
            : s === "Pending"
              ? "badge-amber"
              : "badge-red"
      }`}
    >
      {s}
    </span>
  )

  const recordPartial = () => {
    if (!partialFor) return
    const newPaid = (partialFor.paid ?? 0) + partialAmount
    const status: FeeRecord["status"] =
      newPaid >= partialFor.amount ? "Paid" : "Partial"
    setRows((list) =>
      list.map((x) =>
        x.id === partialFor.id
          ? {
              ...x,
              paid: newPaid,
              status,
              paidDate: newPaid >= x.amount ? "2026-08-17" : x.paidDate,
            }
          : x,
      ),
    )
    setPartialFor(null)
    toast(
      "success",
      `Partial payment of $${partialAmount.toLocaleString()} recorded.`,
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Fees</div>
          <div className="page-subtitle">
            Manage student fee collection and invoices
          </div>
        </div>
        {canManage && (
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-secondary" onClick={() => setPay(true)}>
              Record Payment
            </button>
            <button className="btn-primary" onClick={() => setCreate(true)}>
              <Icon.Plus /> Create Fee
            </button>
          </div>
        )}
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Expected</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            ${expected.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            {rows.length} fee invoices
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Collected</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            ${collected.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            {rows.filter((f) => f.status === "Paid").length} fully paid
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Outstanding</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            ${outstanding.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Unpaid balance
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Partial</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#7c3aed",
            }}
          >
            {partial.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Partially paid invoices
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Overdue</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#b45309",
            }}
          >
            {overdue.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Past due date
          </div>
        </div>
      </div>

      <div className="tab-bar">
        {VIEWS.map((v) => (
          <div
            key={v}
            className={`tab-item${view === v ? " active" : ""}`}
            onClick={() => setView(v)}
          >
            {v}
          </div>
        ))}
      </div>

      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={["studentName", "feeType", "invoiceId", "class"]}
        exportName="fees"
        columns={[
          {
            key: "studentName",
            label:
              view === "By student"
                ? "Student"
                : view === "By class"
                  ? "Class"
                  : "Due month",
            render: (r) =>
              view === "By student" ? (
                <span style={{ fontWeight: 600 }}>{String(r.studentName)}</span>
              ) : view === "By class" ? (
                <span className="badge badge-blue">{String(r.class)}</span>
              ) : (
                String(r.dueDate).slice(0, 7)
              ),
          },
          { key: "invoiceId", label: "Invoice" },
          { key: "feeType", label: "Fee Type" },
          {
            key: "amount",
            label: "Amount",
            render: (r) => `$${Number(r.amount).toLocaleString()}`,
          },
          {
            key: "paid",
            label: "Paid",
            render: (r) => `$${Number(r.paid ?? 0).toLocaleString()}`,
          },
          { key: "dueDate", label: "Due Date" },
          {
            key: "status",
            label: "Status",
            render: (r) => statusBadge(String(r.status)),
          },
        ]}
        actions={(r) => {
          const fee = r as unknown as FeeRecord
          return (
            <div style={{ display: "flex", gap: 4 }}>
              <button
                className="btn-icon"
                title="Receipt"
                onClick={() => setInvoice(fee)}
              >
                <Icon.Receipt />
              </button>
              {canManage && fee.status !== "Paid" && (
                <>
                  <button
                    className="btn-icon"
                    title="Mark paid"
                    onClick={() => {
                      setRows((list) =>
                        list.map((x) =>
                          x.id === fee.id
                            ? {
                                ...x,
                                status: "Paid",
                                paid: x.amount,
                                paidDate: "2026-08-17",
                              }
                            : x,
                        ),
                      )
                      toast("success", "Payment recorded successfully.")
                    }}
                  >
                    <Icon.Check />
                  </button>
                  <button
                    className="btn-icon"
                    title="Partial payment"
                    onClick={() => {
                      setPartialFor(fee)
                      setPartialAmount(fee.amount - (fee.paid ?? 0))
                    }}
                  >
                    <Icon.Fees />
                  </button>
                  <button
                    className="btn-icon"
                    title="Adjustment (permission)"
                    onClick={() => setAdjust(fee)}
                  >
                    <Icon.Edit />
                  </button>
                  <button
                    className="btn-icon"
                    title="Reminder"
                    onClick={() =>
                      toast(
                        "success",
                        `Reminder sent to ${fee.studentName}'s parent.`,
                      )
                    }
                  >
                    <Icon.Bell />
                  </button>
                </>
              )}
            </div>
          )
        }}
      />

      <CreateFeeModal open={create} onClose={() => setCreate(false)} />
      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
      <InvoicePreview
        open={!!invoice}
        onClose={() => setInvoice(null)}
        fee={invoice}
      />

      <Modal
        open={!!partialFor}
        onClose={() => setPartialFor(null)}
        title={`Partial payment — ${partialFor?.studentName ?? ""}`}
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => setPartialFor(null)}
            >
              Cancel
            </button>
            <button className="btn-primary" onClick={recordPartial}>
              Record payment
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Invoice</label>
            <input
              className="input-field"
              value={partialFor?.invoiceId ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="field-label">Total amount</label>
            <input
              className="input-field"
              value={`$${(partialFor?.amount ?? 0).toLocaleString()}`}
              readOnly
            />
          </div>
          <div>
            <label className="field-label">Balance</label>
            <input
              className="input-field"
              value={`$${((partialFor?.amount ?? 0) - (partialFor?.paid ?? 0)).toLocaleString()}`}
              readOnly
            />
          </div>
          <div>
            <label className="field-label">Amount paying</label>
            <input
              className="input-field"
              type="number"
              value={partialAmount}
              onChange={(e) => setPartialAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="field-label">Method</label>
            <select className="input-field">
              <option>Cash</option>
              <option>Bank</option>
              <option>Mobile Money</option>
              <option>Card</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={!!adjust}
        onClose={() => setAdjust(null)}
        title="Fee adjustment — requires permission"
        message={`Adjust ${adjust?.invoiceId} (${adjust?.studentName})? Fee adjustments require administrator permission and will be logged to the audit trail.`}
        confirmLabel="Request permission"
        danger={false}
        onConfirm={() => {
          toast("info", "Adjustment request submitted for approval.")
        }}
      />
    </div>
  )
}
