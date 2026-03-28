import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Personajes from '@/pages/Personajes'
import PersonajeDetail from '@/pages/PersonajeDetail'
const Home = React.lazy(() => import('@/pages/Home'))
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
          <Route path="/" element={<Home />} />
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
    <main style={{ textAlign: 'center', padding: '3rem' }}>
      <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>🛸</div>
      <h2 style={{ fontSize: '3rem', color: 'var(--accent)', fontFamily: 'monospace' }}>404</h2>
      <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>
        ¡Wubba lubba dub dub! Te perdiste en el multiverso.
      </p>
      <a
        href="/personajes"
        style={{
          marginTop: '1.5rem',
          display: 'inline-block',
          padding: '0.8em 1.5em',
          borderRadius: '8px',
          border: '2px solid var(--accent)',
          color: 'var(--accent)',
          fontSize: '1.1rem',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
        }}
      >
        Volver al multiverso
      </a>
    </main>
  )
}

export default App
