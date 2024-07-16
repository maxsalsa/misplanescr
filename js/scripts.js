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
