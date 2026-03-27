import { useState, useEffect } from "react";

/**
 * Hook genérico para fetch de datos.
 *
 * SRP: Solo se encarga de traer datos + manejar loading/error.
 *      El componente construye la URL y se encarga del render.
 *
 * Soporta dos modos:
 *   - Paginado: API devuelve { results: [...], info: { pages, count } }
 *   - Single:   API devuelve un objeto directamente (ej: /character/1)
 *
 * @param {string} url - URL completa del endpoint (o null para no fetchear)
 *
 * @returns {{
 *   data: Array | Object,
 *   info: { pages: number, count: number },
 *   loading: boolean,
 *   error: string | null,
 * }}
 */
export function useApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({ count: 0, pages: 0 });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        // Auto-detectamos si es paginado o un item solo
        if (result.results) {
          // Modo paginado: { results: [...], info: {...} }
          setData(result.results);
          setInfo(result.info);
        } else {
          // Modo single: objeto directo (ej: un personaje)
          setData(result);
        }
      } catch (e) {
        if (e.name === "AbortError") return;
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, info, loading, error };
}
