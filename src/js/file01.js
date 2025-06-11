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

document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch carousel data from JSON
  async function getCarouselData() {
    try {
      const response = await fetch('src/data/data.json');
      const data = await response.json();
      return data.carouselItems;
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      return [];
    }
  }

  // Function to render carousel items
  async function renderCarouselItems() {
    const carouselItems = await getCarouselData();
    const carousel = document.createElement('div');
    carousel.id = 'tiktokCarousel';
    carousel.classList.add('flex', 'overflow-x-auto', 'snap-x', 'scroll-smooth', 'scrollbar-hide', 'gap-6', 'px-4');

    carouselItems.forEach(item => {
      const slide = document.createElement('div');
      slide.classList.add('min-w-full', 'md:min-w-[calc(50%-12px)]', 'lg:min-w-[calc(33.333%-16px)]', 'snap-center', 'bg-[#2c2c2c]', 'p-4', 'rounded-xl', 'space-y-4', 'relative');

      slide.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="w-full h-40 object-cover rounded-lg">
        <h3 class="text-lg font-bold text-white">${item.title}</h3>
        <p class="text-sm text-gray-300">${item.description}</p>
        <a href="${item.link}" class="inline-block bg-[#FF4E00] text-white font-bold px-4 py-2 rounded-full text-sm hover:bg-white hover:text-[#1a1a1a] transition mt-2">Ver más</a>
        <div class="absolute top-2 right-2 bg-[#FF4E00]/80 text-white text-xs py-1 px-2 rounded-md flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Tiempo Limitado</span>
        </div>
      `;

      carousel.appendChild(slide);
    });

    // Add event listeners to "Ver más" buttons after rendering
    const verMasButtons = carousel.querySelectorAll('.snap-center a');
    verMasButtons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from navigating

        // Get the promo details from the card
        const promoTitle = this.parentNode.querySelector('h3').textContent;
        const promoImage = this.parentNode.querySelector('img').src;
        const promoDetails = this.parentNode.querySelector('p').textContent;

        // Show the toast with fake information
        showToast(promoTitle, promoImage, promoDetails);
      });
    });

    const carouselSection = document.createElement('section');
    carouselSection.setAttribute('aria-labelledby', 'tiktok-title');
    carouselSection.classList.add('mb-12');
    carouselSection.innerHTML = `
      <h2 id="tiktok-title" class="text-3xl font-extrabold mb-4 text-[#FF4E00]">Lo Último en TikTok</h2>
      <nav class="flex gap-6 border-b border-[#FF4E00] mb-6">
        <button class="pb-2 text-white font-semibold border-b-2 border-[#FF4E00]">Promociones</button>
        <button class="pb-2 text-gray-400 hover:text-white transition">Menú</button>
        <button class="pb-2 text-gray-400 hover:text-white transition">Videos Presencia</button>
      </nav>
      <div class="relative">
        <button id="prevSlideTikTok" class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"><span> &lt; </span></button>
        <button id="nextSlideTikTok" class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full"><span> &gt; </span></button>
      </div>
    `;
    carouselSection.querySelector('.relative').appendChild(carousel);

    const main = document.querySelector('main');
    main.appendChild(carouselSection);
  }

  // Function to show the toast
  function showToast(promoTitle, promoImage, promoDetails) {
    const toastBackdrop = document.getElementById('toast-backdrop');
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDetails = document.getElementById('toast-details');
    const closeToastButton = document.getElementById('close-toast');
    const limitedTimeBadge = document.getElementById('toast-limited-time');

    toastTitle.textContent = promoTitle;
    toastDetails.textContent = promoDetails;

    toastBackdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    limitedTimeBadge.classList.remove('hidden');

    closeToastButton.addEventListener('click', function () {
      toastBackdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      limitedTimeBadge.classList.add('hidden');
    });
  }

  renderCarouselItems();
});

(() => {
    showToast();
    showVideo();
    loadData();
})();

