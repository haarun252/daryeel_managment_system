import { useState } from "react"
import { Icon } from "../../components/Icons"
import { useApp } from "../../context/AppContext"
import { TIMETABLE_ENTRIES } from "../../data/mockData"
import { myTeacher } from "./TeacherClassesStudents"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const
const SLOTS = ["08:00", "09:00", "10:00", "12:00", "13:00"]

export default function TimetablePage() {
  const { user, toast } = useApp()
  const teacher = myTeacher(user?.name)
  const [view, setView] = useState<"today" | "week">("today")

  const myLessons = TIMETABLE_ENTRIES.filter((t) => t.teacher === teacher.name)
  const todayIndex = (new Date().getDay() + 6) % 7
  const today = DAYS[todayIndex] ?? "Monday"
  const todayLessons = myLessons
    .filter((l) => l.day === today)
    .sort((a, b) => a.start.localeCompare(b.start))

  const isDoubleBooked = (e: typeof myLessons[number]) =>
    myLessons.some(
      (o) => o.id !== e.id && o.day === e.day && o.start === e.start,
    )

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Timetable</div>
          <div className="page-subtitle">
            {teacher.name} — {teacher.subjects.join(", ")}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            onClick={() => toast("success", "PDF generated successfully.")}
          >
            <Icon.File /> PDF
          </button>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Icon.Print /> Print
          </button>
        </div>
      </div>

      <div className="tab-bar">
        {(["today", "week"] as const).map((v) => (
          <div
            key={v}
            className={`tab-item${view === v ? " active" : ""}`}
            onClick={() => setView(v)}
          >
            {v === "today" ? "Today" : "Week"}
          </div>
        ))}
      </div>

      {view === "today" && (
        <div className="card">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayLessons.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>
                      {l.start} – {l.end}
                    </td>
                    <td>{l.className}</td>
                    <td>{l.subject}</td>
                    <td className="muted">{l.location}</td>
                    <td>
                      {isDoubleBooked(l) ? (
                        <span className="badge badge-red">Double Booked</span>
                      ) : (
                        <span className="badge badge-green">On Schedule</span>
                      )}
                    </td>
                  </tr>
                ))}
                {todayLessons.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="muted"
                      style={{ textAlign: "center", padding: 20 }}
                    >
                      No lessons today ({today}).
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "week" && (
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
                    const cell = myLessons.filter(
                      (l) => l.day === d && l.start === time,
                    )
                    if (cell.length === 0)
                      return (
                        <td key={d} className="muted">
                          —
                        </td>
                      )
                    return (
                      <td key={d}>
                        {cell.map((l) => (
                          <div
                            key={l.id}
                            style={{
                              background: "var(--primary-soft)",
                              borderRadius: 8,
                              padding: "8px 10px",
                              minWidth: 130,
                              marginBottom: 4,
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: 13 }}>
                              {l.subject}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                              }}
                            >
                              {l.className} · {l.location}
                            </div>
                            {isDoubleBooked(l) && (
                              <div
                                className="badge badge-red"
                                style={{ marginTop: 4 }}
                              >
                                Double Booked
                              </div>
                            )}
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
    </div>
  )
}
