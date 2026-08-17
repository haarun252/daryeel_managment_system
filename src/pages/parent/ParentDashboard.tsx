import { Icon } from "../../components/Icons"
import {
  CHILDREN,
  ANNOUNCEMENTS,
  EVENTS,
  EXAMS,
  FEES,
} from "../../data/mockData"

interface Props {
  onNavigate: (page: string) => void
}

export default function ParentDashboard({ onNavigate }: Props) {
  const myFees = FEES.filter((f) =>
    CHILDREN.some((c) => c.name === f.studentName),
  )
  const pendingFees = myFees
    .filter((f) => f.status !== "Paid")
    .reduce((s, f) => s + f.amount, 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Parent Dashboard</div>
          <div className="page-subtitle">
            Welcome, Priya Sharma — Green Valley Academy
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        <div className="stat-card">
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
            My Children
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {CHILDREN.length}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
            Enrolled students
          </div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
            Pending Fees
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: pendingFees > 0 ? "#dc2626" : "#16a34a",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            ${pendingFees.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
            {pendingFees === 0 ? "All fees paid" : "Outstanding balance"}
          </div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
            Upcoming Exams
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {EXAMS.filter((e) => e.status === "Upcoming").length}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
            This week
          </div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
            Upcoming Events
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            {EVENTS.length}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
            Next 30 days
          </div>
        </div>
      </div>

      {/* My children cards */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "Plus Jakarta Sans, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#0f172a",
            marginBottom: 14,
          }}
        >
          My Children
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {CHILDREN.map((child) => (
            <div
              key={child.id}
              className="card"
              style={{
                padding: 20,
                cursor: "pointer",
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(37,99,235,0.1)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
              onClick={() => onNavigate("pa-children")}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <div
                  className="avatar"
                  style={{ width: 48, height: 48, fontSize: 17 }}
                >
                  {child.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      color: "#0f172a",
                    }}
                  >
                    {child.name}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {child.class} · Section {child.section}
                  </div>
                  <span className="badge badge-green" style={{ marginTop: 4 }}>
                    Active
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  {
                    label: "Attendance",
                    value: `${child.attendance}%`,
                    color: child.attendance >= 90 ? "#16a34a" : "#b45309",
                  },
                  {
                    label: "Fees",
                    value: child.fees,
                    color:
                      child.fees === "Paid"
                        ? "#16a34a"
                        : child.fees === "Pending"
                          ? "#b45309"
                          : "#dc2626",
                  },
                  {
                    label: "Student ID",
                    value: child.studentId,
                    color: "#475569",
                  },
                  { label: "Teacher", value: child.teacher, color: "#475569" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#f8fafc",
                      borderRadius: 8,
                      padding: "8px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: item.color,
                        marginTop: 2,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 14,
                  padding: "8px",
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Upcoming events */}
        <div className="card" style={{ padding: 18 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            Upcoming Events
          </div>
          {EVENTS.map((event) => (
            <div
              key={event.id}
              style={{ display: "flex", gap: 12, marginBottom: 12 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: "#dbeafe",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1d4ed8",
                  flexShrink: 0,
                }}
              >
                <Icon.Event />
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                >
                  {event.title}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  {event.date} · {event.time}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="card" style={{ padding: 18 }}>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#0f172a",
              marginBottom: 14,
            }}
          >
            Recent Announcements
          </div>
          {ANNOUNCEMENTS.map((a) => (
            <div
              key={a.id}
              style={{ display: "flex", gap: 12, marginBottom: 12 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: a.urgent ? "#fee2e2" : "#f3e8ff",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: a.urgent ? "#dc2626" : "#7c3aed",
                  flexShrink: 0,
                }}
              >
                <Icon.Announcement />
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}
                >
                  {a.title}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>
                  {a.date} · {a.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
