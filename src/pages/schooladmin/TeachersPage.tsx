import { useState } from "react"
import { Icon } from "../../components/Icons"
import Modal, { ConfirmModal } from "../../components/Modal"
import DataTable from "../../components/DataTable"
import { TeacherRegistrationModal } from "../../components/FormModals"
import {
  TEACHERS,
  TIMETABLE_ENTRIES,
  CLASSES,
  SUBJECTS,
  initials,
} from "../../data/mockData"
import type { Teacher } from "../../data/mockData"
import { useApp } from "../../context/AppContext"

export default function TeachersPage({
  canManage = true,
}: {
  canManage?: boolean
}) {
  const { toast } = useApp()
  const [view, setView] = useState<Teacher | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [assign, setAssign] = useState<Teacher | null>(null)
  const [disable, setDisable] = useState<Teacher | null>(null)
  const [rows, setRows] = useState(TEACHERS)

  const active = rows.filter((t) => t.status === "Active").length
  const onLeave = rows.filter((t) => t.status === "On Leave").length
  const classesAssigned = rows.reduce((s, t) => s + t.classes.length, 0)
  const scheduleOf = (name: string) =>
    TIMETABLE_ENTRIES.filter((t) => t.teacher === name).length

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">
            {canManage ? "Teachers" : "My Classes & Staff"}
          </div>
          <div className="page-subtitle">
            {rows.length} teachers on the payroll
          </div>
        </div>
        {canManage && (
          <button className="btn-primary" onClick={() => setAddOpen(true)}>
            <Icon.Plus /> Add Teacher
          </button>
        )}
      </div>

      <div className="grid-stats">
        <div className="stat-card">
          <div className="muted">Total Teachers</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {rows.length}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            All teachers
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
            {active}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Currently teaching
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">On Leave</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#b45309",
            }}
          >
            {onLeave}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Away from duty
          </div>
        </div>
        <div className="stat-card">
          <div className="muted">Classes Assigned</div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            {classesAssigned}
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
            Class teacher roles
          </div>
        </div>
      </div>

      <DataTable
        data={rows as unknown as Record<string, unknown>[]}
        searchKeys={["name", "email", "teacherId", "subjects"]}
        exportName="teachers"
        emptyTitle="No teachers found."
        emptyMessage="No teachers have been registered yet."
        emptyAction={canManage ? "+ Add Teacher" : undefined}
        onEmptyAction={() => setAddOpen(true)}
        columns={[
          {
            key: "name",
            label: "Teacher",
            render: (r) => (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div
                  className="avatar"
                  style={{ background: "#f0fdf4", color: "#15803d" }}
                >
                  {initials(String(r.name))}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.name)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>
                    {String(r.email)}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "subjects",
            label: "Subjects",
            render: (r) => (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {(r.subjects as string[]).map((s) => (
                  <span key={s} className="badge badge-blue">
                    {s}
                  </span>
                ))}
              </div>
            ),
          },
          {
            key: "classes",
            label: "Classes",
            render: (r) => (r.classes as string[]).join(", "),
          },
          {
            key: "name",
            label: "Schedule",
            render: (r) => (
              <span className="badge badge-gray">
                {scheduleOf(String(r.name))} periods
              </span>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (r) => (
              <span
                className={`badge ${
                  r.status === "Active"
                    ? "badge-green"
                    : r.status === "On Leave"
                      ? "badge-amber"
                      : r.status === "Invited"
                        ? "badge-blue"
                        : "badge-gray"
                }`}
              >
                {String(r.status)}
              </span>
            ),
          },
          {
            key: "status",
            label: "Account",
            render: (r) => (
              <span
                className={`badge ${
                  String(r.status) === "Inactive"
                    ? "badge-red"
                    : String(r.status) === "Invited"
                      ? "badge-purple"
                      : "badge-green"
                }`}
              >
                {String(r.status) === "Invited"
                  ? "Invited"
                  : String(r.status) === "Inactive"
                    ? "Disabled"
                    : "Active"}
              </span>
            ),
          },
        ]}
        actions={(r) => {
          const t = r as unknown as Teacher
          return (
            <div style={{ display: "flex", gap: 2 }}>
              <button
                className="btn-icon"
                title="View"
                onClick={() => setView(t)}
              >
                <Icon.Eye />
              </button>
              {canManage && (
                <button
                  className="btn-icon"
                  title="Assign class / subject"
                  onClick={() => setAssign(t)}
                >
                  <Icon.Class />
                </button>
              )}
              {canManage && (
                <button
                  className="btn-icon"
                  title="Assign timetable"
                  onClick={() =>
                    toast("success", `${t.name}'s timetable editor opened.`)
                  }
                >
                  <Icon.Timetable />
                </button>
              )}
              {canManage && (
                <button
                  className="btn-icon"
                  title="Invite"
                  onClick={() =>
                    toast("success", `Invitation sent to ${t.name}.`)
                  }
                >
                  <Icon.Mail />
                </button>
              )}
              {canManage && t.status !== "Inactive" && (
                <button
                  className="btn-icon"
                  title="Disable"
                  style={{ color: "#dc2626" }}
                  onClick={() => setDisable(t)}
                >
                  <Icon.XCircle />
                </button>
              )}
            </div>
          )
        }}
      />

      <TeacherRegistrationModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
      />

      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title="Teacher Profile"
      >
        {view && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
              {view.name}
            </div>
            {[
              ["Email", view.email],
              ["Phone", view.phone],
              ["Qualification", view.qualification],
              ["Subjects", view.subjects.join(", ")],
              ["Classes", view.classes.join(", ")],
              ["Timetable", `${scheduleOf(view.name)} periods per week`],
              ["Joined", view.joinDate],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span style={{ width: 130, color: "var(--text-muted)" }}>
                  {k}
                </span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        open={!!assign}
        onClose={() => setAssign(null)}
        title={`Assign — ${assign?.name ?? ""}`}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAssign(null)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                toast("success", `Assignments updated for ${assign?.name}.`)
                setAssign(null)
              }}
            >
              Save assignment
            </button>
          </>
        }
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label className="field-label">Classes</label>
            <select className="input-field" multiple style={{ height: 110 }}>
              {CLASSES.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Subjects</label>
            <select className="input-field" multiple style={{ height: 110 }}>
              {SUBJECTS.filter((s) => s.status === "Active").map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Timetable slot</label>
            <select className="input-field">
              <option>Monday 08:00 – 09:00</option>
              <option>Tuesday 09:00 – 10:00</option>
              <option>Wednesday 10:00 – 11:00</option>
            </select>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={!!disable}
        onClose={() => setDisable(null)}
        title="Disable teacher account"
        message={`Disable ${disable?.name}? Their portal access will be revoked and they will be removed from active schedules.`}
        confirmLabel="Disable"
        onConfirm={() => {
          setRows((list) =>
            list.map((x) =>
              x.id === disable?.id ? { ...x, status: "Inactive" } : x,
            ),
          )
          toast("warning", "Teacher account disabled.")
        }}
      />
    </div>
  )
}
