// 1. Seleccionamos los elementos principales de nuestro HTML
const botonGenerar = document.getElementById('generar-paleta');
const selectCantidad = document.getElementById('cantidad-colores');
const contenedorPaleta = document.getElementById('paleta');

// Nuevo 1: Seleccionamos el selector de formato que pondremos en el html
const selectFormato = document.getElementById('formato-color');

// 2. Función para crear un código de color hexadecimal aleatorio (ej: #4A90E2)
function generarColorAleatorio() {
    // Definimos los caracteres permitidos en un código hexadecimal
    const letrasYNumeros = '0123456789ABCDEF';
    let colorHex = '#';

    // Un color hexadecimal tiene 6 caracteres después del '#'
    for (let i = 0; i < 6; i++) {
        // Elegimos un índice aleatorio del 0 al 15
        const indiceAleatorio = Math.floor(Math.random() * 16);
        // Le sumamos el carácter correspondiente al color
        colorHex += letrasYNumeros[indiceAleatorio];
    }

    return colorHex;
}

// Nuevo 2: Funcion matematica para convertir hexadecimal a RGB
function hexARgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
}
// 3. Función principal que genera la paleta de colores
function crearPaleta() {
    // Limpiamos el contenedor para borrar los colores anteriores
    contenedorPaleta.innerHTML = '';

    // Obtenemos cuántos colores quiere el usuario (convertido a número entero)
    const cantidad = parseInt(selectCantidad.value);

    // Nuevo 3: leemos el formato elegido ('hex' o 'rgb')
    const formatoElegido = selectFormato ? selectFormato.value : 'hex';

    // Creamos un ciclo (bucle) que se repetirá según la cantidad elegida
    for (let i = 1; i <= cantidad; i++) {
        // Generamos un color aleatorio
        const colorAleatorio = generarColorAleatorio();
         
        // Nuevo 4: Su version en RGB
        const colorRgb = hexARgb(colorAleatorio);

        // Creamos un elemento <div> para la tarjeta del color
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('color-card'); // Le asignamos una clase para darle estilo en CSS
        
        // Nuevo 5: Iniciamos el bloqueo en falso por defecto
        tarjeta.dataset.bloqueado = "false";

        // NUevo 6: Guardamos el color HEX en los datos de la tarjeta
        tarjeta.dataset.hex = colorAleatorio;

        // Nuevo 7: Decidimos que texto mostrar segun el formato
        const textoAMostrar =formatoElegido === 'hex' ? colorAleatorio: colorRgb;
        tarjeta.style.backgroundColor = colorAleatorio; // Pintamos el fondo con el color generado

        // Agregamos el contenido interno de la tarjeta (Título y el código Hex)
        tarjeta.innerHTML = `
            <h3>Color ${i}</h3>
           <p class ="texto-color">${textoAMostrar}</p>
           <button class ="btn-bloquear" type ="button"> Desbloquear </button>
        `;

        // 4. Agregamos un evento para que al hacer clic en la tarjeta, se copie el color
        tarjeta.addEventListener('click', function(e) {

            // Nuevo 8: Si hacen clic en el boton de bloquear, evitamos que se copie
            if (e.target.classList.contains('btn-bloquear')) return;

            // Usamos la API del portapapeles para copiar el texto
            navigator.clipboard.writeText(colorAleatorio)
                .then(() => {
                    alert(`¡Color ${colorAleatorio} copiado al portapapeles!`);
                })
                .catch(err => {
                    console.error('Error al copiar: ', err);
                });
        });

        // Nuevo 9: Evento para el boton de bloqueo individual
        const btnBloquear = tarjeta.querySelector('.btn-bloquear');
        btnBloquear.onclick = function(e) {
            e.stopPropagation();
            if (tarjeta.dataset.bloqueado === "true") {
                tarjeta.dataset.bloqueado = "false";
                btnBloquear.innerText = "Desbloquear";
                tarjeta.classList.remove('bloqueada');
            }
            else {
                tarjeta.dataset.bloqueado = "tue";
                btnBloquear.innerText = "Bloqueado";
                tarjeta.classList.add('bloqueada');
            }
        };

        // Finalmente, metemos la tarjeta creada dentro del contenedor en el HTML
        contenedorPaleta.appendChild(tarjeta);
    }
}

// 5. Escuchamos el clic en el botón para ejecutar la función de crear paleta
botonGenerar.addEventListener('click', crearPaleta);


// Nuevo 10: Escuchamos si el usuario cambia el selector de formato para actual:
if (selectFormato) {
    selectFormato.addEventListener('change', function() {
        const formatoElegido = selectFormato.value;
        const tarjeta = contenedorPaleta.querySelectorAll('.color-card');

        tarjeta.forEach(tarjeta => {
            const colorHex = tarjeta.dataset.hex;
            const parrafo = tarjeta.querySelector('.texto-color');
            if (parrafo && colorHex) {
                parrafo.textContent = formatoElegido === 'hex' ? colorHex : hexARgb(colorHex);
            }

         });
    });
}

// Escuchamos cuando cambia el selector de cantidad para actualizar la paleta al instante
selectCantidad.addEventListener('change', crearPaleta);

//Generar una paleta inicial al cargar la pagina por primera vez
crearPaleta();