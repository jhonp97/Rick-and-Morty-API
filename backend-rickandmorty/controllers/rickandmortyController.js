const BASE_URL = process.env.API_BASE_URL;

// Solo permitimos estos parámetros — cualquier otro se ignora
const ALLOWED_PARAMS = ['page', 'name', 'status', 'species', 'gender', 'type'];

export const getRickAndMortyPersonajes = async (req, res, next) => {
  try {
    const params = new URLSearchParams();

    // Whitelist: solo pasamos los parámetros que están en la lista permitida
    for (const key of ALLOWED_PARAMS) {
      const value = req.query[key];
      if (value !== undefined && value !== '') {
        params.append(key, String(value).trim());
      }
    }

    const apiURL = `${BASE_URL}/character?${params.toString()}`;
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
