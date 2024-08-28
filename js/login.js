document.addEventListener("DOMContentLoaded", function(){
    // Verificar si el usuario ya ha iniciado sesión
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      // Redirigir a index.html si ya ha iniciado sesión
      window.location.replace("index.html");
    } else {
      // Mostrar el formulario de login si no ha iniciado sesión
      document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let usuario = document.getElementById('username').value.trim();
        let contrasena = document.getElementById('password').value.trim();
  
        if (usuario === "" || contrasena === "") {
          alert("Los campos no pueden estar vacíos.");
        } else {
          sessionStorage.setItem("user", usuario);
          sessionStorage.setItem("isLoggedIn", true);
          window.location.replace("index.html");
        }
      });
    }
  });