import { useEffect, useState } from "react"
import StatCard from "../../components/StatCard"
import { Icon } from "../../components/Icons"
import { useApp } from "../../context/AppContext"
import {
  CLASSES,
  TEACHERS,
  STUDENTS,
  TIMETABLE_ENTRIES,
  ATTENDANCE,
  EXAMS,
  RESULTS,
  TEACHER_REPORTS,
  TEACHER_NOTIFICATIONS,
} from "../../data/mockData"
import { SkeletonCards } from "../../components/EmptyState"

interface Props {
  onNavigate: (page: string) => void
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export default function TeacherDashboard({ onNavigate }: Props) {
  const { user } = useApp()
  const teacher = TEACHERS.find((t) => t.name === user?.name) ?? TEACHERS[0]
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(t)
  }, [])

  const myClasses = CLASSES.filter((c) => c.teacher === teacher.name)
  const myStudents = STUDENTS.filter((s) =>
    myClasses.some((c) => c.name === `${s.class}${s.section}`),
  )
  const todayDay = DAYS[new Date().getDay()]
  const weekDay =
    todayDay === "Saturday" || todayDay === "Sunday" ? "Monday" : todayDay

  const myLessons = TIMETABLE_ENTRIES.filter((t) => t.teacher === teacher.name)
  const todayLessons = myLessons
    .filter((t) => t.day === weekDay)
    .sort((a, b) => a.start.localeCompare(b.start))
  const isDoubleBooked = (e: typeof myLessons[number]) =>
    myLessons.some(
      (o) => o.id !== e.id && o.day === e.day && o.start === e.start,
    )

  const studentsToday = myStudents.filter((s) =>
    todayLessons.some((l) => l.className === `${s.class}${s.section}`),
  )
  const markedToday = ATTENDANCE.filter(
    (a) =>
      a.date === "2026-08-16" &&
      studentsToday.some((s) => s.id === a.studentId),
  )
  const presentToday = markedToday.filter(
    (a) => a.status === "Present" || a.status === "Late",
  ).length

  const marksEntered = RESULTS.filter((r) =>
    myStudents.some((s) => s.studentId === r.studentId),
  )
  const pendingMarks = myStudents.length - marksEntered.length
  const upcomingExams = EXAMS.filter((e) => e.status === "Upcoming")
  const drafts = TEACHER_REPORTS.filter((r) => r.status === "Draft").length
  const submitted = TEACHER_REPORTS.filter(
    (r) => r.status === "Submitted",
  ).length

  const nextLesson = (className: string) => {
    const lessons = myLessons
      .filter((l) => l.className === className)
      .sort(
        (a, b) =>
          DAYS.indexOf(a.day) - DAYS.indexOf(b.day) ||
          a.start.localeCompare(b.start),
      )
    return lessons[0] ?? null
  }

  if (loading) {
    return (
      <div>
        <div className="page-title" style={{ marginBottom: 18 }}>
          Teacher Dashboard
        </div>
        <SkeletonCards />
      </div>
    )
  }

  const quickActions = [
    {
      label: "Take Attendance",
      icon: <Icon.Attendance />,
      page: "te-attendance",
      desc: "Mark today's register",
    },
    {
      label: "Enter Marks",
      icon: <Icon.Exam />,
      page: "te-exams",
      desc: "Open marks entry",
    },
    {
      label: "Create Student Report",
      icon: <Icon.Report />,
      page: "te-reports",
      desc: "Report to parent or admin",
    },
  ]

  const needingAttention = myStudents.filter((s) => s.attendance < 85)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Teacher Dashboard</div>
          <div className="page-subtitle">
            {teacher.name} · {teacher.subjects.join(" & ")} · {weekDay}, Aug 17,
            2026
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            onClick={() => onNavigate("te-timetable")}
          >
            <Icon.Timetable /> My Timetable
          </button>
          <button
            className="btn-primary"
            onClick={() => onNavigate("te-attendance")}
          >
            <Icon.Attendance /> Take Attendance
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <StatCard
          label="My Classes"
          value={myClasses.length}
          icon={<Icon.Class />}
          iconBg="#dbeafe"
          iconColor="#1d4ed8"
          subtitle={`${myStudents.length} assigned students`}
        />
        <StatCard
          label="My Students"
          value={myStudents.length}
          icon={<Icon.Student />}
          iconBg="#dcfce7"
          iconColor="#15803d"
          subtitle={`${myClasses.map((c) => c.name).join(", ")}`}
        />
        <StatCard
          label="Today's Classes"
          value={todayLessons.length}
          icon={<Icon.Timetable />}
          iconBg="#fef3c7"
          iconColor="#b45309"
          subtitle={`${studentsToday.length} students expected`}
        />
        <StatCard
          label="Attendance Pending"
          value={studentsToday.length - markedToday.length}
          icon={<Icon.Attendance />}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          subtitle={`${presentToday} present so far`}
        />
        <StatCard
          label="Upcoming Exams"
          value={upcomingExams.length}
          icon={<Icon.Exam />}
          iconBg="#e0f2fe"
          iconColor="#0369a1"
          subtitle="Mid-term begins Aug 25"
        />
        <StatCard
          label="Pending Marks"
          value={pendingMarks}
          icon={<Icon.Edit />}
          iconBg="#f3e8ff"
          iconColor="#7c3aed"
          subtitle="Not yet entered"
        />
        <StatCard
          label="Reports Pending/Submitted"
          value={`${drafts} / ${submitted}`}
          icon={<Icon.Report />}
          iconBg="#fef3c7"
          iconColor="#b45309"
          subtitle="Drafts / submitted"
        />
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          Quick Actions
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: 10,
          }}
        >
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.page)}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-muted)",
                cursor: "pointer",
                transition: "all 0.15s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-soft)"
                e.currentTarget.style.borderColor = "var(--primary)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-muted)"
                e.currentTarget.style.borderColor = "var(--border-subtle)"
              }}
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
                  flexShrink: 0,
                }}
              >
                {a.icon}
              </span>
              <span>
                <span
                  style={{ display: "block", fontWeight: 600, fontSize: 13 }}
                >
                  {a.label}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  {a.desc}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div className="card">
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Today's Schedule
            </div>
            <button
              className="btn-secondary"
              style={{ fontSize: 12, padding: "5px 12px" }}
              onClick={() => onNavigate("te-timetable")}
            >
              View timetable
            </button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Room</th>
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
                      No lessons scheduled for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              My Classes
            </div>
          </div>
          <div style={{ padding: 8 }}>
            {myClasses.map((c) => {
              const next = nextLesson(c.name)
              return (
                <button
                  key={c.id}
                  onClick={() => onNavigate("te-classes")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    padding: "10px 10px",
                    borderRadius: 10,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-muted)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent"
                  }}
                >
                  <span
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon.Class />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: 600,
                        fontSize: 13,
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 11,
                        color: "var(--text-muted)",
                      }}
                    >
                      {c.students} students
                      {next
                        ? ` · next: ${next.day.slice(0, 3)} ${next.start} ${next.subject}`
                        : ""}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="card">
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Upcoming Exams
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {upcomingExams.map((e) => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 600 }}>{e.name}</td>
                    <td>{e.class}</td>
                    <td className="muted">{e.date}</td>
                    <td className="muted">{e.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Latest Notifications
            </div>
          </div>
          <div>
            {TEACHER_NOTIFICATIONS.slice(0, 4).map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span
                  className={`badge ${n.read ? "badge-gray" : "badge-blue"}`}
                  style={{ fontSize: 10 }}
                >
                  {n.category}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>
                    {n.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {needingAttention.length > 0 && (
        <div className="card" style={{ padding: 16, marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <Icon.AlertTriangle />
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Students Needing Attention
            </div>
            <span className="muted" style={{ fontSize: 12 }}>
              Attendance below 85%
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {needingAttention.map((s) => (
              <span key={s.id} className="badge badge-amber">
                {s.name} · {s.attendance}%
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
