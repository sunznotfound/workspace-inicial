document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const imgPerfil = document.getElementById('imgPerfil'); // Imagen de perfil
    const uploadInput = document.getElementById('imageInput'); // Input para cargar imagen
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');
    

      // Mostrar el usuario en el NAVBAR
      let usuarioDisplay = document.getElementById("usuarioDisplay");
      let usuario = localStorage.getItem("correoUsuario");
      if (usuarioDisplay && usuario) {
          usuarioDisplay.textContent = usuario;
      }

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
  

  //SECCIÓN DE FORMULARIO (INPUTS CON VALIDACIONES)
  document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const body = document.body;
    let correoUsuario = localStorage.getItem('correoUsuario'); 
    const labeltoggle=document.getElementById('togglelabel');

    // Cargar datos de localStorage si existen
    if (localStorage.getItem(`profileData_${correoUsuario}`)) {
      let profileData = JSON.parse(localStorage.getItem(`profileData_${correoUsuario}`));
      document.getElementById('firstName').value = profileData.firstName || '';
      document.getElementById('secondName').value = profileData.secondName || '';
      document.getElementById('lastName').value = profileData.lastName || '';
      document.getElementById('secondLastName').value = profileData.secondLastName || '';
      document.getElementById('email').value = profileData.email || '';
      document.getElementById('contactNumber').value = profileData.contactNumber || '';
      document.getElementById('imgPerfil').src = profileData.profileImg || '';

    if(profileData.themeSwitch === true) {
          document.body.classList.add('darkMode');
          toggle.checked = true; // Marca el toggle como seleccionado
          labeltoggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Cambia a ícono de sol
    } else{
      document.body.classList.remove('darkMode');
        toggle.checked=false;
        labeltoggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Cambia a ícono de luna
    }
  } 
    else {
      
      // Prellenar el campo email con el ingresado en login (si existe)
      document.getElementById('email').value = localStorage.getItem('correoUsuario') || '';
    }

    // Aplicar las validaciones de Bootstrap al enviar el formulario
    profileForm.addEventListener('submit', (e) => {
      if (!profileForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }

      profileForm.classList.add('was-validated');

      // Si el formulario es válido, guardar datos en localStorage
      if (profileForm.checkValidity()) {
        let correoUsuario = localStorage.getItem('correoUsuario'); 
        let profileData = {
          firstName: document.getElementById('firstName').value.trim(),
          secondName: document.getElementById('secondName').value.trim(),
          lastName: document.getElementById('lastName').value.trim(),
          secondLastName: document.getElementById('secondLastName').value.trim(),
          email: document.getElementById('email').value.trim(),
          contactNumber: document.getElementById('contactNumber').value.trim(),
          profileImg: imgPerfil.src,
          themeSwitch: document.getElementById('toggle').checked
        };

        localStorage.setItem(`profileData_${correoUsuario}`, JSON.stringify(profileData));
          alert('Datos guardados exitosamente.');
      }
    });

    


    });


