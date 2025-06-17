// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase desde variables de entorno Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, // 👈 este nombre exacto
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function guardarComentario({ nombre, tipo, mensaje }) {
    try {
    const comentariosRef = ref(db, 'comentarios');
    const nuevo = push(comentariosRef);
    await set(nuevo, {
      nombre,
      tipo,
      mensaje,
      fecha: new Date().toISOString()
    });
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: err };
  }
}

export function saveComment({ nombre, tipo, mensaje }) {
  const refComentarios = ref(db, 'comentarios');
  const nuevaRef = push(refComentarios);
  return set(nuevaRef, {
    nombre,
    tipo,
    mensaje,
    fecha: new Date().toISOString(),
  });
}