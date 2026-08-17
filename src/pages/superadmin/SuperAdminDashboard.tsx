import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Icon } from '../../components/Icons'
import { SCHOOLS, REVENUE_DATA, SCHOOL_GROWTH_DATA, SUBSCRIPTION_PLANS } from '../../data/mockData'

interface Props {
  onNavigate: (page: string) => void
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, prefix = '' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(25, 30, 40, 0.9)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '10px 14px',
        borderRadius: 12,
        color: 'white',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>
          {prefix}{Number(payload[0].value).toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

export default function SuperAdminDashboard({ onNavigate }: Props) {
  const planData = SUBSCRIPTION_PLANS.map(p => ({ name: p.name, value: p.subscribers }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingRight: 10 }}>
      {/* Header section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
          Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Mock date selector like reference */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
            background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
            borderRadius: 14, fontSize: 13, color: '#475569', fontWeight: 500,
            border: '1px solid rgba(255,255,255,0.8)', cursor: 'pointer'
          }}>
            Last 30 days: 15 Nov – 14 Dec <Icon.ChevronDown />
          </div>
        </div>
      </div>

      {/* Main Grid - matching reference layout roughly: Top row with huge chart + side panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        
        {/* Left Column: Huge Revenue Chart */}
        <div className="card" style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Revenue</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4, background: '#dcfce7', padding: '2px 8px', borderRadius: 20 }}>
                  <Icon.TrendUp /> 2.67%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} /> Last 30 days
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbd5e1' }} /> Last year
                </div>
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              Full Report <Icon.ChevronRight />
            </button>
          </div>

          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.6)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="revenue" data={REVENUE_DATA.map(d => ({...d, revenue: d.revenue * 0.8}))} stroke="#cbd5e1" strokeWidth={2} fill="none" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Stacked cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Conversion/Abandonment Card (Adapted to platform metrics) */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Platform Health</span>
              <Icon.Info />
            </div>
            
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>
              <span style={{ color: '#ec4899', fontWeight: 600 }}>-3.05%</span> compare to the same period last year
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
                  <Icon.School />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>61.4%</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Active Schools<br/><span style={{ color: '#0f172a', fontWeight: 500 }}>{SCHOOLS.length} Total</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                  <Icon.Subscription />
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>88.2%</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Premium Conversion<br/><span style={{ color: '#0f172a', fontWeight: 500 }}>{planData.reduce((a,b) => a+b.value, 0)} Subs</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Sales/Revenue Card */}
          <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>Total Platform Revenue</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-1px' }}>$149,757</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Icon.TrendUp /> 4.97%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Bar chart - Schools Growth */}
        <div className="card" style={{ padding: '24px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>School Onboarding</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon.TrendUp /> 5.52%
              </span>
            </div>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              Full Report <Icon.ChevronRight />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 24, marginBottom: 24, fontSize: 13, color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#3b82f6' }} /> Basic
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#ec4899' }} /> Premium
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#10b981' }} /> Enterprise
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SCHOOL_GROWTH_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(226,232,240,0.6)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} content={<CustomTooltip />} />
              <Bar dataKey="schools" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Breakdown - matching the right side bars from reference */}
        <div className="card" style={{ padding: '24px 30px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Subscription Breakdown</span>
            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              Full Report <Icon.ChevronRight />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 200 }}>
            {/* Custom vertical bar visual to match reference style */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '100%', paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
              {planData.map((p, i) => {
                const colors = ['#3b82f6', '#ec4899', '#10b981'];
                const heights = ['80%', '60%', '30%']; // mock heights
                return (
                  <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 12, height: heights[i], background: colors[i], borderRadius: 6 }} />
                  </div>
                )
              })}
            </div>
            
            {/* Right side legend/stats */}
            <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {planData.map((p, i) => {
                const colors = ['#3b82f6', '#ec4899', '#10b981'];
                return (
                  <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors[i] }} />
                      <span style={{ color: '#64748b' }}>{p.name}</span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
