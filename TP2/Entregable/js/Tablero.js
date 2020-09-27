class Tablero {
    
    constructor(f, c, ctx, canvas, img) {
        this.fila = f;
        this.columna = c;
        this.totalFichas = f * c;
        this.ctx = ctx;
        this.canvas = canvas;
        this.img = img;
        this.colDeFichero = Math.round((this.totalFichas / 2) / this.fila);
        this.anchoDeFicha = this.getAnchoFicha();
        this.altoDeFicha = this.getAltoFicha(); 
        this.arregloDePosiciones = [];
        this.draw();
    }

    draw() {
        this.canvas.width = this.img.width + ((this.colDeFichero * this.anchoDeFicha) * 2);
        this.canvas.height = this.img.height + this.altoDeFicha * 2;
        let ptoX = (this.canvas.width/2) - (this.img.width/2);
        this.ctx.drawImage(this.img, ptoX, this.canvas.height - this.img.height);
    }

    getRadioParaFicha() {
        return this.getAltura() / (this.getFila() * 2); 
    }

    getAltura(){
        // Alto Imagen
        return this.img.height;
    }

    getAncho(){
        // Ancho Imagen
        return this.img.width;
    }

    getAltoFicha() {
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
        return this.getAltoFicha() * 2 + this.getFila() * this.getAltoFicha();
    }

    getFila() {
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

    getAnchoCanvas() {
        return this.getAncho() + (this.getAnchoFichero() * 2);
    }

    getAltoCanvas() {
        return this.getAltura() + (this.getAltoFicha() * 2);
    }

    cargarMatriz() {
        for(let x = 0; x < this.columna; x ++) {
            this.arregloDePosiciones[x] = new Array();
            this.llenarMatriz(x);
        }
        return this.arregloDePosiciones;
    }
    
    llenarMatriz(col) {
        for(let y = 0; y < this.fila; y ++) {
            this.arregloDePosiciones[col].push([this.getPosX(col), this.getPosY(y)]);
        }
    }

    getPosY(variable) {
        return (this.getAltoCanvas() - this.getRadioParaFicha()) - (this.getAltoFicha() * variable);
    }

    getPosX(variable) {
        return (this.getAnchoFichero() + this.getRadioParaFicha()) + (this.getAnchoFicha() * variable);
    }


    /* llenarMatriz() {
        let col = 0;
        let fil = 0;
        /* for(let x = this.getAnchoFichero() + this.getRadioParaFicha(); x < (this.getAnchoCanvas() - this.getAnchoFichero() - this.getRadioParaFicha()); x += this.getAnchoFicha()) {
            posiciones[col][fil] = new Array();
            console.log(posiciones);
            for(let y = (this.getAltoCanvas() - this.getRadioParaFicha()); y > (this.getAltoFicha() * 2) + this.getRadioParaFicha(); y -= this.getAltoFicha()) {
                if(posiciones.length == 0) {
                    posiciones[col].push(x, y)
                }
                col ++;
                fil ++;
            }
            col = 0;
        }
        return posiciones;
    } */




    
 /*  var arr = [];

  // Creates all lines:
  for(var i=0; i < rows; i++){

      // Creates an empty line
      arr.Push([]);

      // Adds cols to the empty line:
      arr[i].Push( new Array(cols));

      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }

return arr; */
    
    
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



 // OCTA
/* let xStart = this.canvas.width/4;
        let boxSize = 100;
        let finalX = this.canvas.width - xStart;
        let finalY = this.canvas.height;

        for(let y = this.canvas.height/4; y <= finalY; y += boxSize){
            for(let x = this.canvas.width/4 ; x <= finalX ;x += boxSize) {
                this.context.fillStyle = "#6FDFE1";
                this.context.beginPath();
                this.context.moveTo(x, y);
                this.context.lineTo(x, y + boxSize);
                this.context.lineTo(x + boxSize, y + boxSize);
                this.context.lineTo(x + boxSize, y);
                this.context.closePath();
                this.context.arc( x+50 , y+50 , 30, 0, Math.PI*2, true); //inner counter-clockwise
                this.context.fill("evenodd"); */
                