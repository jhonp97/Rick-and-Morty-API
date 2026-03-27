import { fetchFromApi } from '../services/rickAndMortyService.js';

export const rickandmortyLugares = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const params = new URLSearchParams({ page });

    const data = await fetchFromApi('location', params);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
