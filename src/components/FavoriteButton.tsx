import { useState } from 'react'
import type { Country } from '../types'
import { countryName } from '../api'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import ConfirmDialog from './ConfirmDialog'

interface Props {
  country: Country
  /** "icon": estrella sobre la tarjeta · "full": botón con texto (detalle) */
  variant?: 'icon' | 'full'
}

export default function FavoriteButton({ country, variant = 'icon' }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const showToast = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const fav = isFavorite(country.alpha3Code)
  const name = countryName(country)

  const handleClick = () => {
    if(fav) {
      setConfirmOpen(true) // quitar requiere confirmación
    } else {
      addFavorite(country)
      showToast(`${name} agregado a favoritos`, 'success')
    }
  }

  const handleRemove = () => {
    removeFavorite(country.alpha3Code)
    setConfirmOpen(false)
    showToast(`${name} quitado de favoritos`, 'info')
  }

  return (
    <>
      {variant === 'icon' ? (
        <button
          onClick={handleClick}
          aria-label={fav ? `Quitar ${name} de favoritos` : `Agregar ${name} a favoritos`}
          aria-pressed={fav}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lg shadow hover:scale-110"
        >
          <span className={fav ? 'text-amber-400' : 'text-stone-300'}>★</span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          aria-pressed={fav}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <span className={fav ? 'text-amber-300' : ''} aria-hidden="true">★</span>
          {fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      )}

      <ConfirmDialog
        darkPattern
        open={confirmOpen}
        title="¿Quitar de favoritos?"
        cancelLabel={`Conservar ${name} ★`}
        confirmLabel="Sí, no me importa perder este país"
        onConfirm={handleRemove}
        onCancel={() => setConfirmOpen(false)}
      >
        ¿Seguro que quieres quitar <strong>{name}</strong> de tus favoritos?
      </ConfirmDialog>
    </>
  )
}
