document.addEventListener('DOMContentLoaded', function () {
  const niveles = ['decimo', 'undecimo', 'duodecimo'];

  niveles.forEach(nivel => {
      fetch(`data/${nivel}.json`)
          .then(response => response.json())
          .then(data => {
              displayData(data, nivel);
          })
          .catch(error => console.error(`Error loading ${nivel} JSON:`, error));
  });

  function displayData(data, nivel) {
      const nivelContent = document.getElementById(`nav-${nivel}`);
      Object.keys(data[nivel]).forEach(subarea => {
          const subareaData = data[nivel][subarea];
          const subareaCard = document.createElement('div');
          subareaCard.className = 'card mt-3';

          const subareaHeader = document.createElement('div');
          subareaHeader.className = 'card-header bg-primary text-white';
          subareaHeader.innerHTML = `<h5 class="mb-0">${subareaData.nombre}</h5>`;
          subareaCard.appendChild(subareaHeader);

          const subareaBody = document.createElement('div');
          subareaBody.className = 'card-body';

          subareaData.unidades.forEach(unidad => {
              const unidadTable = document.createElement('table');
              unidadTable.className = 'table table-bordered table-striped mt-3';

              const thead = document.createElement('thead');
              thead.innerHTML = `
                  <tr>
                      <th>Resultados de Aprendizaje</th>
                      <th>Saberes Esenciales</th>
                      <th>Estrategias de Mediación Pedagógica</th>
                      <th>Indicadores</th>
                      <th>Evidencias</th>
                  </tr>`;
              unidadTable.appendChild(thead);

              const tbody = document.createElement('tbody');
              unidad.resultados_aprendizaje.forEach((resultado, index) => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${resultado}</td>
                      <td>${unidad.saberes_esenciales[index]}</td>
                      <td>${unidad.estrategias[index].docente}</td>
                      <td>${unidad.indicadores[index]}</td>
                      <td>${unidad.evidencias.conocimiento[index]}<br>${unidad.evidencias.producto[index]}<br>${unidad.evidencias.desempeño[index]}</td>`;
                  tbody.appendChild(row);
              });

              unidadTable.appendChild(tbody);
              subareaBody.appendChild(unidadTable);
          });

          subareaCard.appendChild(subareaBody);
          nivelContent.appendChild(subareaCard);
      });
  }

  document.getElementById('downloadPdf').addEventListener('click', function () {
      const element = document.body;
      html2pdf(element, {
          margin: 0.5,
          filename: 'plan_practica_pedagogica.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
  });
});
