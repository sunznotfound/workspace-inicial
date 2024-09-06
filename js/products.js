document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('spinner-wrapper');
  const productList = document.getElementById('products-container');
  const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';



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

document.getElementById('boton-buscar').addEventListener('click', function() {
    const searchTerm = document.getElementById('buscar-producto').value.toLowerCase();
    const products = document.querySelectorAll('.product');
  
    products.forEach(function(product) {
      const title = product.querySelector('h2').textContent.toLowerCase();
      const description = product.querySelector('p').textContent.toLowerCase();
  
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        product.style.display = 'block'; // Mostrar producto si coincide con la búsqueda
      } else {
        product.style.display = 'none'; // Ocultar producto si no coincide
      }
    });
  });
  
  document.getElementById('boton-borrar').addEventListener('click', function() {
    document.getElementById('buscar-producto').value = ''; // Limpiar el campo de búsqueda
    const products = document.querySelectorAll('.product');
  
    products.forEach(function(product) {
      product.style.display = 'block'; // Mostrar todos los productos nuevamente
    });
  });
  