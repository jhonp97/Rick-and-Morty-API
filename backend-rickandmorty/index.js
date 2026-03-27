import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.routes.js';
import config from './config/config.js';

const app = express();

const corsOptions = {
  origin: ['https://rick-and-morty-react-kdd9.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "bienvenidos a mi api Rick And Morty" })
})

app.use('/api/rickandmorty', router);

// Middleware de manejo de errores
app.use((error, req, res, next) => {
  console.error(error);
  // En producción no exponemos el mensaje real del error
  const message = process.env.NODE_ENV === 'production'
    ? 'Error interno del servidor'
    : error.message;
  res.status(500).json({ error: message });
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});

