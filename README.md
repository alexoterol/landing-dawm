# Rukito Grill & Drinks

Landing page for Rukito, una parrilla y bar de cócteles con locales en Guayaquil (Urdesa, Aventura Plaza, Alborada).

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`, sin archivo de config aparte)
- [Framer Motion](https://www.framer.com/motion/) para animaciones
- [Lucide React](https://lucide.dev/) para iconos
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database) para guardar los mensajes del formulario de contacto

## Requisitos

- Node.js 18+

## Empezar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Variables de entorno

El formulario de contacto guarda los mensajes en Firebase. Crea un archivo `.env` en la raíz (no se sube al repo) con:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

En Vercel, configura las mismas variables en Project Settings → Environment Variables.

## Scripts

| Comando           | Descripción                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con hot reload     |
| `npm run build`     | Build de producción en `dist/`            |
| `npm run preview`   | Sirve el build de producción localmente   |

## Estructura

```
src/
  components/   Secciones y piezas de UI (Header, Hero, Menu, etc.)
  data/         Datos reales del negocio: menú, ubicaciones, reseñas
  lib/          Integración con Firebase
public/
  img/          Imágenes (logo, promos)
```
