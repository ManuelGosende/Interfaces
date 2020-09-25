class Juego {
    




    /* function mouseDown(e) {
        
    } */
}
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let fichas1 = [];
let fichas2 = [];
let imagenes = [];

let tablero = null;
let tableros=document.querySelector("#tabler");
tableros.addEventListener("click", function() {
    let tableroFondo = new Image();
    tableroFondo.src = "./image/fondoTablero.jpg";

    switch (tableros.value) {
        case "7x6":
            tablero = new Tablero(7, 6, ctx, canvas, tableroFondo);
            //tableroFondo = imagenes[0];
            crearFichas(tablero);
            break;
        case "8x5":
            tablero = new Tablero(8, 5, ctx, canvas, tableroFondo);
            tableroFondo = imagenes[0];
            break;
    };
});
function crearFichas(tablero){
    console.log(tablero);
    for (let posX = tablero.getAnchoFicha()/2; posX < tablero.getColFichero()*tablero.getAnchoFicha(); posX+=tablero.getAnchoFicha()) {
        for (let posY = tablero.getAltura() + (tablero.getAltoFicha()/2); posY < tablero.getFila() * tablero.getAltoFicha() && fichas1.length < tablero.getTotalFichas()/2 ; posY+=tablero.getAltoFicha()){
            let ficha= new Ficha(posX,posY,tablero.getRadioParaFicha(10),ctx,canvas,this.fichaImage,this.fillStleJ1,this.strokeStyleJ1);
            fichas1.push(ficha);
            ficha.drawMy();
        }
    }
    for (let posX = canvas.width - tablero.getColFichero()*tablero.getAnchoFicha() + tablero.getAnchoFicha()/2;
        posX < canvas.width -  tablero.getAnchoFicha()/2 ;posX+=tablero.getAnchoFicha()) {

        for (let posY = tablero.getAltura() + (tablero.getAltoFicha()/2); posY < tablero.getFila() * tablero.getAltoFicha() && fichas1.length < tablero.getTotalFichas() ; posY+=tablero.getAltoFicha()){
            let ficha= new Ficha(posX,posY,tablero.getRadioParaFicha(10),ctx,canvas,this.fichaImage,this.fillStleJ2,this.strokeStyleJ2);
            fichas2.push(ficha)
        }
    }

}

