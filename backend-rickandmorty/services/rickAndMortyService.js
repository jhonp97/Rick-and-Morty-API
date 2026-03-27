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
 * @param {string} endpoint - Path del endpoint (ej: "character", "episode")
 * @param {URLSearchParams} params - Query params ya construidos
 * @returns {Promise<Object>} - La respuesta de la API
 * @throws {Error} - Si la API responde con error
 */
export async function fetchFromApi(endpoint, params = new URLSearchParams()) {
  const url = `${BASE_URL}/${endpoint}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status} - ${response.statusText}`);
  }

  return response.json();
}
