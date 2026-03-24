# Rick and Morty App

Aplicación web que consume la API de Rick and Morty para mostrar información sobre personajes, episodios y ubicaciones del universo de la serie.

## Tecnologías

### Frontend
- **React 19** - Librería UI
- **Vite** - Herramienta de build
- **TypeScript** - Tipado estático

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos

## Estructura del proyecto

```
├── rickAndMorty-React/     # Frontend
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Vistas principales
│   │   └── css/             # Estilos
│   └── ...
│
├── backend-rickandmorty/    # Backend API
│   ├── controllers/         # Lógica de negocio
│   ├── routes/              # Definición de rutas
│   ├── db/                  # Modelos y conexión a BD
│   ├── middlewares/         # Middlewares Express
│   └── index.js             # Entry point
│
└── package.json             # Raíz del monorepo
```

## Scripts

### Frontend
```bash
cd rickAndMorty-React
npm install
npm run dev
```

### Backend
```bash
cd backend-rickandmorty
npm install
npm run dev
```
