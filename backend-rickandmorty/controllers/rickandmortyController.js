import { fetchFromApi } from '../services/rickAndMortyService.js';

const ALLOWED_PARAMS = ['page', 'name', 'status', 'species', 'gender', 'type'];

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
