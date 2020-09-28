let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

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

let ultimaClickeada = null;
let xOriginal = null;
let yOriginal = null;

let juegaJugador1 = true;
const JUGADA_GANADORA = 4;

let tableros = document.querySelector("#tablero");
tableros.addEventListener("click", function() {

    let tableroFondo = new Image();
    tableroFondo.src = "./image/fondoTablero.jpg";

    let imgFicha = new Image();
    imgFicha.src= "./image/Ficha.png";

    switch (tableros.value) {
        case "7x6":
            tablero = new Tablero(7, 6, ctx, canvas, tableroFondo);
            iniciarJuego(tablero, imgFicha);
            break;
        case "8x5":
            tablero = new Tablero(8, 5, ctx, canvas, tableroFondo);
            iniciarJuego(tablero, imgFicha);
            break;
        case "6x8":
            tablero = new Tablero(6, 8, ctx, canvas, tableroFondo);
            iniciarJuego(tablero, imgFicha);
            break;
    };

});

function dibujarFichas(tablero, imgFicha) {

    let radio = tablero.getRadioParaFicha();

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

function iniciarJuego(tablero, imgFicha) {
    matrizTablero = tablero.cargarMatriz();
    //console.log(matrizTablero)
    dibujarFichas(tablero, imgFicha);
    tablero.drawTapa();

    canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mousemove", onmousemove, false);
    canvas.addEventListener("mouseup", onmouseup, false);
    canvas.addEventListener("mouseleave", onmouseleave, false);
}

// --------------------------- EVENTOS DE MOUSE ----------------------------------

function onmousedown(event) {
    let x = event.pageX - canvas.offsetLeft;
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
    }
}

function onmousemove(event) {
    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;
    if (ultimaClickeada != null) {
        ultimaClickeada.setSeleccionada(true);
        ultimaClickeada.setPosicion(x, y);
        redibujar();
    }
}

function onmouseup(event) {
    if (ultimaClickeada != null) {
        let x = event.pageX - canvas.offsetLeft;
        let y = event.pageY - canvas.offsetTop;
        if(tablero.enPosDeUbicacion(x, y) && tablero.hayLugar(x, y)) {
            tablero.ubicarFicha(ultimaClickeada, x, y);
            if(tablero.hayGanador(ultimaClickeada, JUGADA_GANADORA)) {
                if(juegaJugador1) {
                    alert("¡GANASTE! FELICITACIONES JUGADOR 1");
                }
                else {
                    alert("¡GANASTE! FELICITACIONES JUGADOR 2");
                }
            }
            else {
                if(juegaJugador1) {
                    juegaJugador1 = false;
                }
                else {
                    juegaJugador1 = true;
                }
                redibujar();
            }
        }
        else {
            ultimaClickeada.setPosicion(xOriginal, yOriginal);
            ultimaClickeada.setSeleccionada(false);
            redibujar();
        }
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
}

