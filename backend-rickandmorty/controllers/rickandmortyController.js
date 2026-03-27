import { fetchFromApi } from '../services/rickAndMortyService.js';

const ALLOWED_PARAMS = ['page', 'name', 'status', 'species', 'gender', 'type'];

// GET /character — lista de personajes con filtros
export const getRickAndMortyPersonajes = async (req, res, next) => {
  try {
    const params = new URLSearchParams();

    for (const key of ALLOWED_PARAMS) {
      const value = req.query[key];
      if (value !== undefined && value !== '') {
        params.append(key, String(value).trim());
      }
    }

    const data = await fetchFromApi('character', params);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// GET /character/:id — un personaje específico
export const getRickAndMortyPersonajeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fetchFromApi(`character/${id}`);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
