document.addEventListener('DOMContentLoaded', function() {
    const correoUsuario = localStorage.getItem('correoUsuario');
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${correoUsuario}`)) || [];
    const cartContainer = document.getElementById('cart-container');
    const purchaseSummary = document.getElementById('purchase-summary');
 
    // Mostrar el usuario en el NAVBAR
 let usuarioDisplay = document.getElementById("usuarioDisplay");
 let usuario = localStorage.getItem("correoUsuario");
 if (usuarioDisplay && usuario) {
     usuarioDisplay.textContent = usuario;
 }

    // Mostrar el carrito o mensaje de vacío
    if (cartProducts.length === 0) {
        cartContainer.innerHTML = `
            <div class="alert alert-info text-center">
                <p>Tu carrito está vacío</p>
                <a href="products.html" class="btn btn-primary">Ir a Productos</a>
            </div>`;
        return;
    }

    // Generar contenido del carrito
    cartContainer.innerHTML = '';
    cartProducts.forEach((cartProduct, index) => {
        const quantity = cartProduct.quantity || 1;
        const price = parseFloat(cartProduct.price.replace('$', ''));
        const subtotal = price * quantity;
        
        cartContainer.innerHTML += `
            <div class="table-responsive">
                <table class="table" id="carritoCaja">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-index="${index}">
                            <td><img src="${cartProduct.image}" alt="${cartProduct.name}" style="max-width: 100px;"></td>
                            <td>${cartProduct.name}</td>
                            <td>${cartProduct.price}</td>
                            <td>
                                <div class="quantity-controls">
                                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                                    <span id="quantity-${index}">${quantity}</span>
                                    <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                            </td>
                            <td id="subtotal-${index}">$${subtotal.toFixed(2)}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>`;
    });

    // Insertar el resumen de compra debajo de todos los productos
    purchaseSummary.innerHTML = `
        <div class="row justify-content-end">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">RESUMEN DE COMPRA</h5>
                        <p class="card-text">Subtotal: $<span id="subtotal-value">0.00</span></p>
                        <p class="card-text">Envío: $0.00</p>
                        <hr>
                        <h5 id="total">TOTAL: $0.00</h5>
                        <button class="btn btn-primary w-100" onclick="checkout()" id="endShop">Finalizar compra</button>
                    </div>
                </div>
            </div>
        </div>`;

    // Calcular y mostrar el total
    updateTotal();
});

// Función para actualizar la cantidad
function updateQuantity(index, change) {
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${localStorage.getItem('correoUsuario')}`)) || [];
    let product = cartProducts[index];
    let quantity = Math.max(1, (product.quantity || 1) + change);

    product.quantity = quantity;
    cartProducts[index] = product;
    localStorage.setItem(`carrito_${localStorage.getItem('correoUsuario')}`, JSON.stringify(cartProducts));

    document.getElementById(`quantity-${index}`).textContent = quantity;
    document.getElementById(`subtotal-${index}`).textContent = `$${(parseFloat(product.price.replace('$', '')) * quantity).toFixed(2)}`;
    updateTotal();
}

// Función para actualizar el total
function updateTotal() {
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${localStorage.getItem('correoUsuario')}`)) || [];
    let total = cartProducts.reduce((sum, product) => sum + (parseFloat(product.price.replace('$', '')) * (product.quantity || 1)), 0);
    document.getElementById('subtotal-value').textContent = total.toFixed(2);
    document.getElementById('total').textContent = `TOTAL: $${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${localStorage.getItem('correoUsuario')}`)) || [];
    if (confirm('¿Estás seguro que deseas eliminar este producto del carrito?')) {
        cartProducts.splice(index, 1);
        localStorage.setItem(`carrito_${localStorage.getItem('correoUsuario')}`, JSON.stringify(cartProducts));
        document.querySelector(`[data-index="${index}"]`).remove();
        updateTotal();

        if (cartProducts.length === 0) {
            document.getElementById('cart-container').innerHTML = `
                <div class="alert alert-info text-center">
                    <p>Tu carrito está vacío</p>
                    <a href="categories.html" class="btn btn-primary">Ir a Productos</a>
                </div>`;
            purchaseSummary.innerHTML = ''; // Eliminar el resumen si el carrito está vacío
        }
    }
}

// Función para finalizar la compra
function checkout() {
    alert('¡Gracias por tu compra!');
    localStorage.removeItem(`carrito_${localStorage.getItem('correoUsuario')}`);
    window.location.href = 'index.html';
}
