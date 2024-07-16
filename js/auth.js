document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir la recarga de la página
        // Aquí deberías agregar la lógica de verificación de las credenciales
        window.location.href = 'inicio.html'; // Redirige a la página de inicio tras 'iniciar sesión'
    });
});
