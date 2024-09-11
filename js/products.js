document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('products-container');

  // Obtener el ID de la categoría seleccionada desde localStorage
  const selectedCategoryId = localStorage.getItem('selectedCategoryId');

  if (selectedCategoryId) {
    // Construir la URL usando el ID de la categoría
    const url = `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryId}.json`;

    // Realizar la solicitud fetch con el ID de categoría dinámico
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayProducts(data.products);
        spinner.style.display = 'none';
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        productList.innerHTML = '<div class="alert alert-danger">Ocurrió un error al cargar los productos.</div>';
        spinner.style.display = 'none';
      });

  } else {
    // Si no se encuentra la categoría seleccionada, mostrar un mensaje de error
    productList.innerHTML = '<div class="alert alert-warning">No se ha seleccionado ninguna categoría.</div>';
    spinner.style.display = 'none';
  }

  function displayProducts(products) {
    if (products.length === 0) {
      productList.innerHTML = '<div class="alert alert-warning">No hay productos disponibles.</div>';
      return;
    }

    const currencyFormatter = new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
    });

    let html = '';
    products.forEach(product => {
      html += `
        <div class="product">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">${currencyFormatter.format(product.cost)}</p>
            <p class="sold">Vendidos: ${product.soldCount}</p>
          </div>
        </div>
      `;
    });

    productList.innerHTML = html;
  }
});