document.addEventListener('DOMContentLoaded', function() {
    const correoUsuario = localStorage.getItem('correoUsuario');
    let cartProducts = JSON.parse(localStorage.getItem(`carrito_${correoUsuario}`)) || [];
    const cartContainer = document.getElementById('cart-container');
    const purchaseSummary = document.getElementById('purchase-summary');

    // Mostrar el usuario en el NAVBAR
    const usuarioDisplay = document.getElementById("usuarioDisplay");
    if (usuarioDisplay && correoUsuario) {
        usuarioDisplay.textContent = correoUsuario;
    }

   // Mostrar el carrito o mensaje de vacío
    if (cartProducts.length === 0) {
    cartContainer.innerHTML = `
        <div class="alert alert-info text-center">
            <p>Tu carrito está vacío</p>
            <a href="products.html" class="btn btn-primary">Ir a Productos</a>
        </div>`;
    
    // Anular datos de compra
    purchaseSummary.innerHTML = '';  // Se elimina el resumen de compra si el carrito está vacío

    // Eliminar los datos de compra (asegurándote que el área de datos-compra también se vacíe)
    const datosCompra = document.getElementById('datos-compra');
    if (datosCompra) {
        datosCompra.style.display = 'none';  // Esto oculta el contenedor de los datos de compra
    }

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
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-index="${index}">
                            <td><img src="${cartProduct.image}" alt="${cartProduct.name}" style="max-width: 100px;"></td>
                            <td>${cartProduct.name}</td>
                            <td>${cartProduct.price}</td>
                            <td>
                                <div class="quantity-controls"> 
                                    <button class="btn btn-sm btn-secondary" id="contadorColor1" onclick="updateQuantity(${index}, -1)">-</button>
                                    <span id="quantity-${index}">${quantity}</span>
                                    <button class="btn btn-sm btn-secondary" id="contadorColor2" onclick="updateQuantity(${index}, 1)">+</button>
                                </div>
                                
                            </td>
                            <td id="subtotal-${index}">$${subtotal.toFixed(2)}</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" onclick="removeFromCart(${index})" class="bi bi-trash" viewBox="0 0 16 16" style="cursor: pointer; color: #dc3545;">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>   
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
                        <h5 class="card-title">RESUMEN</h5>
                         <p class="card-text">Cantidad total de artículos: <span id="total-quantity">0</span></p>
                        <p class="card-text">Costo de envío: $<span id="shipping-cost">0.00</span></p>
                         <p class="card-text">Subtotal: $<span id="subtotal-value">0.00</span></p>
                        
                        <hr>
                        <h5 id="total">TOTAL: $0.00</h5>
                        <button class="btn btn-primary w-100" id=finalizarCompra onclick="checkout()">Finalizar compra</button>
                    </div>
                </div>
            </div>
        </div>`;

    // Calcular y mostrar el total
    updateTotal();

    // Función para finalizar la compra si se cumplen las validaciones
    const finalizarCompraBtn = document.getElementById('finalizarCompra');

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener('click', function () {
            let errores = [];

            // Validar que los campos de dirección no estén vacíos
            const camposDireccion = ['departamento', 'localidad', 'calle', 'numero', 'esquina'];
            camposDireccion.forEach(campoId => {
                const campo = document.getElementById(campoId);
                if (!campo || campo.value.trim() === '') {
                    errores.push(`El campo ${campoId} está vacío.`);
                }
            });

            // Validar que haya un tipo de envío seleccionado
            const tipoEnvio = document.querySelector('input[name="tipoEnvio"]:checked');
            if (!tipoEnvio) {
                errores.push('No se ha seleccionado un tipo de envío.');
            }
            
            // Validar que se haya seleccionado una forma de pago
            const formaPago = document.getElementById('formaPago');
            if (!formaPago || formaPago.value.trim() === '') {
                errores.push('No se ha seleccionado una forma de pago.');
            }

            // Resultado de la compra
            if (errores.length > 0) {
                alert('Errores encontrados:\n' + errores.join('\n'));
            } else {
                alert('¡Gracias por tu compra!');
                localStorage.removeItem(`carrito_${localStorage.getItem('correoUsuario')}`);
                window.location.href = 'index.html';               
            }
        });
    }
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
    let subtotal = 0;
    let totalQuantity = 0;

    cartProducts.forEach(product => {
        subtotal += parseFloat(product.price.replace('$', '')) * (product.quantity || 1);
        totalQuantity += (product.quantity || 1);
    });

    // Obtener el valor del envío seleccionado
    let shippingPercentage = parseFloat(document.querySelector('input[name="tipoEnvio"]:checked')?.value || 0);
    let shippingCost = subtotal * shippingPercentage;
    let totalWithShipping = subtotal + shippingCost;

    // Actualizar valores en el resumen
    document.getElementById('subtotal-value').textContent = subtotal.toFixed(2);
    document.getElementById('shipping-cost').textContent = shippingCost.toFixed(2);
    document.getElementById('total').textContent = `TOTAL: $${totalWithShipping.toFixed(2)}`;
    document.getElementById('total-quantity').textContent = totalQuantity;
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
            // El carrito está vacío, eliminar el resumen de compra
            document.getElementById('cart-container').innerHTML = `
                <div class="alert alert-info text-center">
                    <p>Tu carrito está vacío</p>
                    <a href="categories.html" class="btn btn-primary">Ir a Productos</a>
                </div>`;
                // Eliminar el contenido del resumen de compra
                const purchaseSummary = document.getElementById('purchase-summary');
                if (purchaseSummary) {
                    purchaseSummary.innerHTML = ''; // Limpiar el resumen de compra
                }            
         // Eliminar los datos de compra (asegurándote que el área de datos-compra también se vacíe)
            const datosCompra = document.getElementById('datos-compra');
            if (datosCompra) {
                datosCompra.style.display = 'none';  // Esto oculta el contenedor de los datos de compra
            }
        }

        
    }
}



