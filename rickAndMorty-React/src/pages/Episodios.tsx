interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface ApiInfo {
  count: number;
  pages: number;
}

interface ApiResponse {
  results: Episode[];
  info: ApiInfo;
}

interface ErrorType {
  message: string;
}

import { useState, useEffect } from "react";

const Episodios = () => {
  const [episodios, setEpisodios] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);
  const [page, setPage] = useState<number>(1);
  const [info, setInfo] = useState<ApiInfo>({ count: 0, pages: 0 });

  useEffect(() => {
    const controller = new AbortController();

    const traerEpisodios = async (): Promise<void> => {
      setLoading(true);
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const url = `${apiBase}/episode?page=${page}`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`error ${response.status} - ${response.statusText}`);
        }

        const data = (await response.json()) as ApiResponse;
        setEpisodios(data.results);
        setInfo(data.info);
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return;
        setError(e instanceof Error ? { message: e.message } : { message: "Error desconocido" });
      } finally {
        setLoading(false);
      }
    };

    traerEpisodios();
    return () => controller.abort();
  }, [page]);

  function EpisodiosList() {
    return (
      <div className="Card">
        {episodios.map((item: Episode) => (
          <article className="Card-episodes" key={item.id}>
            <h2>{item.name}</h2>
            <img
              src="https://i0.wp.com/tomatazos.buscafs.com/2025/05/Rick-y-Morty-T8-Poster-2-1-scaled.jpeg?fit=2046,2560&quality=75&strip=all"
              width={300}
              alt={item.name}
            />
            <p><strong>{item.air_date}</strong></p>
            <p><strong>{item.episode}</strong></p>
          </article>
        ))}
      </div>
    );
  }

  const prev = (): void => setPage(p => Math.max(1, p - 1));
  const next = (): void => setPage(p => p + 1);

  return (
    <section className="Episodios">
      <h2>Episodios</h2>
      <div className="Pages">
        <button onClick={prev} disabled={page === 1}>
          Anterior
        </button>
        {page} / {info.pages || "?"}
        <button onClick={next} disabled={page >= (info.pages || 1)}>
          siguiente
        </button>
      </div>
      {error && (
        <div>
          Error al cargar Episodios. <br />
          <br /> Error: {error.message}
        </div>
      )}

      {loading ? <div>Cargando Episodios...</div> : <EpisodiosList />}
    </section>
  );
};

export default Episodios;
