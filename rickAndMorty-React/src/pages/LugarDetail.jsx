import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CardPj from "@/components/CardPj";

const LugarDetail = () => {
  const { id } = useParams();
  const apiBase = import.meta.env.VITE_API_URL;
  const [lugar, setLugar] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // 1. Traer el lugar
        const res = await fetch(`${apiBase}/location/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const loc = await res.json();
        setLugar(loc);

        // 2. Traer los residentes (batch request)
        if (loc.residents.length > 0) {
          const ids = loc.residents.map((url) => url.split("/").pop()).join(",");
          const resRes = await fetch(`${apiBase}/character/${ids}`, { signal: controller.signal });
          if (!resRes.ok) throw new Error(`Error ${resRes.status}`);
          const chars = await resRes.json();
          setResidents(Array.isArray(chars) ? chars : [chars]);
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
        <Link to="/lugares">Volver a lugares</Link>
      </main>
    );
  }

  if (!lugar) return null;

  return (
    <main className="Detail">
      <Link to="/lugares" className="Detail-back">← Volver a lugares</Link>

      <div className="Detail-card">
        <div className="Detail-info">
          <h1>{lugar.name}</h1>

          <div className="Detail-badges">
            <span className="Detail-badge">{lugar.type}</span>
            <span className="Detail-badge">{lugar.dimension}</span>
          </div>

          <div className="Detail-section">
            <h3>Residentes ({residents.length})</h3>
            <div className="Card" style={{ marginTop: "1rem" }}>
              {residents.map((r) => (
                <CardPj key={r.id} {...r} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LugarDetail;
