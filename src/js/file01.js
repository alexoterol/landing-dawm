"use strict";

import { fetchFakerData } from './functions.js';

// (() => {
//     alert("¡Bienvenido a la página!");
//     console.log("Mensaje de bienvenida mostrado.");
// })();

// window.addEventListener('DOMContentLoaded', () => {
//         setTimeout(() => {
//           const toast = document.getElementById('toast-interactive');
//           if (toast) {
//             toast.classList.remove('hidden');
//           }
//         }, 2000);
//       });

const showToast = () => {
    setTimeout(() => {
        const toast = document.getElementById("toast-interactive");
        if (toast) {
            toast.classList.remove("hidden");
        }
    }, 2000);
};

const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=1&_characters=180';
    try {
        const result = await fetchFakerData(url);
        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }
    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    }
};

(() => {
    showToast();
    showVideo();
    loadData();
})();

