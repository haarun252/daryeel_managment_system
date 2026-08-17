import { useState } from 'react'
import { Icon } from '../../components/Icons'
import Modal from '../../components/Modal'
import { SCHOOLS } from '../../data/mockData'
import type { School } from '../../data/mockData'
import { useApp } from '../../context/AppContext'

export default function SchoolsPage() {
  const { toast } = useApp()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [planFilter, setPlanFilter] = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [viewSchool, setViewSchool] = useState<School | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<School | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filtered = SCHOOLS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.admin.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || s.status === statusFilter
    const matchPlan = planFilter === 'All' || s.plan === planFilter
    return matchSearch && matchStatus && matchPlan
  })
  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Schools & Tenants</div>
          <div className="page-subtitle">{SCHOOLS.length} schools registered on Xanaano</div>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}>
          <Icon.Plus /> Add School
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 220 }}>
          <span className="search-icon"><Icon.Search /></span>
          <input
            className="input-field"
            style={{ paddingLeft: 36 }}
            placeholder="Search schools or admins..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select className="input-field" style={{ width: 140 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select className="input-field" style={{ width: 140 }} value={planFilter} onChange={e => { setPlanFilter(e.target.value); setPage(1) }}>
          <option value="All">All Plans</option>
          <option value="Basic">Basic</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>
        <button className="btn-secondary" onClick={() => toast('success', 'Excel file generated successfully.')}><Icon.Download /> Export</button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Admin</th>
                <th>Students</th>
                <th>Teachers</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(school => (
                <tr key={school.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ width: 36, height: 36, fontSize: 13 }}>
                        {school.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 14 }}>{school.name}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{school.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#475569', fontSize: 13 }}>{school.admin}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: '#0369a1' }}>{school.students.toLocaleString()}</span>
                  </td>
                  <td style={{ color: '#475569' }}>{school.teachers}</td>
                  <td>
                    <span className={`badge ${school.plan === 'Premium' ? 'badge-blue' : school.plan === 'Standard' ? 'badge-purple' : 'badge-gray'}`}>
                      {school.plan}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${school.status === 'Active' ? 'badge-green' : school.status === 'Inactive' ? 'badge-amber' : 'badge-red'}`}>
                      {school.status}
                    </span>
                  </td>
                  <td style={{ color: '#64748b', fontSize: 13 }}>{school.createdDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <button className="btn-icon" title="View" onClick={() => setViewSchool(school)}><Icon.Eye /></button>
                      <button className="btn-icon" title="Edit"><Icon.Edit /></button>
                      <button className="btn-icon" title="Delete" style={{ color: '#dc2626' }} onClick={() => setDeleteConfirm(school)}><Icon.Trash /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px 16px', color: '#94a3b8' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🏫</div>
                    <div style={{ fontWeight: 500 }}>No schools found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>
              {filtered.length} schools found
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-icon" disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ opacity: page === 1 ? 0.4 : 1 }}><Icon.ChevronLeft /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)} style={{ width: 32, height: 32, borderRadius: 7, background: p === page ? '#2563eb' : 'transparent', color: p === page ? 'white' : '#475569', border: p === page ? 'none' : '1px solid #e2e8f0', fontSize: 13, cursor: 'pointer' }}>{p}</button>
              ))}
              <button className="btn-icon" disabled={page === totalPages} onClick={() => setPage(p => p + 1)} style={{ opacity: page === totalPages ? 0.4 : 1 }}><Icon.ChevronRight /></button>
            </div>
          </div>
        )}
      </div>

      {/* View School Modal */}
      <Modal open={!!viewSchool} onClose={() => setViewSchool(null)} title="School Details">
        {viewSchool && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '16px', background: '#f8fafc', borderRadius: 10 }}>
              <div className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>
                {viewSchool.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0f172a' }}>{viewSchool.name}</div>
                <span className={`badge ${viewSchool.status === 'Active' ? 'badge-green' : 'badge-amber'}`} style={{ marginTop: 4 }}>{viewSchool.status}</span>
              </div>
            </div>
            {[
              { label: 'Admin', value: viewSchool.admin },
              { label: 'Email', value: viewSchool.email },
              { label: 'Phone', value: viewSchool.phone },
              { label: 'Address', value: viewSchool.address },
              { label: 'Plan', value: viewSchool.plan },
              { label: 'Students', value: viewSchool.students.toLocaleString() },
              { label: 'Teachers', value: viewSchool.teachers.toString() },
              { label: 'Created', value: viewSchool.createdDate },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: 14 }}>
                <span style={{ width: 90, color: '#64748b', fontWeight: 500, flexShrink: 0 }}>{item.label}</span>
                <span style={{ color: '#1e293b' }}>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Action" size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="btn-danger" style={{ background: '#dc2626', color: 'white', padding: '9px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={() => { toast('success', 'School archived.'); setDeleteConfirm(null) }}>
              Delete School
            </button>
          </>
        }
      >
        <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>
          Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This will permanently remove all associated data. This action cannot be undone.
        </p>
      </Modal>

      {/* Add School Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New School" size="lg"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => { toast('success', 'School created successfully.'); setAddOpen(false) }}>Create School</button>
          </>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { label: 'School Name', placeholder: 'e.g. Green Valley Academy', full: true },
            { label: 'Admin Name', placeholder: 'Full name' },
            { label: 'Email', placeholder: 'admin@school.edu' },
            { label: 'Phone', placeholder: '+1 (555) 000-0000' },
            { label: 'Address', placeholder: 'Street address', full: true },
          ].map(f => (
            <div key={f.label} style={{ gridColumn: f.full ? '1 / -1' : undefined }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{f.label}</label>
              <input className="input-field" placeholder={f.placeholder} />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Subscription Plan</label>
            <select className="input-field">
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Status</label>
            <select className="input-field">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  )
}
