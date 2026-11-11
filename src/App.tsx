import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'

import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <FavoritesProvider>
          <Navbar />
          <main className="min-h-screen bg-stone-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explorar" element={<Explore />} />
              <Route path="/explorar/:id" element={<Detail />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
