const cursor = document.getElementById('cursor');
const header = document.querySelector('header');
const menuToggle = document.getElementById('menu-media-toggle');
const svgElement = menuToggle.querySelector('svg');
const imageRow = document.querySelector('.row');
const images = document.querySelectorAll('.image-container img');
const signScroll = document.getElementById('sign-scroll');
const signScrollmedia = document.getElementById('sign-scroll-media');
const interactiveStart = document.getElementById('interactive-start');
const interactiveStartmedia = document.getElementById('interactive-start-media');
const menu = document.getElementById('menu');
const footerUl = document.querySelector('footer ul');
const copyright = document.getElementById('©');
const instagram = document.getElementById('instagram');
const cursorInteractive = document.getElementById('cursor-interactive');

let lastCursorX = window.innerWidth / 2;
let lastCursorY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    lastCursorX = e.clientX;
    lastCursorY = e.clientY;
});

// Mueve el cursor personalizado
function moveCustomCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let scale = 1;
    const transform = window.getComputedStyle(cursor).transform;
    if (transform && transform !== 'none') {
        const match = transform.match(/matrix\(([^,]+),[^,]+,[^,]+,[^,]+,[^,]+,[^,]+\)/);
        if (match) {
            scale = parseFloat(match[1]);
        }
    }

    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;
    const scaledWidth = cursorWidth * scale;
    const scaledHeight = cursorHeight * scale;

    const minX = scaledWidth / 2;
    const maxX = window.innerWidth - scaledWidth / 2;
    const minY = scaledHeight / 2;
    const maxY = window.innerHeight - scaledHeight / 2;

    const centerX = Math.max(minX, Math.min(lastCursorX, maxX));
    const centerY = Math.max(minY, Math.min(lastCursorY, maxY));

    cursor.style.left = `${centerX - cursorWidth / 2}px`;
    cursor.style.top = `${centerY - cursorHeight / 2}px`;

    requestAnimationFrame(moveCustomCursor);
}
moveCustomCursor();

// Ocultar cuando el mouse sale del viewport
document.addEventListener('mouseleave', () => {
    cursor.style.visibility = 'hidden';
});
  
// Mostrar cuando el mouse entra al viewport
document.addEventListener('mouseenter', () => {
    cursor.style.visibility = 'visible';
});

// Duplica el tamaño del cursor al hacer clic
document.addEventListener('mousedown', (event) => {
    if (
        event.target.closest('.interactive') ||
        event.target.closest('.interactive-gallery') ||
        event.target.closest('.interactive-expand') ||
        event.target.closest('.interactive-write')
    ) {
        return;
    }
    cursor.style.transform = 'scale(1.5)';
    cursor.style.transition = 'transform 0.2s';
});

// Restaura el tamaño del cursor al soltar el botón del mouse
document.addEventListener('mouseup', (event) => {
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
    if (
        elementUnderCursor && elementUnderCursor.closest('.interactive') ||
        elementUnderCursor && elementUnderCursor.closest('.interactive-gallery') ||
        elementUnderCursor && elementUnderCursor.closest('.interactive-expand') ||
        elementUnderCursor && elementUnderCursor.closest('.interactive-write')
    ) {
        return;
    }
    cursor.style.transform = 'scale(1)';
    cursor.style.transition = 'transform 0.2s';
});

// Detecta si el carrusel es vertical o horizontal
function isVerticalCarousel() {
    const imageRow = document.querySelector('.row');
    return getComputedStyle(imageRow).flexDirection === 'column';
}

// Oculta o muestra el cursor personalizado según si hay ratón (puntero fine)
function updateCustomCursorVisibility() {
    const cursor = document.getElementById('cursor');
    if (window.matchMedia('(pointer: fine)').matches) {
        if (cursor) cursor.style.display = 'flex';
    } else {
        if (cursor) cursor.style.display = 'none';
    }
}
// Ejecuta al cargar la página
updateCustomCursorVisibility();
// Escucha cambios en el tipo de puntero
window.matchMedia('(pointer: fine)').addEventListener('change', updateCustomCursorVisibility);

// Muestra u oculta sign-scroll, sign-scroll-media, interactive-start e interactive-start-media según el scroll y la orientación del carrusel
if (imageRow) imageRow.addEventListener('scroll', () => {
    if (isVerticalCarousel()) {
        // Oculta signScrollmedia y muestra interactiveStartmedia, si el scroll no es 0 y el carrusel vertical
        if (signScrollmedia) signScrollmedia.style.visibility ='hidden';
        if (interactiveStartmedia) interactiveStartmedia.style.visibility ='visible';
        // Muestra signScrollmedia y oculta interactiveStartmedia, si el scroll es 0 y el carrusel vertical
        if (imageRow.scrollTop === 0) {
            if (signScrollmedia) signScrollmedia.style.visibility ='visible';
            if (interactiveStartmedia) interactiveStartmedia.style.visibility ='hidden';
        }
    } else {
        // Oculta signScroll y muestra interactiveStart, si el scroll no es 0 y el carrusel horizontal
        if (signScroll) signScroll.style.visibility ='hidden';
        if (interactiveStart) interactiveStart.style.visibility ='visible';
        // Muestra signScroll y oculta interactiveStart, si el scroll es 0 y el carrusel horizontal
        if (imageRow.scrollLeft === 0) {
            if (signScroll) signScroll.style.visibility ='visible';
            if (interactiveStart) interactiveStart.style.visibility ='hidden';
        }
    }
});

if (interactiveStart) interactiveStart.addEventListener('click', () => {
  imageRow.scrollLeft = 0;
});

if (interactiveStartmedia) interactiveStartmedia.addEventListener('click', () => {
  imageRow.scrollTop = 0;
});

// Estado inicial del SVG
let isMenuOpen = true;

// Cambia el contenido del SVG al hacer clic en el botón de menú
menuToggle.addEventListener('click', () => {
    // Alterna el estado del menú
    isMenuOpen = !isMenuOpen;

    // Cambia el contenido del SVG según el estado
    if (isMenuOpen) {
        svgElement.innerHTML = `
            <svg viewBox="0 0 33 33"><g><path d="M28.2,4.8c-6.4-6.4-16.9-6.4-23.3,0c-6.4,6.4-6.4,16.9,0,23.3c6.4,6.4,16.9,6.4,23.3,0C34.6,21.7,34.6,11.3,28.2,4.8z M23.1,23.1H9.9v-2.2h13.2V23.1z M23.1,17.6H9.9v-2.2h13.2V17.6z M23.1,12.1H9.9V9.9h13.2V12.1z"/></g></svg>
        `;
    } else {
        svgElement.innerHTML = `
            <svg viewBox="0 0 33 33"><g><path d="M28.2,4.8c-6.5-6.4-16.9-6.4-23.3,0c-6.4,6.4-6.4,16.9,0,23.3c6.5,6.4,16.9,6.4,23.3,0C34.6,21.7,34.6,11.3,28.2,4.8z M23.1,21.6l-1.5,1.5L16.5,18l-5.1,5.1l-1.5-1.5l5.1-5.1l-5.1-5.1l1.5-1.5l5.1,5.1l5.1-5.1l1.5,1.5L18,16.5L23.1,21.6z"/></g></svg>
        `;
    }
});

// Animación del SVG al hacer clic en el botón de menú
menuToggle.addEventListener('click', () => {
    const svg = menuToggle.querySelector('svg');
    svg.classList.add('animate');

    // Elimina la clase después de que termine la animación
    svg.addEventListener('animationend', () => {
        svg.classList.remove('animate');
    }, { once: true });
});

// Alterna la clase 'expanded' en el header al hacer clic en el botón de menú
menuToggle.addEventListener('click', () => {
    header.classList.toggle('expanded'); // Alterna la clase 'expanded' en el header
    const galleryInfoMedia = document.getElementById('gallery-info-media');
    const gallerySubtitleMedia = document.getElementById('gallery-subtitle-media');

    if (header.classList.contains('expanded')) {
        // Reinicia las variables de desplazamiento
        scrollVelocityX = 0;
        scrollVelocityY = 0;
        touchVelocityX = 0;
        touchVelocityY = 0;
        isScrolling = false;
        isTouchScrolling = false;
    }

    // Reinicia el SVG de gallery-info-media
    if (galleryInfoMedia) {
        galleryInfoMedia.innerHTML = `
            <svg viewBox="0 0 33 33"><g><path d="M16.5,0C7.4,0,0,7.4,0,16.5S7.4,33,16.5,33S33,25.6,33,16.5S25.6,0,16.5,0z M17.6,23.1h-2.2v-7.7h2.2V23.1z M17.6,12.1h-2.2V9.9h2.2V12.1z"/></g></svg>
        `;
        galleryInfoMedia.setAttribute('data-state', 'open');
    }

    //Ocultar gallery-subtitle-media
    if (gallerySubtitleMedia) gallerySubtitleMedia.style.display = 'none';

});

// Función para mover los <li> al menú en pantallas pequeñas
function moveItemsToMenu() {
    if (window.innerWidth <= 612) {
        copyright.style.display = 'flex';
        instagram.style.display = 'flex';
        // Mover al menú si no están ya allí
        if (copyright && !menu.contains(copyright.parentElement)) {
            menu.appendChild(copyright.parentElement);
        }
        if (instagram && !menu.contains(instagram.parentElement)) {
            menu.appendChild(instagram.parentElement);
        }
    } else {
        // Devolver al footer si no están ya allí
        if (copyright && !footerUl.contains(copyright.parentElement)) {
            footerUl.appendChild(copyright.parentElement);
        }
        if (instagram && !footerUl.contains(instagram.parentElement)) {
            footerUl.appendChild(instagram.parentElement);
        }
    }
}
// Ejecutar la función al cargar la página y al cambiar el tamaño de la ventana
window.addEventListener('resize', moveItemsToMenu);
window.addEventListener('load', moveItemsToMenu);

// Variables para el desplazamiento
let scrollVelocityX = 0; // Velocidad del desplazamiento horizontal
let scrollVelocityY = 0; // Velocidad del desplazamiento vertical
let isScrolling = false; // Bandera para controlar el desplazamiento suave
let startX = 0;
let startY = 0;
let scrollPositionX = 0; // Posición inicial de desplazamiento horizontal
let scrollPositionY = 0; // Posición inicial de desplazamiento vertical
let touchVelocityX = 0; // Velocidad del desplazamiento táctil horizontal
let touchVelocityY = 0; // Velocidad del desplazamiento táctil vertical
let isTouchScrolling = false; // Bandera para controlar el desplazamiento táctil

// Desplazamiento con la rueda del ratón
document.addEventListener('wheel', (e) => {
    if (header.classList.contains('expanded')) {
        e.preventDefault(); // Detén el desplazamiento si el header está expandido
        return;
    }

    const imageRow = document.querySelector('.row');
    if (imageRow) {
        if (isVerticalCarousel()) {
            scrollVelocityY += e.deltaY; // Desplazamiento vertical
            scrollVelocityY += e.deltaX; // Desplazamiento horizontal aplicado verticalmente
        } else {
            scrollVelocityX += e.deltaX; // Desplazamiento horizontal
            scrollVelocityX += e.deltaY; // Desplazamiento vertical aplicado horizontalmente
        }

        if (!isScrolling) {
            isScrolling = true;
            smoothScroll(imageRow);
        }
    }
}, { passive: false });

// Función para realizar el desplazamiento suave
function smoothScroll(imageRow) {
    if (header.classList.contains('expanded')) {
        // Detén el desplazamiento si el header está expandido
        scrollVelocityX = 0;
        scrollVelocityY = 0;
        isScrolling = false;
        return;
    }

    if (Math.abs(scrollVelocityX) > 0.5 || Math.abs(scrollVelocityY) > 0.5) {
        if (isVerticalCarousel()) {
            imageRow.scrollTop += scrollVelocityY * 0.1; // Desplazamiento vertical
        } else {
            imageRow.scrollLeft += scrollVelocityX * 0.1; // Desplazamiento horizontal
        }

        // Reducción gradual de la velocidad
        scrollVelocityX *= 0.9;
        scrollVelocityY *= 0.9;

        requestAnimationFrame(() => smoothScroll(imageRow));
    } else {
        scrollVelocityX = 0;
        scrollVelocityY = 0;
        isScrolling = false;
    }
}

// Detecta el inicio del toque
document.addEventListener('touchstart', (e) => {
    if (header.classList.contains('expanded')) {
        e.preventDefault(); // Detén el desplazamiento táctil si el header está expandido
        return;
    }

    const imageRow = document.querySelector('.row');
    if (imageRow) {
        startX = e.touches[0].clientX; // Posición inicial en X
        startY = e.touches[0].clientY; // Posición inicial en Y
        scrollPositionX = imageRow.scrollLeft; // Posición inicial de desplazamiento horizontal
        scrollPositionY = imageRow.scrollTop; // Posición inicial de desplazamiento vertical
        touchVelocityX = 0; // Reinicia la velocidad horizontal
        touchVelocityY = 0; // Reinicia la velocidad vertical
    }
});

// Detecta el movimiento del toque
document.addEventListener('touchmove', (e) => {
    if (header.classList.contains('expanded')) {
        e.preventDefault(); // Detén el desplazamiento táctil si el header está expandido
        return;
    }

    const imageRow = document.querySelector('.row');
    if (imageRow) {
        const deltaX = startX - e.touches[0].clientX; // Diferencia en X
        const deltaY = startY - e.touches[0].clientY; // Diferencia en Y

        // Calcula la velocidad según la dirección
        touchVelocityX = deltaX;
        touchVelocityY = deltaY;

        // Desplaza el carrusel
        if (isVerticalCarousel()) {
            imageRow.scrollTop = scrollPositionY + deltaY + deltaX; // Desplazamiento vertical con horizontal aplicado
        } else {
            imageRow.scrollLeft = scrollPositionX + deltaX + deltaY; // Desplazamiento horizontal con vertical aplicado
        }
    }
});

// Detecta el final del toque
document.addEventListener('touchend', () => {
    if (header.classList.contains('expanded')) {
        return; // No hagas nada si el header está expandido
    }

    if (!isTouchScrolling) {
        isTouchScrolling = true;
        smoothTouchScroll();
    }
});

// Función para realizar el desplazamiento suave táctil
function smoothTouchScroll() {
    if (header.classList.contains('expanded')) {
        // Detén el desplazamiento táctil si el header está expandido
        touchVelocityX = 0;
        touchVelocityY = 0;
        isTouchScrolling = false;
        return;
    }

    const imageRow = document.querySelector('.row');
    if (imageRow && (Math.abs(touchVelocityX) > 0.5 || Math.abs(touchVelocityY) > 0.5)) {
        if (isVerticalCarousel()) {
            imageRow.scrollTop += touchVelocityY * 0.4 + touchVelocityX * 0.4; // Desplazamiento vertical con horizontal aplicado
        } else {
            imageRow.scrollLeft += touchVelocityX * 0.4 + touchVelocityY * 0.4; // Desplazamiento horizontal con vertical aplicado
        }

        // Reducción gradual de la velocidad
        touchVelocityX *= 0.8;
        touchVelocityY *= 0.8;

        requestAnimationFrame(smoothTouchScroll);
    } else {
        touchVelocityX = 0;
        touchVelocityY = 0;
        isTouchScrolling = false;
    }
}





// Actualiza el estado del cursor al hacer scroll o redimensionar
window.addEventListener('scroll', updateCursorState, true);
window.addEventListener('resize', updateCursorState);

// Actualizar la posición del cursor y guardar las coordenadas
document.addEventListener('mousemove', (e) => {
    lastCursorX = e.clientX;
    lastCursorY = e.clientY;
    // ...tu código existente para mover el cursor...
});

// Función para actualizar el estado del cursor según el elemento bajo el puntero
function updateCursorState() {
    const el = document.elementFromPoint(lastCursorX, lastCursorY);
    const cursor = document.getElementById('cursor');
    const cursorInteractive = document.getElementById('cursor-interactive');
    const cursorInteractiveGallery = document.getElementById('cursor-interactive-gallery');
    const cursorInteractiveExpand = document.getElementById('cursor-interactive-expand');
    const cursorInteractiveWrite = document.getElementById('cursor-interactive-write');

    // Oculta todos por defecto
    if (cursorInteractive) cursorInteractive.style.display = 'none';
    if (cursorInteractiveGallery) cursorInteractiveGallery.style.display = 'none';
    if (cursorInteractiveExpand) cursorInteractiveExpand.style.display = 'none';
    if (cursorInteractiveWrite) cursorInteractiveWrite.style.display = 'none';
    cursor.style.transition = 'transform 0s';
    cursor.style.transform = 'scale(1)';

    // Si está sobre .force-expand
    if (
        el &&
        el.tagName &&
        el.tagName.toLowerCase() === 'img' &&
        el.classList.contains('force-expand')
    ) {
        cursor.style.transform = 'scale(1)';
    }
    // Si está sobre .interactive
    else if (el && el.closest('.interactive')) {
        cursorInteractive.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    }
    // Si está sobre .interactive-gallery
    else if (el && el.closest('.interactive-gallery')) {
        cursorInteractiveGallery.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    }
    // Si está sobre .interactive-expand (y no sobre force-expand)
    else if (el && el.closest('.interactive-expand')) {
        cursorInteractiveExpand.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    }
    // Si está sobre .interactive-write
    else if (el && el.closest('.interactive-write')) {
        cursorInteractiveWrite.style.display = 'block';
        cursor.style.transform = 'scale(1.5)';
    }

    // Eliminar si suprimo .image-data::after
    if (
        el &&
        el.tagName &&
        el.tagName.toLowerCase() === 'img' &&
        el.classList.contains('image-data') &&
        !el.classList.contains('force-expand')
    ) {
        const altText = el.getAttribute('alt');
        cursor.setAttribute('data-alt', altText);
        cursor.classList.add('image-data');
    } else {
        cursor.removeAttribute('data-alt');
        cursor.classList.remove('image-data');
    }
}

function loopCursorState() {
    updateCursorState();
    requestAnimationFrame(loopCursorState);
}
loopCursorState();





let lastScrollLeft = 0;
let lastScrollTop = 0;
let scrollGuardado = false;

document.querySelectorAll('.interactive-expand').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const container = this.closest('.image-container');
        const img = container.querySelector('img');
        const allContainers = document.querySelectorAll('.image-container');
        const expandCloseBtn = document.getElementById('interactive-expand-close');
        const imageRow = document.querySelector('.row');
        const galleryData = document.getElementById('gallery-data');
        const gallerySubtitle = document.getElementById('gallery-subtitle');
        const gallerySubtitleMedia = document.getElementById('gallery-subtitle-media');

        //Oculta gallery-data, gallery-subtitle y gallery-subtitle-media al expandir
        if (galleryData) galleryData.style.display = 'none';
        if (gallerySubtitle) gallerySubtitle.style.display = 'none';
        if (gallerySubtitleMedia) gallerySubtitleMedia.style.display = 'none';

        // Oculta signScroll, signScrollmedia, interactiveStart e interactiveStartmedia al expandir
        if (signScroll) signScroll.style.opacity = '0';
        if (signScrollmedia) signScrollmedia.style.opacity = '0';
        if (interactiveStart) interactiveStart.style.opacity = '0';
        if (interactiveStartmedia) interactiveStartmedia.style.opacity = '0';

        // Oculta todos los .image-data-media al expandir
        document.querySelectorAll('.image-data-media').forEach(div => {
            div.style.display = 'none';
        });

        // Si la imagen ya está expandida, NO hagas nada
        if (img && img.classList.contains('force-expand')) {
            return;
        }

        // Solo guarda el scroll en el primer clic
        if (!scrollGuardado) {
            lastScrollLeft = imageRow.scrollLeft;
            lastScrollTop = imageRow.scrollTop;
            scrollGuardado = true;
        }

        // Aplica la clase 'expand' a la imagen del contenedor seleccionado y después 'force-expand'
        if (img) {
            img.classList.add('expand');
            requestAnimationFrame(() => {
                img.classList.add('force-expand');
                img.classList.remove('expand');

                // Aplica el zoom automático la primera vez, para evitar delay en el hover, eliminar si suprimo :hover, eliminar si el problema de delay solo es por el tamaño de las imágenes
                if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                    const rect = img.getBoundingClientRect();
                    if (
                        typeof lastCursorX === 'number' &&
                        typeof lastCursorY === 'number' &&
                        lastCursorX >= rect.left &&
                        lastCursorX <= rect.right &&
                        lastCursorY >= rect.top &&
                        lastCursorY <= rect.bottom
                    ) {
                        const x = (lastCursorX - rect.left) / rect.width;
                        const y = (lastCursorY - rect.top) / rect.height;
                        img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                        img.style.transform = 'translate(-50%, -50%) scale(2)';
                    }

                    // Añade un listener para reposicionar el botón al salir del hover, eliminar si suprimo :hover
                    img.addEventListener('mouseleave', function mouseLeaveHandler() {
                        positionExpandCloseBtn(container, expandCloseBtn);
                    });
                }

                // Oculta el botón de cerrar si el cursor está sobre la imagen expandida, eliminar si suprimo :hover
                if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                    const expandCloseBtn = document.getElementById('interactive-expand-close');
                    const rect = img.getBoundingClientRect();
                    if (
                        typeof lastCursorX === 'number' &&
                        typeof lastCursorY === 'number' &&
                        lastCursorX >= rect.left &&
                        lastCursorX <= rect.right &&
                        lastCursorY >= rect.top &&
                        lastCursorY <= rect.bottom
                    ) {
                        expandCloseBtn.style.visibility = 'hidden';
                    } else {
                        expandCloseBtn.style.visibility = 'visible';
                    }
                }
            });
        }
        
        // Oculta todos los contenedores excepto el seleccionado
        allContainers.forEach(c => {
            if (c !== container) {
                c.style.display = 'none';
            }
        });
        
        // Mueve el botón de cerrar al contenedor expandido y lo muestra
        if (expandCloseBtn) {
            container.appendChild(expandCloseBtn);
            expandCloseBtn.style.display = 'flex';
            positionExpandCloseBtn(container, expandCloseBtn);

            // Reposiciona el botón al hacer resize si la imagen está expandida (force-expand o expand)
            window.addEventListener('resize', function resizeHandler() {
                if (container.querySelector('img.force-expand') || container.querySelector('img.expand')) {
                    positionExpandCloseBtn(container, expandCloseBtn);
                }
            });
        }

        // Evento para cerrar
        if (expandCloseBtn && !expandCloseBtn.hasAttribute('data-listener')) {
            expandCloseBtn.setAttribute('data-listener', 'true');
            expandCloseBtn.addEventListener('click', () => {
                // Muestra de nuevo gallery-data al cerrar
                if (galleryData) galleryData.style.display = 'flex';

                // Muestra signScroll, signScrollmedia, interactiveStart e interactiveStartmedia al cerrar
                if (signScroll) signScroll.style.opacity = '1';
                if (signScrollmedia) signScrollmedia.style.opacity = '1';
                if (interactiveStart) interactiveStart.style.opacity = '1';
                if (interactiveStartmedia) interactiveStartmedia.style.opacity = '1';

                // Muestra de nuevo los .image-data-media al cerrar
                document.querySelectorAll('.image-data-media').forEach(div => {
                    div.style.display = '';
                });

                // Muestra todos los contenedores y elimina la clase 'force-expand'
                allContainers.forEach(c => {
                    c.style.display = '';
                    const img = c.querySelector('img');
                    if (img) {
                        img.classList.remove('force-expand');

                        // Restaura los estilos de hover, eliminar si suprimo :hover
                        if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
                            img.style.transformOrigin = '';
                            img.style.transform = '';
                        }
                    }
                });

                // Mueve el botón de cerrar al body y lo oculta
                document.body.appendChild(expandCloseBtn);
                expandCloseBtn.style.display = 'none';
                
                // Restaura el scroll al cerrar (en el siguiente frame)
                requestAnimationFrame(() => {
                    imageRow.scrollLeft = lastScrollLeft;
                    imageRow.scrollTop = lastScrollTop;
                });
                scrollGuardado = false; // Permite guardar de nuevo en el siguiente ciclo

                // Reinicia el SVG de gallery-info-media, si existe
                if (galleryInfoMedia) {
                    galleryInfoMedia.innerHTML = `
                        <svg viewBox="0 0 33 33"><g><path d="M16.5,0C7.4,0,0,7.4,0,16.5S7.4,33,16.5,33S33,25.6,33,16.5S25.6,0,16.5,0z M17.6,23.1h-2.2v-7.7h2.2V23.1z M17.6,12.1h-2.2V9.9h2.2V12.1z"/></g></svg>
                    `;
                    galleryInfoMedia.setAttribute('data-state', 'open');
                }
            });
        }
    });
});

// Posiciona el botón de cerrar expandir en relación a la imagen expandida, aunque modifique el main
function positionExpandCloseBtn(container, expandCloseBtn) {
    // Busca primero img.force-expand, si no existe, busca img.expand (por compatibilidad)
    const targetImg = container.querySelector('img.force-expand') || container.querySelector('img.expand');
    if (targetImg) {
        const imgRect = targetImg.getBoundingClientRect();

        // Cambia el botón a posición fija
        expandCloseBtn.style.position = 'fixed';

        if (window.innerWidth <= 612) {
            // Centrado abajo de la imagen
            expandCloseBtn.style.left = `${imgRect.left + imgRect.width / 2 - expandCloseBtn.offsetWidth / 2}px`;
            expandCloseBtn.style.top = `${imgRect.top + imgRect.height - expandCloseBtn.offsetHeight + 44}px`;
        } else if (window.innerWidth <= 1024) {
            expandCloseBtn.style.left = `${imgRect.left + imgRect.width / 2 - expandCloseBtn.offsetWidth / 2}px`;
            expandCloseBtn.style.top = `${imgRect.top + imgRect.height - expandCloseBtn.offsetHeight + 66}px`;
        } else {
            expandCloseBtn.style.left = `${imgRect.left + imgRect.width - expandCloseBtn.offsetWidth + 55}px`;
            expandCloseBtn.style.top = `${imgRect.top}px`;
        }
    }
}

// Oculta el botón de cerrar al hacer hover sobre una imagen expandida, solo si hay ratón (pointer: fine), eliminar si suprimo :hover
document.addEventListener('mousemove', function(e) {
    // Solo ejecutar si hay ratón (no táctil)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const expandCloseBtn = document.getElementById('interactive-expand-close');
    const img = document.querySelector('.image-container img.force-expand:hover');
    const cursor = document.getElementById('cursor-interactive-expand');
    if (expandCloseBtn) {
        if (img) {
            expandCloseBtn.style.visibility = 'hidden';
            if (cursor) cursor.style.visibility = 'hidden'; // Oculta el cursor personalizado
        } else {
            expandCloseBtn.style.visibility = 'visible';
            if (cursor) cursor.style.visibility = 'visible'; // Muestra el cursor personalizado
        }
    }
});

// Añade un efecto de zoom al hacer hover sobre una imagen expandida, solo si hay ratón (pointer: fine), eliminar si suprimo :hover
document.addEventListener('mousemove', function(e) {
    // Solo ejecutar si hay ratón (no táctil)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const img = document.querySelector('.image-container img.force-expand:hover');
    if (!img) return;

    const rect = img.getBoundingClientRect();
    // Calcula la posición relativa del cursor dentro de la imagen (0 a 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Establece el transform-origin al punto bajo el cursor
    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;

    // Aplica el zoom centrado en ese punto
    img.style.transform = 'translate(-50%, -50%) scale(2)';
});

// Al salir del hover, restaura el transform-origin y el transform, solo si hay ratón (pointer: fine), eliminar si suprimo :hover
document.addEventListener('mouseleave', function(e) {
    // Solo ejecutar si hay ratón (no táctil)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    if (e.target.matches('.image-container img.force-expand')) {
        e.target.style.transformOrigin = '50% 50%';
        e.target.style.transform = 'translate(-50%, -50%)';
    }
}, true);





// Añade al cursor el contenido del atributo alt de las imágenes con la clase .image-data, solo si no tienen la clase force-expand
document.querySelectorAll('.image-data').forEach((img) => {
    img.addEventListener('mouseenter', () => {
        if (!img.classList.contains('force-expand')) {
            const altText = img.getAttribute('alt');
            document.getElementById('cursor').setAttribute('data-alt', altText);
            document.getElementById('cursor').classList.add('image-data');
        }
    });

    img.addEventListener('mouseleave', () => {
        document.getElementById('cursor').removeAttribute('data-alt');
        document.getElementById('cursor').classList.remove('image-data');
    });
});





// Función para gestionar los div.image-data-media según el tipo de puntero
function updateImageDataMedia() {
    // Muestra todos los div.image-data-media si es táctil (pointer: coarse)
    if (window.matchMedia('(pointer: coarse)').matches) {
        document.querySelectorAll('.image-container').forEach(container => {
            const img = container.querySelector('img');
            let media = container.querySelector('.image-data-media');
            // Si no existe el image-data-media, créalo
            if (!media) {
                media = document.createElement('div');
                media.className = 'image-data-media';
                container.appendChild(media);
            }
            // Actualiza el contenido de image-data-media
            if (img && media) {
                media.setAttribute('data-alt', img.getAttribute('alt') || '');
            }
        });
    }
}
// Ejecutar al cargar la página
updateImageDataMedia();
// Escuchar cambios en el tipo de puntero
window.matchMedia('(pointer: coarse)').addEventListener('change', updateImageDataMedia);





// Reposiciona el image-data a la izquierda del cursor para que no salga del viewport
function adjustCursorTooltipPosition() {
    const cursor = document.getElementById('cursor');
    if (!cursor.classList.contains('image-data')) {
        cursor.style.removeProperty('--cursor-tooltip-right');
        cursor.style.removeProperty('--cursor-tooltip-left');
        return;
    }
    // Medir el ancho del tooltip
    const altText = cursor.getAttribute('data-alt') || '';
    const temp = document.createElement('span');
    temp.style.position = 'absolute';
    temp.style.fontFamily = 'HelveticaNeueItalic';
    temp.style.fontSize = '16.5px';
    temp.style.padding = '0 16.5px';
    temp.style.height = '33px';
    temp.style.background = '#fffd32';
    temp.style.whiteSpace = 'nowrap';
    temp.innerText = altText;
    document.body.appendChild(temp);
    const tooltipWidth = temp.offsetWidth;
    document.body.removeChild(temp);

    const cursorRect = cursor.getBoundingClientRect();
    const tooltipRight = cursorRect.right + 11 + tooltipWidth;
    if (tooltipRight > window.innerWidth) {
        // Sale del viewport, usa right
        cursor.style.setProperty('--cursor-tooltip-left', 'auto');
        cursor.style.setProperty('--cursor-tooltip-right', 'calc(100% + 7.33px)');
    } else {
        // Cabe, usa left
        cursor.style.setProperty('--cursor-tooltip-right', 'auto');
        cursor.style.setProperty('--cursor-tooltip-left', 'calc(100% + 7.33px)');
    }
}
function loopAdjustCursorTooltip() {
    adjustCursorTooltipPosition();
    requestAnimationFrame(loopAdjustCursorTooltip);
}
loopAdjustCursorTooltip();





// Recarga la página si estamos arriba y se arrastra hacia abajo, solo si estamos en dispositivos táctiles
let overscrollStartY = null;
let overscrollStartX = null;

if (imageRow) imageRow.addEventListener('touchstart', function(e) {
    overscrollStartY = e.touches[0].clientY;
    overscrollStartX = e.touches[0].clientX;
});

if (imageRow) imageRow.addEventListener('touchmove', function(e) {
    if (window.matchMedia('(pointer: fine)').matches) return; // Solo móvil/táctil

    const isVertical = isVerticalCarousel();
    const scrollTop = imageRow.scrollTop;

    if (isVertical) {
        const deltaY = e.touches[0].clientY - overscrollStartY;
        // Si estamos arriba y arrastramos hacia abajo
        if (scrollTop === 0 && deltaY > 500) {
            location.reload();
        }
    }
});





// Posiciona gallery-subtitle a la derecha del final de gallery-title
function positionGallerySubtitle() {
    const galleryTitle = document.getElementById('gallery-title');
    const gallerySubtitle = document.getElementById('gallery-subtitle');
    if (galleryTitle && gallerySubtitle) {
        const titleRect = galleryTitle.getBoundingClientRect();
        // Calcula la posición: final de gallery-title + 0px
        const left = titleRect.right + 0;
        gallerySubtitle.style.position = 'fixed';
        gallerySubtitle.style.left = `${left}px`;
    }
}
window.addEventListener('resize', positionGallerySubtitle);
window.addEventListener('load', positionGallerySubtitle);




// Muestra gallery-subtitle al pasar el cursor por gallery-info o gallery-subtitle
function showGallerySubtitleOnHover() {
    const galleryInfo = document.getElementById('gallery-info');
    const gallerySubtitle = document.getElementById('gallery-subtitle');
    if (!galleryInfo || !gallerySubtitle) return;

    // Mostrar al pasar el cursor por gallery-info
    galleryInfo.addEventListener('mouseenter', () => {
        gallerySubtitle.style.display = 'flex';
    });
    galleryInfo.addEventListener('mouseleave', (e) => {
        // Solo ocultar si el cursor no entra a gallery-subtitle
        if (!gallerySubtitle.matches(':hover')) {
            gallerySubtitle.style.display = 'none';
        }
    });

    // Mostrar al pasar el cursor por gallery-subtitle
    gallerySubtitle.addEventListener('mouseenter', () => {
        gallerySubtitle.style.display = 'flex';
    });
    gallerySubtitle.addEventListener('mouseleave', () => {
        gallerySubtitle.style.display = 'none';
    });
}
window.addEventListener('DOMContentLoaded', showGallerySubtitleOnHover);





const galleryInfoMedia = document.getElementById('gallery-info-media');

// Estado inicial del SVG
let showsvgGalleryInfoMedia = true;

// Modifica el SVG al hacer clic en gallery-info-media
if (galleryInfoMedia) galleryInfoMedia.addEventListener('click', () => {
    const state = galleryInfoMedia.getAttribute('data-state');
    if (state === 'open') {
        galleryInfoMedia.innerHTML = `
            <svg viewBox="0 0 33 33"><g><path d="M28.2,4.8c-6.5-6.4-16.9-6.4-23.3,0c-6.4,6.4-6.4,16.9,0,23.3c6.5,6.4,16.9,6.4,23.3,0C34.6,21.7,34.6,11.3,28.2,4.8z M23.1,21.6l-1.5,1.5L16.5,18l-5.1,5.1l-1.5-1.5l5.1-5.1l-5.1-5.1l1.5-1.5l5.1,5.1l5.1-5.1l1.5,1.5L18,16.5L23.1,21.6z"/></g></svg>
        `;
        galleryInfoMedia.setAttribute('data-state', 'close');
    } else {
        galleryInfoMedia.innerHTML = `
            <svg viewBox="0 0 33 33"><g><path d="M16.5,0C7.4,0,0,7.4,0,16.5S7.4,33,16.5,33S33,25.6,33,16.5S25.6,0,16.5,0z M17.6,23.1h-2.2v-7.7h2.2V23.1z M17.6,12.1h-2.2V9.9h2.2V12.1z"/></g></svg>
        `;
        galleryInfoMedia.setAttribute('data-state', 'open');
    }
});

// Animación del SVG al hacer clic en el botón de info
if (galleryInfoMedia) galleryInfoMedia.addEventListener('click', () => {
    const svg = galleryInfoMedia.querySelector('svg');
    if (svg) {
        svg.classList.add('animate');
        svg.addEventListener('animationend', () => {
            svg.classList.remove('animate');
        }, { once: true });
    }
});





// Muestra u oculta gallery-subtitle-media al hacer clic en gallery-info-media
const gallerySubtitleMedia = document.getElementById('gallery-subtitle-media');

if (galleryInfoMedia) galleryInfoMedia.addEventListener('click', () => {
  if (gallerySubtitleMedia.style.display === 'flex') {
    gallerySubtitleMedia.style.display = 'none';
  } else {
    gallerySubtitleMedia.style.display = 'flex';
  }
});