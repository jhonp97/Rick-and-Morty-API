import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Crear app de prueba con middleware de seguridad
const createTestApp = () => {
  const app = express();

  // Helmet
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Demasiadas peticiones' },
  });
  app.use(limiter);

  // Ruta de prueba
  app.get('/test', (req, res) => {
    res.json({ message: 'ok' });
  });

  // 404 Handler (Express 5 compatible)
  app.use((req, res, next) => {
    res.status(404).json({
      error: 'Ruta no encontrada',
      path: req.originalUrl,
      method: req.method,
    });
  });

  return app;
};

describe('Security Middleware', () => {
  describe('Helmet', () => {
    it('debe agregar headers de seguridad', async () => {
      const app = createTestApp();
      const response = await request(app).get('/test');

      // Verificar headers de seguridad de Helmet
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
      expect(response.headers['x-xss-protection']).toBe('0');
    });

    it('debe ocultar header X-Powered-By', async () => {
      const app = createTestApp();
      const response = await request(app).get('/test');

      // Express por defecto agrega X-Powered-By, Helmet lo quita
      expect(response.headers['x-powered-by']).toBeUndefined();
    });
  });

  describe('Rate Limiting', () => {
    it('debe permitir requests dentro del límite', async () => {
      const app = createTestApp();

      // Hacer 5 requests (bajo el límite)
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
      }
    });

    it('debe retornar headers de rate limit', async () => {
      const app = createTestApp();
      const response = await request(app).get('/test');

      // Verificar que los headers de rate limit están presentes
      // Nota: Los nombres de headers pueden variar según la versión
      const hasRateLimitHeader = 
        response.headers['ratelimit-limit'] !== undefined ||
        response.headers['x-ratelimit-limit'] !== undefined ||
        response.headers['rate-limit-limit'] !== undefined;

      expect(hasRateLimitHeader).toBe(true);
    });
  });

  describe('Error Handler', () => {
    it('debe retornar 404 para rutas inexistentes', async () => {
      const app = createTestApp();
      const response = await request(app).get('/ruta-que-no-existe');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Ruta no encontrada');
    });
  });
});
