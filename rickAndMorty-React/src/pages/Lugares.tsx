import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks/useApi";

interface Lugar {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const Lugares = () => {
  const [page, setPage] = useState(1);
  const apiBase = import.meta.env.VITE_API_URL;
  const { data: lugares, info, loading, error } = useApi(`${apiBase}/location?page=${page}`);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => p + 1);

  return (
    <section className="Location">
      <h2 className="Location-title">Lugares</h2>

      <div className="Pages">
        <button onClick={prev} disabled={page === 1}>Anterior</button>
        {page} / {info.pages || "?"}
        <button onClick={next} disabled={page >= (info.pages || 1)}>siguiente</button>
      </div>

      {error && (
        <div>
          Error al cargar Ubicaciones. <br />
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
              <div className="skeleton skeleton-text-short" />
            </div>
          ))
        ) : (
          lugares.map((item: Lugar) => (
            <div className="Card-location" key={item.id}>
              <h2>{item.name}</h2>
              <img
                src="https://i.ytimg.com/vi/QbNbCmoSW50/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsfojVHQdcJSxAx3Cre7_ZoTY77A"
                width={300}
                alt={item.name}
              />
              <p><strong>{item.type}</strong></p>
              <p><strong>{item.dimension}</strong></p>
              <p><strong>{item.residents.length} habitantes</strong></p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Lugares;
