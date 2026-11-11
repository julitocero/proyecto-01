// Forma (parcial) de un país en la API https://countries.dev (compatible con REST Countries v2)
export interface Country {
  name: string
  alpha2Code: string
  alpha3Code: string
  flags: { png: string; svg: string }
  region: string
  subregion?: string
  capital?: string
  population: number
  area?: number
  translations?: { es?: string }
  languages?: { name: string }[]
  currencies?: { name: string; symbol?: string }[]
}

export type ToastType = 'success' | 'error'| 'info'
