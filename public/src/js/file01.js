"use strict";

import { fetchFakerData } from './functions.js';
import { guardarComentario, saveComment } from './firebase.js';


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
  const url = 'https://fakerapi.it/api/v2/books?_quantity=1';
  try {
    const result = await fetchFakerData(url);
    if (result.success) {
      const libro = result.body.data[0];
      document.getElementById('nombre').value = libro.author;
      document.getElementById('mensaje').value = libro.description;
    } else {
      console.error('Error al obtener los datos:', result.error);
    }
  } catch (error) {
    console.error('Ocurrió un error inesperado:', error);
  }
};

// Ejecutar cuando se haga clic en el botón
document.getElementById('autocompletar').addEventListener('click', loadData);

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
		${item.limited ? `
        <div class="absolute top-2 right-2 bg-[#FF4E00]/80 text-white text-xs py-1 px-2 rounded-md flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Tiempo Limitado</span>
        </div>
		` : ''}
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
        showToast(promoTitle, promoImage, promoDetails, carouselItems);
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

    const prevSlideTikTok = carouselSection.querySelector('#prevSlideTikTok');
    const nextSlideTikTok = carouselSection.querySelector('#nextSlideTikTok');

    prevSlideTikTok.addEventListener('click', () => {
      carousel.scrollLeft -= carousel.offsetWidth;
    });

    nextSlideTikTok.addEventListener('click', () => {
      carousel.scrollLeft += carousel.offsetWidth;
    });

    const main = document.querySelector('main');
    const ubicacionesSection = document.getElementById('ubicaciones');
    main.insertBefore(carouselSection, ubicacionesSection);
  }

  // Function to show the toast
  function showToast(promoTitle, promoImage, promoDetails, carouselItems) {
    const toastBackdrop = document.getElementById('toast-backdrop');
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastDetails = document.getElementById('toast-details');
    const closeToastButton = document.getElementById('close-toast');
    const limitedTimeBadge = document.getElementById('toast-limited-time');
    const toastImageContainer = toast.querySelector('.md\\:w-1\\/2');

    toastTitle.textContent = promoTitle;
    toastDetails.textContent = promoDetails;

    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('relative', 'w-full', 'h-full', 'py-2', 'px-4'); // Added vertical and horizontal padding

    // Create carousel
    const fakeCarousel = document.createElement('div');
    fakeCarousel.id = 'fake-carousel';
    fakeCarousel.classList.add('w-full', 'h-full', 'flex', 'overflow-x-auto', 'snap-x', 'scroll-smooth', 'scrollbar-hide', 'relative'); // Make relative for absolute positioning

    // Add images to carousel
    const images = carouselItems.find(item => item.title === promoTitle).toastImages;
    let currentImageIndex = 0; // Initialize currentImageIndex

    images.forEach(imageSrc => {
      let element;
      if (imageSrc.endsWith('.mp4')) {
        element = document.createElement('video');
        element.src = imageSrc;
        element.autoplay = true;
        element.loop = true;
        element.muted = false; // Enable sound
		element.controls = true; // Add video controls
		element.style.objectFit = 'contain'; // Ensure video fits the screen
      } else {
        element = document.createElement('img');
        element.src = imageSrc;
      }
      element.alt = 'Promotion';
      element.classList.add('min-w-full', 'h-full', 'object-cover', 'rounded-md', 'snap-start'); // Reduced rounded corners
      fakeCarousel.appendChild(element);
    });

    // Create indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.classList.add('flex', 'justify-center', 'gap-2', 'absolute', 'bottom-2', 'left-0', 'right-0'); // Position indicators inside carousel

    for (let i = 0; i < images.length; i++) {
      const indicator = document.createElement('button');
      indicator.classList.add('w-2', 'h-2', 'rounded-full', 'carousel-indicator');
      indicator.setAttribute('aria-current', i === currentImageIndex);
      indicator.style.backgroundColor = i === currentImageIndex ? '#FF4E00' : '#gray-400';
      indicatorsContainer.appendChild(indicator);
    }

    const updateIndicators = () => {
      const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
      indicators.forEach((indicator, index) => {
        indicator.style.backgroundColor = index === currentImageIndex ? '#FF4E00' : '#gray-400';
        indicator.setAttribute('aria-current', index === currentImageIndex);
      });
    };

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<span> &lt; </span>';
    prevButton.classList.add('absolute', 'left-2', 'top-1/2', 'transform', '-translate-y-1/2', 'z-10', 'bg-black/50', 'text-white', 'p-2', 'rounded-full'); // Position inside carousel
    prevButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      fakeCarousel.scrollLeft = fakeCarousel.offsetWidth * currentImageIndex;
      updateIndicators();
    });

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<span> &gt; </span>';
    nextButton.classList.add('absolute', 'right-2', 'top-1/2', 'transform', '-translate-y-1/2', 'z-10', 'bg-black/50', 'text-white', 'p-2', 'rounded-full'); // Position inside carousel
    nextButton.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      fakeCarousel.scrollLeft = fakeCarousel.offsetWidth * currentImageIndex;
      updateIndicators();
    });

    // Append elements
    carouselContainer.appendChild(fakeCarousel);
    carouselContainer.appendChild(indicatorsContainer);
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    // Replace image with carousel
    toastImageContainer.innerHTML = '';
    toastImageContainer.appendChild(carouselContainer);

    const isLimited = carouselItems.find(item => item.title === promoTitle).limited;
    if (isLimited) {
      limitedTimeBadge.classList.remove('hidden');
    } else {
      limitedTimeBadge.classList.add('hidden');
    }

    toastBackdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    closeToastButton.addEventListener('click', function () {
      toastBackdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      limitedTimeBadge.classList.add('hidden');

	  // Pause the video when the toast is closed
	  const video = fakeCarousel.querySelector('video');
	  if (video) {
		video.pause();
	  }
    });

    console.log('showToast called', promoTitle, promoImage, promoDetails); // Add console log
  }

  renderCarouselItems();
});

function enableForm() {
  const form = document.getElementById('formulario-rukito');
  const popup = document.getElementById('respuesta-formulario');
  const cerrarBtn = document.getElementById('cerrar-popup');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ✅ Capturar valores ANTES de resetear
    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('tipo').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !tipo || !mensaje) return;

    const resultado = await guardarComentario({ nombre, tipo, mensaje });

    if (resultado.ok) {
      // ✅ Usar los valores guardados (ya no se leerán desde inputs)
      document.getElementById('rta-nombre').textContent = nombre;
      document.getElementById('rta-tipo').textContent = tipo;
      document.getElementById('rta-mensaje').textContent = mensaje;

      form.reset(); // 🔄 LUEGO de usarlos
      popup.classList.remove('hidden');

      setTimeout(() => {
        popup.classList.add('hidden');
      }, 5000);

      form.reset();
    } else {
      alert('Hubo un error al enviar tu mensaje.');
    }

    cerrarBtn.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  });
}


const ubicaciones = [
  {
    id: 1,
    nombre: "Local Urdesa",
    direccion: "Av. Victor Emilio Estrada, frente al banco Pichincha",
    referencia: "Diagonal al parque central",
    telefono: "0991234567",
    mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.399539694581!2d-79.91864631569501!3d-2.161754674829706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6d3860181f0f%3A0x54caebdd9158fce!2sRukito%20Grill%26Drinks%20-%20Urdesa!5e0!3m2!1ses-419!2sec!4v1750181058151!5m2!1ses-419!2sec",
    imagenCrowd: "src/img/crowd-meter-example.png"
  },
  {
    id: 2,
    nombre: "Aventura Plaza",
    direccion: "Av. Carlos Julio Arosemena",
    referencia: "Frente a la plaza, diagonal a Kitton",
    telefono: "0987654321",
    mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.4691752611743!2d-79.91684007571484!3d-2.1734312597827414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6d734c9aa1dd%3A0xb554e8239fb6a1e3!2sRukito%20Grill%26Drinks%20-%20Aventura%20Plaza!5e0!3m2!1ses-419!2sec!4v1750180999123!5m2!1ses-419!2sec",
    imagenCrowd: "src/img/crowd-meter-example.png"
  },
  {
    id: 3,
    nombre: "Alborada",
    direccion: "Av. Rodolfo Vaquerizo",
    referencia: "Frente a Parque Pescador",
    telefono: "0987654321",
    mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10588.38364966979!2d-79.91204497454093!3d-2.1368283696606256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d6df1a996d4db%3A0xbdce0622e280c56b!2sRukito%20Grill%26Drink%20-%20Alborada!5e0!3m2!1ses-419!2sec!4v1750181127395!5m2!1ses-419!2sec",
    imagenCrowd: "src/img/crowd-meter-example.png"
  }
];

const carousel = document.getElementById("carousel");

ubicaciones.forEach((ubicacion) => {
  const slide = document.createElement("div");
  slide.className =
    "min-w-full md:min-w-[90%] snap-center flex flex-col md:flex-row bg-[#1a1a1a] rounded-xl shadow-lg p-4 gap-6 mx-auto max-w-5xl relative";

  slide.innerHTML = `
    <div class="relative w-full md:w-1/2">
      <iframe id="mapa-${ubicacion.id}" class="rounded-xl w-full object-cover" src="${ubicacion.mapaSrc}" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      <img id="crowdmeter-${ubicacion.id}" src="${ubicacion.imagenCrowd}" class="rounded-xl h-full object-cover hidden absolute top-0 left-0 w-full h-full" alt="Crowdmeter" />
      <!-- Toggle minimalista -->
      <div class="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2">
        <button onclick="toggleVista(${ubicacion.id})" id="dot-${ubicacion.id}" class="w-5 h-5 rounded-full bg-white opacity-40 transition shadow-lg shadow-black/70 opacity-60 hover:opacity-100"></button>
      </div>
    </div>
    <div class="flex flex-col justify-center gap-3 text-white md:w-1/2">
      <p class="text-lg font-bold">${ubicacion.nombre}</p>
      <p class="text-sm text-[#adadad]">${ubicacion.direccion}</p>
      <p class="text-xs italic text-[#8a8a8a]">${ubicacion.referencia}</p>
      <div class="flex items-center gap-2 pt-2">
        <button class="flex items-center gap-1 px-3 py-1 border border-white text-white font-bold rounded hover:bg-white hover:text-black transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h2l.4 2M7 13l1.5 1.5L13 10l1.5 1.5M16 17h2a2 2 0 002-2v-5a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 0010.586 5H7a2 2 0 00-2 2v10a2 2 0 002 2h9z" />
          </svg>
          Contacto
        </button>
        <span class="text-sm text-[#adadad]">${ubicacion.telefono}</span>
      </div>
    </div>
  `;

  carousel.appendChild(slide);
});


(() => {
    showToast();
    showVideo();
    enableForm();
})();

