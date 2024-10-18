document.addEventListener("DOMContentLoaded", function() {
    // Mostrar el usuario en la página principal
    let usuarioDisplay = document.getElementById("usuarioDisplay");
    let usuario = localStorage.getItem("correoUsuario");
    if (usuarioDisplay && usuario) {
        usuarioDisplay.textContent = usuario;
    }

    const categorias = {
        autos: 101,
        juguetes: 102,
        muebles: 103
    };

    for (const [key, value] of Object.entries(categorias)) {
        const element = document.getElementById(key);
        if (element) {
            element.addEventListener("click", function() {
                localStorage.setItem("catID", value);
                window.location = "products.html";
            });
        }
    }

    // Funcionalidad para cierre de sesión en dropdown 
    document.getElementById('logout').addEventListener('click', function () {
        // Eliminar el usuario del localStorage y sessionStorage
        localStorage.removeItem("correoUsuario");
        sessionStorage.removeItem("isLoggedIn"); // Remover la sesión activa
        sessionStorage.removeItem("user");

        window.location = 'login.html'; // Redirigir al inicio de sesión
    });
});


