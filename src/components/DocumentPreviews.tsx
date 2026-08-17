import { DocumentPreview } from "./DataTable"
import { useApp } from "../context/AppContext"
import type { FeeRecord, Student } from "../data/mockData"
import { REPORT_CARD_SUBJECTS, STUDENTS } from "../data/mockData"

export function InvoicePreview({
  open,
  onClose,
  fee,
}: {
  open: boolean
  onClose: () => void
  fee: FeeRecord | null
}) {
  const { tenant, toast } = useApp()
  if (!fee) return null
  const student = STUDENTS.find((s) => s.name === fee.studentName)
  const discount = fee.discount ?? 0
  const paid = fee.status === "Paid" ? fee.amount - discount : 0
  const balance = fee.amount - discount - paid

  return (
    <DocumentPreview
      open={open}
      onClose={onClose}
      title={`Invoice ${fee.invoiceId}`}
      onDownload={() => toast("success", "PDF generated successfully.")}
      onPrint={() => toast("info", "Opening print dialog…")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Bill to</div>
          <div style={{ fontWeight: 700 }}>{fee.studentName}</div>
          <div style={{ fontSize: 12 }}>
            {student?.parent} · {fee.class}
          </div>
        </div>
        <div style={{ fontSize: 12, textAlign: "right" }}>
          <div>
            Invoice: <b>{fee.invoiceId}</b>
          </div>
          <div>Date: {fee.paidDate ?? fee.dueDate}</div>
          <div>Due: {fee.dueDate}</div>
        </div>
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
      >
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Fee</th>
            <th style={{ textAlign: "right", padding: 8 }}>Qty</th>
            <th style={{ textAlign: "right", padding: 8 }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8 }}>{fee.feeType}</td>
            <td style={{ padding: 8, textAlign: "right" }}>1</td>
            <td style={{ padding: 8, textAlign: "right" }}>
              ${fee.amount.toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{ marginLeft: "auto", width: 240, marginTop: 16, fontSize: 13 }}
      >
        {[
          ["Subtotal", `$${fee.amount.toLocaleString()}`],
          ["Discount", `$${discount.toLocaleString()}`],
          ["Paid", `$${paid.toLocaleString()}`],
          ["Balance", `$${balance.toLocaleString()}`],
        ].map(([k, v]) => (
          <div
            key={k}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "4px 0",
              fontWeight: k === "Balance" ? 800 : 500,
            }}
          >
            <span>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, fontSize: 12, color: "#64748b" }}>
        Thank you for your payment. For questions, contact {tenant.email} or{" "}
        {tenant.phone}.
      </div>
    </DocumentPreview>
  )
}

export function ReportCardPreview({
  open,
  onClose,
  student,
}: {
  open: boolean
  onClose: () => void
  student?: Student | null
}) {
  const { tenant, toast } = useApp()
  const s = student ?? STUDENTS[0]
  const avg = Math.round(
    REPORT_CARD_SUBJECTS.reduce((a, r) => a + r.marks, 0) /
      REPORT_CARD_SUBJECTS.length,
  )

  return (
    <DocumentPreview
      open={open}
      onClose={onClose}
      title="Student Report Card"
      onDownload={() => toast("success", "PDF generated successfully.")}
      onPrint={() => toast("info", "Opening print dialog…")}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 18,
          background: "#eff6ff",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#dbeafe",
            color: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
          }}
        >
          {s.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
          <div style={{ fontSize: 12, color: "#475569" }}>
            {s.studentId} · {s.class} {s.section} · {s.academicYear}
          </div>
        </div>
        <div style={{ fontSize: 12, textAlign: "right", color: "#475569" }}>
          {tenant.name}
        </div>
      </div>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
      >
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th style={{ textAlign: "left", padding: 8 }}>Subject</th>
            <th style={{ textAlign: "center", padding: 8 }}>Marks</th>
            <th style={{ textAlign: "center", padding: 8 }}>Grade</th>
            <th style={{ textAlign: "left", padding: 8 }}>Teacher Comment</th>
          </tr>
        </thead>
        <tbody>
          {REPORT_CARD_SUBJECTS.map((r) => (
            <tr key={r.subject}>
              <td style={{ padding: 8, borderBottom: "1px solid #f1f5f9" }}>
                {r.subject}
              </td>
              <td
                style={{
                  padding: 8,
                  textAlign: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {r.marks}
              </td>
              <td
                style={{
                  padding: 8,
                  textAlign: "center",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                {r.grade}
              </td>
              <td style={{ padding: 8, borderBottom: "1px solid #f1f5f9" }}>
                {r.comment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginTop: 16,
        }}
      >
        <div
          style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}
        >
          <b>Average:</b> {avg}%
        </div>
        <div
          style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}
        >
          <b>Position:</b> 4 of 32
        </div>
        <div
          style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 10 }}
        >
          <b>Attendance:</b> {s.attendance}%
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 12 }}>
        <div style={{ marginBottom: 8 }}>
          <b>Teacher comment:</b> Ethan is a consistent and respectful learner.
          Continue practicing word problems.
        </div>
        <div>
          <b>Principal comment:</b> A strong term. Keep up the excellent work.
        </div>
      </div>
    </DocumentPreview>
  )
}
