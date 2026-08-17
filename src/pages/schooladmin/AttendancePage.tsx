import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal from "../../components/Modal"
import { ATTENDANCE, STUDENTS, initials } from "../../data/mockData"
import { useApp } from "../../context/AppContext"
import { DocumentPreview } from "../../components/DataTable"

type AttStatus = "Present" | "Absent" | "Late" | "Leave"
type ViewMode = "By class" | "By student" | "By date"

interface AuditEntry {
  id: string
  studentName: string
  from: string
  to: string
  reason: string
  date: string
  by: string
}

const STATUS_BADGE: Record<AttStatus, string> = {
  Present: "badge-green",
  Absent: "badge-red",
  Late: "badge-amber",
  Leave: "badge-blue",
}

function historyFor(studentId: string, attendance: number) {
  const days = 10
  const start = new Date(2026, 7, 16)
  const out: { date: string; status: AttStatus }[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() - i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    const roll = (studentId.charCodeAt(0) + i * 7) % 100
    const status: AttStatus =
      roll < 100 - attendance ? "Present" : roll % 3 === 0 ? "Late" : "Absent"
    out.push({ date: dateStr, status })
  }
  return out
}

export default function AttendancePage({
  variant = "admin",
}: {
  variant?: "admin" | "view"
}) {
  const { toast, user } = useApp()
  const [date, setDate] = useState("2026-08-16")
  const [classFilter, setClassFilter] = useState("All")
  const [view, setView] = useState<ViewMode>("By class")
  const [student, setStudent] = useState(STUDENTS[0].id)
  const [records, setRecords] = useState(ATTENDANCE)
  const [preview, setPreview] = useState(false)
  const [correct, setCorrect] = useState<{
    id: string
    name: string
    status: AttStatus
  } | null>(null)
  const [reason, setReason] = useState("")
  const [audit, setAudit] = useState<AuditEntry[]>([])

  const classes = [
    "All",
    ...Array.from(new Set(ATTENDANCE.map((r) => r.class))),
  ]
  const filtered = records.filter(
    (r) => classFilter === "All" || r.class === classFilter,
  )
  const stats = {
    present: filtered.filter((r) => r.status === "Present").length,
    absent: filtered.filter((r) => r.status === "Absent").length,
    late: filtered.filter((r) => r.status === "Late").length,
    leave: filtered.filter((r) => r.status === "Leave").length,
  }
  const rate =
    filtered.length === 0
      ? 0
      : Math.round(((stats.present + stats.late) / filtered.length) * 100)

  const selectedStudent = STUDENTS.find((s) => s.id === student) ?? STUDENTS[0]

  const updateStatus = (studentId: string, status: AttStatus) => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)),
    )
  }

  const saveCorrection = () => {
    if (!correct) return
    setAudit((a) => [
      {
        id: `au-${a.length + 1}`,
        studentName: correct.name,
        from: correct.status,
        to:
          records.find((r) => r.studentId === correct.id)?.status ??
          correct.status,
        reason: reason || "Not specified",
        date: new Date().toLocaleString(),
        by: user.name,
      },
      ...a,
    ])
    setCorrect(null)
    setReason("")
    toast("success", "Correction saved with reason and audit trail.")
  }

  const byDate = records.filter((r) => r.date === date)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Attendance</div>
          <div className="page-subtitle">
            Mark, review and correct daily attendance
          </div>
        </div>
        {variant === "admin" && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              className="btn-secondary"
              onClick={() => {
                setRecords((r) =>
                  r.map((x) =>
                    classFilter === "All" || x.class === classFilter
                      ? { ...x, status: "Present" }
                      : x,
                  ),
                )
                toast("info", "All visible students marked present.")
              }}
            >
              Mark All Present
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                toast("success", "Excel file generated successfully.")
              }
            >
              <Icon.Download /> Export Excel
            </button>
            <button
              className="btn-secondary"
              onClick={() => toast("success", "PDF generated successfully.")}
            >
              <Icon.File /> Export PDF
            </button>
            <button className="btn-secondary" onClick={() => setPreview(true)}>
              <Icon.Print /> Print
            </button>
            <button
              className="btn-primary"
              onClick={() => toast("success", "Attendance saved.")}
            >
              Save Attendance
            </button>
          </div>
        )}
      </div>

      <div
        style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}
      >
        <div>
          <label className="field-label">Date</label>
          <input
            type="date"
            className="input-field"
            style={{ width: 160 }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label">Class</label>
          <select
            className="input-field"
            style={{ width: 140 }}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        {view === "By student" && (
          <div>
            <label className="field-label">Student</label>
            <select
              className="input-field"
              style={{ width: 200 }}
              value={student}
              onChange={(e) => setStudent(e.target.value)}
            >
              {STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        {[
          {
            label: "Present",
            value: stats.present,
            color: "#22c55e",
            bg: "#f0fdf4",
          },
          {
            label: "Absent",
            value: stats.absent,
            color: "#ef4444",
            bg: "#fee2e2",
          },
          { label: "Late", value: stats.late, color: "#f59e0b", bg: "#fef3c7" },
          {
            label: "Attendance Rate",
            value: `${rate}%`,
            color: "#2563eb",
            bg: "#dbeafe",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: s.bg,
              borderRadius: 12,
              padding: "14px 16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: s.color,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="tab-bar">
        {(["By class", "By student", "By date"] as ViewMode[]).map((v) => (
          <div
            key={v}
            className={`tab-item${view === v ? " active" : ""}`}
            onClick={() => setView(v)}
          >
            {v}
          </div>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap">
          {view === "By class" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Class</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Leave</th>
                  <th>Correct</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record) => (
                  <tr key={record.studentId}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                        }}
                      >
                        <div className="avatar">
                          {initials(record.studentName)}
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {record.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="muted">{record.studentId}</td>
                    <td className="muted">{record.class}</td>
                    {([
                      "Present",
                      "Absent",
                      "Late",
                      "Leave",
                    ] as AttStatus[]).map((s) => (
                      <td key={s}>
                        <input
                          type="radio"
                          name={record.studentId}
                          checked={record.status === s}
                          onChange={() => updateStatus(record.studentId, s)}
                        />
                        {record.status === s && (
                          <span
                            className={`badge ${STATUS_BADGE[s]}`}
                            style={{ marginLeft: 6 }}
                          >
                            {s}
                          </span>
                        )}
                      </td>
                    ))}
                    <td>
                      {variant === "admin" && (
                        <button
                          className="btn-icon"
                          title="Correct record"
                          onClick={() =>
                            setCorrect({
                              id: record.studentId,
                              name: record.studentName,
                              status: record.status,
                            })
                          }
                        >
                          <Icon.Edit />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {view === "By student" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {historyFor(selectedStudent.id, selectedStudent.attendance).map(
                  (h) => (
                    <tr key={h.date}>
                      <td style={{ fontWeight: 600 }}>{h.date}</td>
                      <td>
                        <span className={`badge ${STATUS_BADGE[h.status]}`}>
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
                <tr>
                  <td style={{ fontWeight: 600 }}>{date} (today)</td>
                  <td>
                    <span
                      className={`badge ${STATUS_BADGE[records.find((r) => r.studentId === selectedStudent.id)?.status ?? "Present"]}`}
                    >
                      {records.find((r) => r.studentId === selectedStudent.id)
                        ?.status ?? "Present"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {view === "By date" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Student ID</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Correct</th>
                </tr>
              </thead>
              <tbody>
                {byDate.map((record) => (
                  <tr key={record.studentId}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                        }}
                      >
                        <div className="avatar">
                          {initials(record.studentName)}
                        </div>
                        <span style={{ fontWeight: 600 }}>
                          {record.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="muted">{record.studentId}</td>
                    <td className="muted">{record.class}</td>
                    <td>
                      <span className={`badge ${STATUS_BADGE[record.status]}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      {variant === "admin" && (
                        <button
                          className="btn-icon"
                          title="Correct record"
                          onClick={() =>
                            setCorrect({
                              id: record.studentId,
                              name: record.studentName,
                              status: record.status,
                            })
                          }
                        >
                          <Icon.Edit />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {variant === "admin" && (
        <div className="card" style={{ padding: 16, marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Icon.Clipboard />
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Correction Audit Trail
            </div>
            <span className="muted" style={{ fontSize: 12 }}>
              Historical corrections require a reason
            </span>
          </div>
          {audit.length === 0 ? (
            <div className="muted" style={{ fontSize: 13 }}>
              No corrections logged yet.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Student</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>By</th>
                </tr>
              </thead>
              <tbody>
                {audit.map((a) => (
                  <tr key={a.id}>
                    <td>{a.date}</td>
                    <td style={{ fontWeight: 600 }}>{a.studentName}</td>
                    <td>
                      <span
                        className={`badge ${STATUS_BADGE[(a.from as AttStatus)] ?? "badge-gray"}`}
                      >
                        {a.from}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${STATUS_BADGE[(a.to as AttStatus)] ?? "badge-gray"}`}
                      >
                        {a.to}
                      </span>
                    </td>
                    <td>{a.reason}</td>
                    <td>{a.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <Modal
        open={!!correct}
        onClose={() => setCorrect(null)}
        title="Correct attendance record"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setCorrect(null)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={saveCorrection}
              disabled={!reason.trim()}
            >
              Save correction
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Student</label>
            <input
              className="input-field"
              value={correct?.name ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="field-label">Current status</label>
            <span
              className={`badge ${correct ? STATUS_BADGE[correct.status] : ""}`}
            >
              {correct?.status}
            </span>
          </div>
          <div>
            <label className="field-label">New status</label>
            <select className="input-field" defaultValue="Present">
              {(["Present", "Absent", "Late", "Leave"] as AttStatus[]).map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className="field-label">Reason (required)</label>
            <input
              className="input-field"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Doctor's note submitted"
            />
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            This change will be logged to the audit trail with your name and
            timestamp.
          </div>
        </div>
      </Modal>

      <DocumentPreview
        open={preview}
        onClose={() => setPreview(false)}
        title="Daily Attendance"
        columns={["Student", "Class", "Status"]}
        rows={filtered as unknown as Record<string, unknown>[]}
      />
    </div>
  )
}
