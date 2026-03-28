import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const Episodios = () => {
  const [page, setPage] = useState(1);
  const apiBase = import.meta.env.VITE_API_URL;
  const { data: episodios, info, loading, error } = useApi(`${apiBase}/episode?page=${page}`);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => p + 1);

  return (
    <section className="Episodios">
      <h2>Episodios</h2>

      <div className="Pages">
        <button onClick={prev} disabled={page === 1}>Anterior</button>
        {page} / {info.pages || "?"}
        <button onClick={next} disabled={page >= (info.pages || 1)}>siguiente</button>
      </div>

      {error && (
        <div>
          Error al cargar Episodios. <br />
          <br /> Error: {error}
        </div>
      )}

      <div className="Card">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-img" style={{ height: 180 }} />
              <div className="skeleton skeleton-text-short" />
              <div className="skeleton skeleton-text-short" />
            </div>
          ))
        ) : (
          episodios.map((item: Episode) => (
            <div  className="Card-episodes" key={item.id}>
              <h2>{item.name}</h2>
              <img
                src="https://i0.wp.com/tomatazos.buscafs.com/2025/05/Rick-y-Morty-T8-Poster-2-1-scaled.jpeg?fit=2046,2560&quality=75&strip=all"
                width={300}
                alt={item.name}
              />
              <p><strong>{item.air_date}</strong></p>
              <p><strong>{item.episode}</strong></p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Episodios;
