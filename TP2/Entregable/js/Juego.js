let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let reiniciar = document.querySelector(".tableroOriginal");
reiniciar.style.display = 'none';
reiniciar.style.visibility = 'hidden';
reiniciar.disabled = true;

let contGanador = document.querySelector(".contenedorGanador");
contGanador.style.display = 'none';
contGanador.style.visibility = 'hidden';
contGanador.disabled = true;

let ganador = document.querySelector("#ganador");
let gano = document.createElement("p");
let empate = null;
let resultado = null;

// JUGADOR 1
let fichas1 = [];
let fillStyleJ1 = '#F37A15';
let strokeStyleJ1 = '#D46000';

// JUGADOR 2
let fichas2 = [];
let fillStyleJ2 = '#3F5BCF';
let strokeStyleJ2 = '#0A2699';

let tablero = null;
let matrizTablero = null;

let imgTablero = new Image();
imgTablero.src = "./image/fondoTablero.jpg";

let imgFicha = new Image();
imgFicha.src= "./image/Ficha.png";

let ultimaClickeada = null;
let xOriginal = null;
let yOriginal = null;

let juegaJugador1 = true;
const JUGADA_GANADORA = 4;

// SELECCIONAR TABLERO

let tableros = document.querySelector("#selectTablero");
tableros.addEventListener("click", function() {
    if(tablero != null) {
        // Si se cambia de dimensiones se regenera el tablero 
        fichas1 = [];
        fichas2 = [];
        matrizTablero = xOriginal = yOriginal = ultimaClickeada = null;
        juegaJugador1 = true;
        tablero = null;
    }
    switch (tableros.value) {
        case "4x4":
            tablero = new Tablero(4, 4, ctx, canvas, imgTablero);
            iniciarJuego(tablero, imgFicha);
            break;
        case "6x8":
            tablero = new Tablero(6, 8, ctx, canvas, imgTablero);
            iniciarJuego(tablero, imgFicha);
            break;
        case "7x6":
            tablero = new Tablero(7, 6, ctx, canvas, imgTablero);
            iniciarJuego(tablero, imgFicha);
            break;
        case "7x9":
            tablero = new Tablero(7, 9, ctx, canvas, imgTablero);
            iniciarJuego(tablero, imgFicha);
            break;
        
    };
    if(tablero != null) {
        reiniciar.style.display = '';
        reiniciar.style.visibility = 'visible';
        reiniciar.disabled = false;
    }
});

reiniciar.addEventListener("click", function() { 
    let colOriginal = tablero.getColumna();
    let filOriginal = tablero.getFila();
    fichas1 = [];
    fichas2 = [];
    matrizTablero = null;
    ultimaClickeada = null;
    xOriginal = null;
    yOriginal = null;
    empate = null;
    juegaJugador1 = true;
    if(!contGanador.disabled) {
        gano.removeChild(resultado);
        ganador.removeChild(gano);
        canvas.style.display = '';
        canvas.style.visibility = 'visible';
        canvas.disabled = false;    
    }
    contGanador.style.display = 'none';
    contGanador.style.visibility = 'hidden';
    contGanador.disabled = true; 
    tablero = new Tablero(filOriginal, colOriginal, ctx, canvas, imgTablero);
    iniciarJuego(tablero, imgFicha);
});

// DIBUJAR FICHAS POR PRIMERA VEZ
function dibujarFichas(tablero, imgFicha) {
    let radio = tablero.getRadioParaFicha() * 0.8;
    // Fichero izquierdo
    for (let posX = tablero.getX1(); posX < tablero.getAnchoFichero(); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas1.length < tablero.getTotalFichas()/2; posY += tablero.getAltoFicha()) {
            let ficha = new Ficha(posX, posY, radio, ctx, fillStyleJ1, strokeStyleJ1, false, imgFicha, 1);
            fichas1.push(ficha);
        }
    }
    // Fichero derecho
    for (let posX = tablero.getX2(); posX < ((tablero.getAnchoFichero() * 2) + tablero.getAncho()); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas2.length < tablero.getTotalFichas()/2; posY += tablero.getAltoFicha()) {
            let ficha = new Ficha(posX, posY, radio, ctx, fillStyleJ2, strokeStyleJ2, false, imgFicha, 2);
            fichas2.push(ficha);
        }
    }
}

// COMIENZA EL JUEGO
function iniciarJuego(tablero, imgFicha) {
    matrizTablero = tablero.cargarMatriz();
    empate = tablero.getColumna() * tablero.getFila();
    dibujarFichas(tablero, imgFicha);
    tablero.drawTapa();
    tablero.drawTurno(juegaJugador1);

    canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mousemove", onmousemove, false);
    canvas.addEventListener("mouseup", onmouseup, false);
    canvas.addEventListener("mouseleave", onmouseleave, false);
}

// --------------------------- EVENTOS DE MOUSE ----------------------------------

function onmousedown(event) {
    let x = event.layerX;
    let y = event.pageY - canvas.offsetTop;
    
    if(ultimaClickeada != null) {
        ultimaClickeada.setSeleccionada(false);
        ultimaClickeada = null;
    }
    
    if(juegaJugador1) {
        ultimaClickeada = buscarFigClickeada(x, y, fichas1);
    }
    else {
        ultimaClickeada = buscarFigClickeada(x, y, fichas2);
    }
    
    if(ultimaClickeada != null) {
        xOriginal = ultimaClickeada.getX();
        yOriginal = ultimaClickeada.getY();
        ultimaClickeada.setSeleccionada(true);
        redibujar();
    }
}

function onmousemove(event) {
    let x = event.layerX;
    let y = event.pageY - canvas.offsetTop;
    if (ultimaClickeada != null && !ultimaClickeada.getJugada()) {
        ultimaClickeada.setPosicion(x, y);
        redibujar();
    }
}

function onmouseup(event) {
    if (ultimaClickeada != null && !ultimaClickeada.getJugada()) {
        let x = event.layerX;
        let y = event.pageY - canvas.offsetTop;
        if(tablero.enPosDeUbicacion(x, y) && tablero.hayLugar(x, y)) {
            tablero.ubicarFicha(ultimaClickeada, x, y);
            empate --;
            // entro en recursión para consultar si la ficha que ubico genera una jugada ganadora
            if(tablero.hayGanador(ultimaClickeada, JUGADA_GANADORA)) {
                contGanador.style.visibility = 'visible';
                contGanador.style.display = '';
                contGanador.disabled = false;
                // si gana jugador uno
                if(juegaJugador1) {
                    resultado = document.createTextNode("¡GANASTE! FELICITACIONES JUGADOR 1");
                    gano.style.color = '#F37A15';
                    ganador.style.border = '7px solid #F37A15'; 
                }
                // si gana jugador dos
                else {
                    resultado = document.createTextNode("¡GANASTE! FELICITACIONES JUGADOR 2");
                    gano.style.color = '#3F5BCF';
                    ganador.style.border = '7px solid #3F5BCF';
                }
                canvas.style.display = 'none';
                canvas.style.visibility = 'hidden';
                canvas.disabled = true; 
                gano.appendChild(resultado);
                ganador.appendChild(gano);
                ganador.style.visibility = 'visible';
            }
            // si se jugaron todas las fichas y nadie gano, es empate
            else if(empate == 0) {
                resultado = document.createTextNode("¡EMPATE!");

                contGanador.style.visibility = 'visible';
                contGanador.style.display = '';
                contGanador.disabled = false;

                gano.style.color = '#15ff00';
                ganador.style.border = '7px solid #15ff00';

                gano.appendChild(resultado);
                ganador.appendChild(gano);
                ganador.style.visibility = 'visible';
                
                canvas.style.display = 'none';
                canvas.style.visibility = 'hidden';
                canvas.disabled = true; 
            }
            // cambio de turno de jugador
            else {
                if(juegaJugador1) {
                    juegaJugador1 = false;
                }
                else {
                    juegaJugador1 = true;
                }
            }
        }
        else {
            ultimaClickeada.setPosicion(xOriginal, yOriginal);
            ultimaClickeada.setSeleccionada(false);
        }
        redibujar();
        ultimaClickeada = null;
    }
}

function onmouseleave() {
    if(ultimaClickeada != null) {
        ultimaClickeada.setPosicion(xOriginal, yOriginal);
        ultimaClickeada.setSeleccionada(false);
        redibujar();
    }
    ultimaClickeada = null;
}

// --------------------------- METODOS SOBRE FICHAS ----------------------------------

function buscarFigClickeada(x, y, fichas) {
    for (let i = 0; i < fichas.length; i++) {
        const ficha = fichas[i];
        if (ficha.fichaSeleccionada(x, y)) {
            return ficha;
        }
    }
    return null;
}

function redibujar() {
    tablero.draw();
    for(let f1 = 0; f1 < fichas1.length; f1 ++) {
        fichas1[f1].draw();
    }
    for(let f2 = 0; f2 < fichas2.length; f2 ++) {
        fichas2[f2].draw();
    }
    tablero.drawTapa();
    tablero.drawTurno(juegaJugador1);
}

