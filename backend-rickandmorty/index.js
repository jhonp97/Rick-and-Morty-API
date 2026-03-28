import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import router from './routes/index.routes.js';
import config from './config/config.js';

const app = express();

// ============================================
// SEGURIDAD: Headers HTTP seguros
// ============================================
app.use(helmet());

// ============================================
// SEGURIDAD: Rate limiting
// ============================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    error: 'Demasiadas peticiones, intenta de nuevo en 15 minutos',
  },
  standardHeaders: true, // Retorna info de rate limit en headers
  legacyHeaders: false, // Deshabilita headers X-RateLimit-*
});
app.use(limiter);

// ============================================
// CORS
// ============================================
const corsOptions = {
  origin: ['https://rick-and-morty-react-kdd9.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ============================================
// Body parsing
// ============================================
app.use(express.json({ limit: '10kb' })); // Limitar tamaño de body

app.get("/", (req, res) => {
  res.status(200).json({ msg: "bienvenidos a mi api Rick And Morty" })
})

app.use('/api/rickandmorty', router);

// ============================================
// 404 Handler (Express 5 compatible)
// ============================================
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method,
  });
});

// ============================================
// Middleware de manejo de errores (SEGURO)
// ============================================
app.use((error, req, res, next) => {
  // Log del error completo (solo en servidor)
  console.error('❌ Error:', {
    message: error.message,
    stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // En producción NUNCA exponemos detalles del error
  const message = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : error.message;

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    error: message,
    // Solo en desarrollo mostramos el stack
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  });
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});

