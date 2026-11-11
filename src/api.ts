import type { Country } from './types'

// REST Countries (restcountries.com) ya exige API key; countries.dev expone los mismos datos sin key.
const BASE_URL = 'https://countries.dev'


// Fetch 1: lista de países
export async function getCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE_URL}/countries`)
  if(!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

// Fetch 2: detalle por código (ID) alpha3, ej. COL
export async function getCountry(code: string): Promise<Country> {
  const res = await fetch(`${BASE_URL}/alpha/${encodeURIComponent(code)}`)
  if (!res.ok) throw new Error(res.status === 404 ? 'País no encontrado' : `Error ${res.status}`)
  return res.json()
}

export const countryName = (c: Country) => c.translations?.es ?? c.name

// Algunas banderas de la API apuntan a Wikimedia y fallan; flagcdn sirve de respaldo.
export const fallbackFlag = (c: Country) => `https://flagcdn.com/w320/${c.alpha2Code.toLowerCase()}.png`
