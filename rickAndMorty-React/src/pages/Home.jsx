import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="Home">
      <div className="Home-hero">
        <h1 className="Home-title">Rick & Morty</h1>
        <p className="Home-subtitle">Explora el multiverso</p>
      </div>

      <div className="Home-cards">
        <Link to="/personajes" className="Home-card">
          <span className="Home-card-icon">🧑‍🔬</span>
          <h2>Personajes</h2>
          <p>Descubre los seres del multiverso</p>
        </Link>
        <Link to="/lugares" className="Home-card">
          <span className="Home-card-icon">🌍</span>
          <h2>Lugares</h2>
          <p>Explora las dimensiones</p>
        </Link>
        <Link to="/episodios" className="Home-card">
          <span className="Home-card-icon">📺</span>
          <h2>Episodios</h2>
          <p>Revive cada aventura</p>
        </Link>
      </div>
    </main>
  )
}

export default Home
