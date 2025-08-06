document.addEventListener('DOMContentLoaded', function() {
    navFija()
    resaltarNav()
    crearGaleria()
    scrollNav()
});

function navFija() {
    const header = document.querySelector('.header'); // Selecciona la barra de navegación
    const sobreFestival = document.querySelector('.sobre-festival'); // Selecciona el body del documento

    window.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1) { // Si la parte inferior del elemento es menor que 0
            header.classList.add('fijo'); // Añade la clase fijo a la barra de navegación
        } else {
            header.classList.remove('fijo'); // Elimina la clase fijo de la barra de navegación
        }
    })
};

function resaltarNav() {

    document.addEventListener('scroll', function(){ // Escucha el evento scroll en el documento
        const secciones = document.querySelectorAll('section'); // Selecciona todas las secciones del documento
        const enlaces = document.querySelectorAll('.navegacion-principal a'); // Selecciona todos los enlaces de la barra de navegación

        let actual = ''; // Variable para almacenar la sección actual

        secciones.forEach( section => { // Itera sobre cada sección
            const sectionTop = section.offsetTop; // Obtiene la posición superior de la sección
            const sectionHeight = section.clientHeight; // Obtiene la altura de la sección

            if(window.scrollY >= (sectionTop - sectionHeight /3)){ // Si la posición del scroll es mayor o igual que la posición superior de la sección menos un tercio de la altura de la sección
                actual = section.id // Asigna el id de la sección actual a la variable actual
            }
        })

        enlaces.forEach( enlace => { // Itera sobre cada enlace
            enlace.classList.remove('activo') // Elimina la clase activo de todos los enlaces
            if(enlace.getAttribute('href') === `#${actual}`){ // Si el href del enlace es igual al id de la sección actual
                enlace.classList.add('activo') // Añade la clase activo al enlace actual
            }
        })
    })
}

function crearGaleria() {
    const cantidad_imagenes = 16; // Cambia este número según la cantidad de imágenes que tengas
    const galeria = document.querySelector('.galeria-imagenes'); // Selecciona el contenedor de la galería

    for (let i = 1; i <= cantidad_imagenes ; i++) { // Itera desde 1 hasta la cantidad de imágenes
        const imagen = document.createElement('IMG'); // Crea un nuevo elemento html de imagen
        imagen.src = `src/img/gallery/full/${i}.jpg`; // Ruta de la imagen y la iteramos con i
        imagen.alt = `Imagen ${i}`; // Texto alternativo para la imagen

        //Event handler para abrir la imagen en un modal que es una ventana emergente
        imagen.onclick = function() {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen); // Añade la imagen al contenedor de la galería

    }
}

function mostrarImagen(i){

    const imagen = document.createElement('IMG'); // Crea un nuevo elemento html de imagen
    imagen.src = `src/img/gallery/full/${i}.jpg`; // Ruta de la imagen y la iteramos con i
    imagen.alt = `Imagen ${i}`; // Texto alternativo para la imagen

    const modal = document.createElement('DIV'); // Crea un nuevo elemento div para el modal
    modal.classList.add('modal'); // Añade la clase modal al div
    modal.onclick = cerrarModal// Elimina el modal al hacer clic en él

    const botonCerrar = document.createElement('BUTTON'); // Crea un nuevo elemento html de párrafo
    botonCerrar.textContent = 'X'; // Texto del botón
    botonCerrar.classList.add('btn-cerrar'); // Añade la clase btn-cerrar al botón
    botonCerrar.onclick = cerrarModal; // Elimina el modal al hacer clic en el botón


    modal.appendChild(imagen); // Añade la imagen al modal
    modal.appendChild(botonCerrar); // Añade el botón al modal

    const body = document.querySelector('body'); // Selecciona el body del documento
    body.classList.add('overflow-hidden'); // Añade la clase modal-open al body para evitar el scroll
    body.appendChild(modal); // Añade el modal al body
}

function cerrarModal() {
    const modal = document.querySelector('.modal'); // Selecciona el modal existente
    modal.classList.add('fadeOut'); // Añade la clase fade-out para la animación de salida
    setTimeout(() => {
        modal?.remove(); // Elimina el modal después de 300ms

        const body = document.querySelector('body'); // Selecciona el body del documento
        body.classList.remove('overflow-hidden'); // Añade la clase modal-open al body para evitar el scroll
    }, 200);
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}