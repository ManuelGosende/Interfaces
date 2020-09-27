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

let juegaPrimero = true;

let tableros = document.querySelector("#tablero");
tableros.addEventListener("click", function() {

    let tableroFondo = new Image();
    tableroFondo.src = "./image/fondoTablero.jpg";

    let imgFicha = new Image();
    imgFicha.src= "./image/Ficha.png";

    //let fichasEnTablero = null;

    switch (tableros.value) {
        case "7x6":
            /* tablero = new Tablero(7, 6, ctx, canvas, tableroFondo);
            fichasEnTablero = tablero.cargarMatriz();
            dibujarFichas(tablero, tablero.getTotalFichas(), imgFicha);
            iniciarJuego(tablero, tablero.getTotalFichas());
            break; */
            tablero = new Tablero(7, 6, ctx, canvas, tableroFondo);
            iniciarJuego(tablero, imgFicha);
            // tableroFondo = imagenes[0];
            break;
        case "8x5":
            tablero = new Tablero(8, 5, ctx, canvas, tableroFondo);
            // tableroFondo = imagenes[0];
            dibujarFichas(tablero, tablero.getTotalFichas());
            break;
    };

});

function dibujarFichas(tablero, imgFicha) {

    let radio = tablero.getRadioParaFicha();

    // Fichero izquierdo
    for (let posX = tablero.getX1(); posX < tablero.getAnchoFichero(); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas2.length < tablero.getTotalFichas()/2; posY += tablero.getAltoFicha()) {
            let ficha = new Ficha(posX, posY, radio, ctx, fillStyleJ1, strokeStyleJ1, false, imgFicha);
            fichas1.push(ficha);
        }
    }

    // Fichero derecho
    for (let posX = tablero.getX2(); posX < ((tablero.getAnchoFichero() * 2) + tablero.getAncho()); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas2.length < tablero.getTotalFichas()/2; posY += tablero.getAltoFicha()) {
            let ficha = new Ficha(posX, posY, radio, ctx, fillStyleJ2, strokeStyleJ2, false, imgFicha);
            fichas2.push(ficha);
        }
    }
}

function iniciarJuego(tablero, imgFicha) {

    matrizTablero = tablero.cargarMatriz();
    dibujarFichas(tablero, imgFicha);

    canvas.addEventListener("mousedown", onmousedown, false);
    canvas.addEventListener("mousemove", onmousemove, false);
    canvas.addEventListener("mouseup", onmouseup, false);
    // mouseleave
}

function onmousedown(event) {
    
    if(ultimaClickeada != null) {
        ultimaClickeada.setSeleccionada(false);
        ultimaClickeada = null;
    }

// ¿ Como hago para ir a buscar un arreglo de fichas ?
    
    if(juegaPrimero) {
        ultimaClickeada = buscarFigClickeada(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, fichas1);
        ultimaClickeada.setSeleccionada(true);
    }
    else {
        ultimaClickeada = buscarFigClickeada(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, fichas2);
        ultimaClickeada.setSeleccionada(true);
    }
}

function onmousemove(event) {
    if (ultimaClickeada != null) {
        ultimaClickeada.setPosicion(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
        redibujar();
    }
}

function onmouseup() {
    if(enPosDeUbicacion()) {
        if(tablero.hayLugar()) {
            
        }
        juegaPrimero = false;
    }
    /* if (ultimaClickeada != null) {
        if (aUbicar(ultimaClickeada)) {
            if (hayGanador()) {
                console.log(
                    ultimaClickeada.getPlayer() + "ganadorrr"
                );
            }

        } else if (isInBoardZone(lastClickedFigure)) {
            console.log("figura arriba del tablero");
        }
        lastClickedFigure.setHighlighted(false);
    } */
}

function buscarFigClickeada(x, y, fichas) {
    console.log(x);
    console.log(y);
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
}

