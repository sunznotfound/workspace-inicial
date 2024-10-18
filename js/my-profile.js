document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const imgPerfil = document.getElementById('imgPerfil'); // Imagen de perfil
    const uploadInput = document.getElementById('imageInput'); // Input para cargar imagen
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
  
    // Mostrar imagen de perfil guardada en localStorage
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      imgPerfil.src = savedImage;
    }
  
    // Al hacer clic en el botón "Editar", disparar el input de imagen
    editButton.addEventListener('click', () => {
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
  
    // Funcionalidad para eliminar la imagen de perfil
    deleteButton.addEventListener('click', () => {
      imgPerfil.src = 'img/img_perfil.png'; // Restablecer la imagen de perfil
      localStorage.removeItem('profilePicture'); // Eliminar imagen de localStorage
    });
  });
  