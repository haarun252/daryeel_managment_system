import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { BUSES, BUS_DRIVERS, BUS_ROUTES, BUS_ASSIGNMENTS, STUDENTS, initials } from '../../data/mockData'
import type { Bus } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

const TABS = ['Buses', 'Drivers', 'Routes', 'Assignments'] as const

export default function TransportPage() {
  const { toast } = useApp()
  const [tab, setTab] = useState<(typeof TABS)[number]>('Buses')
  const [viewBus, setViewBus] = useState<Bus | null>(null)
  const [addBus, setAddBus] = useState(false)
  const [rows, setRows] = useState(BUSES)

  const totalStudents = STUDENTS.length
  const assignedCount = BUS_ASSIGNMENTS.length
  const unassigned = Math.max(0, totalStudents - assignedCount)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Transport</div>
          <div className="page-subtitle">School buses, drivers, routes and student assignments</div>
        </div>
        {tab === 'Buses' && <button className="btn-primary" onClick={() => setAddBus(true)}><Icon.Plus /> Add Bus</button>}
        {tab === 'Drivers' && <button className="btn-primary" onClick={() => toast('success', 'Driver invite sent.')}><Icon.Plus /> Add Driver</button>}
        {tab === 'Assignments' && <button className="btn-primary" onClick={() => toast('info', 'Assignment editor opened.')}><Icon.Plus /> Assign Student</button>}
      </div>

      <div className="grid-stats">
        <div className="stat-card"><div className="muted">Total Buses</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>{BUSES.length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Fleet capacity {BUSES.reduce((s, b) => s + b.capacity, 0)} seats</div></div>
        <div className="stat-card"><div className="muted">Active Buses</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#16a34a' }}>{BUSES.filter(b => b.status === 'Active').length}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{BUSES.filter(b => b.status === 'Maintenance').length} in maintenance</div></div>
        <div className="stat-card"><div className="muted">Assigned Students</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800 }}>{assignedCount}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Riding school buses</div></div>
        <div className="stat-card"><div className="muted">Unassigned Students</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: unassigned > 0 ? '#b45309' : '#16a34a' }}>{unassigned}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Need a bus assignment</div></div>
      </div>

      <div className="tab-bar">
        {TABS.map(t => <div key={t} className={`tab-item${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</div>)}
      </div>

      {tab === 'Buses' && (
        <DataTable
          data={rows as unknown as Record<string, unknown>[]}
          searchKeys={['number', 'plate', 'driver', 'route']}
          exportName="buses"
          emptyTitle="No buses found."
          emptyMessage="Add a bus to the school fleet to start assigning routes."
          emptyAction="+ Add Bus"
          onEmptyAction={() => setAddBus(true)}
          columns={[
            { key: 'number', label: 'Bus', render: r => (
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Bus /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>{String(r.number)}</div>
                  <div className="muted" style={{ fontSize: 11 }}>Plate {String(r.plate)}</div>
                </div>
              </div>
            ) },
            { key: 'driver', label: 'Driver' },
            { key: 'route', label: 'Route' },
            { key: 'capacity', label: 'Capacity', render: r => `${r.assigned}/${r.capacity}` },
            { key: 'capacity', label: 'Occupancy', render: r => {
              const pct = Math.round((Number(r.assigned) / Number(r.capacity)) * 100)
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 5, background: 'var(--border-subtle)', borderRadius: 10, overflow: 'hidden', minWidth: 60 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 90 ? '#f87171' : pct >= 75 ? '#f59e0b' : '#22c55e' }} />
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pct}%</span>
                </div>
              )
            } },
            { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : r.status === 'Maintenance' ? 'badge-amber' : 'badge-gray'}`}>{String(r.status)}</span> },
          ]}
          actions={r => {
            const b = r as unknown as Bus
            return (
              <div style={{ display: 'flex', gap: 2 }}>
                <button className="btn-icon" title="View bus" onClick={() => setViewBus(b)}><Icon.Eye /></button>
                <button className="btn-icon" title="Edit" onClick={() => toast('info', 'Edit bus opened.')}><Icon.Edit /></button>
              </div>
            )
          }}
        />
      )}

      {tab === 'Drivers' && (
        <DataTable
          data={BUS_DRIVERS as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'license']}
          exportName="drivers"
          columns={[
            { key: 'name', label: 'Driver', render: r => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><div className="avatar">{initials(String(r.name))}</div><div><div style={{ fontWeight: 600 }}>{String(r.name)}</div><div className="muted" style={{ fontSize: 11 }}>{String(r.phone)}</div></div></div> },
            { key: 'license', label: 'License' },
            { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{String(r.status)}</span> },
          ]}
          actions={() => (
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="btn-icon" onClick={() => toast('info', 'Driver profile opened.')}><Icon.Eye /></button>
              <button className="btn-icon" onClick={() => toast('success', 'Driver credentials sent.')}><Icon.Mail /></button>
            </div>
          )}
        />
      )}

      {tab === 'Routes' && (
        <DataTable
          data={BUS_ROUTES.map(r => ({ ...r, stops: r.stops.join(' → ') })) as unknown as Record<string, unknown>[]}
          searchKeys={['name', 'stops']}
          exportName="routes"
          columns={[
            { key: 'name', label: 'Route', render: r => <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: '#0369a1' }}><Icon.Route /></span><span style={{ fontWeight: 600 }}>{String(r.name)}</span></div> },
            { key: 'stops', label: 'Stops' },
            { key: 'distance', label: 'Distance' },
          ]}
          actions={() => <button className="btn-icon" onClick={() => toast('info', 'Route editor opened.')}><Icon.Edit /></button>}
        />
      )}

      {tab === 'Assignments' && (
        <DataTable
          data={BUS_ASSIGNMENTS as unknown as Record<string, unknown>[]}
          searchKeys={['studentName', 'bus', 'route', 'stop']}
          exportName="assignments"
          emptyTitle="No assignments yet."
          emptyMessage="Assign students to buses to manage transport."
          columns={[
            { key: 'studentName', label: 'Student', render: r => <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><div className="avatar">{initials(String(r.studentName))}</div><div><div style={{ fontWeight: 600 }}>{String(r.studentName)}</div><div className="muted" style={{ fontSize: 11 }}>{String(r.className)}</div></div></div> },
            { key: 'bus', label: 'Bus', render: r => <span className="badge badge-blue">{String(r.bus)}</span> },
            { key: 'route', label: 'Route' },
            { key: 'stop', label: 'Pickup stop' },
          ]}
          actions={r => (
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="btn-icon" onClick={() => toast('info', 'Assignment editor opened.')}><Icon.Edit /></button>
              <button className="btn-icon" style={{ color: '#dc2626' }} onClick={() => toast('warning', 'Assignment removed. Student is now unassigned.')}><Icon.Trash /></button>
            </div>
          )}
        />
      )}

      <Modal open={!!viewBus} onClose={() => setViewBus(null)} title={`Bus ${viewBus?.number ?? ''}`} size="lg">
        {viewBus && (
          <div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: 'var(--bg-muted)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Bus /></div>
              <div>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 18 }}>{viewBus.number}</div>
                <div className="muted">Plate {viewBus.plate} · {viewBus.status}</div>
              </div>
              <span className={`badge ${viewBus.status === 'Active' ? 'badge-green' : viewBus.status === 'Maintenance' ? 'badge-amber' : 'badge-gray'}`} style={{ marginLeft: 'auto' }}>{viewBus.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Driver', viewBus.driver], ['Route', viewBus.route], ['Capacity', `${viewBus.capacity} seats`], ['Assigned', `${viewBus.assigned} students`], ['Occupancy', `${Math.round((viewBus.assigned / viewBus.capacity) * 100)}%`]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                  <div className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
                  <div style={{ fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>Assigned students</div>
              {BUS_ASSIGNMENTS.filter(a => a.bus === viewBus.number).length === 0 && <div className="muted" style={{ fontSize: 13 }}>No students assigned to this bus.</div>}
              {BUS_ASSIGNMENTS.filter(a => a.bus === viewBus.number).map(a => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{a.studentName}</span>
                  <span className="muted">{a.className} · {a.stop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={addBus} onClose={() => setAddBus(false)} title="Add Bus" footer={<><button className="btn-secondary" onClick={() => setAddBus(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Bus added to fleet.'); setAddBus(false) }}>Save Bus</button></>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><label className="field-label">Bus number</label><input className="input-field" placeholder="BUS-05" /></div>
          <div><label className="field-label">Plate</label><input className="input-field" placeholder="GV-0000E" /></div>
          <div><label className="field-label">Driver</label><select className="input-field">{BUS_DRIVERS.map(d => <option key={d.id}>{d.name}</option>)}</select></div>
          <div><label className="field-label">Capacity</label><input className="input-field" type="number" defaultValue={54} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label className="field-label">Route</label><select className="input-field">{BUS_ROUTES.map(r => <option key={r.id}>{r.name}</option>)}</select></div>
        </div>
      </Modal>
    </div>
  )
}