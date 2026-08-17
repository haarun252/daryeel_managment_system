import type { ReactNode } from "react"
import { Icon } from "./Icons"

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: {
  icon?: ReactNode
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "56px 20px",
        color: "var(--text-muted)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "var(--primary-soft)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 14px",
        }}
      >
        {icon ?? <Icon.Search />}
      </div>
      <div
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "var(--text)",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 13.5,
          maxWidth: 360,
          margin: "0 auto 16px",
          lineHeight: 1.5,
        }}
      >
        {message}
      </div>
      {actionLabel && onAction && (
        <button className="btn-primary" onClick={onAction}>
          <Icon.Plus /> {actionLabel}
        </button>
      )}
    </div>
  )
}

export function SkeletonCards({ count = 8 }: { count?: number }) {
  return (
    <div className="grid-stats">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="stat-card">
          <div
            className="skeleton"
            style={{ height: 12, width: "50%", marginBottom: 14 }}
          />
          <div
            className="skeleton"
            style={{ height: 28, width: "40%", marginBottom: 10 }}
          />
          <div className="skeleton" style={{ height: 10, width: "70%" }} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            height: 18,
            marginBottom: 12,
            width: `${88 - (i % 3) * 8}%`,
          }}
        />
      ))}
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="card" style={{ padding: 20, height: 260 }}>
      <div
        className="skeleton"
        style={{ height: 14, width: 140, marginBottom: 18 }}
      />
      <div className="skeleton" style={{ height: 180, width: "100%" }} />
    </div>
  )
}
