document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el usuario en la página principal
    let usuario = localStorage.getItem("correoUsuario");
    if (usuario) {
        document.getElementById("usuarioDisplay").textContent = usuario;
    }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });

    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });
});
