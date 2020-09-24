class Juego {
    




    /* function mouseDown(e) {
        
    } */
}
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let fichas = [];
let tablero;

let tableros=document.querySelector("#tabler");
tableros.addEventListener("click",function(){
    switch (tableros.value) {
        case "7x6":
            console.log("esta en el 1");
            let totalFichas=7*6;
            tablero=new Tablero(70,60,ctx,canvas,totalFichas);
            break;
        case "8x5":
            tablero=new Tablero(8,5,ctx,canvas,1);
            console.log("esta en el 2");
        break;
    }
})
