document.addEventListener("DOMContentLoaded", function() {
    let formulario = document.getElementById('loginForm');
    let usuario = document.getElementById('username');
    let contrasena = document. getElementById('password');
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; //Creo un json para guardar las preferencias de cada usuario.

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        let nombre = usuario.value;
        let clave = contrasena.value;

        if (usuarios.some(u => u.nombre === nombre)) {
            // Redirigir a index.html si ya ha iniciado sesión
            window.location.href="index.html";
            localStorage.setItem("correoUsuario", nombre);
        }else {
            
            if (nombre === "" || clave === "") {
            alert("Los campos no pueden estar vacíos.");
        } else {
            // Guardar el usuario en localStorage
            localStorage.setItem("correoUsuario", nombre);
            usuarios.push({nombre, clave}); // Si el usuario no estaba registrado previamente, lo agrega al json de usuarios.
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            window.location.href="index.html";
        }}
    })
});