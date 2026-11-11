import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  /** Activa el modal con dark pattern (ver comentario abajo). */
  darkPattern?: boolean
}

export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  darkPattern = false,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // <dialog> nativo controlado con useRef + showModal()/close()
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel} // tecla Esc
      aria-labelledby="dialog-title"
      className="m-auto w-[90%] max-w-sm rounded-xl p-6 text-center shadow-2xl backdrop:bg-black/60"
    >
      <p className="text-4xl" aria-hidden="true">⚠️</p>
      <h2 id="dialog-title" className="mt-2 text-lg font-bold text-stone-800">
        {title}
      </h2>
      <div className="mt-2 text-sm text-stone-500">{children}</div>

      {darkPattern ? (
        /*
         * ⚠️ DARK PATTERN INTENCIONAL (con fines académicos):
         * 1) Jerarquía visual invertida: la acción que el usuario PIDIÓ (quitar) se muestra
         *    como un enlace pequeño, gris y de bajo contraste, mientras que la opción que le
         *    conviene a la app (no quitar) es un botón grande, colorido y con foco.
         * 2) "Confirmshaming": el texto de la acción hace sentir culpable al usuario
         *    ("Sí, no me importa...") para disuadirlo.
         * Ambas técnicas manipulan la decisión en lugar de informarla.
         */
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            autoFocus
            onClick={onCancel}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="text-xs text-stone-300 hover:underline">
            {confirmLabel}
          </button>
        </div>
      ) : (
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg bg-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {confirmLabel}
          </button>
        </div>
      )}
    </dialog>
  )
}
