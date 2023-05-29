// Variables globales
const imagesContainer = document.getElementById('images-container');
const loadMoreButton = document.getElementById('load-more-button');
const loadLessButton = document.getElementById('load-less-button');
let currentPage = 1;
const itemsPerPage = 2;

// Función para cargar las tarjetas de imágenes
async function loadImages() {
  try {
    const response = await fetch(`http://sulbaranjc.com:3312/images?page=${currentPage}&limit=${itemsPerPage}`);
    const images = await response.json();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const imagesToShow = images.slice(startIndex, endIndex);

    imagesToShow.forEach(image => {
      const card = `
      <div class="d-flex justify-content-center align-items-center mx-2 pt-5">
        <div class="card mb-4" style="width: 420px; height: 800px;">
          <img class="card-img-top" src="http://sulbaranjc.com:3312/${image.namefile}" alt="${image.titulo}">
          <div class="card-body d-flex flex-column pt-4 fw-bolder">
            <h5 class="card-title"><strong>${image.titulo}</strong></h5>
            <p class="card-text">${image.descripcion}</p>
            <p class="card-text">Precio: $${image.precio}</p>
            <p class="card-text">Existencia: ${image.existencia}</p>
            <div class="card-body d-flex align-items-end">
              <button type="button" class="btn d-block mx-auto mb-3" style="border: 1px solid #ae7373; color: #ae7373;">♡ LO QUIERO ♡</button>
            </div>
          </div>
        </div>
      </div>
      `;
      imagesContainer.innerHTML += card;
    });

    currentPage++;

    // Mostrar u ocultar el botón "Ver más" y "Ver menos" según la cantidad de imágenes cargadas
    if (currentPage * itemsPerPage >= images.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }

    if (currentPage > 1) {
      loadLessButton.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
  }
}

// Función para eliminar las últimas dos tarjetas de imágenes
function removeImages() {
  const cardsToRemove = imagesContainer.querySelectorAll('.card');
  const lastCardIndex = cardsToRemove.length - 1;

  // Eliminar las últimas dos tarjetas
  for (let i = 0; i < 2; i++) {
    const cardToRemove = cardsToRemove[lastCardIndex - i];
    if (cardToRemove) {
      cardToRemove.remove();
    }
  }

  currentPage--;

  // Mostrar u ocultar el botón "Ver más" y "Ver menos" según la cantidad de imágenes cargadas
  if (currentPage <= 1) {
    loadLessButton.style.display = 'none';
  }

  loadMoreButton.style.display = 'block';
}

// Cargar las dos primeras tarjetas de imágenes al inicio
loadImages();

// Evento de clic en el botón "Ver más"
loadMoreButton.addEventListener('click', loadImages);

// Evento de clic en el botón "Ver menos"
loadLessButton.addEventListener('click', removeImages);
