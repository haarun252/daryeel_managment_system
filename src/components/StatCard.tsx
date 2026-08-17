import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  iconBg: string
  iconColor: string
  trend?: { value: string; positive: boolean }
  subtitle?: string
}

export default function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  trend,
  subtitle,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          {subtitle && (
            <div
              style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}
            >
              {subtitle}
            </div>
          )}
          {trend && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: trend.positive ? "#16a34a" : "#dc2626",
                }}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                vs last month
              </span>
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: iconBg,
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
