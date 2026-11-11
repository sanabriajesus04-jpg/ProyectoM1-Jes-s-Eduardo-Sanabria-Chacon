// Seleccion de elementos DOM
const selectCantidad = document.getElementById('cantidad-colores');
const selectFormato = document.getElementById('formato-color');
const btnGenerar = document.getElementById('generar-paleta');
const contenedorPaleta = document.getElementById('paleta');

// Estado global para almacenar las tarjetas activas
let estadoColores = [];

// Funcion para generar un color aleatorio en formato HEX
function generarHexAleatorio() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Funcion para convertir HEX a RGB (por si se usa en el futuro)
function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

// --- MODIFICACIÓN 1: Función para convertir HEX a RGBA ---
function hexToRgba(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

// --- MODIFICACIÓN 2: Función para convertir HEX a HSL ---
function hexToHsl(hex) {
    const cleanHex = hex.replace('#', '');
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Sincroniza la cantidad de elementos en el estado segun el select
function sincronizarEstadoColores() {
    const cantidadRequerida = parseInt(selectCantidad.value, 10);

    while (estadoColores.length < cantidadRequerida) {
        estadoColores.push({ hex: generarHexAleatorio(), lock: false});
    }
    if (estadoColores.length > cantidadRequerida) {
        estadoColores = estadoColores.slice(0, cantidadRequerida);
    }
}

// Genera nuevos colores solo para los que NO estan bloqueados
function regenerarColores() {
    sincronizarEstadoColores();
    estadoColores.forEach(item => {
        if (!item.lock) {
            item.hex = generarHexAleatorio();
        }
    });
    renderizarPaleta();
}

// Renderiza las tarjetas en el DOM
function renderizarPaleta() {
    sincronizarEstadoColores();
    contenedorPaleta.innerHTML = '';
    const formatoActual = selectFormato.value;

    estadoColores.forEach((item, index) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('color-card');
        tarjeta.style.backgroundColor = item.hex;
        tarjeta.dataset.index = index; // Guardamos el indice para identificarla

        // --- MODIFICACIÓN 3: Lógica para detectar formato HEX, RGBA o HSL ---
        let textoColor = item.hex.toUpperCase();
        if (formatoActual === 'rgba') {
            textoColor = hexToRgba(item.hex);
        } else if (formatoActual === 'hsl') {
            textoColor = hexToHsl(item.hex);
        }
        
        tarjeta.innerHTML = `
        <div class="card-texto-color"> 
        ${textoColor}
        </div>
        <button type="button" class="btn-bloqueo" data-index="${index}">
        ${item.lock ? '🔒 Bloqueado' : '🔓 Desbloqueado'}
        </button>
        `;

        contenedorPaleta.appendChild(tarjeta);
    });
}

// --- DELEGACIÓN DE EVENTOS EN EL CONTENEDOR ---

contenedorPaleta.addEventListener('click', (e) => {
    // 1. Si se hizo clic en el botón de bloqueo
    if (e.target.classList.contains('btn-bloqueo')) {
        const index = parseInt(e.target.dataset.index, 10);
        estadoColores[index].lock = !estadoColores[index].lock;
        renderizarPaleta(); // Actualiza la vista de inmediato
        return;
    }

    // 2. Si se hizo clic en la tarjeta (para copiar el color)
    const tarjeta = e.target.closest('.color-card');
    if (tarjeta) {
        const index = parseInt(tarjeta.dataset.index, 10);
        const formatoActual = selectFormato.value;
        
        // --- MODIFICACIÓN 4: Mantener el mismo formato seleccionado al copiar ---
        let textoColor = estadoColores[index].hex.toUpperCase();
        if (formatoActual === 'rgba') {
            textoColor = hexToRgba(estadoColores[index].hex);
        } else if (formatoActual === 'hsl') {
            textoColor = hexToHsl(estadoColores[index].hex);
        }

        navigator.clipboard.writeText(textoColor).then(() => {
            alert(`¡Copiado al portapapeles!: ${textoColor}`);
        });
    }
});

// --- EVENTOS GENERALES ---

btnGenerar.addEventListener('click', regenerarColores);
selectCantidad.addEventListener('change', renderizarPaleta);
selectFormato.addEventListener('change', renderizarPaleta);

// Inicializar al cargar
renderizarPaleta();