import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CardPj from "@/components/CardPj";

const EpisodioDetail = () => {
  const { id } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;
  const [episodio, setEpisodio] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // 1. Traer el episodio
        const res = await fetch(`${apiBase}/episode/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const ep = await res.json();
        setEpisodio(ep);

        // 2. Traer los personajes del episodio (batch request)
        if (ep.characters.length > 0) {
          const ids = ep.characters.map((url) => url.split("/").pop()).join(",");
          const charRes = await fetch(`${apiBase}/character/${ids}`, { signal: controller.signal });
          if (!charRes.ok) throw new Error(`Error ${charRes.status}`);
          const chars = await charRes.json();
          setCharacters(Array.isArray(chars) ? chars : [chars]);
        }
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id, apiBase]);

  if (loading) {
    return (
      <main className="Detail">
        <div className="skeleton-detail">
          <div className="skeleton-detail-info">
            <div className="skeleton skeleton-text" style={{ width: "60%", height: "2rem" }} />
            <div className="skeleton skeleton-text-short" />
            <div className="skeleton skeleton-text-short" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="Detail">
        <p style={{ color: "red" }}>Error: {error}</p>
        <Link to="/episodios">Volver a episodios</Link>
      </main>
    );
  }

  if (!episodio) return null;

  return (
    <main className="Detail">
      <Link to="/episodios" className="Detail-back">← Volver a episodios</Link>

      <div className="Detail-card">
        <div className="Detail-info">
          <h1>{episodio.name}</h1>

          <div className="Detail-badges">
            <span className="Detail-badge">{episodio.episode}</span>
            <span className="Detail-badge">{episodio.air_date}</span>
          </div>

          <div className="Detail-section">
            <h3>Personajes ({characters.length})</h3>
            <div className="Card" style={{ marginTop: "1rem" }}>
              {characters.map((c) => (
                <CardPj key={c.id} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EpisodioDetail;
