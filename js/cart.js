document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
     
    // Obtener el carrito del localStorage o crear uno nuevo si no existe
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="alert alert-info text-center">
                    <p>Tu carrito está vacío</p>
                    <a href="products.html" class="btn btn-primary">Ir a Productos</a>
                </div>`;
            return;
        }
    }

    // Obtener el producto del localStorage
    const productInfoStr = localStorage.getItem('productInfo');

    if (!productInfoStr) {
        // Si no hay producto, mostrar mensaje de carrito vacío
        cartContainer.innerHTML = `
            <div class="alert alert-info text-center">
                <p>Tu carrito está vacío</p>
                <a href="products.html" class="btn btn-primary">Ir a Productos</a>
            </div>`;
        return;
    }

    try {
        const productInfo = JSON.parse(productInfoStr);
        const quantity = parseInt(localStorage.getItem('quantity') || '1');
        const price = parseFloat(productInfo.price.replace('$', ''));
        const subtotal = price * quantity;

        // Crear la tabla del carrito
        cartContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table" id="carritoCaja">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="${productInfo.image}" alt="${productInfo.name}" style="max-width: 100px;"></td>
                            <td>${productInfo.name}</td>
                            <td>${productInfo.price}</td>
                            <td>
                                <div class="quantity-controls">
                                    <button class="btn btn-sm btn-secondary" id="contadorColor1" onclick="updateQuantity(-1)">-</button>
                                    <span id="quantity">${quantity}</span>
                                    <button class="btn btn-sm btn-secondary" id="contadorColor1" onclick="updateQuantity(1)">+</button>
                                </div>
                            </td>
                            <td id="subtotal">$${subtotal.toFixed(2)}</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="removeFromCart()" class="bi bi-trash" viewBox="0 0 16 16" id="trash" style="cursor: pointer; color: #dc3545;">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="row justify-content-end">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">RESUMEN DE COMPRA</h5>
                            <p class="card-text">Subtotal: $${subtotal.toFixed(2)}</p>
                            <p class="card-text">Envío: $0.00</p>
                            <hr>
                            <h5 id="total">TOTAL: $${subtotal.toFixed(2)}</h5>
                            <button class="btn btn-primary w-100" onclick="checkout()" id="endShop">Finalizar compra</button>
                        </div>
                    </div>
                </div>
            </div>`;
    } catch (error) {
        console.error('Error al procesar la información del carrito:', error);
        cartContainer.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar el carrito. Por favor, intenta nuevamente.
            </div>`;
    }
});

function removeFromCart() {
    if (confirm('¿Estás seguro que deseas eliminar este producto del carrito?')) {
        // Eliminar del localStorage
        localStorage.removeItem('productInfo');
        localStorage.removeItem('quantity');
        localStorage.removeItem('cart');

        // Obtener elementos
        const row = document.querySelector('table tbody tr');
        const summaryCard = document.querySelector('.card');
        const cartContainer = document.getElementById('cart-container');

        // Agregar clase para animación de fade out
        if (row) row.style.opacity = '0';
        if (summaryCard) summaryCard.style.opacity = '0';

        // Esperar a que termine la animación
        setTimeout(() => {
            cartContainer.innerHTML = `
                <div class="alert alert-info text-center" style="opacity: 0">
                    <p>Tu carrito está vacío</p>
                    <a href="products.html" class="btn btn-primary">Ir a Productos</a>
                </div>`;
            
            // Hacer aparecer el mensaje
            setTimeout(() => {
                const alert = cartContainer.querySelector('.alert');
                if (alert) alert.style.opacity = '1';
            }, 50);
        }, 300);
    }
}

function updateQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    const currentQuantity = parseInt(quantityElement.textContent);
    const newQuantity = Math.max(1, currentQuantity + change);
    
    // Actualizar cantidad mostrada
    quantityElement.textContent = newQuantity;
    
    // Verificar si productInfo está en localStorage
    const productInfoStr = localStorage.getItem('productInfo');
    if (productInfoStr) {
        const productInfo = JSON.parse(productInfoStr);
        const price = parseFloat(productInfo.price.replace('$', ''));
        const subtotal = price * newQuantity;
        
        // Actualizar subtotal
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        
        // Actualizar en localStorage
        localStorage.setItem('quantity', newQuantity.toString());
    }
}

function checkout() {
    alert('¡Gracias por tu compra!');
    localStorage.removeItem('productInfo');
    localStorage.removeItem('quantity');
    window.location.href = 'index.html';
}
