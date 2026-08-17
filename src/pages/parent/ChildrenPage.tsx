import { useState } from "react"
import { CHILDREN, FEES, EXAMS, ATTENDANCE } from "../../data/mockData"
import { Icon } from "../../components/Icons"

export default function ChildrenPage() {
  const [selectedChild, setSelectedChild] = useState(CHILDREN[0])
  const [activeTab, setActiveTab] =
    useState<"profile" | "attendance" | "fees" | "results">("profile")

  const childFees = FEES.filter((f) => f.studentName === selectedChild.name)
  const childAttendance = ATTENDANCE.filter(
    (a) => a.studentId === selectedChild.id,
  )

  const RESULTS = [
    { subject: "Mathematics", marks: 88, grade: "A", maxMarks: 100 },
    { subject: "English", marks: 76, grade: "B+", maxMarks: 100 },
    { subject: "Science", marks: 92, grade: "A+", maxMarks: 100 },
    { subject: "History", marks: 71, grade: "B", maxMarks: 100 },
    { subject: "Computer Science", marks: 95, grade: "A+", maxMarks: 100 },
  ]

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Children</div>
          <div className="page-subtitle">
            View your children's academic information
          </div>
        </div>
      </div>

      {/* Child selector */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {CHILDREN.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderRadius: 12,
              cursor: "pointer",
              border:
                selectedChild.id === child.id ? "none" : "1px solid #e2e8f0",
              background: selectedChild.id === child.id ? "#2563eb" : "white",
              color: selectedChild.id === child.id ? "white" : "#475569",
              transition: "all 0.15s",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  selectedChild.id === child.id
                    ? "rgba(255,255,255,0.2)"
                    : "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: selectedChild.id === child.id ? "white" : "#1d4ed8",
              }}
            >
              {child.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            {child.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Child header card */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            className="avatar"
            style={{ width: 64, height: 64, fontSize: 22 }}
          >
            {selectedChild.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              {selectedChild.name}
            </div>
            <div style={{ fontSize: 14, color: "#64748b", marginTop: 3 }}>
              {selectedChild.class} · Section {selectedChild.section} ·{" "}
              {selectedChild.studentId}
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 8,
                flexWrap: "wrap",
              }}
            >
              <span className="badge badge-green">{selectedChild.status}</span>
              <span className="badge badge-blue">{selectedChild.class}</span>
              <span
                className={`badge ${
                  selectedChild.fees === "Paid" ? "badge-green" : "badge-amber"
                }`}
              >
                Fees: {selectedChild.fees}
              </span>
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              { label: "Attendance", value: `${selectedChild.attendance}%` },
              { label: "Teacher", value: selectedChild.teacher },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#f8fafc",
                  borderRadius: 10,
                  padding: "10px 14px",
                  minWidth: 110,
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
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1e293b",
                    marginTop: 2,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {[
          ["profile", "Profile"],
          ["attendance", "Attendance"],
          ["fees", "Fees"],
          ["results", "Results"],
        ].map(([key, label]) => (
          <div
            key={key}
            className={`tab-item${activeTab === key ? " active" : ""}`}
            onClick={() =>
              setActiveTab(key as "profile" | "attendance" | "fees" | "results")
            }
          >
            {label}
          </div>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="card" style={{ padding: 24 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {[
              { label: "Full Name", value: selectedChild.name },
              { label: "Student ID", value: selectedChild.studentId },
              { label: "Date of Birth", value: selectedChild.dob },
              { label: "Gender", value: selectedChild.gender },
              {
                label: "Class",
                value: `${selectedChild.class} · Section ${selectedChild.section}`,
              },
              { label: "Enrollment Date", value: selectedChild.enrollDate },
              { label: "Teacher", value: selectedChild.teacher },
              { label: "Status", value: selectedChild.status },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#f8fafc",
                  borderRadius: 10,
                  padding: "12px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#94a3b8",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 4,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="card">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {childAttendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "center",
                        padding: 32,
                        color: "#94a3b8",
                      }}
                    >
                      No attendance records yet
                    </td>
                  </tr>
                ) : (
                  childAttendance.map((a) => (
                    <tr key={a.studentId + a.date}>
                      <td style={{ color: "#1e293b" }}>{a.date}</td>
                      <td style={{ color: "#64748b" }}>{a.class}</td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div
            style={{
              padding: 16,
              background: "#f0f9ff",
              margin: 16,
              borderRadius: 10,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0369a1" }}>
              Overall Attendance: {selectedChild.attendance}%
            </div>
          </div>
        </div>
      )}

      {activeTab === "fees" && (
        <div className="card">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Fee Type</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {childFees.map((fee) => (
                  <tr key={fee.id}>
                    <td style={{ fontWeight: 600 }}>{fee.feeType}</td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                        }}
                      >
                        ${fee.amount.toLocaleString()}
                      </span>
                    </td>
                    <td style={{ color: "#64748b" }}>{fee.dueDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          fee.status === "Paid"
                            ? "badge-green"
                            : fee.status === "Pending"
                              ? "badge-amber"
                              : "badge-red"
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                    <td>
                      {fee.status === "Paid" ? (
                        <button
                          className="btn-secondary"
                          style={{ fontSize: 12, padding: "5px 10px" }}
                        >
                          <Icon.Download /> Receipt
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          style={{ fontSize: 12, padding: "5px 10px" }}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "results" && (
        <div className="card">
          <div
            style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}
          >
            <div
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Mid-Term Results — August 2026
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Max</th>
                  <th>Grade</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r) => (
                  <tr key={r.subject}>
                    <td style={{ fontWeight: 600, color: "#1e293b" }}>
                      {r.subject}
                    </td>
                    <td
                      style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {r.marks}
                    </td>
                    <td style={{ color: "#94a3b8" }}>{r.maxMarks}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.marks >= 90
                            ? "badge-green"
                            : r.marks >= 75
                              ? "badge-blue"
                              : r.marks >= 60
                                ? "badge-amber"
                                : "badge-red"
                        }`}
                      >
                        {r.grade}
                      </span>
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
                            width: 80,
                            height: 6,
                            background: "#f1f5f9",
                            borderRadius: 10,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${r.marks}%`,
                              height: "100%",
                              background:
                                r.marks >= 90
                                  ? "#22c55e"
                                  : r.marks >= 75
                                    ? "#2563eb"
                                    : r.marks >= 60
                                      ? "#f59e0b"
                                      : "#ef4444",
                              borderRadius: 10,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 12, color: "#64748b" }}>
                          {r.marks}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr style={{ background: "#f8fafc" }}>
                  <td style={{ fontWeight: 700, color: "#0f172a" }}>Overall</td>
                  <td
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 800,
                      color: "#1d4ed8",
                      fontSize: 15,
                    }}
                  >
                    {Math.round(
                      RESULTS.reduce((s, r) => s + r.marks, 0) / RESULTS.length,
                    )}
                  </td>
                  <td style={{ color: "#94a3b8" }}>100</td>
                  <td>
                    <span className="badge badge-green">A</span>
                  </td>
                  <td>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: 12, padding: "5px 12px" }}
                    >
                      <Icon.Download /> Report Card
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
