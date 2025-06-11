// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, push, set, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Definir la función saveVote
export function saveVote(productID) {
  return new Promise((resolve, reject) => {
    // Obtener la referencia a la base de datos en la colección "votes"


    const votesRef = ref(database, 'votes');

    // Crear una nueva referencia utilizando push() para un nuevo voto
    const newVoteRef = push(votesRef);

    // Obtener la fecha actual
    const currentDate = new Date().toISOString();

    // Datos que se van a guardar (productID y fecha actual)
    const voteData = {
      productID: productID,
      date: currentDate
    };

    // Guardar los datos en la base de datos con set()
    set(newVoteRef, voteData)
      .then(() => {
        // Devolver un mensaje de éxito cuando los datos se guardan correctamente
        resolve({ message: "Voto guardado con éxito", status: "success" });
      })
      .catch((error) => {
        // Manejar el error y devolver un mensaje de error
        reject({ message: `Error al guardar el voto: ${error.message}`, status: "error" });
      });
  });
}

export function getVotes() {
  return new Promise((resolve, reject) => {
    // Obtener la referencia a la colección "votes"
    const database = getDatabase();
    const votesRef = ref(database, 'votes');
    
    // Usar la función get para obtener los datos de la referencia
    get(votesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Si los datos existen, devolverlos
          resolve(snapshot.val());
        } else {
          // Si no existen datos, devolver un mensaje indicando que no hay votos
          resolve({ message: "No hay votos registrados." });
        }
      })
      .catch((error) => {
        // Manejar el error en caso de que falle la operación
        reject({ message: `Error al obtener los votos: ${error.message}`, status: "error" });
      });
  });
}

