/**
 * Service layer para la API de Rick and Morty.
 *
 * SRP: Solo se encarga de comunicarse con la API externa.
 *      Los controllers manejan HTTP (req/res), este service maneja los datos.
 *
 * DIP: Los controllers dependen de esta abstracción, no de fetch directamente.
 *      Si mañana cambiamos fetch por axios, solo cambiamos este archivo.
 */

const BASE_URL = process.env.API_BASE_URL;

/**
 * Trae datos de la API de Rick and Morty.
 *
 * @param {string} endpoint - Path del endpoint (ej: "character", "character/1", "episode")
 * @param {URLSearchParams} [params] - Query params (opcional)
 * @returns {Promise<Object>} - La respuesta de la API
 * @throws {Error} - Si la API responde con error
 */
export async function fetchFromApi(endpoint, params) {
  const query = params ? `?${params.toString()}` : '';
  const url = `${BASE_URL}/${endpoint}${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status} - ${response.statusText}`);
  }

  return response.json();
}
