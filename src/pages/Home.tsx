import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-emerald-950 to-teal-900 px-4 text-center text-white">
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        Descubre el <span className="text-emerald-400">Mundo</span>
      </h1>
      <p className="mt-4 max-w-md text-emerald-100/80">
        Explora las banderas y datos de todos los países. Busca, filtra por región y guarda tus favoritos.
      </p>
      <Link
        to="/explorar"
        className="mt-8 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-emerald-950 hover:bg-emerald-400"
      >
        Explorar ahora
      </Link>
    </section>
  )
}
