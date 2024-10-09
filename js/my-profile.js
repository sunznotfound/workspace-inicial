document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const themeSwitch = document.getElementById('themeSwitch');
    const body = document.body;
  
    // Cargar datos de localStorage si existen
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

    // Aplicar las validaciones de Bootstrap al enviar el formulario
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

    // Comprobar el estado del interruptor de tema en localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      body.classList.add('bg-dark', 'text-white');
      themeSwitch.checked = true;
    }

    // Funcionalidad cambiar el tema al activar el interruptor
    

    });
    