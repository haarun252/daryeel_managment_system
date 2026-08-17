import { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Icon } from '../../components/Icons'
import { INCOME, EXPENSES, FEES, FINANCE_MONTHLY } from '../../data/mockData'

const INCOME_COLORS = ['#2563eb', '#f59e0b', '#8b5cf6', '#22c55e', '#64748b']
const EXPENSE_COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4', '#3b82f6', '#a855f7', '#ec4899', '#94a3b8']

export default function FinancePage() {
  const [month, setMonth] = useState('2026-08')

  const income = INCOME.reduce((s, r) => s + r.amount, 0)
  const expenses = EXPENSES.reduce((s, r) => s + r.amount, 0)
  const net = income - expenses
  const outstanding = FEES.filter(f => f.status !== 'Paid').reduce((s, f) => s + (f.amount - (f.paid ?? 0)), 0)

  const incomeBySource = Object.entries(INCOME.reduce<Record<string, number>>((acc, r) => { acc[r.category] = (acc[r.category] ?? 0) + r.amount; return acc }, {}))
    .map(([name, value]) => ({ name, value }))

  const expenseByCategory = Object.entries(EXPENSES.reduce<Record<string, number>>((acc, r) => { acc[r.category] = (acc[r.category] ?? 0) + r.amount; return acc }, {}))
    .map(([name, value]) => ({ name, value }))

  const cashFlow = FINANCE_MONTHLY.map(m => ({ ...m, net: m.income - m.expenses }))

  const daily: Record<string, number> = {}
  INCOME.forEach(r => { daily[r.date] = (daily[r.date] ?? 0) + r.amount })
  EXPENSES.forEach(r => { daily[r.date] = (daily[r.date] ?? 0) - r.amount })

  const year = Number(month.slice(0, 4))
  const mon = Number(month.slice(5, 7))
  const daysInMonth = new Date(year, mon, 0).getDate()
  const firstWeekday = new Date(year, mon - 1, 1).getDay()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const dayKey = (d: number) => `${year}-${String(mon).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Finance</div>
          <div className="page-subtitle">School income, expenses and cash position</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="input-field" style={{ width: 150 }} value={month} onChange={e => setMonth(e.target.value)}>
            <option value="2026-08">August 2026</option>
            <option value="2026-07">July 2026</option>
            <option value="2026-06">June 2026</option>
          </select>
          <button className="btn-secondary"><Icon.Download /> Export</button>
        </div>
      </div>

      <div className="grid-stats">
        <div className="stat-card"><div className="muted">Total Income</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#16a34a' }}>${income.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>All recorded income</div></div>
        <div className="stat-card"><div className="muted">Total Expenses</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#dc2626' }}>${expenses.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>All recorded expenses</div></div>
        <div className="stat-card"><div className="muted">Net Balance</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: net >= 0 ? '#16a34a' : '#dc2626' }}>{net >= 0 ? '+' : ''}${net.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Income minus expenses</div></div>
        <div className="stat-card"><div className="muted">Outstanding Fees</div><div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: '#b45309' }}>${outstanding.toLocaleString()}</div><div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Unpaid student fees</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Income vs Expenses</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Monthly comparison</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, '']} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" radius={[3, 3, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#f87171" radius={[3, 3, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Cash Flow</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Net movement per month</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, 'Net']} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Area type="monotone" dataKey="net" stroke="#2563eb" strokeWidth={2} fill="#dbeafe" name="Net" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Expenses by Category</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Where the money goes</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={expenseByCategory} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
                {expenseByCategory.map((_, i) => <Cell key={i} fill={EXPENSE_COLORS[i % EXPENSE_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Income by Source</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Where the money comes from</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={incomeBySource} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
                {incomeBySource.map((_, i) => <Cell key={i} fill={INCOME_COLORS[i % INCOME_COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 15 }}>Daily Movement</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Daily income and expenses for {new Date(year, mon - 1).toLocaleString('en', { month: 'long', year: 'numeric' })}</div>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#22c55e' }} /> Income day</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#ef4444' }} /> Expense day</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <div key={`b${i}`} />
            const key = dayKey(d)
            const bal = daily[key]
            return (
              <div key={key} style={{ minHeight: 52, borderRadius: 10, border: '1px solid var(--border-subtle)', background: 'var(--bg-muted)', padding: 6, fontSize: 11 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{d}</div>
                {bal !== undefined ? (
                  <div style={{ fontWeight: 800, color: bal >= 0 ? '#16a34a' : '#dc2626', marginTop: 4 }}>
                    {bal >= 0 ? '+' : ''}${Math.abs(bal).toLocaleString()}
                  </div>
                ) : <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>—</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}