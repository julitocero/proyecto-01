import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Country } from '../types'
import { countryName, fallbackFlag, getCountry } from '../api'
import { useToast } from '../context/ToastContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'

export default function Detail() {
  const { id = '' } = useParams()
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const showToast = useToast()


  useEffect(() => {
    let ignore = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCountry(id)
        if (!ignore) setCountry(data)
      } catch (e) {
        if (!ignore) {
          const msg = e instanceof Error ? e.message : 'No se pudo cargar la información.'
          setError(msg)
          showToast(msg, 'error')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [id, reloadKey, showToast])

  const rows = country && [
    ['Nombre en inglés', country.name],
    ['Capital', country.capital ?? '—'],
    ['Región', country.region],
    ['Subregión', country.subregion ?? '—'],
    ['Población', country.population.toLocaleString('es-CO')],
    ['Área', country.area ? `${country.area.toLocaleString('es-CO')} km²` : '—'],
    ['Idiomas', country.languages?.map((l) => l.name).join(', ') || '—'],
    ['Moneda', country.currencies?.map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`).join(', ') || '—'],
  ]

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/explorar" className="text-sm text-emerald-700 hover:underline">
        ← Volver a explorar
      </Link>

      {loading ? (
        <Loader />
      ) : error || !country ? (
        <ErrorMessage message={error ?? undefined} onRetry={() => setReloadKey((k) => k + 1)} />
      ) : (
        <article className="mt-4 grid overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-stone-200 md:grid-cols-2">
          <img
            src={country.flags.svg}
            onError={(e) => { const fb = fallbackFlag(country); if (e.currentTarget.src !== fb) e.currentTarget.src = fb }}
            alt={`Bandera de ${countryName(country)}`}
            className="h-full w-full bg-stone-100 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-extrabold text-stone-800">{countryName(country)}</h1>
            <dl className="mt-4 space-y-1 text-sm">
              {rows!.map(([label, value]) => (
                <div key={label} className="flex gap-1">
                  <dt className="text-stone-500">{label}:</dt>
                  <dd className="font-medium text-stone-800">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <FavoriteButton country={country} variant="full" />
            </div>
          </div>
        </article>
      )}
    </section>
  )
}
