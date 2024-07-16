function toggleSection(section) {
    var content = document.getElementById(section);
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}

function showResults(unit) {
    var results = document.getElementById('results');
    var resultText = '';

    switch (unit) {
        case 'Fundamentos de Tecnologías de la Información':
            resultText = `
                <table>
                    <tr><th>Resultados de Aprendizaje</th></tr>
                    <tr><td>Emplear componentes técnicos adecuados para la construcción, reparación o actualización de computadoras.</td></tr>
                    <tr><td>Instalar y configurar componentes para actualizar computadoras según necesidades del usuario.</td></tr>
                    <tr><td>Determinar procedimientos de comunicación de computadoras en redes.</td></tr>
                    <tr><td>Explicar soluciones para problemas en equipos portátiles y otros dispositivos.</td></tr>
                    <tr><td>Instalar sistemas operativos licenciados y de código abierto.</td></tr>
                    <tr><td>Implementar mecanismos de seguridad para equipos, datos y redes.</td></tr>
                </table>
            `;
            break;
        case 'Seguridad Industrial':
            resultText = `
                <table>
                    <tr><th>Resultados de Aprendizaje</th></tr>
                    <tr><td>Mencionar el impacto de las regulaciones nacionales aplicadas en el campo de la Seguridad Industrial.</td></tr>
                    <tr><td>Explicar los procesos mediante los cuales se realiza el aseguramiento de infraestructuras física.</td></tr>
                    <tr><td>Aplicar las estrategias de prevención contra riesgos considerando la normativa, protocolos, insumos, equipos y herramientas que se utilizan en las actividades instrumentales.</td></tr>
                    <tr><td>Utilizar formas creativas e innovadoras para la resolución de problemas cotidianos.</td></tr>
                    <tr><td>Aplicar medidas preventivas que mitiguen la contaminación de los recursos marinos y sus océanos, promoviendo el desarrollo sostenible en ecosistemas terrestres.</td></tr>
                </table>
            `;
            break;
        // Añadir más casos para otras unidades
        default:
            resultText = '<p>No hay resultados de aprendizaje disponibles.</p>';
    }

    results.innerHTML = resultText + `<button class="mdl-button mdl-js-button mdl-button--raised download-button" onclick="simulatePDFDownload('${unit}')">Descargar en PDF</button>`;
}

function simulatePDFDownload(unitName) {
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/pdf;base64,'; // Aquí se debería incluir el contenido base64 del PDF generado
    downloadLink.download = unitName + '.pdf';
    downloadLink.click();
}

function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username === 'Bendicione$' && password === 'Recibida$') {
        window.location.href = 'inicio.html';
    } else {
        alert('Usuario o contraseña incorrectos ACCESO DENEGADO');
    }
}
