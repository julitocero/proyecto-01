import { Link } from 'react-router-dom'
import type { Country } from '../types'
import { countryName, fallbackFlag } from '../api'
import FavoriteButton from './FavoriteButton'

export default function CountryCard({ country }: { country: Country }) {
  const name =countryName(country)
  return (
    <article className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton country={country} />
      </div>
      <Link to={`/explorar/${country.alpha3Code}`} className="block">
        <img
          src={country.flags.png}
          onError={(e) => { const fb = fallbackFlag(country); if (e.currentTarget.src !== fb) e.currentTarget.src = fb }}
          alt={`Bandera de ${name}`}
          loading="lazy"
          className="h-40 w-full bg-stone-100 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-stone-800">{name}</h3>
          <p className="mt-1 text-xs text-stone-500">
            Capital: <span className="font-medium text-stone-700">{country.capital ?? '—'}</span>
          </p>
          <p className="text-xs text-stone-500">
            Población: <span className="font-medium text-stone-700">{country.population.toLocaleString('es-CO')}</span>
          </p>
          <span className="mt-3 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800">
            {country.region}
          </span>
        </div>
      </Link>
    </article>
  )
}
