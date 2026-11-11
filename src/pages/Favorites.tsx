import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import CountryCard from '../components/CountryCard'
import EmptyState from '../components/EmptyState'

export default function Favorites() {
  const { favorites } = useFavorites()
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Mis Favoritos</h1>
      <p className="text-xs text-stone-500">{favorites.length} ítems guardados</p>

      {favorites.length === 0 ? (
        <EmptyState message="No tienes favoritos guardados">
          <Link to="/explorar" className="text-sm font-semibold text-emerald-700 hover:underline">
            Explorar y agregar algunos
          </Link>
        </EmptyState>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((c) => (
            <CountryCard key={c.alpha3Code} country={c} />
          ))}
        </div>
      )}
    </section>
  )
}
