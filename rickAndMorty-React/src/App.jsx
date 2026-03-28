import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Personajes from '@/pages/Personajes'
import PersonajeDetail from '@/pages/PersonajeDetail'
import Episodios from '@/pages/Episodios.tsx'
import Lugares from '@/pages/Lugares'
import '@/css/App.css'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/personajes" replace />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personaje/:id" element={<PersonajeDetail />} />
        <Route path="/episodios" element={<Episodios />} />
        <Route path="/lugares" element={<Lugares />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
