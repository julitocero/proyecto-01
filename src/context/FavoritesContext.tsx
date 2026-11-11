import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Country } from '../types'

interface FavoritesValue {
  favorites: Country[]
  isFavorite: (code: string) => boolean
  addFavorite: (c: Country) => void
  removeFavorite: (code: string) => void
}

//El estado vive aquí (encima del router) para que persista al cambiar de ruta.
const FavoritesContext = createContext<FavoritesValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Country[]>([])

  const isFavorite = (code: string) => favorites.some((f) => f.alpha3Code === code)
  const addFavorite = (c: Country) =>
    setFavorites((prev) => (prev.some((f) => f.alpha3Code === c.alpha3Code) ? prev : [...prev, c]))
  const removeFavorite = (code: string) =>
    setFavorites((prev) => prev.filter((f) => f.alpha3Code !== code))

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return ctx
}
