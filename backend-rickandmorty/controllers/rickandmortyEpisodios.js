const BASE_URL = process.env.API_BASE_URL;

export const getRickAndMortyEpisodios = async (req, res, next) => {
  try {
    // Validamos que page sea un número válido
    const page = parseInt(req.query.page, 10) || 1;
    const apiURL = `${BASE_URL}/episode?page=${page}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};