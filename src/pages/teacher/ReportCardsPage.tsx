import { useState } from "react"
import { Icon } from "../../components/Icons"
import { useApp } from "../../context/AppContext"
import { STUDENTS } from "../../data/mockData"

const REPORT_CATEGORIES = [
  "Academic",
  "Behaviour",
  "Attendance",
  "Achievement",
  "Concern",
  "General",
]

type PriorityType = "Low" | "Normal" | "High"
type RecipientType = "Parent" | "Admin" | "Both"
type ReportDraft = {
  id: string
  studentId: string
  studentName: string
  category: string
  report: string
  date: string
  priority: PriorityType
  recipient: RecipientType
  status: "Draft" | "Submitted"
}

export function ReportCardsPage() {
  const { user, toast } = useApp()

  const [selectedStudent, setSelectedStudent] = useState<{
    id: string
    name: string
    class: string
    section: string
  }>(STUDENTS[0])
  const [category, setCategory] = useState<string>("Academic")
  const [reportText, setReportText] = useState("")
  const [priority, setPriority] = useState<PriorityType>("Normal")
  const [recipient, setRecipient] = useState<RecipientType>("Both")
  const [openModal, setOpenModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [drafts, setDrafts] = useState<ReportDraft[]>([])

  const handleSaveDraft = () => {
    if (!reportText.trim()) return
    const draft: ReportDraft = {
      id: `dr${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      category,
      report: reportText,
      date: new Date().toISOString().split("T")[0],
      priority,
      recipient,
      status: "Draft",
    }
    setDrafts((prev) => [...prev, draft])
    setReportText("")
    toast("success", "Draft saved.")
    setOpenModal(false)
  }

  const submitReport = async () => {
    if (!reportText.trim()) return
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const draft: ReportDraft = {
      id: `dr${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      category,
      report: reportText,
      date: new Date().toISOString().split("T")[0],
      priority,
      recipient,
      status: "Submitted",
    }
    setDrafts((prev) => [...prev, draft])
    setReportText("")
    setSaving(false)
    toast(
      "success",
      `Report submitted to ${recipient} for ${selectedStudent.name}.`,
    )
    setOpenModal(false)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Student Reports</div>
          <div className="page-subtitle">Create and manage student reports</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select
            className="input-field"
            style={{ flex: 1, minWidth: 200 }}
            onChange={(e) =>
              setSelectedStudent(
                STUDENTS.find((s) => s.id === e.target.value) ?? STUDENTS[0],
              )
            }
          >
            <option value={STUDENTS[0].id}>Select student</option>
            {STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.class} {s.section}
              </option>
            ))}
          </select>
          <select
            className="input-field"
            style={{ flex: 1, minWidth: 150, marginLeft: 8 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {REPORT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            className="btn-primary"
            onClick={() => setOpenModal(true)}
            style={{ padding: "8px 16px", fontSize: 13, marginLeft: 8 }}
          >
            <Icon.Plus /> Create Report
          </button>
        </div>
      </div>

      {selectedStudent && (
        <div
          style={{
            marginTop: 24,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Report form */}
          <div className="card" style={{ padding: 20 }}>
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#0f172a",
                marginBottom: 12,
              }}
            >
              Report for {selectedStudent.name}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#3b82f6",
                  marginBottom: 4,
                }}
              >
                Category
              </label>
              <select className="input-field" style={{ width: "100%" }}>
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#3b82f6",
                  marginBottom: 4,
                }}
              >
                Report
              </label>
              <textarea
                className="input-field"
                rows={4}
                placeholder="Write your report here..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                style={{ width: "100%", borderRadius: 10, padding: 12 }}
              ></textarea>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}
                >
                  Priority
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select className="input-field">
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}
                >
                  Recipient
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <select className="input-field">
                    <option value="Parent">Parent</option>
                    <option value="Admin">Admin</option>
                    <option value="Both">Parent & Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button
                className="btn-secondary"
                onClick={() => setOpenModal(false)}
                style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={saving ? undefined : handleSaveDraft}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {saving
                  ? "Saving..."
                  : drafts.length > 0
                    ? "Save Draft"
                    : "Create Report"}
              </button>
            </div>
          </div>

          {/* Existing drafts */}
          {drafts.length > 0 && (
            <div className="card" style={{ padding: 20 }}>
              <div
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#0f172a",
                  marginBottom: 12,
                }}
              >
                My Drafts
              </div>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  marginBottom: 12,
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
              >
                {drafts.map((d, i) => (
                  <div
                    key={d.id}
                    style={{
                      background:
                        d.status === "Draft"
                          ? "var(--bg-muted)"
                          : "var(--primary-soft)",
                      borderRadius: 10,
                      padding: 12,
                      border:
                        d.status === "Draft"
                          ? "1px solid var(--border)"
                          : "1px solid var(--primary)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#0f172a",
                        marginBottom: 4,
                      }}
                    >
                      {d.studentName} — {d.category}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        marginBottom: 4,
                      }}
                    >
                      {d.date}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: d.status === "Draft" ? "#64748b" : "#16a34a",
                      }}
                    >
                      Status: {d.status}
                    </div>
                    {d.recipient === "Both" && (
                      <span
                        style={{
                          color: "#3b82f6",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        Sent to: Parent & Admin
                      </span>
                    )}
                    {d.recipient === "Parent" && (
                      <span
                        style={{
                          color: "#10b981",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        Sent to: Parent
                      </span>
                    )}
                    {d.recipient === "Admin" && (
                      <span
                        style={{
                          color: "#f59e0b",
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        Sent to: Admin
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            <button
              className="btn-secondary"
              style={{ flex: 1, padding: "10px 16px", fontSize: 13 }}
            >
              Send to Parent
            </button>
            <button
              className="btn-primary"
              style={{
                flex: 1,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Send to Admin
            </button>
            <button
              className="btn-secondary"
              style={{ flex: 1, padding: "10px 16px", fontSize: 13 }}
            >
              Send to Both
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
