document.addEventListener('DOMContentLoaded', () => {
    const toggle=document.getElementById('toggle');
    const labeltoggle=document.getElementById('togglelabel');
    const darkModeEnabled=localStorage.getItem('dark-mode')==='enabled';

    if (darkModeEnabled) {
        document.body.classList.add('darkMode');
        toggle.checked = true; // Marca el toggle como seleccionado
        labeltoggle.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Cambia a ícono de sol
    } else {
        document.body.classList.remove('darkMode');
        toggle.checked=false;
        labeltoggle.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Cambia a ícono de luna
    }


    toggle.addEventListener('change',(event)=>{
        const checked=event.target.checked;

        if(checked){
            document.body.classList.add('darkMode');
            localStorage.setItem('dark-mode', 'enabled')
            labeltoggle.innerHTML='<i class="fa-solid fa-sun"></i>';
        } else {
            document.body.classList.remove('darkMode');
            localStorage.setItem('dark-mode', 'disabled');
            labeltoggle.innerHTML='<i class="fa-solid fa-moon"></i>';
        }
    });
});