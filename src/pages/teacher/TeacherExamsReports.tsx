import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal from "../../components/Modal"
import DataTable from "../../components/DataTable"
import { useApp } from "../../context/AppContext"
import { EXAMS, RESULTS, TEACHER_REPORTS, initials } from "../../data/mockData"
import type { TeacherReport } from "../../data/mockData"
import { myTeacher, myStudentsOf, myClassNames } from "./TeacherClassesStudents"

const CATEGORY_BADGE: Record<string, string> = {
  Academic: "badge-blue",
  Behaviour: "badge-purple",
  Attendance: "badge-amber",
  Achievement: "badge-green",
  Concern: "badge-red",
  General: "badge-gray",
}

const REPORT_CATEGORIES = [
  "Academic",
  "Behaviour",
  "Attendance",
  "Achievement",
  "Concern",
  "General",
] as const

export function TeacherExamsPage() {
  const { user, toast } = useApp()
  const teacher = myTeacher(user?.name)
  const myStudents = myStudentsOf(user?.name)
  const myGrades = Array.from(
    new Set(myClassNames(user?.name).map((c) => c.replace(/[A-Z]$/, ""))),
  )
  const [tab, setTab] = useState<"Upcoming" | "Open mark entry" | "Completed">(
    "Upcoming",
  )
  const [marks, setMarks] = useState<Record<string, {
    score: number
    comment: string
  }>>({})
  const [saved, setSaved] = useState(false)

  const myExams = EXAMS.filter(
    (e) =>
      e.status === "Upcoming" &&
      (e.class === "All Grades" || myGrades.includes(e.class)),
  )
  const enteredResults = RESULTS.filter((r) =>
    myStudents.some((s) => s.studentId === r.studentId),
  )

  const gradeOf = (score: number) =>
    score >= 90
      ? "A+"
      : score >= 80
        ? "A"
        : score >= 70
          ? "B+"
          : score >= 60
            ? "B"
            : score >= 50
              ? "C+"
              : "F"
  const scores = Object.values(marks).map((m) => m.score)
  const total = scores.reduce((s, x) => s + x, 0)
  const average = scores.length ? Math.round(total / scores.length) : 0

  const saveMarks = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
    toast("success", "Marks saved. Total, average and grades recalculated.")
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Exams &amp; Marks</div>
          <div className="page-subtitle">
            {teacher.name} — enter scores and comments per student
          </div>
        </div>
        {tab === "Open mark entry" && (
          <div style={{ display: "flex", gap: 8 }}>
            {saved && <span className="badge badge-green">Saved</span>}
            <button className="btn-primary" onClick={saveMarks}>
              <Icon.Check /> Save Marks
            </button>
          </div>
        )}
      </div>

      <div className="tab-bar">
        {(["Upcoming", "Open mark entry", "Completed"] as const).map((t) => (
          <div
            key={t}
            className={`tab-item${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </div>
        ))}
      </div>

      {tab === "Upcoming" && (
        <DataTable
          data={myExams as unknown as Record<string, unknown>[]}
          searchKeys={["name"]}
          exportName="upcoming-exams"
          columns={[
            { key: "name", label: "Exam name" },
            { key: "class", label: "Classes" },
            { key: "date", label: "Start date" },
            { key: "time", label: "Time" },
            { key: "duration", label: "Duration" },
          ]}
          actions={(r) => (
            <button
              className="btn-icon"
              title="Open mark entry"
              onClick={() => {
                setTab("Open mark entry")
                toast("info", `Mark entry opened for ${String(r.name)}.`)
              }}
            >
              <Icon.Edit />
            </button>
          )}
        />
      )}

      {tab === "Open mark entry" && (
        <div>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <select
              className="input-field"
              style={{ maxWidth: 220 }}
              defaultValue={myExams[0]?.name ?? ""}
            >
              {myExams.map((e) => (
                <option key={e.id}>{e.name}</option>
              ))}
            </select>
            <span
              className="muted"
              style={{ alignSelf: "center", fontSize: 12 }}
            >
              Total: {total} · Average: {average} · Grade: {gradeOf(average)}
            </span>
          </div>
          <div className="card">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {myStudents.map((s) => {
                    const m = marks[s.id] ?? { score: 0, comment: "" }
                    return (
                      <tr key={s.id}>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <div className="avatar">{initials(s.name)}</div>
                            <span style={{ fontWeight: 600 }}>{s.name}</span>
                          </div>
                        </td>
                        <td className="muted">
                          {s.class}
                          {s.section}
                        </td>
                        <td>
                          <input
                            className="input-field"
                            type="number"
                            min={0}
                            max={100}
                            style={{ width: 80 }}
                            value={m.score || ""}
                            placeholder="—"
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [s.id]: {
                                  ...prev[s.id],
                                  score: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="input-field"
                            placeholder="Comment (optional)"
                            value={m.comment}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [s.id]: {
                                  ...prev[s.id],
                                  comment: e.target.value,
                                },
                              }))
                            }
                          />
                        </td>
                        <td>
                          <span className="badge badge-blue">
                            {m.score ? gradeOf(m.score) : "—"}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "Completed" && (
        <DataTable
          data={enteredResults as unknown as Record<string, unknown>[]}
          searchKeys={["studentName", "subject"]}
          exportName="completed-marks"
          columns={[
            { key: "studentName", label: "Student" },
            { key: "class", label: "Class" },
            { key: "subject", label: "Subject" },
            { key: "marks", label: "Score" },
            {
              key: "grade",
              label: "Grade",
              render: (r) => (
                <span className="badge badge-blue">{String(r.grade)}</span>
              ),
            },
            { key: "remarks", label: "Comment" },
          ]}
        />
      )}
    </div>
  )
}

export function TeacherReportsPage() {
  const { user, toast } = useApp()
  const teacher = myTeacher(user?.name)
  const myStudents = myStudentsOf(user?.name)
  const [reports, setReports] = useState(TEACHER_REPORTS)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Partial<TeacherReport> | null>(null)
  const [remove, setRemove] = useState<TeacherReport | null>(null)

  const drafts = reports.filter((r) => r.status === "Draft").length
  const submitted = reports.filter((r) => r.status === "Submitted").length

  const createReport = (status: TeacherReport["status"]) => {
    if (!draft || !draft.studentName || !draft.category || !draft.report) {
      toast("warning", "Student, category and report text are required.")
      return
    }
    const stu = myStudents.find((s) => s.name === draft.studentName)
    const newReport: TeacherReport = {
      id: `tr${Date.now()}`,
      studentName: draft.studentName,
      className: stu ? `${stu.class}${stu.section}` : "—",
      category: draft.category as TeacherReport["category"],
      report: draft.report,
      date: draft.date ?? "2026-08-17",
      priority: (draft.priority ?? "Normal") as TeacherReport["priority"],
      recipient: (draft.recipient ?? "Parent") as TeacherReport["recipient"],
      status,
    }
    setReports((list) => [newReport, ...list])
    setOpen(false)
    setDraft(null)
    toast(
      "success",
      status === "Draft" ? "Report saved as draft." : "Report submitted.",
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Student Reports</div>
          <div className="page-subtitle">
            Create, save drafts and submit reports per school policy
          </div>
        </div>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          <Icon.Plus /> New Report
        </button>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Total reports</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {reports.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            {teacher.name}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Drafts</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#f59e0b",
            }}
          >
            {drafts}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Not yet submitted
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Submitted</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            {submitted}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Sent to recipient per policy
          </div>
        </div>
      </div>

      <DataTable
        data={reports as unknown as Record<string, unknown>[]}
        searchKeys={["studentName", "category", "report"]}
        exportName="student-reports"
        columns={[
          {
            key: "studentName",
            label: "Student",
            render: (r) => (
              <span style={{ fontWeight: 600 }}>{String(r.studentName)}</span>
            ),
          },
          {
            key: "category",
            label: "Category",
            render: (r) => (
              <span className={`badge ${CATEGORY_BADGE[String(r.category)]}`}>
                {String(r.category)}
              </span>
            ),
          },
          {
            key: "report",
            label: "Report",
            render: (r) => (
              <span className="muted">
                {String(r.report).slice(0, 70)}
                {String(r.report).length > 70 ? "…" : ""}
              </span>
            ),
          },
          { key: "date", label: "Date" },
          {
            key: "priority",
            label: "Priority",
            render: (r) => (
              <span
                className={`badge ${
                  String(r.priority) === "Urgent"
                    ? "badge-red"
                    : String(r.priority) === "High"
                      ? "badge-amber"
                      : "badge-gray"
                }`}
              >
                {String(r.priority)}
              </span>
            ),
          },
          { key: "recipient", label: "Recipient" },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Submitted" ? "badge-green" : "badge-amber"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
        ]}
        actions={(r) => {
          const rep = r as unknown as TeacherReport
          return (
            <div style={{ display: "flex", gap: 2 }}>
              {rep.status === "Draft" && (
                <>
                  <button
                    className="btn-icon"
                    title="Edit draft"
                    onClick={() => toast("info", "Draft opened for editing.")}
                  >
                    <Icon.Edit />
                  </button>
                  <button
                    className="btn-icon"
                    title="Submit"
                    onClick={() => {
                      setReports((list) =>
                        list.map((x) =>
                          x.id === rep.id ? { ...x, status: "Submitted" } : x,
                        ),
                      )
                      toast("success", "Report submitted for admin review.")
                    }}
                  >
                    <Icon.Send />
                  </button>
                </>
              )}
              {rep.status === "Submitted" && (
                <button
                  className="btn-icon"
                  title="Send to recipient"
                  onClick={() =>
                    toast(
                      "success",
                      `Report sent to ${
                        rep.recipient === "Parent & Admin"
                          ? "parent and admin"
                          : rep.recipient
                      } per school policy.`,
                    )
                  }
                >
                  <Icon.Send />
                </button>
              )}
              <button
                className="btn-icon"
                title="Delete"
                onClick={() => setRemove(rep)}
              >
                <Icon.Trash />
              </button>
            </div>
          )
        }}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="New student report"
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => createReport("Draft")}
            >
              Save Draft
            </button>
            <button
              className="btn-primary"
              onClick={() => createReport("Submitted")}
            >
              Submit
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Student</label>
            <select
              className="input-field"
              value={draft?.studentName ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, studentName: e.target.value }))
              }
            >
              <option value="">Select student…</option>
              {myStudents.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label className="field-label">Category</label>
              <select
                className="input-field"
                value={draft?.category ?? ""}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    category: e.target.value as TeacherReport["category"],
                  }))
                }
              >
                <option value="">Select…</option>
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Date</label>
              <input
                className="input-field"
                type="date"
                defaultValue="2026-08-17"
                onChange={(e) =>
                  setDraft((d) => ({ ...d, date: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <label className="field-label">Report</label>
            <textarea
              className="input-field"
              rows={4}
              value={draft?.report ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, report: e.target.value }))
              }
              placeholder="Write the report details…"
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label className="field-label">Priority</label>
              <select
                className="input-field"
                value={draft?.priority ?? "Normal"}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    priority: e.target.value as TeacherReport["priority"],
                  }))
                }
              >
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="field-label">Recipient</label>
              <select
                className="input-field"
                value={draft?.recipient ?? "Parent"}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    recipient: e.target.value as TeacherReport["recipient"],
                  }))
                }
              >
                <option>Parent</option>
                <option>Admin</option>
                <option>Parent & Admin</option>
              </select>
            </div>
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            Submitted reports are sent to the selected recipient according to
            school policy.
          </div>
        </div>
      </Modal>

      <Modal
        open={!!remove}
        onClose={() => setRemove(null)}
        title="Delete report"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setRemove(null)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                setReports((list) => list.filter((x) => x.id !== remove?.id))
                setRemove(null)
                toast("info", "Report deleted.")
              }}
            >
              Delete
            </button>
          </>
        }
      >
        <div style={{ fontSize: 14, lineHeight: 1.6 }}>
          Delete the report for <strong>{remove?.studentName}</strong> (
          {remove?.category})? This cannot be undone.
        </div>
      </Modal>
    </div>
  )
}
