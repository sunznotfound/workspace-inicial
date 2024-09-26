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

    const relatedProductsContainer = document.getElementById('related-products-container'); // Obtener el contenedor
    
    const selectedProductId = localStorage.getItem('selectedProductId');
  
    if (!selectedProductId) {
      alert('No se ha seleccionado un producto');
      return;
    }
  
    const url = `https://japceibal.github.io/emercado-api/products/${selectedProductId}.json`;
  
    fetch(url)
      .then(response => response.json())
      .then(product => {
        // Actualización de la información del producto
        productNameElement.textContent = product.name;
        productDescriptionElement.textContent = product.description;
        productPriceElement.textContent = `$${product.cost}`;
        productSoldCountElement.textContent = product.soldCount;
        productCategoryElement.textContent = product.category;
        mainProductImage.src = product.images[0]; // Imagen principal
        
        // Cargar miniaturas
        thumbnails[0].src = product.images[1] || product.images[0];
        thumbnails[1].src = product.images[2] || product.images[0];
        thumbnails[2].src = product.images[3] || product.images[0];
        
        // Agregar funcionalidad de clic para cambiar la imagen principal
        thumbnails.forEach((thumbnail, index) => {
          thumbnail.addEventListener('click', () => {
            mainProductImage.src = product.images[index + 1] || product.images[0];
          });
        });
        
        // Llamar a la función para mostrar productos relacionados
        displayRelatedProducts(product.relatedProducts);
      })
      .catch(error => {
        console.error('Error al obtener las especificaciones del producto:', error);
      });
});

// Mostrar productos relacionados
function displayRelatedProducts(relatedProducts) {
  const relatedProductsContainer = document.getElementById('related-products-container'); // Reafirmamos que existe el contenedor
  relatedProductsContainer.innerHTML = ''; // Limpiar contenedor de productos relacionados

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
      localStorage.setItem('selectedProductId', relatedProductId); // Guardar el ID del producto relacionado
      window.location.href = 'product-info.html'; // Redirigir a la misma página para mostrar el nuevo producto
    });
  });
}
