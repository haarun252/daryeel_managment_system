import { Icon } from './Icons'
import type { ToastItem } from '../context/AppContext'
import { useApp } from '../context/AppContext'

const KIND = {
  success: { bg: '#dcfce7', color: '#15803d', Icon: Icon.CheckCircle },
  warning: { bg: '#fef3c7', color: '#b45309', Icon: Icon.AlertTriangle },
  error: { bg: '#fee2e2', color: '#dc2626', Icon: Icon.XCircle },
  info: { bg: '#dbeafe', color: '#1d4ed8', Icon: Icon.Info },
}

export default function ToastStack() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="toast-stack">
      {toasts.map(t => <ToastCard key={t.id} item={t} onClose={() => dismissToast(t.id)} />)}
    </div>
  )
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const meta = KIND[item.kind]
  const IC = meta.Icon
  return (
    <div className="toast">
      <div style={{ width: 32, height: 32, borderRadius: 8, background: meta.bg, color: meta.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <IC />
      </div>
      <div style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: 'var(--text)', lineHeight: 1.45, paddingTop: 4 }}>{item.message}</div>
      <button className="btn-icon" onClick={onClose}><Icon.X /></button>
    </div>
  )
}
