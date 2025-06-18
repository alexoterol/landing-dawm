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
