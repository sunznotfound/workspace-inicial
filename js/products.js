document.addEventListener('DOMContentLoaded', () => {
  // Obtiene referencias a los elementos del DOM
  const spinner = document.getElementById('spinner-wrapper'); // Spinner para mostrar carga
  const productList = document.getElementById('products-container'); // Contenedor donde se mostrarán los productos
  const buscarProducto = document.getElementById('buscarProducto'); // Campo de búsqueda
  const botonBorrar = document.getElementById('botonBorrar'); // Botón para borrar el campo de búsqueda
  let products = []; // Array para almacenar los productos

  // Obtiene el identificador de categoría desde el almacenamiento local
  const catID = localStorage.getItem('catID');
  // Construye la URL para obtener los productos según el ID de categoría, o usa una URL por defecto
  const url = catID ? `https://japceibal.github.io/emercado-api/cats_products/${catID}.json` : 'https://japceibal.github.io/emercado-api/cats_products/101.json';

  // Realiza una solicitud para obtener los productos
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      products = data.products; // Almacena los productos en el array
      displayProducts(products); // Muestra los productos en la página
      spinner.style.display = 'none'; // Oculta el spinner
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      productList.innerHTML = '<div class="alert alert-danger">Ocurrió un error al cargar los productos.</div>';
      spinner.style.display = 'none';
    });

  // Función para mostrar los productos en el contenedor
  function displayProducts(productsToDisplay) {
    productList.innerHTML = ''; // Limpia el contenedor de productos
    // Verifica si hay productos para mostrar
    if (productsToDisplay.length === 0) {
      productList.innerHTML = '<div class="alert alert-warning">No hay productos disponibles.</div>';
      return;
    }

    // Formateador para mostrar el precio en formato de moneda
    const currencyFormatter = new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
    });

    // Itera sobre los productos y genera el HTML para cada uno
    productsToDisplay.forEach(product => {
      const productHTML = `
        <div class="product col-md-4">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">${currencyFormatter.format(product.cost)}</p>
            <p class="sold">Vendidos: ${product.soldCount}</p>
          </div>
        </div>
      `;
      // Añade el HTML del producto al contenedor
      productList.insertAdjacentHTML('beforeend', productHTML);
    });
  }

  // Función para filtrar los productos según el término de búsqueda
  function filterProducts() {
    const searchTerm = buscarProducto ? buscarProducto.value.toLowerCase() : ''; // Obtiene el término de búsqueda en minúsculas
    // Filtra los productos que contienen el término de búsqueda en el nombre o descripción
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Eventos para ordenar productos
  document.getElementById("sortAsc").addEventListener("click", function () {
    products.sort((a, b) => a.cost - b.cost);
    displayProducts(products);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    products.sort((a, b) => b.cost - a.cost);
    displayProducts(products);
  });

  document.getElementById("sortCount").addEventListener("click", function () {
    products.sort((a, b) => b.soldCount - a.soldCount);
    displayProducts(products);
  });

  // Configura el evento para filtrar productos cuando el usuario escribe en el campo de búsqueda
  if (buscarProducto) {
    buscarProducto.addEventListener('input', function () {
      const filteredProducts = filterProducts();
      displayProducts(filteredProducts);
    });
  }

  // Configura el evento para limpiar el campo de búsqueda y mostrar todos los productos
  if (botonBorrar) {
    botonBorrar.addEventListener('click', function () {
      if (buscarProducto) {
        buscarProducto.value = ''; // Limpia el campo de búsqueda
      }
      displayProducts(products); // Muestra todos los productos
    });
  }
});

