import { useEffect, type ReactNode } from "react"
import { Icon } from "./Icons"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  subtitle?: string
}

const SIZE_WIDTHS = { sm: 420, md: 560, lg: 720, xl: 960, full: 1100 }

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  subtitle,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-box"
        style={{ maxWidth: SIZE_WIDTHS[size] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "20px 24px 12px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  marginTop: 4,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <Icon.X />
          </button>
        </div>
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: "14px 24px 20px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export function ConfirmModal({
  open,
  onClose,
  title,
  message,
  confirmLabel = "Delete",
  danger = true,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={danger ? "btn-danger" : "btn-primary"}
            style={
              danger
                ? {
                    background: "#dc2626",
                    color: "white",
                    padding: "9px 16px",
                    borderRadius: 8,
                    fontWeight: 600,
                  }
                : undefined
            }
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: 14,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {message}
      </p>
    </Modal>
  )
}

export function SuccessModal({
  open,
  onClose,
  title,
  message,
}: {
  open: boolean
  onClose: () => void
  title: string
  message: string
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <button className="btn-primary" onClick={onClose}>
          Done
        </button>
      }
    >
      <div style={{ textAlign: "center", padding: "8px 0 12px" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#dcfce7",
            color: "#16a34a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Icon.CheckCircle />
        </div>
        <div
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {message}
        </div>
      </div>
    </Modal>
  )
}
