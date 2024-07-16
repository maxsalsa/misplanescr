function toggleSection(section) {
    var content = document.getElementById(section);
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function confirmDownload(unitName) {
    if (confirm('¿Desea descargar la unidad ' + unitName + '?')) {
        alert('Descargando ' + unitName + '...');
        // Aquí se implementaría la descarga real del material
    }
}

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        window.location.href = 'inicio.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}
