import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal from "../../components/Modal"
import { useApp } from "../../context/AppContext"
import { SCHOOL_REPORTS } from "../../data/mockData"
import type { SchoolReport } from "../../data/mockData"

const STATUS_BADGE: Record<string, string> = {
  Draft: "badge-gray",
  "Pending Review": "badge-amber",
  Approved: "badge-blue",
  Sent: "badge-green",
  Archived: "badge-gray",
}

type ReportView = "Student reports" | "Teacher reports" | "Pending review" | "Sent" | "Archived"

export function ReportsPage({
  variant = "school",
}: {
  variant?: "school" | "parent"
}) {
  const { toast, tenant } = useApp()
  const [view, setView] = useState<ReportView>("Student reports")
  const [reports, setReports] = useState(SCHOOL_REPORTS)
  const [selected, setSelected] = useState<SchoolReport | null>(null)
  const [returning, setReturning] = useState<SchoolReport | null>(null)
  const [feedback, setFeedback] = useState("")

  const filtered = reports.filter((r) => {
    if (view === "Student reports") return r.type === "Student"
    if (view === "Teacher reports") return r.type === "Teacher"
    return r.status === view
  })

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === "Pending Review").length,
    approved: reports.filter((r) => r.status === "Approved").length,
    sent: reports.filter((r) => r.status === "Sent").length,
  }

  const setStatus = (id: string, status: SchoolReport["status"]) => {
    setReports((list) => list.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Reports</div>
          <div className="page-subtitle">
            {variant === "parent"
              ? `${tenant.name} — your child&apos;s reports`
              : "Review, approve and send reports to parents"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className="btn-secondary"
            onClick={() => toast("info", "Report generation started.")}
          >
            <Icon.Plus /> Generate Report
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
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Total reports</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {stats.total}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Pending review</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#f59e0b",
            }}
          >
            {stats.pending}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Approved</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            {stats.approved}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Sent to parents</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            {stats.sent}
          </div>
        </div>
      </div>

      <div className="tab-bar">
        {([
          "Student reports",
          "Teacher reports",
          "Pending review",
          "Sent",
          "Archived",
        ] as ReportView[]).map((v) => (
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
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Date</th>
                <th>Prepared by</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 600 }}>{r.title}</td>
                  <td>
                    <span className="badge badge-gray">{r.type}</span>
                  </td>
                  <td>{r.subject}</td>
                  <td className="muted">{r.className}</td>
                  <td className="muted">{r.date}</td>
                  <td className="muted">{r.preparedBy}</td>
                  <td>
                    <span className={`badge ${STATUS_BADGE[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 2 }}>
                      <button
                        className="btn-icon"
                        title="View"
                        onClick={() => setSelected(r)}
                      >
                        <Icon.Eye />
                      </button>
                      {variant === "school" &&
                        r.status === "Pending Review" && (
                          <>
                            <button
                              className="btn-icon"
                              title="Approve"
                              onClick={() => {
                                setStatus(r.id, "Approved")
                                toast("success", "Report approved.")
                              }}
                            >
                              <Icon.Check />
                            </button>
                            <button
                              className="btn-icon"
                              title="Return for revision"
                              onClick={() => setReturning(r)}
                            >
                              <Icon.Refresh />
                            </button>
                          </>
                        )}
                      {variant === "school" && r.status === "Approved" && (
                        <button
                          className="btn-icon"
                          title="Send to parent"
                          onClick={() => {
                            setStatus(r.id, "Sent")
                            toast(
                              "success",
                              `Report sent to parents of ${r.className}.`,
                            )
                          }}
                        >
                          <Icon.Send />
                        </button>
                      )}
                      {variant === "school" &&
                        (r.status === "Sent" || r.status === "Draft") && (
                          <button
                            className="btn-icon"
                            title="Archive"
                            onClick={() => {
                              setStatus(r.id, "Archived")
                              toast("info", "Report archived.")
                            }}
                          >
                            <Icon.Archive />
                          </button>
                        )}
                      {variant === "parent" && (
                        <>
                          <button
                            className="btn-icon"
                            title="Download"
                            onClick={() => toast("success", "PDF downloaded.")}
                          >
                            <Icon.Download />
                          </button>
                          <button
                            className="btn-icon"
                            title="Print"
                            onClick={() => window.print()}
                          >
                            <Icon.Print />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="muted"
                    style={{ textAlign: "center", padding: 24 }}
                  >
                    No reports in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title ?? "Report"}
        size="md"
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => toast("success", "PDF downloaded.")}
            >
              <Icon.Download /> Download
            </button>
            <button className="btn-secondary" onClick={() => window.print()}>
              <Icon.Print /> Print
            </button>
            {variant === "school" && selected?.status === "Pending Review" && (
              <button
                className="btn-primary"
                onClick={() => {
                  setStatus(selected.id, "Approved")
                  setSelected(null)
                  toast("success", "Report approved.")
                }}
              >
                Approve
              </button>
            )}
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          {selected && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    background: "var(--bg-muted)",
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Type
                  </div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>
                    {selected.type}
                  </div>
                </div>
                <div
                  style={{
                    background: "var(--bg-muted)",
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Class
                  </div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>
                    {selected.className}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--bg-muted)",
                  borderRadius: 10,
                  padding: 14,
                  minHeight: 160,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Preview
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  This is a preview of the report document. It lists per-student
                  marks, grades and teacher comments for {selected.subject}.
                  Full document available for download.
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={`badge ${STATUS_BADGE[selected.status]}`}>
                  {selected.status}
                </span>
                <span className="muted" style={{ fontSize: 12 }}>
                  Prepared by {selected.preparedBy} on {selected.date}
                </span>
              </div>
            </>
          )}
        </div>
      </Modal>

      <Modal
        open={!!returning}
        onClose={() => setReturning(null)}
        title="Return for revision"
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => setReturning(null)}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!feedback.trim()}
              onClick={() => {
                if (!returning) return
                setStatus(returning.id, "Draft")
                toast("info", "Report returned with feedback.")
                setReturning(null)
                setFeedback("")
              }}
            >
              Return report
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Report</label>
            <input
              className="input-field"
              value={returning?.title ?? ""}
              readOnly
            />
          </div>
          <div>
            <label className="field-label">
              Feedback for teacher (required)
            </label>
            <textarea
              className="input-field"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g. Please re-check the attendance remarks before resubmitting"
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
