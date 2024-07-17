document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        showMainContent();
    } else {
        showLogin();
    }
});

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;

    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('username', username);
    showMainContent();
});

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('session-link').innerText = 'Iniciar Sesión';
}

function showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('usernameDisplay').innerText = sessionStorage.getItem('username');
    document.getElementById('session-link').innerText = 'Cerrar Sesión';
    startSessionTimeout();
}

let timeout;
function startSessionTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 600000); // 10 minutes
}

function confirmLogout() {
    if (confirm('¿Realmente desea cerrar la sesión?')) {
        logout();
    }
}

function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    showLogin();
}

document.addEventListener('mousemove', startSessionTimeout);
document.addEventListener('keypress', startSessionTimeout);

function showSubareas(level) {
    const subareaMap = {
        "decimo": [
            {
                "nombre": "Soporte TI",
                "unidades": ["Fundamentos de Tecnologías de la Información", "Seguridad Industrial", "Electricidad y Electrónica"]
            },
            {
                "nombre": "Tecnologías de Información",
                "unidades": ["Herramientas para la Producción de Documentos", "Herramientas para la Gestión y Análisis de la Información", "Internet de Todo y Seguridad de los Datos"]
            }
        ],
        "undecimo": [
            {
                "nombre": "Programación para Web",
                "unidades": ["Lenguaje de Marcado y Hojas de Estilo", "Programación Interpretada", "Técnicas para Desarrollo de Sitios Web"]
            },
            {
                "nombre": "Emprendimiento e Innovación",
                "unidades": ["Oportunidades de Negocios", "Modelo de Negocios", "Creación de la Empresa", "Plan de Vida"]
            }
        ],
        "duodecimo": [
            {
                "nombre": "Diseño de Software",
                "unidades": ["Procesos de Software", "Modelado de Requerimientos", "Diseño Arquitectónico"]
            },
            {
                "nombre": "Tecnologías de Información",
                "unidades": ["Eficiencia Energética", "Tecnologías Digitales"]
            }
        ]
    };

    const subareas = subareaMap[level];
    const subareaDiv = document.getElementById('subareas');
    subareaDiv.innerHTML = subareas.map(subarea => `
        <div class="card my-2 w-100">
            <div class="card-header" id="heading${subarea.nombre.replace(/\s+/g, '')}">
                <h5 class="mb-0">
                    <button class="btn btn-link w-100" data-toggle="collapse" data-target="#collapse${subarea.nombre.replace(/\s+/g, '')}" aria-expanded="true" aria-controls="collapse${subarea.nombre.replace(/\s+/g, '')}" title="${subarea.nombre}">
                        ${subarea.nombre}
                    </button>
                </h5>
            </div>
            <div id="collapse${subarea.nombre.replace(/\s+/g, '')}" class="collapse" aria-labelledby="heading${subarea.nombre.replace(/\s+/g, '')}" data-parent="#subareas">
                <div class="card-body">
                    ${subarea.unidades.map((unidad, index) => `
                        <button class="btn btn-secondary w-100 m-2 ${index % 2 === 0 ? 'even-unit' : 'odd-unit'}" onclick="loadUnitData('${level}', '${unidad}')" title="${unidad}">${unidad}</button>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function loadUnitData(level, unitName) {
    const unitMap = {
        "decimo": "data/decimo.json",
        "undecimo": "data/undecimo.json",
        "duodecimo": "data/duodecimo.json"
    };

    fetch(unitMap[level])
        .then(response => response.json())
        .then(data => {
            const unitData = data.subareas.flatMap(subarea => subarea.unidades)
                                          .find(unit => unit.nombre === unitName);

            if (unitData) {
                displayUnitData(unitData);
            }
        });
}

function displayUnitData(unitData) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h5>${unitData.nombre} (${unitData.horas} horas)</h5>
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Resultado de Aprendizaje</th>
                    <th>Saberes Esenciales</th>
                    <th>Indicadores de Logro</th>
                    <th>Estrategias de Mediación Pedagógica</th>
                    <th>Evidencias</th>
                    <th>Tiempo Estimado</th>
                </tr>
            </thead>
            <tbody>
                ${unitData.resultados_aprendizaje.map((result, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${result.descripcion}</td>
                        <td>${result.saberes_esenciales}</td>
                        <td>${result.indicadores.join("<br>")}</td>
                        <td>${result.estrategias.join("<br>")}</td>
                        <td>${result.evidencias.map(evidencia => `
                            <strong>Producto:</strong> ${evidencia.producto}<br>
                            <strong>Conocimiento:</strong> ${evidencia.conocimiento}<br>
                            <strong>Desempeño:</strong> ${evidencia.desempeño}
                        `).join("<br><br>")}</td>
                        <td>${result.tiempo_estimado}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('downloadPdf').focus();
}

function promptDownloadPDF() {
    const unitName = document.querySelector('#results h5').innerText.split('(')[0].trim();
    const fileName = `unidad_${unitName}`;
    downloadPDF(fileName, unitName);
}

function downloadPDF(fileName, unitName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener la tabla de resultados
    const resultsTable = document.querySelector('#results table');

    if (!resultsTable) {
        alert('No hay datos disponibles para descargar.');
        return;
    }

    // Convertir la tabla en un formato adecuado para jsPDF autoTable
    const tableHeaders = Array.from(resultsTable.querySelectorAll('thead th')).map(th => th.innerText);
    const tableRows = Array.from(resultsTable.querySelectorAll('tbody tr')).map(tr => {
        return Array.from(tr.querySelectorAll('td')).map(td => td.innerText);
    });

    // Justificar el contenido en la tabla
    const justifiedTableHeaders = tableHeaders.map(header => ({ content: header, styles: { halign: 'justify' }}));
    const justifiedTableRows = tableRows.map(row => row.map(cell => ({ content: cell, styles: { halign: 'justify' }})));

    // Agregar la tabla al documento PDF
    doc.text(`Plan de Práctica Pedagógicas Desarrollo Web - ${new Date().getFullYear()}`, 10, 10);
    doc.autoTable({
        head: [justifiedTableHeaders],
        body: justifiedTableRows,
        startY: 30
    });

    // Descargar el archivo PDF
    doc.save(fileName + '.pdf');
}

function toggleDonationOptions() {
    const donationOptions = document.getElementById('donationOptions');
    if (donationOptions.style.display === 'none' || donationOptions.style.display === '') {
        donationOptions.style.display = 'block';
    } else {
        donationOptions.style.display = 'none';
    }
}

function confirmPaypal() {
    if (confirm('¿Desea donar a través de PayPal?')) {
        window.location.href = 'https://paypal.me/misplanescr?country.x=CR&locale.x=es_XC';
    }
}
