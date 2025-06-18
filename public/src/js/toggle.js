function toggleVista(id) {
  const mapa = document.getElementById(`mapa-${id}`);
  const crowd = document.getElementById(`crowdmeter-${id}`);
  mapa.classList.toggle('hidden');
  crowd.classList.toggle('hidden');
}

// Carrusel simple con botones
let slideIndex = 0;
const slides = () => document.querySelectorAll('#carousel > div');

function updateCarousel() {
  const slideWidth = carousel.offsetWidth;
  carousel.scrollTo({
    left: slideWidth * slideIndex,
    behavior: 'smooth'
  });
}

document.getElementById('prevSlide').addEventListener('click', () => {
  if (slideIndex > 0) {
    slideIndex--;
    updateCarousel();
  }
});

document.getElementById('nextSlide').addEventListener('click', () => {
  if (slideIndex < slides().length - 1) {
    slideIndex++;
    updateCarousel();
  }
});