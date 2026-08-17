import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal, { ConfirmModal } from "../../components/Modal"
import DataTable from "../../components/DataTable"
import { ReportCardPreview } from "../../components/DocumentPreviews"
import { useApp } from "../../context/AppContext"
import {
  TIMETABLE_ENTRIES,
  ASSIGNMENTS,
  EXAMS,
  RESULTS,
  STUDENTS,
  CLASSES,
  TEACHERS,
} from "../../data/mockData"
import type { TimetableEntry } from "../../data/mockData"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const
const SLOTS = ["08:00", "09:00", "10:00", "12:00", "13:00"]

function detectConflicts(entries: TimetableEntry[]) {
  const conflicts: {
    type: "teacher" | "room"
    a: TimetableEntry
    b: TimetableEntry
  }[] = []
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i]
      const b = entries[j]
      if (a.day !== b.day || a.start !== b.start) continue
      if (a.teacher === b.teacher) conflicts.push({ type: "teacher", a, b })
      if (a.location === b.location) conflicts.push({ type: "room", a, b })
    }
  }
  return conflicts
}

export function TimetablePage({ canManage = true }: { canManage?: boolean }) {
  const { toast } = useApp()
  const [view, setView] =
    useState<"Weekly" | "Daily" | "By class" | "By teacher">("Weekly")
  const [day, setDay] = useState<typeof DAYS[number]>("Monday")
  const [classSel, setClassSel] = useState("Grade 7A")
  const [teacherSel, setTeacherSel] = useState(TEACHERS[0].name)
  const [entries, setEntries] = useState(TIMETABLE_ENTRIES)
  const [addOpen, setAddOpen] = useState(false)

  const conflicts = detectConflicts(entries)
  const classes = Array.from(new Set(entries.map((e) => e.className)))
  const teachers = Array.from(new Set(entries.map((e) => e.teacher)))
  const today = DAYS[new Date().getDay() - 1] ?? "Monday"

  const cells = (selectedDay: string) =>
    SLOTS.map((t) =>
      entries.filter((e) => e.day === selectedDay && e.start === t),
    )
  const cellCount = entries.filter((e) => e.day === day).length

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Timetable</div>
          <div className="page-subtitle">
            Weekly class schedule with conflict detection
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            onClick={() =>
              toast("success", "Excel file generated successfully.")
            }
          >
            <Icon.Download /> Excel
          </button>
          <button
            className="btn-secondary"
            onClick={() => toast("success", "PDF generated successfully.")}
          >
            <Icon.File /> PDF
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Icon.Print /> Print
          </button>
          {canManage && (
            <button className="btn-primary" onClick={() => setAddOpen(true)}>
              <Icon.Plus /> Add Lesson
            </button>
          )}
        </div>
      </div>

      {canManage && conflicts.length > 0 && (
        <div
          className="card"
          style={{
            padding: 14,
            marginBottom: 16,
            border: "1px solid #fecaca",
            background: "#fef2f2",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: "#b91c1c",
              marginBottom: 8,
            }}
          >
            <Icon.AlertTriangle /> {conflicts.length} scheduling conflict
            {conflicts.length > 1 ? "s" : ""} detected
          </div>
          {conflicts.map((c, i) => (
            <div
              key={i}
              style={{ fontSize: 13, color: "#7f1d1d", padding: "4px 0" }}
            >
              {c.type === "teacher" ? "Teacher" : "Room"} double-booking:{" "}
              {c.a.id} ({c.a.subject}, {c.a.className}, {c.a.day} {c.a.start})
              vs {c.b.id} ({c.b.subject}, {c.b.className}) —{" "}
              {c.type === "teacher" ? c.a.teacher : c.a.location}
            </div>
          ))}
        </div>
      )}

      <div className="tab-bar">
        {(["Weekly", "Daily", "By class", "By teacher"] as const).map((v) => (
          <div
            key={v}
            className={`tab-item${view === v ? " active" : ""}`}
            onClick={() => setView(v)}
          >
            {v}
          </div>
        ))}
      </div>

      {view === "Weekly" && (
        <div className="card" style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                {DAYS.map((d) => (
                  <th key={d}>{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((time) => (
                <tr key={time}>
                  <td style={{ fontWeight: 700 }}>{time}</td>
                  {DAYS.map((d) => {
                    const cell = entries.filter(
                      (e) => e.day === d && e.start === time,
                    )
                    if (cell.length === 0)
                      return (
                        <td key={d} className="muted">
                          —
                        </td>
                      )
                    return (
                      <td key={d}>
                        {cell.map((e) => (
                          <div
                            key={e.id}
                            style={{
                              background: "var(--primary-soft)",
                              borderRadius: 8,
                              padding: "8px 10px",
                              minWidth: 130,
                              marginBottom: 4,
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: 13 }}>
                              {e.subject}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                              }}
                            >
                              {e.teacher} · {e.className} · {e.location}
                            </div>
                          </div>
                        ))}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "Daily" && (
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
            style={{ maxWidth: 180 }}
            value={day}
            onChange={(e) => setDay(e.target.value as typeof DAYS[number])}
          >
            {DAYS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <span className="badge badge-blue" style={{ alignSelf: "center" }}>
            {cellCount} lessons
          </span>
        </div>
      )}

      {view === "By class" && (
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <select
            className="input-field"
            style={{ maxWidth: 180 }}
            value={classSel}
            onChange={(e) => setClassSel(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span className="badge badge-blue" style={{ alignSelf: "center" }}>
            {entries.filter((e) => e.className === classSel).length} lessons
          </span>
        </div>
      )}

      {view === "By teacher" && (
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <select
            className="input-field"
            style={{ maxWidth: 200 }}
            value={teacherSel}
            onChange={(e) => setTeacherSel(e.target.value)}
          >
            {teachers.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <span className="badge badge-blue" style={{ alignSelf: "center" }}>
            {entries.filter((e) => e.teacher === teacherSel).length} lessons
          </span>
        </div>
      )}

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {view === "By teacher" && <th>Class</th>}
              {view !== "By teacher" && <th>Class</th>}
              {view === "By class" && <th>Teacher</th>}
              {view === "By teacher" && <th>Day</th>}
              {view === "Daily" && <th>Day</th>}
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room</th>
              {canManage && <th></th>}
            </tr>
          </thead>
          <tbody>
            {entries
              .filter((e) =>
                view === "Daily"
                  ? e.day === day
                  : view === "By class"
                    ? e.className === classSel
                    : view === "By teacher"
                      ? e.teacher === teacherSel
                      : true,
              )
              .sort(
                (a, b) =>
                  DAYS.indexOf(a.day) - DAYS.indexOf(b.day) ||
                  a.start.localeCompare(b.start),
              )
              .map((e) => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600 }}>{e.className}</td>
                  <td className="muted">{e.day}</td>
                  <td className="muted">
                    {e.start}–{e.end}
                  </td>
                  <td style={{ fontWeight: 600 }}>{e.subject}</td>
                  <td>{e.teacher}</td>
                  <td className="muted">{e.location}</td>
                  {canManage && (
                    <td>
                      <button
                        className="btn-icon"
                        title="Remove lesson"
                        onClick={() => {
                          setEntries((list) =>
                            list.filter((x) => x.id !== e.id),
                          )
                          toast("info", "Lesson removed.")
                        }}
                      >
                        <Icon.Trash />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add lesson"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Lesson added — re-checking conflicts.")
                setAddOpen(false)
              }}
            >
              Save
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Subject</label>
            <input className="input-field" placeholder="e.g. Mathematics" />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label className="field-label">Day</label>
              <select className="input-field">
                {DAYS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Start</label>
              <select className="input-field">
                {SLOTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="field-label">Class</label>
            <select className="input-field">
              {classes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Teacher</label>
            <select className="input-field">
              {teachers.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Room</label>
            <input className="input-field" placeholder="e.g. Rm 201" />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export function AssignmentsPage({ canCreate = true }: { canCreate?: boolean }) {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(ASSIGNMENTS)
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Assignments</div>
          <div className="page-subtitle">Track homework and classwork</div>
        </div>
        {canCreate && (
          <button className="btn-primary" onClick={() => setOpen(true)}>
            <Icon.Plus /> Create assignment
          </button>
        )}
      </div>
      <DataTable
        data={items as unknown as Record<string, unknown>[]}
        searchKeys={["title", "class", "subject"]}
        exportName="assignments"
        columns={[
          { key: "title", label: "Title" },
          { key: "class", label: "Class" },
          { key: "subject", label: "Subject" },
          { key: "dueDate", label: "Due" },
          {
            key: "status",
            label: "Status",
            render: (r) => {
              const s = String(r.status)
              const cls =
                s === "Graded"
                  ? "badge-green"
                  : s === "Submitted"
                    ? "badge-blue"
                    : s === "Late"
                      ? "badge-red"
                      : "badge-amber"
              return <span className={`badge ${cls}`}>{s}</span>
            },
          },
          {
            key: "submitted",
            label: "Submitted",
            render: (r) => `${r.submitted}/${r.total}`,
          },
        ]}
        actions={() => (
          <div style={{ display: "flex", gap: 2 }}>
            <button className="btn-icon">
              <Icon.Eye />
            </button>
            {canCreate && (
              <button className="btn-icon">
                <Icon.Edit />
              </button>
            )}
          </div>
        )}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create assignment"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Assignment created.")
                setItems((i) => [
                  ...i,
                  {
                    id: "asx",
                    title: "New assignment",
                    class: "Grade 7A",
                    subject: "Mathematics",
                    teacher: "James Okonkwo",
                    dueDate: "2026-08-25",
                    status: "Pending",
                    submitted: 0,
                    total: 32,
                  },
                ])
                setOpen(false)
              }}
            >
              Save
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label className="field-label">Title</label>
          <input className="input-field" />
          <label className="field-label">Class</label>
          <select className="input-field">
            {CLASSES.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
          <label className="field-label">Subject</label>
          <select className="input-field">
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
          <label className="field-label">Description</label>
          <textarea className="input-field" rows={3} />
          <label className="field-label">Due date</label>
          <input className="input-field" type="date" />
          <button className="btn-secondary">
            <Icon.Paperclip /> Attach file
          </button>
        </div>
      </Modal>
    </div>
  )
}

const EXAM_STATUS_BADGE: Record<string, string> = {
  Upcoming: "badge-blue",
  Scheduled: "badge-amber",
  Completed: "badge-green",
}

export function ExamsPage({ canManage = true }: { canManage?: boolean }) {
  const { toast, user } = useApp()
  const [open, setOpen] = useState(false)
  const [lock, setLock] = useState(false)
  const [status, setStatus] = useState<"Upcoming" | "Scheduled" | "Completed">(
    "Upcoming",
  )
  const [exams, setExams] = useState(EXAMS)
  const [reviewed, setReviewed] = useState<Set<string>>(new Set())

  const upcoming = exams.filter(
    (e) => e.status === "Upcoming" || e.status === "Scheduled",
  ).length
  const completed = exams.filter((e) => e.status === "Completed").length
  const missingMarks =
    RESULTS.filter((r) => !r.marks || r.marks === 0).length + 4
  const avg = RESULTS.length
    ? Math.round(RESULTS.reduce((s, r) => s + r.marks, 0) / RESULTS.length)
    : 0

  const enterMarks = (id: string) => {
    setReviewed((s) => new Set(s).add(id))
    toast("success", "Marks saved for this exam.")
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Exams &amp; Marks</div>
          <div className="page-subtitle">
            Exam schedules, marks entry, review and publishing
          </div>
        </div>
        {canManage && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              className="btn-secondary"
              onClick={() => toast("info", "Marks entry sheet opened.")}
            >
              <Icon.Edit /> Enter Marks
            </button>
            <button
              className="btn-secondary"
              onClick={() => toast("info", "Review queue opened.")}
            >
              <Icon.Eye /> Review
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                toast("success", "Results published to parent portal.")
              }
            >
              <Icon.Send /> Publish
            </button>
            <button className="btn-primary" onClick={() => setLock(true)}>
              <Icon.Lock /> Lock Results
            </button>
          </div>
        )}
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Upcoming</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            {upcoming}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Scheduled exams
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Completed</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            {completed}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Finished exams
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Missing marks</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {missingMarks}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Not yet entered
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Class average</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#7c3aed",
            }}
          >
            {avg}%
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Across entered marks
          </div>
        </div>
      </div>

      <div className="tab-bar">
        {(["Upcoming", "Scheduled", "Completed"] as const).map((s) => (
          <div
            key={s}
            className={`tab-item${status === s ? " active" : ""}`}
            onClick={() => setStatus(s)}
          >
            {s}
          </div>
        ))}
      </div>

      <DataTable
        data={
          exams.filter(
            (e) => e.status === status,
          ) as unknown as Record<string, unknown>[]
        }
        searchKeys={["name", "class"]}
        exportName="exams"
        columns={[
          { key: "name", label: "Exam name" },
          { key: "academicYear", label: "Academic year" },
          { key: "date", label: "Start date" },
          { key: "endDate", label: "End date" },
          { key: "time", label: "Time" },
          { key: "duration", label: "Duration" },
          { key: "class", label: "Classes" },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span className={`badge ${EXAM_STATUS_BADGE[String(r.status)]}`}>
                {String(r.status)}
              </span>
            ),
          },
        ]}
        actions={(r) => {
          const ex = r as unknown as typeof EXAMS[number]
          const entered = reviewed.has(ex.id)
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="View"
                onClick={() => toast("info", `Opened ${ex.name}.`)}
              >
                <Icon.Eye />
              </button>
              {canManage && ex.status !== "Completed" && (
                <button
                  className="btn-icon"
                  title="Enter marks"
                  onClick={() => enterMarks(ex.id)}
                >
                  <Icon.Edit />
                </button>
              )}
              {canManage && ex.status === "Completed" && (
                <button
                  className="btn-icon"
                  title={entered ? "Marks entered" : "Enter marks"}
                  onClick={() => enterMarks(ex.id)}
                >
                  <Icon.CheckCircle />
                </button>
              )}
            </div>
          )
        }}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Exam"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Exam added.")
                setOpen(false)
              }}
            >
              Save
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <label className="field-label">Exam name</label>
          <input
            className="input-field"
            placeholder="e.g. Mid-Term Mathematics"
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label className="field-label">Start</label>
              <input className="input-field" type="date" />
            </div>
            <div>
              <label className="field-label">End</label>
              <input className="input-field" type="date" />
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label className="field-label">Time</label>
              <input className="input-field" defaultValue="09:00 AM" />
            </div>
            <div>
              <label className="field-label">Duration</label>
              <input className="input-field" defaultValue="2h" />
            </div>
          </div>
          <div>
            <label className="field-label">Class</label>
            <select className="input-field">
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>All Grades</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={lock}
        onClose={() => setLock(false)}
        title="Lock results — requires permission"
        message="Locking prevents further changes to published results. This requires administrator permission and will be logged to the audit trail."
        confirmLabel="Request permission"
        danger
        onConfirm={() => {
          setLock(false)
          toast("info", `Permission request sent by ${user.name}.`)
        }}
      />
    </div>
  )
}

export function ResultsPage() {
  const { toast } = useApp()
  const [preview, setPreview] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Results</div>
          <div className="page-subtitle">Marks, grades and remarks</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className="btn-secondary"
            onClick={() => toast("info", "Import started.")}
          >
            <Icon.Upload /> Import Results
          </button>
          <button className="btn-secondary" onClick={() => setPreview(true)}>
            <Icon.Eye /> Preview Report Card
          </button>
          <button className="btn-primary" onClick={() => setOpen(true)}>
            <Icon.Plus /> Add Result
          </button>
        </div>
      </div>
      <DataTable
        data={RESULTS as unknown as Record<string, unknown>[]}
        searchKeys={["studentName", "subject"]}
        exportName="results"
        columns={[
          { key: "studentName", label: "Student" },
          { key: "subject", label: "Subject" },
          { key: "marks", label: "Marks" },
          {
            key: "grade",
            label: "Grade",
            render: (r) => (
              <span className="badge badge-blue">{String(r.grade)}</span>
            ),
          },
          { key: "remarks", label: "Remarks" },
        ]}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Result"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Result added.")
                setOpen(false)
              }}
            >
              Save
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <select className="input-field">
            {STUDENTS.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </select>
          <select className="input-field">
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
          <input className="input-field" type="number" placeholder="Marks" />
          <input className="input-field" placeholder="Grade" />
          <input className="input-field" placeholder="Remarks" />
        </div>
      </Modal>
      <ReportCardPreview
        open={preview}
        onClose={() => setPreview(false)}
        student={STUDENTS[0]}
      />
    </div>
  )
}

export function ReportCardsPage() {
  const [student, setStudent] = useState(STUDENTS[0])
  const [open, setOpen] = useState(false)
  const { toast } = useApp()
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Report Cards</div>
          <div className="page-subtitle">Generate and preview term reports</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => setOpen(true)}>
            <Icon.Eye /> Preview
          </button>
          <button
            className="btn-secondary"
            onClick={() => toast("success", "PDF generated successfully.")}
          >
            <Icon.Download /> Download PDF
          </button>
          <button className="btn-primary" onClick={() => window.print()}>
            <Icon.Print /> Print
          </button>
        </div>
      </div>
      <div
        className="card"
        style={{
          padding: 16,
          marginBottom: 16,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <select
          className="input-field"
          style={{ maxWidth: 260 }}
          value={student.id}
          onChange={(e) =>
            setStudent(
              STUDENTS.find((s) => s.id === e.target.value) ?? STUDENTS[0],
            )
          }
        >
          {STUDENTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select className="input-field" style={{ maxWidth: 200 }}>
          <option>2025–2026 · Term 1</option>
        </select>
      </div>
      <ReportCardPreview
        open={open}
        onClose={() => setOpen(false)}
        student={student}
      />
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>
          {student.name} — {student.class} {student.section}
        </div>
        <div className="muted">
          Use Preview to open the printable A4 report card.
        </div>
      </div>
    </div>
  )
}
