class Tablero {
    
    constructor(f, c, ctx, canvas, img) {
        this.fila = f;
        this.columna = c;
        this.totalFichas = f * c;
        this.ctx = ctx;
        this.canvas = canvas;
        this.img = img;
        this.firstDrawing();
        this.colDeFichero = Math.round((this.totalFichas / 2) / this.fila);
        this.anchoDeFicha = this.getAnchoFicha();
        this.altoDeFicha = this.getAltoFicha(); 
        this.arregloDePosiciones = [];
    }
    
    firstDrawing() {
        let tablero = this;
        this.img.onload= function() {
            tablero.drawMy(this, this.width, this.height);
        }
    }

    drawMy(img, imgWidth, imgHeight) {
        this.canvas.width = this.img.width + ((this.colDeFichero * this.anchoDeFicha) * 2);
        this.canvas.height = this.img.height + this.altoDeFicha * 2;
        let ptoX = (this.canvas.width/2) - (imgWidth/2);
        ctx.drawImage(img, ptoX, this.canvas.height - imgHeight);
    }

    getRadioParaFicha() {
        return this.getAltura()/(this.fila *2); 
    }

    getAltura(){
        // Alto Imagen
        return this.img.height;
    }

    getAncho(){
        // Ancho Imagen
        return this.img.width;
    }

    getAltoFicha(){
        return this.getRadioParaFicha() * 2;
    }
    
    getAnchoFicha(){
        return this.getRadioParaFicha() * 2;
    }

    getColFichero(){
        return this.colDeFichero;
    }

    getAnchoFichero() {
        return this.colDeFichero * this.anchoDeFicha;
    }

    getAltoFichero() {
        return this.altoDeFicha * 2 + this.fila * this.altoDeFicha;
    }

    getFila(){
        return this.fila;
    }

    getX1() {
        return this.getAnchoFicha()/2;
    }
    
    getX2() {
        return this.getAnchoFichero() + this.getAncho() + this.getAnchoFicha()/2;
    }
    
    getY() {
        return ((this.getAltoFicha() * 2) + (this.getAltoFicha()/2));
    }

    getTotalFichas() {
        return this.totalFichas;
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