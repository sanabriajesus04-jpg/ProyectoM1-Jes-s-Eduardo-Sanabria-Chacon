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

// Funcion para convertir HEX a RGB
function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
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

        const textoColor= formatoActual === 'rgb' ? hexToRgb(item.hex) : item.hex.toUpperCase();
        
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
        const textoColor = formatoActual === 'rgb' ? hexToRgb(estadoColores[index].hex) : estadoColores[index].hex.toUpperCase();

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