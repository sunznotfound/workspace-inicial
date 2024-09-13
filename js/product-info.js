document.addEventListener('DOMContentLoaded', function(){
    const productId=local.Storage.getItem('selectedProductId');

    if(productId){
        fetch('https://japceibal.github.io/emercado-api/products/[PRODUCT_ID].json')
            .then(response=>response.json())
            .then(product=>{
                if(product){
                    document.getElementById('product-details').innerHTML = `
                        <img src="${product.image}" alt="${product.title}" />
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p class="price">${product.price}</p>
                        <p class="sold">${product.sold}</p>
                    `;
                } else {
                    document.getElementById('product-details').innerHTML = `
                        <p>Producto no encontrado.</p>
                    `;
                }
            })
    }
})