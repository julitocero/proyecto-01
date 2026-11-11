import { Link } from 'react-router-dom'
import Globe from '../components/Globe'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="flex items-center text-8xl font-extrabold text-emerald-600 sm:text-9xl">
        <span>4</span>
        {/*el "0" es un globo terraqueo girando */}
        <Globe className="mx-1 h-[0.8em] w-[0.8em] animate-[spin_12s_linear_infinite]" />
        <span>4</span>
        <span className="sr-only">Error 404</span>
      </h1>
      <h2 className="mt-4 text-xl font-semibold text-stone-800">Página no encontrada</h2>
      <p className="mt-1 text-sm text-stone-500">La ruta que buscas no existe en esta aplicación.</p>
      <Link to="/" className="mt-6 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">
        Volver al inicio
      </Link>
    </section>
  )
}
