document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const cards = carousel.querySelectorAll('div');
  const prevButton = document.getElementById('prevSlide');
  const nextButton = document.getElementById('nextSlide');
  let currentIndex = 0;
  const cardsToShow = 3;

  // Función para actualizar la posición del carrusel
  const updateCarousel = () => {
    const cardWidth = cards[0].offsetWidth + 24; // Incluye el gap de 1.5rem (24px)
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Actualizar indicadores
    const numIndicators = Math.ceil(cards.length / cardsToShow);
    let indicatorsHTML = '';
    for (let i = 0; i < numIndicators; i++) {
      indicatorsHTML += `<button class="w-2 h-2 rounded-full carousel-indicator ${Math.floor(currentIndex / cardsToShow) === i ? 'bg-[#FF4E00]' : 'bg-gray-400'}" aria-current="${Math.floor(currentIndex / cardsToShow) === i}"></button>`;
    }
    document.querySelector('.carousel-indicators').innerHTML = indicatorsHTML;
  };

  // Event listeners para los botones
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < cards.length - cardsToShow) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initial indicators setup
  const numIndicators = Math.ceil(cards.length / cardsToShow);
  let indicatorsHTML = '';
  for (let i = 0; i < numIndicators; i++) {
    indicatorsHTML += `<button class="w-2 h-2 rounded-full carousel-indicator ${Math.floor(currentIndex / cardsToShow) === i ? 'bg-[#FF4E00]' : 'bg-gray-400'}" aria-current="${Math.floor(currentIndex / cardsToShow) === i}"></button>`;
  }
  
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.classList.add('flex', 'justify-center', 'gap-2', 'mt-4', 'carousel-indicators');
  indicatorsContainer.innerHTML = indicatorsHTML;
  carousel.parentNode.parentNode.appendChild(indicatorsContainer);
});