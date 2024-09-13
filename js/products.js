document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('products-container');
  const buscarProducto = document.getElementById('buscarProducto');
  let products = []; // Inicializamos el array vacío para almacenar los productos
  let minPrice = undefined;
  let maxPrice = undefined;

  const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

  // Fetch para obtener los productos
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      products = data.products; // Almacenar los productos
      displayProducts(products); // Mostrar los productos al cargar la página
      spinner.style.display = 'none';
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      productList.innerHTML = '<div class="alert alert-danger">Ocurrió un error al cargar los productos.</div>';
      spinner.style.display = 'none';
    });

  // Función para mostrar los productos

  function displayProducts(products) {
    productList.innerHTML = ''; // Borra la lista actual
    

    let filteredProducts = products;
    
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.cost >= minPrice);

    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.cost <= maxPrice);
    }

    filteredProducts.forEach(product => {
      productList.innerHTML += `
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
    });
  }

  const currencyFormatter = new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol'
  });

  //eventos para ordenar productos

    document.getElementById("sortAsc").addEventListener("click", function() {
      products.sort((a, b) => a.cost - b.cost);
      displayProducts(products);
    })

    document.getElementById("sortDesc").addEventListener("click", function() {
      products.sort((a, b) => b.cost - a.cost);
      displayProducts(products);
    })

    document.getElementById("sortCount").addEventListener("click", function() {
      products.sort((a, b) => b.soldCount - a.soldCount);
      displayProducts(products);
    })


  // Función para filtrar productos
  function filterProducts() {
    const searchTerm = buscarProducto.value.toLowerCase().trim(); // Obtener el valor del campo de búsqueda
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) || // Verificar si el nombre contiene el término
      product.description.toLowerCase().includes(searchTerm) // Verificar si la descripción contiene el término
    );
  }

  // Evento que se dispara cuando el usuario escribe en el campo de búsqueda
  buscarProducto.addEventListener('input', function () {
    const filteredProducts = filterProducts(); // Filtrar los productos
    displayProducts(filteredProducts); // Mostrar los productos filtrados
  });

  // Botón para borrar el campo de búsqueda y mostrar todos los productos
  document.getElementById('botonBorrar').addEventListener('click', function () {
    buscarProducto.value = ''; // Limpiar el campo de búsqueda
    displayProducts(products); // Mostrar todos los productos
  });

  //filtrar por precio
    document.getElementById("filtrar").addEventListener("click", function() {
      minPrice = document.getElementById("precio-min").value;
      maxPrice = document.getElementById("precio-max").value;

      minPrice = minPrice ? parseInt(minPrice) : undefined;
      maxPrice = maxPrice ? parseInt(maxPrice) : undefined;

      displayProducts(products);
    });

// Evento para limpiar números en los input max y min 

document.getElementById('limpiar').addEventListener('click', function() {
  document.getElementById('precio-min').value = "";
  document.getElementById('precio-max').value = "";
});
 });
