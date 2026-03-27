import { useParams, Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

const PersonajeDetail = () => {
  const { id } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;
  const { data: personaje, loading, error } = useApi(`${apiBase}/character/${id}`);

  if (loading) {
    return <main className="Detail"><p>Cargando personaje...</p></main>;
  }

  if (error) {
    return (
      <main className="Detail">
        <p style={{ color: "red" }}>Error: {error}</p>
        <Link to="/personajes">Volver a personajes</Link>
      </main>
    );
  }

  // Si data viene vacío todavía (primer render)
  if (!personaje || !personaje.name) return null;

  const statusColor = {
    Alive: "#97ce4c",
    Dead: "#ff5c5c",
    unknown: "#ffa500",
  };

  return (
    <main className="Detail">
      <Link to="/personajes" className="Detail-back">← Volver a personajes</Link>

      <div className="Detail-card">
        <img src={personaje.image} alt={personaje.name} className="Detail-img" />

        <div className="Detail-info">
          <h1>{personaje.name}</h1>

          <div className="Detail-badges">
            <span
              className="Detail-badge"
              style={{ backgroundColor: statusColor[personaje.status] || "#888" }}
            >
              {personaje.status}
            </span>
            <span className="Detail-badge">{personaje.species}</span>
            <span className="Detail-badge">{personaje.gender}</span>
          </div>

          <div className="Detail-section">
            <h3>Origen</h3>
            <p>{personaje.origin?.name || "Desconocido"}</p>
          </div>

          <div className="Detail-section">
            <h3>Ubicación actual</h3>
            <p>{personaje.location?.name || "Desconocido"}</p>
          </div>

          {personaje.type && (
            <div className="Detail-section">
              <h3>Tipo</h3>
              <p>{personaje.type}</p>
            </div>
          )}

          <div className="Detail-section">
            <h3>Episodios</h3>
            <p>{personaje.episode?.length || 0} apariciones</p>
          </div>

          <div className="Detail-section">
            <h3>Creado</h3>
            <p>{new Date(personaje.created).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PersonajeDetail;
