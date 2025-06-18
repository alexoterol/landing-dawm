function crearReseña({ nombre, avatar, fecha, mensaje, rating = 5, likes = 0, dislikes = 0 }) {
    const estrellas = Array.from({ length: 5 }, (_, i) => `
      <svg class="w-5 h-5 ${i < rating ? 'text-white' : 'text-gray-600'}" fill="currentColor" viewBox="0 0 256 256">
        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
      </svg>
    `).join('');

    const html = `
      <div class="flex flex-col gap-3 bg-[#1a1a1a] p-4 rounded-lg shadow-md">
        <div class="flex items-center gap-3">
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
               style="background-image: url('${avatar}')"></div>
          <div>
            <p class="text-white text-base font-medium">${nombre}</p>
            <p class="text-[#adadad] text-sm">${fecha}</p>
          </div>
        </div>
        <div class="flex gap-0.5">${estrellas}</div>
        <p class="text-white text-base">${mensaje}</p>
        <div class="flex gap-9 text-[#adadad]">
          <button class="flex items-center gap-2">👍 <span>${likes}</span></button>
          <button class="flex items-center gap-2">👎 <span>${dislikes}</span></button>
        </div>
      </div>
    `;

    document.getElementById('contenedor-reseñas').insertAdjacentHTML('beforeend', html);
  }

  // Ejemplo de uso
const reseñas = [
  {
    nombre: 'Ethan Walker',
    avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c6/c6b87b6e10531b7a1634416a07dcaaeeebaf625d_full.jpg',
    fecha: 'hace 2 semanas',
    mensaje: '¡La mejor parrilla de la ciudad! La comida es increíble y el ambiente es electrizante.',
    rating: 5,
    likes: 12,
    dislikes: 2
  },
  {
    nombre: 'Olivia Hayes',
    avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c7/c751e4843cf78a77f2d3db8573ba741d84e717e0_full.jpg',
    fecha: 'hace 1 mes',
    mensaje: 'Excelente comida y atención, aunque a veces se llena mucho. ¡Igual vale la pena esperar!',
    rating: 5,
    likes: 8,
    dislikes: 1
  },
  {
    nombre: 'Noah Bennett',
    avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/c7/c752fca9fab857cd2af173b89730abda44610853_full.jpg',
    fecha: 'hace 2 meses',
    mensaje: '¡Me encanta este lugar! Los sabores son increíbles y el personal es muy amable.',
    rating: 4,
    likes: 15,
    dislikes: 3
  }
];

reseñas.forEach(crearReseña);
