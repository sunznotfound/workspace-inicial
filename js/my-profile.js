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

  // Cargar datos del perfil desde localStorage si existen
  if (localStorage.getItem('profileData')) {
      const profileData = JSON.parse(localStorage.getItem('profileData'));
      document.getElementById('firstName').value = profileData.firstName || '';
      document.getElementById('secondName').value = profileData.secondName || '';
      document.getElementById('lastName').value = profileData.lastName || '';
      document.getElementById('secondLastName').value = profileData.secondLastName || '';
      document.getElementById('email').value = profileData.email || '';
      document.getElementById('contactNumber').value = profileData.contactNumber || '';
  } else {
      // Prellenar el campo email con el ingresado en login (si existe)
      document.getElementById('email').value = localStorage.getItem('loginEmail') || '';
  }

  // Validaciones de Bootstrap al enviar el formulario
  profileForm.addEventListener('submit', (e) => {
      if (!profileForm.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
      }

      profileForm.classList.add('was-validated');

      // Si el formulario es válido, guardar datos en localStorage
      if (profileForm.checkValidity()) {
          const profileData = {
              firstName: document.getElementById('firstName').value.trim(),
              secondName: document.getElementById('secondName').value.trim(),
              lastName: document.getElementById('lastName').value.trim(),
              secondLastName: document.getElementById('secondLastName').value.trim(),
              email: document.getElementById('email').value.trim(),
              contactNumber: document.getElementById('contactNumber').value.trim()
          };

          localStorage.setItem('profileData', JSON.stringify(profileData));
          alert('Datos guardados exitosamente.');
      }
  });

  // Funcionalidad para el botón "Eliminar" de la imagen de perfil
  document.querySelector('.btn:last-of-type').addEventListener('click', () => {
      // Eliminar la imagen del localStorage
      localStorage.removeItem('profilePicture');
      // Restablecer la imagen a la imagen por defecto
      imgPerfil.src = 'img/img_perfil.png'; // Cambia esta ruta si es necesario
  });

  // Comprobar el estado del interruptor de tema en localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
      body.classList.add('bg-dark', 'text-white');
  }
});

