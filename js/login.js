document.addEventListener("DOMContentLoaded", function(){
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let usuario = document.getElementById('username').value.trim();
            let contrasena = document.getElementById('password').value.trim();

            if (usuario === "" || contrasena === "") {
                alert();
            } else {
                    sessionStorage.setItem("user", usuario);
                    window.location.replace("index.html");
            }
        });
});