import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Personajes from '@/pages/Personajes'
import PersonajeDetail from '@/pages/PersonajeDetail'
const Episodios = React.lazy(() => import('@/pages/Episodios.tsx'))
const EpisodioDetail = React.lazy(() => import('@/pages/EpisodioDetail'))
const Lugares = React.lazy(() => import('@/pages/Lugares'))
const LugarDetail = React.lazy(() => import('@/pages/LugarDetail'))
import '@/css/App.css'

function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <Nav />
      <React.Suspense fallback={<p style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<Navigate to="/personajes" replace />} />
          <Route path="/personajes" element={<Personajes />} />
          <Route path="/personaje/:id" element={<PersonajeDetail />} />
          <Route path="/episodios" element={<Episodios />} />
          <Route path="/episodio/:id" element={<EpisodioDetail />} />
          <Route path="/lugares" element={<Lugares />} />
          <Route path="/lugar/:id" element={<LugarDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404</h2>
      <p>Esta página no existe, parcero. Volvé al multiverso.</p>
    </main>
  )
}

export default App
