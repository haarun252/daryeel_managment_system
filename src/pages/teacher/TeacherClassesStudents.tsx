import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal from "../../components/Modal"
import DataTable from "../../components/DataTable"
import { useApp } from "../../context/AppContext"
import {
  CLASSES,
  STUDENTS,
  TEACHERS,
  TIMETABLE_ENTRIES,
  ATTENDANCE,
  RESULTS,
  TEACHER_REPORTS,
  initials,
} from "../../data/mockData"

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function myTeacher(userName?: string) {
  return TEACHERS.find((t) => t.name === userName) ?? TEACHERS[0]
}

export function myClassNames(userName?: string) {
  const t = myTeacher(userName)
  return CLASSES.filter((c) => c.teacher === t.name).map((c) => c.name)
}

export function myStudentsOf(userName?: string) {
  const names = myClassNames(userName)
  return STUDENTS.filter((s) => names.includes(`${s.class}${s.section}`))
}

const CATEGORY_BADGE: Record<string, string> = {
  Academic: "badge-blue",
  Behaviour: "badge-purple",
  Attendance: "badge-amber",
  Achievement: "badge-green",
  Concern: "badge-red",
  General: "badge-gray",
}

export function TeacherClassesPage() {
  const { user } = useApp()
  const teacher = myTeacher(user?.name)
  const myClasses = CLASSES.filter((c) => c.teacher === teacher.name)
  const [view, setView] = useState<typeof myClasses[number] | null>(null)
  const [tab, setTab] = useState("Students")
  const TABS = [
    "Students",
    "Subject",
    "Timetable",
    "Attendance",
    "Marks",
    "Reports",
  ]

  const rows = myClasses.map((c) => {
    const lessons = TIMETABLE_ENTRIES.filter(
      (t) => t.className === c.name && t.teacher === teacher.name,
    )
    const subjects = Array.from(new Set(lessons.map((l) => l.subject)))
    const next =
      lessons.sort(
        (a, b) =>
          DAYS.indexOf(a.day) - DAYS.indexOf(b.day) ||
          a.start.localeCompare(b.start),
      )[0] ?? null
    const today = ATTENDANCE.filter(
      (a) => a.class === c.name && a.date === "2026-08-16",
    )
    const rate = today.length
      ? Math.round(
          (today.filter((a) => a.status === "Present" || a.status === "Late")
            .length /
            today.length) *
            100,
        )
      : null
    return {
      id: c.id,
      name: c.name,
      subjects,
      students: c.students,
      next,
      rate,
    }
  })

  const classStudents = (name: string) =>
    STUDENTS.filter((s) => `${s.class}${s.section}` === name)
  const classMarks = (name: string) => RESULTS.filter((r) => r.class === name)
  const classReports = (name: string) =>
    TEACHER_REPORTS.filter((r) => r.className === name)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Classes</div>
          <div className="page-subtitle">
            {teacher.name} — {teacher.subjects.join(" & ")}
          </div>
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">My Classes</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {myClasses.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            {myClasses.map((c) => c.name).join(", ")}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Students</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {myClasses.reduce((s, c) => s + c.students, 0)}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Assigned to you
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Subjects Taught</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {teacher.subjects.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            {teacher.subjects.join(", ")}
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Weekly Lessons</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {TIMETABLE_ENTRIES.filter((t) => t.teacher === teacher.name).length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Across all classes
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Students</th>
                <th>Next class</th>
                <th>Attendance status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 9 }}
                    >
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: "var(--primary-soft)",
                          color: "var(--primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon.Class />
                      </span>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </td>
                  <td>{c.subjects.join(", ") || "—"}</td>
                  <td className="muted">{c.students}</td>
                  <td className="muted">
                    {c.next
                      ? `${c.next.day.slice(0, 3)} ${c.next.start} · ${c.next.subject}`
                      : "—"}
                  </td>
                  <td>
                    {c.rate === null ? (
                      <span className="badge badge-gray">Not marked</span>
                    ) : c.rate >= 90 ? (
                      <span className="badge badge-green">
                        {c.rate}% present
                      </span>
                    ) : (
                      <span className="badge badge-amber">
                        {c.rate}% present
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-icon"
                      title="View class"
                      onClick={() => {
                        setView(
                          myClasses.find((x) => x.name === c.name) ?? null,
                        )
                        setTab("Students")
                      }}
                    >
                      <Icon.Eye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={`${view?.name ?? ""} — Class details`}
        size="lg"
      >
        <div className="tab-bar" style={{ marginBottom: 14 }}>
          {TABS.map((t) => (
            <div
              key={t}
              className={`tab-item${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </div>
          ))}
        </div>
        {view && (
          <div>
            {tab === "Students" && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>ID</th>
                    <th>Attendance %</th>
                    <th>Fees</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents(view.name).map((s) => (
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
                      <td className="muted">{s.studentId}</td>
                      <td>{s.attendance}%</td>
                      <td>
                        <span
                          className={`badge ${
                            s.fees === "Paid"
                              ? "badge-green"
                              : s.fees === "Pending"
                                ? "badge-amber"
                                : "badge-red"
                          }`}
                        >
                          {s.fees}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            s.status === "Active" ? "badge-green" : "badge-gray"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {classStudents(view.name).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="muted"
                        style={{ textAlign: "center", padding: 18 }}
                      >
                        No student records in this class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {tab === "Subject" && (
              <div style={{ display: "grid", gap: 8 }}>
                {TIMETABLE_ENTRIES.filter(
                  (t) =>
                    t.className === view.name && t.teacher === teacher.name,
                ).map((l) => (
                  <div
                    key={l.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--bg-muted)",
                      borderRadius: 10,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{l.subject}</span>
                    <span className="muted">
                      {l.day} {l.start} · {l.location}
                    </span>
                  </div>
                ))}
                {TIMETABLE_ENTRIES.filter(
                  (t) =>
                    t.className === view.name && t.teacher === teacher.name,
                ).length === 0 && (
                  <div className="muted">
                    No subjects assigned to you in this class.
                  </div>
                )}
              </div>
            )}
            {tab === "Timetable" && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {TIMETABLE_ENTRIES.filter(
                    (t) => t.className === view.name,
                  ).map((t) => (
                    <tr key={t.id}>
                      <td>{t.day}</td>
                      <td>
                        {t.start} – {t.end}
                      </td>
                      <td style={{ fontWeight: 600 }}>{t.subject}</td>
                      <td>{t.teacher}</td>
                      <td className="muted">{t.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "Attendance" && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTENDANCE.filter((a) => a.class === view.name).map((a) => (
                    <tr key={a.studentId}>
                      <td style={{ fontWeight: 600 }}>{a.studentName}</td>
                      <td className="muted">{a.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            a.status === "Present"
                              ? "badge-green"
                              : a.status === "Absent"
                                ? "badge-red"
                                : a.status === "Late"
                                  ? "badge-amber"
                                  : "badge-blue"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {ATTENDANCE.filter((a) => a.class === view.name).length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="muted"
                        style={{ textAlign: "center", padding: 18 }}
                      >
                        No attendance records.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {tab === "Marks" && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {classMarks(view.name).map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.studentName}</td>
                      <td>{r.subject}</td>
                      <td>{r.marks}</td>
                      <td>
                        <span className="badge badge-blue">{r.grade}</span>
                      </td>
                      <td className="muted">{r.remarks}</td>
                    </tr>
                  ))}
                  {classMarks(view.name).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="muted"
                        style={{ textAlign: "center", padding: 18 }}
                      >
                        No marks entered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            {tab === "Reports" && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classReports(view.name).map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.studentName}</td>
                      <td>
                        <span className={`badge ${CATEGORY_BADGE[r.category]}`}>
                          {r.category}
                        </span>
                      </td>
                      <td className="muted">{r.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            r.priority === "Urgent"
                              ? "badge-red"
                              : r.priority === "High"
                                ? "badge-amber"
                                : "badge-gray"
                          }`}
                        >
                          {r.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            r.status === "Submitted"
                              ? "badge-green"
                              : "badge-amber"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {classReports(view.name).length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="muted"
                        style={{ textAlign: "center", padding: 18 }}
                      >
                        No reports for this class.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export function TeacherStudentsPage() {
  const { user } = useApp()
  const myStudents = myStudentsOf(user?.name)
  const classes = ["All", ...myClassNames(user?.name)]
  const [classFilter, setClassFilter] = useState("All")
  const [attFilter, setAttFilter] = useState("All")
  const [view, setView] = useState<typeof myStudents[number] | null>(null)

  const todayAtt = (id: string) =>
    ATTENDANCE.find((a) => a.studentId === id && a.date === "2026-08-16") ??
    null
  const recentMark = (id: string) => {
    const r = RESULTS.filter((x) => x.studentId === id).sort(
      (a, b) => b.marks - a.marks,
    )[0]
    return r ? `${r.marks} · ${r.grade}` : "—"
  }
  const reportStatus = (id: string) => {
    const s = myStudents.find((s) => s.id === id)
    const reports = TEACHER_REPORTS.filter((r) => s && r.studentName === s.name)
    return reports.length
      ? reports.some((r) => r.status === "Draft")
        ? "Draft"
        : "Submitted"
      : "—"
  }

  const rows = myStudents.filter((s) => {
    if (classFilter !== "All" && `${s.class}${s.section}` !== classFilter)
      return false
    const a = todayAtt(s.id)
    if (attFilter !== "All" && a?.status !== attFilter) return false
    return true
  })

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Students</div>
          <div className="page-subtitle">
            Only your assigned students are accessible
          </div>
        </div>
        <span className="badge badge-blue">
          {myStudents.length} assigned students
        </span>
      </div>

      <div
        style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}
      >
        <select
          className="input-field"
          style={{ maxWidth: 160 }}
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          {classes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="input-field"
          style={{ maxWidth: 160 }}
          value={attFilter}
          onChange={(e) => setAttFilter(e.target.value)}
        >
          {["All", "Present", "Absent", "Late", "Excused"].map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </div>

      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={["name", "studentId"]}
        exportName="my-students"
        columns={[
          {
            key: "name",
            label: "Student",
            render: (r) => (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div className="avatar">{initials(String(r.name))}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>
                    {String(r.studentId)}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "class",
            label: "Class",
            render: (r) => `${r.class}${r.section}`,
          },
          {
            key: "att",
            label: "Attendance today",
            render: (r) => {
              const a = todayAtt(String(r.id))
              if (!a)
                return <span className="badge badge-gray">Not marked</span>
              return (
                <span
                  className={`badge ${
                    a.status === "Present"
                      ? "badge-green"
                      : a.status === "Absent"
                        ? "badge-red"
                        : a.status === "Late"
                          ? "badge-amber"
                          : "badge-blue"
                  }`}
                >
                  {a.status}
                </span>
              )
            },
          },
          {
            key: "marks",
            label: "Recent mark",
            render: (r) => recentMark(String(r.id)),
          },
          {
            key: "report",
            label: "Report status",
            render: (r) => {
              const s = reportStatus(String(r.id))
              return s === "—" ? (
                <span className="muted">—</span>
              ) : (
                <span
                  className={`badge ${
                    s === "Submitted" ? "badge-green" : "badge-amber"
                  }`}
                >
                  {s}
                </span>
              )
            },
          },
        ]}
        actions={(r) => (
          <button
            className="btn-icon"
            title="View profile"
            onClick={() => setView(rows.find((s) => s.id === r.id) ?? null)}
          >
            <Icon.Eye />
          </button>
        )}
      />

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={view?.name ?? ""}
        size="md"
      >
        {view && (
          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                ["Student ID", view.studentId],
                ["Class", `${view.class}${view.section}`],
                ["Attendance %", `${view.attendance}%`],
                ["Fees", view.fees],
                ["Parent", view.parent],
                ["Status", view.status],
              ].map(([k, v]) => (
                <div
                  key={k}
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
                    {k}
                  </div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="field-label">Recent marks</div>
              {RESULTS.filter((r) => r.studentId === view.studentId).length ===
              0 ? (
                <div className="muted">No marks entered yet.</div>
              ) : (
                RESULTS.filter((r) => r.studentId === view.studentId).map(
                  (r) => (
                    <div
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        background: "var(--bg-muted)",
                        borderRadius: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>
                        {r.subject}: {r.marks}
                      </span>
                      <span className="badge badge-blue">{r.grade}</span>
                    </div>
                  ),
                )
              )}
            </div>
            <div>
              <div className="field-label">Reports</div>
              {TEACHER_REPORTS.filter((r) => r.studentName === view.name)
                .length === 0 ? (
                <div className="muted">No reports yet.</div>
              ) : (
                TEACHER_REPORTS.filter((r) => r.studentName === view.name).map(
                  (r) => (
                    <div
                      key={r.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "var(--bg-muted)",
                        borderRadius: 8,
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 13 }}>
                        {r.report.slice(0, 60)}…
                      </span>
                      <span
                        className={`badge ${CATEGORY_BADGE[r.category]}`}
                        style={{ flexShrink: 0 }}
                      >
                        {r.category}
                      </span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
