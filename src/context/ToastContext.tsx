import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { ToastType } from '../types'
import Toast from '../components/Toast'

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => remove(id), 3000)  // auto-dismiss
    },
    [remove],
  )

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed right-4 top-20 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
