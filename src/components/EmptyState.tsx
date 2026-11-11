import type { ReactNode } from 'react'

interface Props {
  icon?: string
  message: string
  children?: ReactNode
}

export default function EmptyState({ icon = '★', message, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center text-stone-500">
      <p className="text-5xl text-stone-300" aria-hidden="true">
        {icon}
      </p>
      <p>{message}</p>
      {children}
    </div>
  )
}
