"use strict";

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

(() => {
    showToast();
    showVideo();
})();