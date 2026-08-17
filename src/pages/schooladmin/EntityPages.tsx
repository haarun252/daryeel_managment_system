import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal, { ConfirmModal } from "../../components/Modal"
import DataTable from "../../components/DataTable"
import {
  ParentRegistrationModal,
  ClassCreationModal,
  CreateFeeModal,
  RecordPaymentModal,
} from "../../components/FormModals"
import { InvoicePreview } from "../../components/DocumentPreviews"
import {
  PARENTS,
  CLASSES,
  SECTIONS,
  SUBJECTS,
  PAYMENTS,
  FEES,
  EXPENSES,
  STUDENTS,
  TIMETABLE_ENTRIES,
  RESULTS,
  SCHOOL_REPORTS,
  ATTENDANCE,
  MESSAGES,
  initials,
} from "../../data/mockData"
import type { FeeRecord, Parent, SchoolClass } from "../../data/mockData"
import { useApp } from "../../context/AppContext"

/* ───────────────────────────── Parents ───────────────────────────── */

const PARENT_TABS = [
  "Profile",
  "Children",
  "Communication",
  "Fees & Payments",
  "Account",
] as const

export function ParentsPage() {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<Parent | null>(null)
  const [tab, setTab] = useState<typeof PARENT_TABS[number]>("Profile")

  const openParent = (p: Parent) => {
    setTab("Profile")
    setView(p)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Parents</div>
          <div className="page-subtitle">
            {PARENTS.length} registered guardians
          </div>
        </div>
        <button className="btn-primary" onClick={() => setOpen(true)}>
          <Icon.Plus /> Add Parent
        </button>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Total Parents</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {PARENTS.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Registered guardians
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Active</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            {PARENTS.filter((p) => p.status === "Active").length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Verified accounts
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Invited</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#7c3aed",
            }}
          >
            {PARENTS.filter((p) => p.status === "Invited").length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Invite sent, pending join
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Unverified</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#b45309",
            }}
          >
            {PARENTS.filter((p) => p.status === "Unverified").length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Need identity verification
          </div>
        </div>
      </div>

      <DataTable
        data={PARENTS as unknown as Record<string, unknown>[]}
        searchKeys={["name", "email", "phone"]}
        exportName="parents"
        emptyTitle="No parents found."
        emptyMessage="No parents have been registered yet."
        emptyAction="+ Register Parent"
        onEmptyAction={() => setOpen(true)}
        columns={[
          {
            key: "name",
            label: "Parent",
            render: (r) => (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div className="avatar">{initials(String(r.name))}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                  <div className="muted" style={{ fontSize: 12 }}>
                    {String(r.relationship)}
                  </div>
                </div>
              </div>
            ),
          },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
          {
            key: "children",
            label: "Children",
            render: (r) =>
              (r.children as string[]).length > 0 ? (
                (r.children as string[]).join(", ")
              ) : (
                <span className="muted">None linked</span>
              ),
          },
          {
            key: "status",
            label: "Account status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Active"
                    ? "badge-green"
                    : r.status === "Invited"
                      ? "badge-purple"
                      : "badge-amber"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
          {
            key: "lastActivity",
            label: "Last activity",
            render: (r) =>
              r.lastActivity ? (
                String(r.lastActivity)
              ) : (
                <span className="muted">—</span>
              ),
          },
        ]}
        actions={(r) => {
          const p = r as unknown as Parent
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="View"
                onClick={() => openParent(p)}
              >
                <Icon.Eye />
              </button>
              <button
                className="btn-icon"
                title="Edit"
                onClick={() => toast("info", "Parent editor opened.")}
              >
                <Icon.Edit />
              </button>
              <button
                className="btn-icon"
                title="Invite"
                onClick={() =>
                  toast("success", `Invitation sent to ${p.name}.`)
                }
              >
                <Icon.Mail />
              </button>
            </div>
          )
        }}
      />

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title="Parent Profile"
        size="lg"
        footer={
          <button className="btn-primary" onClick={() => setView(null)}>
            Close
          </button>
        }
      >
        {view &&
          (() => {
            const children = STUDENTS.filter((s) =>
              view.children.includes(s.name),
            )
            const fees = FEES.filter((f) =>
              view.children.includes(f.studentName),
            )
            const payments = PAYMENTS.filter((p) =>
              view.children.includes(p.studentName),
            )
            const comms = MESSAGES.filter((m) => m.from === view.name)
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    background: "var(--bg-muted)",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 14,
                  }}
                >
                  <div
                    className="avatar"
                    style={{ width: 56, height: 56, fontSize: 18 }}
                  >
                    {initials(view.name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 17,
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                      }}
                    >
                      {view.name}
                    </div>
                    <div className="muted">
                      {view.email} · {view.phone}
                    </div>
                  </div>
                  <span
                    className={`badge ${
                      view.status === "Active"
                        ? "badge-green"
                        : view.status === "Invited"
                          ? "badge-purple"
                          : "badge-amber"
                    }`}
                  >
                    {view.status}
                  </span>
                </div>
                <div className="tab-bar" style={{ marginBottom: 16 }}>
                  {PARENT_TABS.map((t) => (
                    <div
                      key={t}
                      className={`tab-item${tab === t ? " active" : ""}`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                {tab === "Profile" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {[
                      ["Relationship", view.relationship],
                      ["Occupation", view.occupation],
                      ["Address", view.address],
                      ["Phone", view.phone],
                      ["Email", view.email],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          background: "var(--bg-muted)",
                          borderRadius: 8,
                          padding: "10px 12px",
                        }}
                      >
                        <div
                          className="muted"
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          {k}
                        </div>
                        <div style={{ fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "Children" && (
                  <div>
                    {children.length === 0 ? (
                      <div className="muted">
                        No children linked to this parent.
                      </div>
                    ) : (
                      children.map((c) => (
                        <div
                          key={c.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 0",
                            borderBottom: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div className="avatar">{initials(c.name)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600 }}>{c.name}</div>
                            <div className="muted" style={{ fontSize: 12 }}>
                              {c.class} {c.section} · {c.studentId}
                            </div>
                          </div>
                          <span
                            className={`badge ${
                              c.fees === "Paid" ? "badge-green" : "badge-amber"
                            }`}
                          >
                            {c.fees}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {tab === "Communication" && (
                  <div>
                    {comms.length === 0 ? (
                      <div className="muted">
                        No messages exchanged with this parent.
                      </div>
                    ) : (
                      comms.map((m) => (
                        <div
                          key={m.id}
                          style={{
                            padding: "10px 0",
                            borderBottom: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div style={{ fontWeight: 600, fontSize: 13 }}>
                            {m.subject}
                          </div>
                          <div
                            style={{ fontSize: 12, color: "var(--text-muted)" }}
                          >
                            {m.preview}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              color: "var(--text-muted)",
                              marginTop: 3,
                            }}
                          >
                            {m.date}
                          </div>
                        </div>
                      ))
                    )}
                    <button
                      className="btn-secondary"
                      style={{ marginTop: 12 }}
                      onClick={() =>
                        toast("success", "Message sent to parent.")
                      }
                    >
                      <Icon.Message /> Send message
                    </button>
                  </div>
                )}

                {tab === "Fees & Payments" && (
                  <div>
                    <table className="data-table" style={{ marginBottom: 16 }}>
                      <thead>
                        <tr>
                          <th>Child</th>
                          <th>Fee</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fees.length === 0 && (
                          <tr>
                            <td colSpan={4} className="muted">
                              No fees for this parent's children.
                            </td>
                          </tr>
                        )}
                        {fees.map((f) => (
                          <tr key={f.id}>
                            <td>{f.studentName}</td>
                            <td>{f.feeType}</td>
                            <td>${f.amount.toLocaleString()}</td>
                            <td>
                              <span
                                className={`badge ${
                                  f.status === "Paid"
                                    ? "badge-green"
                                    : f.status === "Pending"
                                      ? "badge-amber"
                                      : "badge-red"
                                }`}
                              >
                                {f.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Receipt</th>
                          <th>Child</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.length === 0 && (
                          <tr>
                            <td colSpan={4} className="muted">
                              No payments recorded.
                            </td>
                          </tr>
                        )}
                        {payments.map((p) => (
                          <tr key={p.id}>
                            <td>{p.reference}</td>
                            <td>{p.studentName}</td>
                            <td>${p.amount.toLocaleString()}</td>
                            <td>{p.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {tab === "Account" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                    }}
                  >
                    {[
                      ["Account status", view.status],
                      ["Last activity", view.lastActivity ?? "—"],
                      [
                        "Portal access",
                        view.status === "Active" ? "Enabled" : "Pending",
                      ],
                      ["Notifications", "Email + SMS enabled"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          background: "var(--bg-muted)",
                          borderRadius: 8,
                          padding: "10px 12px",
                        }}
                      >
                        <div
                          className="muted"
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          {k}
                        </div>
                        <div style={{ fontWeight: 600 }}>{v}</div>
                      </div>
                    ))}
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        gap: 8,
                        marginTop: 8,
                      }}
                    >
                      {view.status === "Active" ? (
                        <button
                          className="btn-danger"
                          onClick={() =>
                            toast(
                              "warning",
                              `${view.name}'s portal access disabled.`,
                            )
                          }
                        >
                          Disable account
                        </button>
                      ) : (
                        <button
                          className="btn-primary"
                          onClick={() =>
                            toast(
                              "success",
                              `Invitation re-sent to ${view.name}.`,
                            )
                          }
                        >
                          <Icon.Mail /> Re-send invite
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}
      </Modal>

      <ParentRegistrationModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

/* ───────────────────────────── Classes ───────────────────────────── */

const CLASS_TABS = [
  "Students",
  "Teachers",
  "Subjects",
  "Timetable",
  "Attendance",
  "Marks",
  "Reports",
  "Fees",
] as const

export function ClassesPage({ canManage = true }: { canManage?: boolean }) {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<SchoolClass | null>(null)
  const [tab, setTab] = useState<typeof CLASS_TABS[number]>("Students")

  const totalEnrolled = CLASSES.reduce((s, c) => s + c.students, 0)
  const capacityWarnings = CLASSES.filter(
    (c) => c.students / c.capacity >= 0.85,
  ).length
  const classSubjects = (name: string) =>
    Array.from(
      new Set(
        TIMETABLE_ENTRIES.filter((t) => t.className === name).map(
          (t) => t.subject,
        ),
      ),
    )
  const classTeachers = (name: string) =>
    Array.from(
      new Set(
        TIMETABLE_ENTRIES.filter((t) => t.className === name).map(
          (t) => t.teacher,
        ),
      ),
    )

  const openClass = (c: SchoolClass) => {
    setTab("Students")
    setView(c)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">
            {canManage ? "Classes" : "My Classes"}
          </div>
          <div className="page-subtitle">
            {CLASSES.length} classes this academic year
          </div>
        </div>
        {canManage && (
          <button className="btn-primary" onClick={() => setOpen(true)}>
            <Icon.Plus /> Create Class
          </button>
        )}
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Total Classes</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {CLASSES.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            2025–2026 academic year
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Enrolled Students</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {totalEnrolled}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Across all classes
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Capacity Warnings</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: capacityWarnings > 0 ? "#b45309" : "#16a34a",
            }}
          >
            {capacityWarnings}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Classes at 85%+ capacity
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Total Capacity</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {CLASSES.reduce((s, c) => s + c.capacity, 0)}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Available seats
          </div>
        </div>
      </div>

      <DataTable
        data={CLASSES as unknown as Record<string, unknown>[]}
        searchKeys={["name", "teacher"]}
        exportName="classes"
        columns={[
          {
            key: "name",
            label: "Class",
            render: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon.Class />
                </div>
                <span style={{ fontWeight: 600 }}>{String(r.name)}</span>
              </div>
            ),
          },
          { key: "teacher", label: "Class teacher" },
          {
            key: "name",
            label: "Subjects",
            render: (r) =>
              classSubjects(String(r.name)).map((s) => (
                <span
                  key={s}
                  className="badge badge-blue"
                  style={{ marginRight: 4 }}
                >
                  {s}
                </span>
              )),
          },
          {
            key: "students",
            label: "Students",
            render: (r) => `${r.students}/${r.capacity}`,
          },
          {
            key: "students",
            label: "Capacity",
            render: (r) => {
              const pct = Math.round(
                (Number(r.students) / Number(r.capacity)) * 100,
              )
              return (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div
                    style={{
                      flex: 1,
                      height: 5,
                      background: "var(--border-subtle)",
                      borderRadius: 10,
                      overflow: "hidden",
                      minWidth: 60,
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background:
                          pct >= 95
                            ? "#f87171"
                            : pct >= 85
                              ? "#f59e0b"
                              : "#22c55e",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {pct}%
                  </span>
                </div>
              )
            },
          },
          {
            key: "students",
            label: "Status",
            render: (r) => {
              const pct = Math.round(
                (Number(r.students) / Number(r.capacity)) * 100,
              )
              const s =
                pct >= 95 ? "At capacity" : pct >= 85 ? "Warning" : "Active"
              return (
                <span
                  className={`badge ${
                    s === "Active"
                      ? "badge-green"
                      : s === "Warning"
                        ? "badge-amber"
                        : "badge-red"
                  }`}
                >
                  {s}
                </span>
              )
            },
          },
        ]}
        actions={(r) => {
          const c = r as unknown as SchoolClass
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="View class"
                onClick={() => openClass(c)}
              >
                <Icon.Eye />
              </button>
              {canManage && (
                <button
                  className="btn-icon"
                  title="Edit"
                  onClick={() => toast("info", "Class editor opened.")}
                >
                  <Icon.Edit />
                </button>
              )}
            </div>
          )
        }}
      />

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={`Class ${view?.name ?? ""}`}
        size="lg"
        footer={
          <button className="btn-primary" onClick={() => setView(null)}>
            Close
          </button>
        }
      >
        {view &&
          (() => {
            const students = STUDENTS.filter(
              (s) => `${s.class} ${s.section}` === view.name,
            )
            const teachers = classTeachers(view.name)
            const subjects = classSubjects(view.name)
            const timetable = TIMETABLE_ENTRIES.filter(
              (t) => t.className === view.name,
            )
            const attendance = ATTENDANCE.filter((a) => a.class === view.name)
            const marks = RESULTS.filter((r) => r.class === view.name)
            const reports = SCHOOL_REPORTS.filter(
              (r) => r.className === view.name,
            )
            const fees = FEES.filter((f) => f.class === view.name)
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    background: "var(--bg-muted)",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: "var(--primary-soft)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon.Class />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 17,
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                      }}
                    >
                      {view.name}
                    </div>
                    <div className="muted">
                      {view.teacher} · Room {view.room} · {view.academicYear}
                    </div>
                  </div>
                  <span className="badge badge-green">Active</span>
                </div>
                <div className="tab-bar" style={{ marginBottom: 16 }}>
                  {CLASS_TABS.map((t) => (
                    <div
                      key={t}
                      className={`tab-item${tab === t ? " active" : ""}`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </div>
                  ))}
                </div>

                {tab === "Students" && (
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>
                      {students.length} students · capacity {view.capacity}
                    </div>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>ID</th>
                          <th>Attendance</th>
                          <th>Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length === 0 && (
                          <tr>
                            <td colSpan={4} className="muted">
                              No students in this class.
                            </td>
                          </tr>
                        )}
                        {students.map((s) => (
                          <tr key={s.id}>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <div
                                  className="avatar"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    fontSize: 10,
                                  }}
                                >
                                  {initials(s.name)}
                                </div>
                                <span style={{ fontWeight: 600 }}>
                                  {s.name}
                                </span>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {tab === "Teachers" && (
                  <div>
                    {teachers.length === 0 ? (
                      <div className="muted">No teachers assigned.</div>
                    ) : (
                      teachers.map((t) => (
                        <div
                          key={t}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 0",
                            borderBottom: "1px solid var(--border-subtle)",
                          }}
                        >
                          <div className="avatar">{initials(t)}</div>
                          <div style={{ flex: 1, fontWeight: 600 }}>{t}</div>
                          <span className="badge badge-green">Active</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {tab === "Subjects" && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {subjects.length === 0 ? (
                      <div className="muted">No subjects scheduled.</div>
                    ) : (
                      subjects.map((s) => (
                        <span
                          key={s}
                          className="badge badge-blue"
                          style={{ fontSize: 13, padding: "6px 12px" }}
                        >
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                )}

                {tab === "Timetable" && (
                  <div>
                    {timetable.length === 0 ? (
                      <div className="muted">No timetable entries.</div>
                    ) : (
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
                          {timetable.map((t) => (
                            <tr key={t.id}>
                              <td>{t.day}</td>
                              <td>
                                {t.start} – {t.end}
                              </td>
                              <td>{t.subject}</td>
                              <td>{t.teacher}</td>
                              <td>{t.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {tab === "Attendance" && (
                  <div>
                    {attendance.length === 0 ? (
                      <div className="muted">No attendance recorded today.</div>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance.map((a) => (
                            <tr key={a.studentId + a.date}>
                              <td>{a.studentName}</td>
                              <td>{a.date}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    a.status === "Present"
                                      ? "badge-green"
                                      : a.status === "Late"
                                        ? "badge-amber"
                                        : a.status === "Leave"
                                          ? "badge-blue"
                                          : "badge-red"
                                  }`}
                                >
                                  {a.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {tab === "Marks" && (
                  <div>
                    {marks.length === 0 ? (
                      <div className="muted">
                        No marks recorded for this class.
                      </div>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marks.map((m) => (
                            <tr key={m.id}>
                              <td>{m.studentName}</td>
                              <td>{m.subject}</td>
                              <td>{m.marks}</td>
                              <td>
                                <span className="badge badge-blue">
                                  {m.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {tab === "Reports" && (
                  <div>
                    {reports.length === 0 ? (
                      <div className="muted">No reports for this class.</div>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Report</th>
                            <th>Date</th>
                            <th>Prepared by</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reports.map((r) => (
                            <tr key={r.id}>
                              <td>{r.title}</td>
                              <td>{r.date}</td>
                              <td>{r.preparedBy}</td>
                              <td>
                                <span className="badge badge-amber">
                                  {r.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {tab === "Fees" && (
                  <div>
                    {fees.length === 0 ? (
                      <div className="muted">
                        No fees issued for this class.
                      </div>
                    ) : (
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Fee</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fees.map((f) => (
                            <tr key={f.id}>
                              <td>{f.studentName}</td>
                              <td>{f.feeType}</td>
                              <td>${f.amount.toLocaleString()}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    f.status === "Paid"
                                      ? "badge-green"
                                      : f.status === "Pending"
                                        ? "badge-amber"
                                        : "badge-red"
                                  }`}
                                >
                                  {f.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </div>
            )
          })()}
      </Modal>

      <ClassCreationModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

/* ───────────────────────────── Sections ───────────────────────────── */

export function SectionsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Sections</div>
          <div className="page-subtitle">Class streams and capacity</div>
        </div>
      </div>
      <DataTable
        data={SECTIONS as unknown as Record<string, unknown>[]}
        searchKeys={["name"]}
        exportName="sections"
        columns={[
          { key: "name", label: "Section" },
          { key: "classes", label: "Classes" },
          { key: "students", label: "Students" },
          { key: "description", label: "Description" },
        ]}
      />
    </div>
  )
}

/* ───────────────────────────── Subjects ───────────────────────────── */

export function SubjectsPage() {
  const { toast } = useApp()
  const [rows, setRows] = useState(SUBJECTS)
  const [addOpen, setAddOpen] = useState(false)
  const [assign, setAssign] = useState<typeof SUBJECTS[number] | null>(null)
  const [archive, setArchive] = useState<typeof SUBJECTS[number] | null>(null)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Subjects</div>
          <div className="page-subtitle">
            Curriculum subjects and assignments
          </div>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}>
          <Icon.Plus /> Create Subject
        </button>
      </div>
      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={["name", "code", "teacher"]}
        exportName="subjects"
        columns={[
          {
            key: "name",
            label: "Subject",
            render: (r) => (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: "var(--primary-soft)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon.Subject />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>
                    {String(r.code)}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "classes",
            label: "Classes",
            render: (r) => (
              <span className="badge badge-gray">
                {String(r.classes)} classes
              </span>
            ),
          },
          { key: "teacher", label: "Lead teacher" },
          {
            key: "type",
            label: "Type",
            render: (r) => (
              <span
                className={`badge ${
                  r.type === "Core" ? "badge-blue" : "badge-purple"
                }`}
              >
                {String(r.type)}
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Active" ? "badge-green" : "badge-gray"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
        ]}
        actions={(r) => {
          const s = r as typeof SUBJECTS[number]
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="Assign to class"
                onClick={() => setAssign(s)}
              >
                <Icon.Class />
              </button>
              <button
                className="btn-icon"
                title="Assign teacher"
                onClick={() =>
                  toast("info", `Teacher assignment opened for ${s.name}.`)
                }
              >
                <Icon.Teacher />
              </button>
              <button
                className="btn-icon"
                title="Edit"
                onClick={() => toast("info", "Subject editor opened.")}
              >
                <Icon.Edit />
              </button>
              {s.status !== "Archived" && (
                <button
                  className="btn-icon"
                  title="Archive"
                  style={{ color: "#dc2626" }}
                  onClick={() => setArchive(s)}
                >
                  <Icon.Archive />
                </button>
              )}
            </div>
          )
        }}
      />

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Create Subject"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Subject created.")
                setAddOpen(false)
              }}
            >
              Save Subject
            </button>
          </>
        }
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <div>
            <label className="field-label">Subject name</label>
            <input className="input-field" />
          </div>
          <div>
            <label className="field-label">Code</label>
            <input className="input-field" />
          </div>
          <div>
            <label className="field-label">Type</label>
            <select className="input-field">
              <option>Core</option>
              <option>Elective</option>
            </select>
          </div>
          <div>
            <label className="field-label">Lead teacher</label>
            <select className="input-field">
              <option>James Okonkwo</option>
              <option>Angela Morrison</option>
              <option>Carlos Mendez</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!assign}
        onClose={() => setAssign(null)}
        title={`Assign ${assign?.name ?? ""} to classes`}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAssign(null)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast(
                  "success",
                  `${assign?.name} assigned to selected classes.`,
                )
                setAssign(null)
              }}
            >
              Save assignment
            </button>
          </>
        }
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {CLASSES.map((c) => (
            <label
              key={c.id}
              style={{
                display: "flex",
                gap: 8,
                fontSize: 13,
                padding: 8,
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
            >
              <input type="checkbox" defaultChecked={c.name === "Grade 7A"} />{" "}
              {c.name}
            </label>
          ))}
        </div>
      </Modal>

      <ConfirmModal
        open={!!archive}
        onClose={() => setArchive(null)}
        title="Archive subject"
        message={`Archive ${archive?.name}? It will no longer appear in class schedules.`}
        confirmLabel="Archive"
        onConfirm={() => {
          setRows((list) =>
            list.map((x) =>
              x.id === archive?.id ? { ...x, status: "Archived" } : x,
            ),
          )
          toast("success", "Subject archived.")
        }}
      />
    </div>
  )
}

/* ───────────────────────────── Invoices ───────────────────────────── */

export function InvoicesPage() {
  const [fee, setFee] = useState<FeeRecord | null>(null)
  const [pay, setPay] = useState(false)
  const [create, setCreate] = useState(false)
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Invoices</div>
          <div className="page-subtitle">Student fee invoices</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => setPay(true)}>
            Record Payment
          </button>
          <button className="btn-primary" onClick={() => setCreate(true)}>
            <Icon.Plus /> Create Fee
          </button>
        </div>
      </div>
      <DataTable
        data={FEES as unknown as Record<string, unknown>[]}
        searchKeys={["studentName", "invoiceId"]}
        exportName="invoices"
        columns={[
          { key: "invoiceId", label: "Invoice" },
          { key: "studentName", label: "Student" },
          { key: "feeType", label: "Fee" },
          {
            key: "amount",
            label: "Amount",
            render: (r) => `$${Number(r.amount).toLocaleString()}`,
          },
          { key: "dueDate", label: "Due" },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Paid"
                    ? "badge-green"
                    : r.status === "Pending"
                      ? "badge-amber"
                      : "badge-red"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
        ]}
        actions={(r) => (
          <button
            className="btn-icon"
            onClick={() => setFee(r as unknown as FeeRecord)}
          >
            <Icon.Eye />
          </button>
        )}
      />
      <InvoicePreview open={!!fee} onClose={() => setFee(null)} fee={fee} />
      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
      <CreateFeeModal open={create} onClose={() => setCreate(false)} />
    </div>
  )
}

/* ───────────────────────────── Payments ───────────────────────────── */

export function SchoolPaymentsPage() {
  const { toast } = useApp()
  const [pay, setPay] = useState(false)
  const [rows, setRows] = useState(PAYMENTS)
  const [reverse, setReverse] = useState<typeof PAYMENTS[number] | null>(null)
  const [receipt, setReceipt] = useState<typeof PAYMENTS[number] | null>(null)

  const parentOf = (name: string) =>
    STUDENTS.find((s) => s.name === name)?.parent ?? "—"

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Payments</div>
          <div className="page-subtitle">
            Recorded fee payments and receipts
          </div>
        </div>
        <button className="btn-primary" onClick={() => setPay(true)}>
          <Icon.Plus /> Record Payment
        </button>
      </div>
      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={["studentName", "invoiceId", "reference", "receipt"]}
        exportName="payments"
        columns={[
          {
            key: "receipt",
            label: "Receipt",
            render: (r) => (
              <span style={{ fontWeight: 600 }}>{String(r.receipt)}</span>
            ),
          },
          { key: "studentName", label: "Student" },
          {
            key: "studentName",
            label: "Parent",
            render: (r) => parentOf(String(r.studentName)),
          },
          {
            key: "amount",
            label: "Amount",
            render: (r) => `$${Number(r.amount).toLocaleString()}`,
          },
          { key: "date", label: "Date" },
          { key: "method", label: "Method" },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Completed" ? "badge-green" : "badge-amber"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
          { key: "recordedBy", label: "Recorded by" },
        ]}
        actions={(r) => {
          const p = r as typeof PAYMENTS[number]
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="View receipt"
                onClick={() => setReceipt(p)}
              >
                <Icon.Receipt />
              </button>
              <button
                className="btn-icon"
                title="Print / download"
                onClick={() => toast("success", "Receipt PDF generated.")}
              >
                <Icon.Download />
              </button>
              <button
                className="btn-icon"
                title="Reverse / refund"
                style={{ color: "#dc2626" }}
                onClick={() => setReverse(p)}
              >
                <Icon.Refresh />
              </button>
            </div>
          )
        }}
      />

      <Modal
        open={!!receipt}
        onClose={() => setReceipt(null)}
        title={`Receipt ${receipt?.receipt ?? ""}`}
      >
        {receipt && (
          <div>
            <div
              style={{
                background: "var(--bg-muted)",
                borderRadius: 10,
                padding: 14,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                }}
              >
                Xanaano — School Fee Receipt
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                {receipt.receipt} · {receipt.date}
              </div>
            </div>
            {[
              ["Student", receipt.studentName],
              ["Parent", parentOf(receipt.studentName)],
              ["Invoice", receipt.invoiceId],
              ["Method", receipt.method],
              ["Reference", receipt.reference],
              ["Recorded by", receipt.recordedBy],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                  fontSize: 13,
                }}
              >
                <span className="muted">{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                fontSize: 15,
              }}
            >
              <span style={{ fontWeight: 700 }}>Amount paid</span>
              <span style={{ fontWeight: 800 }}>
                ${receipt.amount.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                className="btn-secondary"
                onClick={() => toast("success", "Receipt downloaded.")}
              >
                <Icon.Download /> Download
              </button>
              <button className="btn-secondary" onClick={() => window.print()}>
                <Icon.Print /> Print
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={!!reverse}
        onClose={() => setReverse(null)}
        title="Reverse payment — requires permission"
        message={`Reverse ${reverse?.receipt} ($${reverse?.amount.toLocaleString()})? This requires elevated permission and will be recorded in the audit trail.`}
        confirmLabel="Request reversal"
        onConfirm={() => {
          toast("info", "Reversal request sent to platform admin for approval.")
        }}
      />

      <RecordPaymentModal open={pay} onClose={() => setPay(false)} />
    </div>
  )
}

/* ───────────────────────────── Expenses ───────────────────────────── */

const EXPENSE_CATEGORIES = [
  "Teacher Salary",
  "Staff Salary",
  "Bus Fuel",
  "Food",
  "Electricity",
  "Water",
  "Rent",
  "Maintenance",
  "Supplies",
  "Other",
] as const

export function ExpensesPage() {
  const { toast } = useApp()
  const [rows, setRows] = useState(EXPENSES)
  const [cat, setCat] = useState<string>("All")
  const [addOpen, setAddOpen] = useState(false)

  const filtered = rows.filter((r) => cat === "All" || r.category === cat)
  const totalMonth = rows
    .filter((r) => r.date.startsWith("2026-08"))
    .reduce((s, r) => s + r.amount, 0)
  const paid = rows
    .filter((r) => r.status === "Paid")
    .reduce((s, r) => s + r.amount, 0)
  const pending = rows
    .filter((r) => r.status === "Pending")
    .reduce((s, r) => s + r.amount, 0)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Expenses</div>
          <div className="page-subtitle">School operating expenses</div>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}>
          <Icon.Plus /> Add Expense
        </button>
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">This Month</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            ${totalMonth.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            August 2026
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Paid</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#16a34a",
            }}
          >
            ${paid.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Completed payments
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Pending</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#b45309",
            }}
          >
            ${pending.toLocaleString()}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Awaiting payment
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Categories</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {EXPENSE_CATEGORIES.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Supported expense types
          </div>
        </div>
      </div>

      <div className="tab-bar">
        {["All", ...EXPENSE_CATEGORIES].map((c) => (
          <div
            key={c}
            className={`tab-item${cat === c ? " active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </div>
        ))}
      </div>

      <DataTable
        data={filtered as unknown as Record<string, unknown>[]}
        searchKeys={["title", "category", "paidTo", "reference"]}
        exportName="expenses"
        columns={[
          {
            key: "title",
            label: "Expense",
            render: (r) => (
              <div>
                <div style={{ fontWeight: 600 }}>{String(r.title)}</div>
                <div className="muted" style={{ fontSize: 11 }}>
                  {String(r.reference)}
                </div>
              </div>
            ),
          },
          { key: "date", label: "Date" },
          {
            key: "amount",
            label: "Amount",
            render: (r) => (
              <span style={{ fontWeight: 700 }}>
                ${Number(r.amount).toLocaleString()}
              </span>
            ),
          },
          {
            key: "category",
            label: "Category",
            render: (r) => (
              <span className="badge badge-blue">{String(r.category)}</span>
            ),
          },
          { key: "paidTo", label: "Payee" },
          {
            key: "notes",
            label: "Notes",
            render: (r) =>
              r.notes ? String(r.notes) : <span className="muted">—</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Paid" ? "badge-green" : "badge-amber"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
        ]}
        actions={(r) => (
          <div style={{ display: "flex", gap: 2 }}>
            <button
              className="btn-icon"
              onClick={() => toast("info", "Expense detail opened.")}
            >
              <Icon.Eye />
            </button>
            <button
              className="btn-icon"
              onClick={() => toast("info", "Edit expense opened.")}
            >
              <Icon.Edit />
            </button>
          </div>
        )}
      />

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Expense"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", "Expense recorded.")
                setAddOpen(false)
              }}
            >
              Save Expense
            </button>
          </>
        }
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="field-label">Description</label>
            <input className="input-field" />
          </div>
          <div>
            <label className="field-label">Date</label>
            <input
              className="input-field"
              type="date"
              defaultValue="2026-08-17"
            />
          </div>
          <div>
            <label className="field-label">Amount</label>
            <input className="input-field" type="number" defaultValue={500} />
          </div>
          <div>
            <label className="field-label">Category</label>
            <select className="input-field">
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Payee</label>
            <input className="input-field" />
          </div>
          <div>
            <label className="field-label">Reference</label>
            <input className="input-field" placeholder="EXP-2026-xxx" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="field-label">Notes</label>
            <input className="input-field" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
