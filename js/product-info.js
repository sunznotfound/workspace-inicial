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
    })
    .catch(error => {
      console.error('Error al obtener las especificaciones del producto:', error);
      });
  });