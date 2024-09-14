document.addEventListener('DOMContentLoaded', () => {
  // Obtiene referencias a los elementos del DOM
  const spinner = document.getElementById('spinner-wrapper'); // Spinner para mostrar carga
  const productList = document.getElementById('products-container'); // Contenedor donde se mostrarán los productos
  const buscarProducto = document.getElementById('buscarProducto'); // Campo de búsqueda
  const botonBorrar = document.getElementById('botonBorrar'); // Botón para borrar el campo de búsqueda
  const precioMinInput = document.getElementById('precio-min'); // Input para precio mínimo
  const precioMaxInput = document.getElementById('precio-max'); // Input para precio máximo
  const filtrarButton = document.getElementById('filtrar'); // Botón para aplicar filtro de precio
  const limpiarButton = document.getElementById('limpiar'); // Botón para limpiar filtros
  let products = []; // Array para almacenar los productos

  // Obtiene el identificador de categoría desde el almacenamiento local
  const catID = localStorage.getItem('catID');
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
  function displayProducts(products) {
    productList.innerHTML = ''; // Borra la lista actual
      
      
      let filteredProducts = products;
           if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.cost >= minPrice);
             }
          if (maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(product => product.cost <= maxPrice);

    }

    products.forEach(product => {
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
      productList.insertAdjacentHTML('beforeend', productHTML); // Añadir el producto al DOM

    });
  }

    // valor de los precios
     const currencyFormatter = new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
    });


  // Añadir evento para el clic en "Ver más"
  document.querySelectorAll('.product-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.closest('.product').getAttribute('data-product-id');
      localStorage.setItem('selectedProductId', productId); // Guardar el ID en localStorage
      window.location.href = 'product-info.html'; // Redirigir a product-info.html
    });
  });
  }

  // Función para filtrar los productos según el término de búsqueda y el rango de precios
  function filterProducts() {
    const searchTerm = buscarProducto ? buscarProducto.value.toLowerCase() : '';
    const minPrice = parseFloat(precioMinInput.value) || 0;
    const maxPrice = parseFloat(precioMaxInput.value) || Infinity;

    return products.filter(product =>
      (product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)) &&
      (product.cost >= minPrice && product.cost <= maxPrice)
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
});

    // Función para filtrar los productos según el término de búsqueda
  function filterProducts() {
    const searchTerm = buscarProducto.value.toLowerCase(); // Obtener el valor del campo de búsqueda
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }


   // Configura el evento para filtrar productos cuando el usuario escribe en el campo de búsqueda
  if (buscarProducto) {
    buscarProducto.addEventListener('input', function () {
      const filteredProducts = filterProducts(); // Filtra los productos
      displayProducts(filteredProducts); // Muestra los productos filtrados
    });
  }

   // Botón para borrar el campo de búsqueda y mostrar todos los productos
  document.getElementById('botonBorrar').addEventListener('click', function () {
    buscarProducto.value = ''; // Limpiar el campo de búsqueda
    displayProducts(products); // Mostrar todos los productos
  });


//filtrar por precio
document.getElementById("filtrar").addEventListener("click", function(){
  minPrice = document.getElementById("precio-min").value;
  maxPrice = document.getElementById("precio-max").value;

  minPrice = minPrice ? parseInt(minPrice) : undefined;
  maxPrice = maxPrice ? parseInt(maxPrice) : undefined;

  displayProducts(products);
});

// evento para limpiar números en los input max y min

document.getElementById('limpiar').addEventListener("click", function(){
  document.getElementById('precio-min').value = '';
  document.getElementById('precio-max').value = '';
});
