import { Icon } from '../../components/Icons'
import StatCard from '../../components/StatCard'
import { SUBSCRIPTION_PLANS, SCHOOLS, PLATFORM_PAYMENTS, planPrice } from '../../data/mockData'

export default function SubscriptionsPage() {
  const active = SCHOOLS.filter(s => s.status === 'Active').length
  const trial = SCHOOLS.filter(s => s.plan === 'Trial').length
  const expiringSoon = SCHOOLS.filter(s => s.status === 'Active' && s.renewalDate <= '2026-09-15').length
  const pastDue = SCHOOLS.filter(s => PLATFORM_PAYMENTS.some(p => p.school === s.name && (p.status === 'Failed' || p.status === 'Pending'))).length
  const mrr = SCHOOLS.filter(s => s.status === 'Active').reduce((sum, s) => sum + planPrice(s.plan), 0)
  const arr = mrr * 12

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Subscriptions</div>
          <div className="page-subtitle">Manage pricing tiers and tenant subscriptions</div>
        </div>
        <button className="btn-primary"><Icon.Plus /> New Plan</button>
      </div>

      <div className="grid-stats" style={{ marginBottom: 24 }}>
        <StatCard label="Active subscriptions" value={active} icon={<Icon.CheckCircle />} iconBg="#dcfce7" iconColor="#15803d" />
        <StatCard label="Trial schools" value={trial} icon={<Icon.Timetable />} iconBg="#fef3c7" iconColor="#b45309" />
        <StatCard label="Expiring soon" value={expiringSoon} icon={<Icon.Clock />} iconBg="#e0f2fe" iconColor="#0369a1" />
        <StatCard label="Past due" value={pastDue} icon={<Icon.AlertTriangle />} iconBg="#fee2e2" iconColor="#dc2626" />
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} icon={<Icon.Dollar />} iconBg="#dbeafe" iconColor="#1d4ed8" trend={{ value: '10.4%', positive: true }} />
        <StatCard label="ARR" value={`$${arr.toLocaleString()}`} icon={<Icon.Payment />} iconBg="#f3e8ff" iconColor="#7c3aed" />
      </div>

      {/* Plan cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>
        {SUBSCRIPTION_PLANS.map((plan, i) => {
          const isPopular = plan.name === 'Premium'
          return (
            <div
              key={plan.id}
              style={{
                background: isPopular ? '#1d4ed8' : 'white',
                border: `1px solid ${isPopular ? '#1d4ed8' : '#e2e8f0'}`,
                borderRadius: 16,
                padding: 24,
                position: 'relative',
                boxShadow: isPopular ? '0 8px 32px rgba(29,78,216,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {isPopular && (
                <div style={{
                  position: 'absolute', top: -12, right: 20,
                  background: '#f59e0b', color: 'white',
                  padding: '3px 12px', borderRadius: 20,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                }}>MOST POPULAR</div>
              )}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 20, fontWeight: 800, color: isPopular ? 'white' : '#0f172a' }}>{plan.name}</div>
                <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif', color: isPopular ? 'white' : '#0f172a', marginTop: 10 }}>
                  ${plan.price}<span style={{ fontSize: 14, fontWeight: 400, opacity: 0.7 }}>/mo</span>
                </div>
                <div style={{ fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.7)' : '#64748b', marginTop: 4 }}>{plan.billing} billing</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: isPopular ? 'rgba(255,255,255,0.75)' : '#64748b' }}>Student limit</span>
                  <span style={{ fontWeight: 600, color: isPopular ? 'white' : '#1e293b' }}>{plan.studentLimit.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: isPopular ? 'rgba(255,255,255,0.75)' : '#64748b' }}>Teacher limit</span>
                  <span style={{ fontWeight: 600, color: isPopular ? 'white' : '#1e293b' }}>{plan.teacherLimit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: isPopular ? 'rgba(255,255,255,0.75)' : '#64748b' }}>Active subscribers</span>
                  <span className={`badge ${isPopular ? '' : 'badge-blue'}`} style={isPopular ? { background: 'rgba(255,255,255,0.15)', color: 'white', padding: '2px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 } : {}}>
                    {plan.subscribers} schools
                  </span>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${isPopular ? 'rgba(255,255,255,0.15)' : '#f1f5f9'}`, paddingTop: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: isPopular ? 'rgba(255,255,255,0.7)' : '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</div>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, fontSize: 13, color: isPopular ? 'rgba(255,255,255,0.9)' : '#475569' }}>
                    <span style={{ color: isPopular ? '#86efac' : '#16a34a', fontWeight: 700 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-secondary"
                  style={isPopular ? { background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' } : {}}
                  onClick={() => {}}
                >
                  <Icon.Edit /> Edit
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Active subscriptions table */}
      <div className="card">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#0f172a' }}>Active Subscriptions</div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>School</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Renewal Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SCHOOLS.map(school => (
                <tr key={school.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{school.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{school.admin}</div>
                  </td>
                  <td>
                    <span className={`badge ${school.plan === 'Premium' ? 'badge-blue' : school.plan === 'Standard' ? 'badge-purple' : school.plan === 'Trial' ? 'badge-amber' : 'badge-gray'}`}>
                      {school.plan}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    ${planPrice(school.plan).toLocaleString()}/mo
                  </td>
                  <td style={{ color: '#64748b' }}>{school.renewalDate}</td>
                  <td><span className={`badge ${school.status === 'Active' ? 'badge-green' : school.status === 'Suspended' ? 'badge-red' : 'badge-amber'}`}>{school.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <button className="btn-icon"><Icon.Eye /></button>
                      <button className="btn-icon"><Icon.Edit /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
