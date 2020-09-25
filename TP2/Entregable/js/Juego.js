let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let fichas1 = [];
let fillStyleJ1 = '#F37A15';
let strokeStyleJ1 = '#D46000';

let fichas2 = [];
let fillStyleJ2 = '#3F5BCF';
let strokeStyleJ2 = '#0A2699';

let imagenes = [];

let tablero = null;

let tableros = document.querySelector("#tablero");
tableros.addEventListener("click", function() {

    let tableroFondo = new Image();
    tableroFondo.src = "./image/fondoTablero.jpg";

    switch (tableros.value) {
        case "7x6":
            tablero = new Tablero(7, 6, ctx, canvas, tableroFondo);
            // tableroFondo = imagenes[0];
            crearFichas(tablero, tablero.getTotalFichas());
            break;
        case "8x5":
            tablero = new Tablero(8, 5, ctx, canvas, tableroFondo);
            // tableroFondo = imagenes[0];
            crearFichas(tablero, tablero.getTotalFichas());
            break;
    };

});

function crearFichas(tablero,totalFichas) {

    let radio = tablero.getRadioParaFicha();
    // Fichero izquierdo
    for (let posX = tablero.getX1(); posX < tablero.getAnchoFichero(); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas1.length < totalFichas/2; posY += tablero.getAltoFicha()) {
            let ficha= new Ficha(posX, posY, radio, ctx, fillStyleJ1, strokeStyleJ1);
            fichas1.push(ficha);
        }
    }

    // Fichero derecho
    for (let posX = tablero.getX2(); posX < ((tablero.getAnchoFichero() * 2) + tablero.getAncho()); posX += tablero.getAnchoFicha()) {
        for (let posY = tablero.getY(); posY < tablero.getAltoFichero() && fichas2.length < totalFichas/2 ; posY += tablero.getAltoFicha()) {
            let ficha= new Ficha(posX, posY, radio, ctx, fillStyleJ2, strokeStyleJ2);
            fichas2.push(ficha);
        }
    }

}

