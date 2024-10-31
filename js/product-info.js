document.addEventListener('DOMContentLoaded', () => {
    const productNameElement = document.getElementById('product-name');
    const productDescriptionElement = document.getElementById('product-description');
    const productPriceElement = document.getElementById('product-price');
    const productSoldCountElement = document.getElementById('product-sold-count');
    const productCategoryElement = document.getElementById('product-category');
    const mainProductImage = document.getElementById('main-product-image');
    const thumbnails = [
        document.getElementById('thumbnail-1'),
        document.getElementById('thumbnail-2'),
        document.getElementById('thumbnail-3')
    ];

    const selectedProductId = localStorage.getItem('selectedProductId');
    
    if (!selectedProductId) {
        alert('No se ha seleccionado un producto');
        return;
    }

    const url = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;

    fetch(url)
        .then(response => response.json())
        .then(product => {
            productNameElement.textContent = product.name;
            productDescriptionElement.textContent = product.description;
            productPriceElement.textContent = `$${product.cost}`;
            productSoldCountElement.textContent = product.soldCount;
            productCategoryElement.textContent = product.category;
            mainProductImage.src = product.images[0];

            thumbnails.forEach((thumbnail, index) => {
                thumbnail.src = product.images[index + 1] || product.images[0];
            });

            displayRelatedProducts(product.relatedProducts);

            const commentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${selectedProductId}.json`;
            fetch(commentsUrl)
                .then(response => response.json())
                .then(comments => {
                    mostrarComentarios(comments);
                    manejarFiltro(comments);
                    manejarBusqueda(comments);
                })
                .catch(error => {
                    console.error('Error al obtener los comentarios:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
        });

    document.getElementById('buy').addEventListener('click', function() {
        const productInfo = {
            id: selectedProductId,
            name: productNameElement.textContent,
            description: productDescriptionElement.textContent,
            price: productPriceElement.textContent,
            soldCount: productSoldCountElement.textContent,
            category: productCategoryElement.textContent,
            image: mainProductImage.src,
        };
        localStorage.setItem('productInfo', JSON.stringify(productInfo));
        window.location.href = 'cart.html';
    });
});

// Mostrar productos relacionados
function displayRelatedProducts(relatedProducts) {
    const relatedProductsContainer = document.getElementById('related-products-container');
    relatedProductsContainer.innerHTML = '';

    relatedProducts.forEach(relatedProduct => {
        const relatedProductHTML = `
            <div class="col-md-3">
                <div class="card mb-3">
                    <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                    <div class="card-body">
                        <h5 class="card-title">${relatedProduct.name}</h5>
                        <a href="#" class="btn btn-primary ver-producto-relacionado" data-product-id="${relatedProduct.id}">Ver Producto</a>
                    </div>
                </div>
            </div>
        `;
        relatedProductsContainer.innerHTML += relatedProductHTML;
    });

    // Añadir evento a los botones de productos relacionados
    document.querySelectorAll('.ver-producto-relacionado').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const relatedProductId = this.getAttribute('data-product-id');
            localStorage.setItem('selectedProductId', relatedProductId);
            window.location.href = 'product-info.html'; // Redirigir a la misma página para mostrar el nuevo producto
        });
    });
}

// Función para mostrar los comentarios
function mostrarComentarios(comentarios) {
    const comentariosContainer = document.getElementById('comentarios');
    comentariosContainer.innerHTML = '';

    comentarios.forEach((comentario) => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('reseña');

        const estrellas = '★'.repeat(comentario.score) + '☆'.repeat(5 - comentario.score);

        comentarioDiv.innerHTML = `
            <div class="calificacion">${estrellas}</div>
            <h3>${comentario.description || 'Comentario no disponible'}</h3>
            <div class="detalles">
                <span>${comentario.dateTime || 'Fecha no disponible'}</span> <br>
                <span>${comentario.user || 'Usuario desconocido'}</span>
            </div>
        `;
        comentariosContainer.appendChild(comentarioDiv);
    });

    const paginacionTexto = document.getElementById('paginacion-texto');
    paginacionTexto.textContent = `${comentarios.length}/${comentarios.length} Reseñas`;
}

// Manejar el filtrado de comentarios
function manejarFiltro(comments) {
    const ratingFilter = document.querySelector('.filtro-calificacion');

    ratingFilter.addEventListener('change', function () {
        const filterValue = this.value;

        if (filterValue === 'Mayor a menor') {
            comments.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
        } else if (filterValue === 'Menor a mayor') {
            comments.sort((a, b) => a.score - b.score); // Ordenar de menor a mayor
        }

        mostrarComentarios(comments); // Volver a mostrar comentarios ya ordenados
    });
}

// Manejar la búsqueda de comentarios
function manejarBusqueda(comments) {
    const barraBusqueda = document.querySelector('.barra-busqueda');

    barraBusqueda.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();

        // Filtrar comentarios que coincidan con el texto de búsqueda en la descripción o el usuario
        const comentariosFiltrados = comments.filter(comentario =>
            comentario.description.toLowerCase().includes(searchText) ||
            comentario.user.toLowerCase().includes(searchText)
        );

        mostrarComentarios(comentariosFiltrados); // Volver a mostrar solo los comentarios filtrados
    });
}


// Modo noche/día simplificado
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'day-mode';
body.classList.add(savedTheme);

function updateButtonText(mode) {
    toggleButton.textContent = mode === 'night-mode' ? 'Modo Día' : 'Modo Noche';
}
updateButtonText(savedTheme);

toggleButton.addEventListener('click', () => {
    const currentMode = body.classList.contains('night-mode') ? 'night-mode' : 'day-mode';
    const newMode = currentMode === 'night-mode' ? 'day-mode' : 'night-mode';
    body.classList.replace(currentMode, newMode);
    localStorage.setItem('theme', newMode);
    updateButtonText(newMode);
}); 