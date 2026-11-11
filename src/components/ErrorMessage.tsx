interface Props {
  message?: string
  onRetry: () => void
}

export default function ErrorMessage({ message = 'No se pudo cargar la información.', onRetry }: Props) {
  return (
    <div role="alert" className="flex flex-col items-center gap-2 py-20 text-center text-rose-600">
      <p className="text-4xl" aria-hidden="true">⚠️</p>
      <p className="text-sm">{message}</p>
      <p className="text-sm">Verifica tu conexión e intenta de nuevo.</p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-lg bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
      >
        Reintentar
      </button>
    </div>
  )
}
