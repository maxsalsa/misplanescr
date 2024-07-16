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
    const password = document.getElementById('password').value;

    if (username === 'Bendicione$' && password === 'Recibida$') {
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('username', username);
        showMainContent();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('session-link').innerText = 'Iniciar Sesión';
    window.onbeforeunload = null;
}

function showMainContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('usernameDisplay').innerText = sessionStorage.getItem('username');
    document.getElementById('session-link').innerText = 'Cerrar Sesión';
    startSessionTimeout();
    window.onbeforeunload = function() {
        return '¿Desea cerrar la sesión?';
    }
}

let timeout;
function startSessionTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(logout, 600000); // 10 minutes
}

function toggleSession() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        logout();
    } else {
        showLogin();
    }
}

function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    showLogin();
}

document.addEventListener('mousemove', startSessionTimeout);
document.addEventListener('keypress', startSessionTimeout);

window.addEventListener('popstate', function() {
    logout();
});

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
            },
            {
                "nombre": "Programación para Web",
                "unidades": ["Lenguaje de marcado y hojas de estilo", "Programación interpretada", "Técnicas para desarrollo de sitios web"]
            },
            {
                "nombre": "Diseño de Software",
                "unidades": ["Procesos de software", "Modelado de requerimientos", "Diseño arquitectónico"]
            }
        ],
        "undecimo": [
            {
                "nombre": "Programación para Web",
                "unidades": ["Programación interpretada multiparadigma", "Programación orientada a objetos", "Programación híbrida"]
            },
            {
                "nombre": "Emprendimiento e Innovación",
                "unidades": ["Oportunidades de Negocios", "Modelo de Negocios", "Creación de la Empresa", "Plan de Vida"]
            },
            {
                "nombre": "Diseño de Software",
                "unidades": ["Diseño de la interfaz de usuario", "Diseño web", "Administración de la calidad"]
            },
            {
                "nombre": "Soporte TI",
                "unidades": ["Introducción a la redes", "Sistemas Operativos", "Fundamentos de Ciberseguridad"]
            }
        ],
        "duodecimo": [
            {
                "nombre": "Diseño de Software",
                "unidades": ["Administración de proyectos de software", "Herramientas para diseño web"]
            },
            {
                "nombre": "Tecnologías de Información",
                "unidades": ["Eficiencia energética", "Tecnologías digitales"]
            },
            {
                "nombre": "Programación para Web",
                "unidades": ["Programación .net", "Bases de datos masivas"]
            },
            {
                "nombre": "Soporte TI",
                "unidades": ["Mantenimiento de portátiles", "Configuración de dispositivos móviles"]
            }
        ]
    };

    const subareas = subareaMap[level];
    const subareaDiv = document.getElementById('subareas');
    subareaDiv.innerHTML = subareas.map(subarea => `
        <h5>${subarea.nombre}</h5>
        <div class="d-flex flex-wrap">
            ${subarea.unidades.map(unidad => `
                <button class="btn btn-secondary m-2" onclick="loadUnitData('${level}', '${unidad}')">${unidad}</button>
            `).join('')}
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
                    <th>Resultado de Aprendizaje</th>
                    <th>Saberes Esenciales</th>
                    <th>Indicadores de Logro</th>
                    <th>Estrategias de Mediación Pedagógica</th>
                    <th>Evidencias</th>
                    <th>Tiempo Estimado</th>
                </tr>
            </thead>
            <tbody>
                ${unitData.resultados_aprendizaje.map(result => `
                    <tr>
                        <td>${result.numero}. ${result.descripcion}</td>
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
}

function promptDownloadPDF() {
    const fileName = prompt("Ingrese el nombre del archivo PDF:", "unidad");
    if (fileName) {
        downloadPDF(fileName);
    }
}

function downloadPDF(fileName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const resultsDiv = document.getElementById('results').innerHTML;
    doc.fromHTML(resultsDiv, 10, 10);
    doc.save(fileName + '.pdf');
}
