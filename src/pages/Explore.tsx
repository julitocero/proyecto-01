import { useEffect, useState, type FormEvent } from 'react'
import type { Country } from '../types'
import { countryName, getCountries } from '../api'
import { useToast } from '../context/ToastContext'
import CountryCard from '../components/CountryCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'

const REGIONS = ['Africa','Americas', 'Asia', 'Europe', 'Oceania']

export default function Explore() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const showToast = useToast()

  useEffect(() => {
    let ignore = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCountries()
        if (!ignore) setCountries(data)
      } catch {
        if (!ignore) {
          setError('No se pudo cargar la información.')
          showToast('Error al cargar los países', 'error')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [reloadKey, showToast])

  // Búsqueda + filtro en tiempo real
  const term = search.trim().toLowerCase()
  const filtered = countries.filter(
    (c) =>
      (!region || c.region === region) &&
      (!term || countryName(c).toLowerCase().includes(term) || c.name.toLowerCase().includes(term)),
  )


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    showToast(`${filtered.length} resultado(s) para "${search || 'todos'}"`, 'info')
  }

  return (
    <>
      <section className="bg-gradient-to-b from-emerald-950 to-teal-900 px-4 py-12 text-center text-white">
        <h1 className="text-3xl font-extrabold">
          Explorar <span className="text-emerald-400">Países</span>
        </h1>
        <p className="mt-2 text-sm text-emerald-100/70">Datos obtenidos en tiempo real desde la API</p>
        <form role="search" onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
          <div className="flex flex-1">
            <label htmlFor="search" className="sr-only">
              Buscar país
            </label>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar país..."
              className="w-full rounded-l-lg px-3 py-2 text-stone-800 bg-white outline-none"
            />
            <button type="submit" className="rounded-r-lg bg-emerald-500 px-4 text-sm font-semibold text-emerald-950">
              Buscar
            </button>
          </div>
          <label htmlFor="region" className="sr-only">
            Filtrar por región
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-lg bg-white px-3 py-2 text-sm text-stone-800"
          >
            <option value="">Todas las regiones</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-800">Resultados</h2>
              <p className="text-xs text-stone-500">
                Mostrando {filtered.length} de {countries.length} resultados
              </p>
            </div>
            {filtered.length === 0 ? (
              <EmptyState icon="🔍" message="No se encontraron países con esos criterios." />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => (
                  <CountryCard key={c.alpha3Code} country={c} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}
