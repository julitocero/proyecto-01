export default function Loader() {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-20 text-stone-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-emerald-500" />
      <p className="text-sm">Cargando datos...</p>
    </div>
  )
}
