# 🚀 Deploy a Vercel

## Configuración rápida

### 1. Conectar repositorio a Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Selecciona el directorio `rickAndMorty-React` como root
5. Vercel detectará automáticamente que es un proyecto Vite

### 2. Configurar variables de entorno

En Vercel, ve a **Settings > Environment Variables** y agrega:

```
VITE_API_URL = https://rickandmortyapi.com/api
```

### 3. Deploy automático

Una vez conectado, cada push a `main` hará deploy automático.

## Variables de entorno para GitHub Actions

Para deploy automático via GitHub Actions, necesitas estos secrets:

1. **VERCEL_TOKEN**: 
   - Ve a [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Crea un nuevo token

2. **VERCEL_ORG_ID** y **VERCEL_PROJECT_ID**:
   - Instala Vercel CLI: `npm i -g vercel`
   - En el directorio del proyecto: `vercel link`
   - Revisa el archivo `.vercel/project.json`

3. Agrega estos secrets en GitHub:
   - Ve a tu repo > Settings > Secrets > Actions
   - Agrega: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

## URLs de producción

- **Frontend**: `https://rick-and-morty-react-tu-usuario.vercel.app`
- **API**: `https://rickandmortyapi.com/api` (directo, sin backend)

## Estructura del proyecto

```
rickAndMorty-React/
├── .env                  # Desarrollo (localhost)
├── .env.production       # Producción (API directa)
├── vercel.json           # Configuración de Vercel
└── dist/                 # Build de producción
```
