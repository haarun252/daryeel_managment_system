import { useMemo, useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import DataTable from '../../components/DataTable'
import { useApp } from '../../context/AppContext'
import { ANNOUNCEMENTS, EVENTS } from '../../data/mockData'

export function AnnouncementsPage({ canManage = true }: { canManage?: boolean }) {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(ANNOUNCEMENTS)
  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Announcements</div><div className="page-subtitle">School-wide notices and updates</div></div>
        {canManage && <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Create announcement</button>}
      </div>
      <DataTable
        data={items as unknown as Record<string, unknown>[]}
        searchKeys={['title', 'audience', 'status']}
        exportName="announcements"
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'audience', label: 'Audience' },
          { key: 'date', label: 'Date' },
          { key: 'priority', label: 'Priority', render: r => <span className={`badge ${r.priority === 'Urgent' ? 'badge-red' : r.priority === 'High' ? 'badge-amber' : 'badge-gray'}`}>{String(r.priority)}</span> },
          { key: 'status', label: 'Status', render: r => <span className={`badge ${r.status === 'Published' ? 'badge-green' : r.status === 'Scheduled' ? 'badge-blue' : 'badge-gray'}`}>{String(r.status)}</span> },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Create announcement" footer={<><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Announcement saved.'); setItems(i => [...i, { id: 'ax', title: 'New announcement', description: '', date: '2026-08-16', author: 'Admin', type: 'General', audience: 'All', priority: 'Normal', status: 'Draft', urgent: false }]); setOpen(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input className="input-field" placeholder="Title" />
          <select className="input-field"><option>All</option><option>Teachers</option><option>Parents</option><option>Students</option><option>Specific class</option></select>
          <textarea className="input-field" rows={3} placeholder="Description" />
          <input className="input-field" type="date" />
          <select className="input-field"><option>Normal</option><option>High</option><option>Urgent</option></select>
          <button className="btn-secondary"><Icon.Paperclip /> Attachment</button>
        </div>
      </Modal>
    </div>
  )
}

export function EventsPage() {
  const { toast } = useApp()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(EVENTS[0])
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])
  const eventDays = new Set(EVENTS.map(e => Number(e.date.slice(-2))))

  return (
    <div>
      <div className="page-header">
        <div><div className="page-title">Events</div><div className="page-subtitle">Calendar and upcoming school events</div></div>
        <button className="btn-primary" onClick={() => setOpen(true)}><Icon.Plus /> Add event</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>August 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, fontSize: 12 }}>
            {['S','M','T','W','T','F','S'].map(d => <div key={d} style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 700 }}>{d}</div>)}
            {days.map(d => (
              <button key={d} onClick={() => {
                const ev = EVENTS.find(e => Number(e.date.slice(-2)) === d)
                if (ev) setSelected(ev)
              }} style={{ height: 36, borderRadius: 8, border: '1px solid var(--border)', background: eventDays.has(d) ? 'var(--primary)' : 'var(--surface)', color: eventDays.has(d) ? 'white' : 'var(--text)', cursor: 'pointer' }}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Event details</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{selected.title}</div>
            <div className="muted">{selected.date} · {selected.time}</div>
            <div style={{ marginTop: 6 }}>{selected.location}</div>
            <span className="badge badge-blue" style={{ marginTop: 8 }}>{selected.type}</span>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Upcoming</div>
            {EVENTS.map(e => (
              <button key={e.id} onClick={() => setSelected(e)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{e.title}</div>
                <div className="muted" style={{ fontSize: 12 }}>{e.date} · {e.type}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add event" footer={<><button className="btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn-primary" onClick={() => { toast('success', 'Event added.'); setOpen(false) }}>Save</button></>}>
        <div style={{ display: 'grid', gap: 12 }}>
          <input className="input-field" placeholder="Title" />
          <select className="input-field"><option>Sports Day</option><option>Parent Meeting</option><option>Exam</option><option>Holiday</option><option>School Event</option><option>Staff Meeting</option></select>
          <input className="input-field" type="date" />
          <input className="input-field" placeholder="Location" />
        </div>
      </Modal>
    </div>
  )
}
