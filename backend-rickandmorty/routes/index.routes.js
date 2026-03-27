import express from 'express';
import { logger } from '../middlewares/logger.middleware.js'
import { getRickAndMortyPersonajes, getRickAndMortyPersonajeById } from '../controllers/rickandmortyController.js';
import { rickandmortyLugares } from '../controllers/rickandmortyLugares.js';
import { getRickAndMortyEpisodios } from '../controllers/rickandmortyEpisodios.js';

const router = express.Router();

// Logger en todas las rutas
router.use(logger);

// Personajes
router.get('/character', getRickAndMortyPersonajes);
router.get('/character/:id', getRickAndMortyPersonajeById);

// Lugares
router.get('/location', rickandmortyLugares);

// Episodios
router.get('/episode', getRickAndMortyEpisodios);

export default router;
