import type { ToastType } from '../types'

const styles: Record<ToastType, string> = {
  success: 'bg-emerald-600',
  error: 'bg-rose-600',
  info: 'bg-indigo-600',
}
const icons: Record<ToastType, string> = { success: '✓', error: '✕', info: 'ℹ' }

interface Props {
  message: string
  type: ToastType
  onClose: () => void
}

export default function Toast({ message, type, onClose }: Props) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`${styles[type]} flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg`}
    >
      <span aria-hidden="true">{icons[type]}</span>
      <span>{message}</span>
      <button onClick={onClose} aria-label="Cerrar notificación" className="ml-2 opacity-70 hover:opacity-100">
        ×
      </button>
    </div>
  )
}
