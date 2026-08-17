import { useState, useMemo } from "react"
import { Icon } from "../../components/Icons"
import { useApp } from "../../context/AppContext"
import {
  CLASSES,
  TEACHERS,
  STUDENTS,
  SUBJECTS,
  ATTENDANCE,
  RESULTS,
  ASSIGNMENTS,
} from "../../data/mockData"

export function StudentsPage({ canManage }: { canManage?: boolean }) {
  const { user, toast } = useApp()
  const teacher = TEACHERS.find((t) => t.name === user?.name) ?? TEACHERS[0]

  const myClasses = CLASSES.filter((c) => c.teacher === teacher.name)
  const myClassNames = new Set(myClasses.map((c) => c.name))

  // Filter students to only those assigned to teacher's classes
  const assignedStudents = STUDENTS.filter((s) => myClassNames.has(s.class))

  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [attendanceStatus, setAttendanceStatus] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = useMemo(() => {
    let result = assignedStudents

    if (selectedClass) {
      result = result.filter((s) => s.class === selectedClass)
    }
    if (attendanceStatus !== "All") {
      result = result.filter((s) => {
        const rec = ATTENDANCE.find(
          (a) => a.studentId === s.id && a.status === attendanceStatus,
        )
        return rec !== undefined
      })
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q),
      )
    }
    return result
  }, [selectedClass, attendanceStatus, searchQuery])

  const classOptions = useMemo(
    () => [
      { label: "All Classes", value: "" },
      ...myClasses.map((c) => ({ label: c.name, value: c.name })),
    ],
    [myClasses],
  )

  const attendanceOptions = useMemo(
    () => [
      { label: "All", value: "All" },
      { label: "Present", value: "Present" },
      { label: "Absent", value: "Absent" },
      { label: "Late", value: "Late" },
      { label: "Excused", value: "Excused" },
    ],
    [],
  )

  const renderFilters = () => (
    <div
      style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}
    >
      <div style={{ flex: 1, minWidth: 180 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Class
        </label>
        <select
          className="input-field"
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ width: "100%" }}
        >
          {classOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, minWidth: 180 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Attendance status
        </label>
        <select
          className="input-field"
          onChange={(e) => setAttendanceStatus(e.target.value)}
          style={{ width: "100%" }}
        >
          {attendanceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          Search
        </label>
        <input
          className="input-field"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )

  const renderStudentRows = () => {
    if (filteredStudents.length === 0) return null

    return filteredStudents.map((s, i) => {
      const attendanceRec = ATTENDANCE.find((a) => a.studentId === s.id)
      const result = RESULTS.find((r) => r.studentName === s.name)
      const recentMark = result ? `${result.marks} (${result.grade})` : "—"
      const reportStatus =
        i % 4 === 0
          ? "Submitted"
          : i % 4 === 1
            ? "Draft"
            : i % 4 === 2
              ? "Pending"
              : "Under Review"

      const getAttStatus = () => {
        if (!attendanceRec) return "—"
        const statusMap: Record<string, string> = {
          Present: "Present",
          Absent: "Absent",
          Late: "Late",
          Leave: "Excused",
        }
        return statusMap[attendanceRec.status] || attendanceRec.status
      }

      return (
        <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                className="avatar"
                style={{ width: 32, height: 32, fontSize: 12 }}
              >
                {s.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>
                {s.name}
              </span>
            </div>
          </td>
          <td style={{ fontSize: 13, color: "#64748b" }}>
            {s.class} {s.section}
          </td>
          <td>
            <span
              className={`badge ${
                getAttStatus() === "Present"
                  ? "badge-green"
                  : getAttStatus() === "Absent"
                    ? "badge-red"
                    : getAttStatus() === "Late"
                      ? "badge-amber"
                      : "badge-blue"
              }`}
            >
              {getAttStatus()}
            </span>
          </td>
          <td>
            <span className={`badge ${result ? "badge-blue" : "badge-gray"}`}>
              {recentMark}
            </span>
          </td>
          <td>
            <span
              className={`badge ${
                reportStatus === "Submitted"
                  ? "badge-green"
                  : reportStatus === "Draft"
                    ? "badge-amber"
                    : reportStatus === "Pending"
                      ? "badge-red"
                      : "badge-purple"
              }`}
            >
              {reportStatus}
            </span>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">My Students</div>
          <div className="page-subtitle">Students assigned to your classes</div>
        </div>
        {canManage && (
          <button
            className="btn-primary"
            onClick={() => toast("success", "Add new student")}
          >
            <Icon.Plus /> Add Student
          </button>
        )}
      </div>

      {renderFilters()}

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
          {assignedStudents.length} assigned students
        </div>

        {filteredStudents.length === 0 ? (
          <div style={{ padding: 20, color: "#64748b" }}>
            No students match the current filters.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Attendance today</th>
                  <th>Recent mark</th>
                  <th>Report status</th>
                </tr>
              </thead>
              <tbody>{renderStudentRows()}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
