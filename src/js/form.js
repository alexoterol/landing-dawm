const form = document.getElementById('formulario-rukito');
const respuesta = document.getElementById('respuesta-formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const mensaje = document.getElementById('mensaje').value;

    document.getElementById('rta-nombre').textContent = nombre;
    document.getElementById('rta-tipo').textContent = tipo;
    document.getElementById('rta-mensaje').textContent = mensaje;

    respuesta.classList.remove('hidden');
    form.reset();
});