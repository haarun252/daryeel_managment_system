import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import StatCard from "../../components/StatCard"
import { Icon } from "../../components/Icons"
import {
  STUDENTS,
  TEACHERS,
  ATTENDANCE_WEEKLY,
  FEE_MONTHLY,
  EXAMS,
  ANNOUNCEMENTS,
  FEES,
  INCOME,
  EXPENSES,
  BUSES,
  STAFF,
  SCHOOL_REPORTS,
  TIMETABLE_ENTRIES,
  BUS_ASSIGNMENTS,
  initials,
} from "../../data/mockData"
import { SkeletonCards, SkeletonChart } from "../../components/EmptyState"
import { useApp } from "../../context/AppContext"

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

export default function SchoolDashboard({ onNavigate }: Props) {
  const { tenant } = useApp()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 500)
    return () => window.clearTimeout(t)
  }, [])

  const totalStudents = 842
  const presentToday = 782
  const absentToday = 42
  const lateToday = 18
  const attendancePct = Math.round((presentToday / totalStudents) * 100)

  const feesCollectedMonth = FEES.filter((f) => f.status === "Paid").reduce(
    (s, f) => s + (f.paid ?? f.amount),
    0,
  )
  const outstandingFees = FEES.filter((f) => f.status !== "Paid").reduce(
    (s, f) => s + (f.amount - (f.paid ?? 0)),
    0,
  )
  const incomeMonth = INCOME.filter((r) => r.date.startsWith("2026-08")).reduce(
    (s, r) => s + r.amount,
    0,
  )
  const expensesMonth = EXPENSES.reduce((s, r) => s + r.amount, 0)

  const todayDay = DAYS[new Date().getDay()]
  const todayClasses = TIMETABLE_ENTRIES.filter(
    (t) =>
      t.day ===
      (todayDay === "Saturday" || todayDay === "Sunday" ? "Monday" : todayDay),
  )
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 6)

  const needingAttention = STUDENTS.filter(
    (s) => s.fees !== "Paid" || s.attendance < 85,
  )
  const pendingReports = SCHOOL_REPORTS.filter(
    (r) => r.status === "Pending Review",
  )
  const upcomingExams = EXAMS.filter((e) => e.status === "Upcoming")
  const unpaidFees = FEES.filter((f) => f.status !== "Paid")

  const staffByRole = STAFF.reduce<Record<string, number>>((acc, s) => {
    acc[s.role] = (acc[s.role] ?? 0) + 1
    return acc
  }, {})

  if (loading) {
    return (
      <div>
        <div className="page-title" style={{ marginBottom: 18 }}>
          School Dashboard
        </div>
        <SkeletonCards />
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      label: "Add Student",
      icon: <Icon.Student />,
      page: "ad-students",
      desc: "Register a new student",
    },
    {
      label: "Add Teacher",
      icon: <Icon.Teacher />,
      page: "ad-teachers",
      desc: "Register a new teacher",
    },
    {
      label: "Create Class",
      icon: <Icon.Class />,
      page: "ad-classes",
      desc: "Add a class section",
    },
    {
      label: "Record Payment",
      icon: <Icon.Payment />,
      page: "ad-payments",
      desc: "Log a fee payment",
    },
    {
      label: "Create Fee",
      icon: <Icon.Fees />,
      page: "ad-fees",
      desc: "Issue a new fee invoice",
    },
    {
      label: "Review Attendance",
      icon: <Icon.Attendance />,
      page: "ad-attendance",
      desc: "Check today's register",
    },
    {
      label: "Add Expense",
      icon: <Icon.Wallet />,
      page: "ad-expenses",
      desc: "Record school spending",
    },
    {
      label: "Send Notification",
      icon: <Icon.Bell />,
      page: "ad-notifications",
      desc: "Announce to parents",
    },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">School Dashboard</div>
          <div className="page-subtitle">
            {tenant.name} — Academic Year 2025–2026
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            onClick={() => onNavigate("ad-reports")}
          >
            <Icon.Report /> Reports
          </button>
          <button
            className="btn-primary"
            onClick={() => onNavigate("ad-students")}
          >
            <Icon.Plus /> Add Student
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <StatCard
          label="Total Students"
          value={totalStudents}
          icon={<Icon.Student />}
          iconBg="#dbeafe"
          iconColor="#1d4ed8"
          trend={{ value: "5.2%", positive: true }}
        />
        <StatCard
          label="Present Today"
          value={presentToday}
          icon={<Icon.Attendance />}
          iconBg="#f0fdf4"
          iconColor="#16a34a"
          subtitle={`${attendancePct}% attendance`}
        />
        <StatCard
          label="Absent Today"
          value={absentToday}
          icon={<Icon.XCircle />}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          subtitle="42 unexcused"
        />
        <StatCard
          label="Late Today"
          value={lateToday}
          icon={<Icon.Clock />}
          iconBg="#fef3c7"
          iconColor="#b45309"
          subtitle="18 students"
        />
        <StatCard
          label="Total Teachers"
          value={TEACHERS.length}
          icon={<Icon.Teacher />}
          iconBg="#dcfce7"
          iconColor="#15803d"
          subtitle="48 staff payroll"
        />
        <StatCard
          label="Active Classes"
          value="24"
          icon={<Icon.Class />}
          iconBg="#e0f2fe"
          iconColor="#0369a1"
          subtitle="8 sections · 4 grades"
        />
        <StatCard
          label="Fees Collected This Month"
          value={`$${feesCollectedMonth.toLocaleString()}`}
          icon={<Icon.Fees />}
          iconBg="#dbeafe"
          iconColor="#1d4ed8"
          subtitle="August 2026"
        />
        <StatCard
          label="Outstanding Fees"
          value={`$${outstandingFees.toLocaleString()}`}
          icon={<Icon.AlertTriangle />}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          subtitle={`${unpaidFees.length} students`}
        />
      </div>

      {/* Quick actions */}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
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

      {/* Today's classes + attention */}
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
              Today's Classes
            </div>
            <button
              className="btn-secondary"
              style={{ fontSize: 12, padding: "5px 12px" }}
              onClick={() => onNavigate("ad-timetable")}
            >
              View timetable
            </button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Teacher</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {todayClasses.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
                      {t.start} – {t.end}
                    </td>
                    <td>{t.subject}</td>
                    <td>
                      <span className="badge badge-blue">{t.className}</span>
                    </td>
                    <td>{t.teacher}</td>
                    <td className="muted">{t.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            Students Needing Attention
          </div>
          {needingAttention.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 0",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="avatar"
                style={{ width: 30, height: 30, fontSize: 11 }}
              >
                {initials(s.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {s.class} {s.section}
                </div>
              </div>
              <span
                className={`badge ${
                  s.fees !== "Paid" ? "badge-red" : "badge-amber"
                }`}
                style={{ fontSize: 10 }}
              >
                {s.fees !== "Paid" ? `Fees ${s.fees}` : `${s.attendance}% att.`}
              </span>
            </div>
          ))}
          <button
            className="btn-secondary"
            style={{ width: "100%", marginTop: 12 }}
            onClick={() => onNavigate("ad-students")}
          >
            View all students
          </button>
        </div>
      </div>

      {/* Finance summary */}
      <div className="card" style={{ padding: 18, marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Finance — This Month
          </div>
          <button
            className="btn-secondary"
            style={{ fontSize: 12, padding: "5px 12px" }}
            onClick={() => onNavigate("ad-finance")}
          >
            Open finance
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {[
            {
              label: "Income",
              value: `$${incomeMonth.toLocaleString()}`,
              color: "#16a34a",
              bg: "#f0fdf4",
            },
            {
              label: "Expenses",
              value: `$${expensesMonth.toLocaleString()}`,
              color: "#dc2626",
              bg: "#fee2e2",
            },
            {
              label: "Net",
              value: `$${(incomeMonth - expensesMonth).toLocaleString()}`,
              color: incomeMonth - expensesMonth >= 0 ? "#16a34a" : "#dc2626",
              bg: "#f1f5f9",
            },
            {
              label: "Outstanding Fees",
              value: `$${outstandingFees.toLocaleString()}`,
              color: "#b45309",
              bg: "#fef3c7",
            },
          ].map((c) => (
            <div
              key={c.label}
              style={{
                background: c.bg,
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  color: c.color,
                  marginTop: 4,
                }}
              >
                {c.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 20 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 4,
            }}
          >
            Weekly Attendance
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            Present / Absent / Late this week
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={ATTENDANCE_WEEKLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend />
              <Bar
                dataKey="present"
                fill="#22c55e"
                radius={[3, 3, 0, 0]}
                name="Present"
              />
              <Bar dataKey="late" fill="#f59e0b" name="Late" />
              <Bar dataKey="absent" fill="#f87171" name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 4,
            }}
          >
            Fee Collection
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            Collected vs pending per month
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={FEE_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="collected"
                stroke="#2563eb"
                strokeWidth={2}
                fill="#dbeafe"
                name="Collected"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#f87171"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 3"
                name="Pending"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div className="card" style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            Upcoming Exams
          </div>
          {upcomingExams.length === 0 && (
            <div className="muted" style={{ fontSize: 13 }}>
              No upcoming exams.
            </div>
          )}
          {upcomingExams.map((exam) => (
            <div
              key={exam.id}
              style={{ display: "flex", gap: 10, marginBottom: 10 }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "#f3e8ff",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7c3aed",
                  flexShrink: 0,
                }}
              >
                <Icon.Exam />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{exam.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {exam.date} · {exam.time}
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-secondary"
            style={{ width: "100%", marginTop: 6 }}
            onClick={() => onNavigate("ad-exams")}
          >
            Manage exams
          </button>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            Unpaid / Partial Fees
          </div>
          {unpaidFees.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  {f.studentName}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {f.feeType} · {f.class}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span
                  className={`badge ${
                    f.status === "Overdue" ? "badge-red" : "badge-amber"
                  }`}
                  style={{ fontSize: 10 }}
                >
                  {f.status}
                </span>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 3 }}>
                  ${(f.amount - (f.paid ?? 0)).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-secondary"
            style={{ width: "100%", marginTop: 8 }}
            onClick={() => onNavigate("ad-fees")}
          >
            Collect fees
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 12,
              }}
            >
              Bus Assignments
            </div>
            {BUSES.filter((b) => b.status === "Active").map((b) => (
              <div key={b.id} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {b.number} · {b.driver}
                  </span>
                  <span className="muted">
                    {b.assigned}/{b.capacity}
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: "var(--border-subtle)",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, Math.round((b.assigned / b.capacity) * 100))}%`,
                      height: "100%",
                      background: "#2563eb",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {BUS_ASSIGNMENTS.length} students assigned · <b>802</b> unassigned
            </div>
            <button
              className="btn-secondary"
              style={{ width: "100%", marginTop: 8 }}
              onClick={() => onNavigate("ad-transport")}
            >
              Open transport
            </button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                marginBottom: 12,
              }}
            >
              Staff Count
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(staffByRole).map(([role, count]) => (
                <span
                  key={role}
                  className="badge badge-gray"
                  style={{ fontSize: 11 }}
                >
                  {role}: {count}
                </span>
              ))}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                marginTop: 10,
              }}
            >
              {STAFF.length} non-teaching staff total
            </div>
            <button
              className="btn-secondary"
              style={{ width: "100%", marginTop: 8 }}
              onClick={() => onNavigate("ad-staff")}
            >
              Manage staff
            </button>
          </div>
        </div>
      </div>

      {/* Pending reports + recent students */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        <div className="card" style={{ padding: 16 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 12,
            }}
          >
            Pending Reports
          </div>
          {pendingReports.map((r) => (
            <div
              key={r.id}
              style={{ display: "flex", gap: 10, marginBottom: 10 }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "#fef3c7",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b45309",
                  flexShrink: 0,
                }}
              >
                <Icon.Report />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {r.className} · {r.date} · {r.preparedBy}
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn-secondary"
            style={{ width: "100%", marginTop: 6 }}
            onClick={() => onNavigate("ad-reports")}
          >
            Review reports
          </button>
        </div>

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
              Recent Students
            </div>
            <button
              className="btn-secondary"
              style={{ fontSize: 12, padding: "5px 12px" }}
              onClick={() => onNavigate("ad-students")}
            >
              View all
            </button>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Attendance</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                {STUDENTS.slice(0, 6).map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                        }}
                      >
                        <div
                          className="avatar"
                          style={{ width: 30, height: 30, fontSize: 11 }}
                        >
                          {initials(s.name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>
                            {s.name}
                          </div>
                          <div
                            style={{ fontSize: 11, color: "var(--text-muted)" }}
                          >
                            {s.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13 }}>
                      {s.class} {s.section}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            height: 5,
                            background: "var(--border-subtle)",
                            borderRadius: 10,
                            overflow: "hidden",
                            minWidth: 50,
                          }}
                        >
                          <div
                            style={{
                              width: `${s.attendance}%`,
                              height: "100%",
                              background:
                                s.attendance >= 90
                                  ? "#22c55e"
                                  : s.attendance >= 75
                                    ? "#f59e0b"
                                    : "#f87171",
                              borderRadius: 10,
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            flexShrink: 0,
                          }}
                        >
                          {s.attendance}%
                        </span>
                      </div>
                    </td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="card" style={{ padding: 16, marginTop: 20 }}>
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          Recent Announcements
        </div>
        {ANNOUNCEMENTS.slice(0, 3).map((a) => (
          <div key={a.id} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {a.urgent && (
                <span
                  className="badge badge-red"
                  style={{ fontSize: 10, padding: "2px 6px", flexShrink: 0 }}
                >
                  Urgent
                </span>
              )}
              <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>
                {a.title}
              </div>
            </div>
            <div
              style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}
            >
              {a.date} · {a.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
