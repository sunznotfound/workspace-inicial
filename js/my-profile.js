document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  const imgPerfil = document.getElementById('imgPerfil'); // Imagen de perfil
  const uploadInput = document.createElement('input'); // Input para cargar imagen
  const body = document.body;

  // Crear input para subir imágenes
  uploadInput.type = 'file';
  uploadInput.accept = 'image/*';
  uploadInput.style.display = 'none'; // Oculto hasta que se hace clic en "Editar"
  document.querySelector('.btn').insertAdjacentElement('beforebegin', uploadInput); // Insertarlo antes del botón "Editar"

  // Mostrar imagen de perfil guardada en localStorage
  const savedImage = localStorage.getItem('profilePicture');
  if (savedImage) {
      imgPerfil.src = savedImage;
  }

  // Al hacer clic en el botón "Editar", disparar el input de imagen
  document.querySelector('.btn:first-of-type').addEventListener('click', () => {
      uploadInput.click(); // Dispara el selector de archivos
  });

  // Al seleccionar una imagen, convertirla a base64 y guardarla en localStorage
  uploadInput.addEventListener('change', () => {
      const file = uploadInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
              const base64Image = event.target.result;
              imgPerfil.src = base64Image; // Cambiar la imagen de perfil
              localStorage.setItem('profilePicture', base64Image); // Guardar en localStorage
          };
          reader.readAsDataURL(file); // Convertir la imagen a base64
      }
  });


});
