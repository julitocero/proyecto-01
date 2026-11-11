import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import Globe from './Globe'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto'},
]

export default function Navbar() {
  const { favorites } = useFavorites()
  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold">
          <Globe className="h-7 w-7" />
          <span>Banderas</span>
        </Link>
        <ul className="flex gap-4 text-sm sm:gap-6">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `pb-1 ${isActive ? 'border-b-2 border-emerald-400 font-semibold text-white' : 'text-emerald-100/70 hover:text-white'}`
                }
              >
                {l.label}
                {l.to === '/favoritos' && favorites.length > 0 && (
                  <span className="ml-1 rounded-full bg-amber-400 px-1.5 text-xs font-bold text-emerald-950">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
