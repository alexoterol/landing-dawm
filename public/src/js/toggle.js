function toggleVista(id) {
  const mapa = document.getElementById(`mapa-${id}`);
  const crowd = document.getElementById(`crowdmeter-${id}`);
  const dot = document.getElementById(`dot-${id}`);

  const isMapVisible = !mapa.classList.contains("hidden");
  mapa.classList.toggle("hidden", isMapVisible);
  crowd.classList.toggle("hidden", !isMapVisible);
  dot.classList.toggle("opacity-100", !isMapVisible);
  dot.classList.toggle("opacity-40", isMapVisible);
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