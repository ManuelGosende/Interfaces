// aca va el canvas
/*class Tablero {
    let canvas = document.querySelector("#canvas");
    let ctx = canvas.getContext("2d");

    constructor__(filas, columnas) {
        this.filas = filas
        this.columnas = columnas
    }
}*/
class Tablero {
    
    constructor(f, c, ctx, cvs, img) {
        this.fila = f;
        this.columna = c;
        this.totalFichas = f * c;
        this.ctx = ctx;
        this.cvs = cvs;
        this.img = img;
        this.firstDrawing();
        this.columDeFichero = Math.round((this.totalFichas / 2) / this.fila);
        this.anchoDeFicha = img.width / c;
        this.altoDeFicha = img.height / f;
        this.arregloDePosiciones = [];
    }
    
    firstDrawing() {
        let tablero = this;
        this.img.onload= function() {
            tablero.drawMy(this, this.width, this.height);
        }
    }

    drawMy(image, w, h) {
        this.cvs.width = this.cvs.width + ((this.filasDeFichero * this.anchoDeFicha) * 2);
        this.cvs.height = this.cvs.height + this.altoDeFicha * 2;
        let ptoX = (this.cvs.width/2)-(w/2);
        ctx.drawImage(image, ptoX, this.cvs.height - h);
    }

    getRadioParaFicha(reductor) {
        return this.anchoDeFicha / 2 - reductor; 
    }

    getAltura(){
        return this.img.height;
    }
    getAltoFicha(){
        return this.altoDeFicha;
    }

    getAnchoFicha(){
        return this.anchoDeFicha;
    }
    getColFichero(){
        return this.columDeFichero;
    }
    getFila(){
        return this.fila;
    }
    /*ubicarFicha(jugador) {
        if(jugador==1){
            if(this.arregloDePosiciones!=[]){
                let lastUb=this.arregloDePosiciones.lastIndexOf();
                if(lastUb[1]!=(this.cvs.height-(this.altoDeFicha/2))){
                    let posicion=[
                        x:lastUb[0],
                        y:lastUb[1] + altoDeFicha
                    ]
                    this.arregloDePosiciones.push(posicion);
                    return    
                }
                }
            }   
        let anchoDelFichero= this.anchoDeFicha * this.columDeFichero;
        let altoDelFichero= this.altoDeFicha *this.fila;
        let posX= this.canvas +  anchoDeFicha;
        let posY=this.canvas + altoDeFicha;
    }*/


}