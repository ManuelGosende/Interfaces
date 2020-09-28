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

// --------------------------- METODOS DE DIBUJO -----------------------------------------

    draw() {
        this.canvas.width = this.img.width + ((this.colDeFichero * this.anchoDeFicha) * 2);
        this.canvas.height = this.img.height + this.altoDeFicha * 2;
        let ptoX = (this.canvas.width/2) - (this.img.width/2);
        this.ctx.drawImage(this.img, ptoX, this.canvas.height - this.img.height);
        this.drawPunteros();
    }

    drawPunteros() {
        let ubicacionY = this.getAltoFicha() * 2 - this.getRadioParaFicha();
        let ubicacionX = this.getAnchoFichero() + this.getCeldaParaUbicar()/2;
        for(let col = 0; col < this.columna; col ++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = 'green';
            this.ctx.arc(ubicacionX, ubicacionY, this.getRadioParaFicha() * 0.8, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
            ubicacionX += this.getCeldaParaUbicar();
        }
    }

    drawTapa() {
        for(let col = 0; col < this.columna; col ++) {
            for(let fil = 0; fil < this.fila; fil ++) {
                this.ctx.fillStyle = "#34673E";
                this.ctx.beginPath();
                this.ctx.moveTo(this.getPosX(col) - (this.getCeldaParaUbicar()/2), this.getPosY(fil) + this.getRadioParaFicha());
                this.ctx.lineTo(this.getPosX(col) - (this.getCeldaParaUbicar()/2), this.getPosY(fil + 1) + this.getRadioParaFicha());
                this.ctx.lineTo(this.getPosX(col + 1) - (this.getCeldaParaUbicar()/2), this.getPosY(fil + 1) + this.getRadioParaFicha());
                this.ctx.lineTo(this.getPosX(col + 1) - (this.getCeldaParaUbicar()/2), this.getPosY(fil) + this.getRadioParaFicha());
                this.ctx.closePath();
                this.ctx.arc(this.getPosX(col), this.getPosY(fil), this.getRadioParaFicha() * 0.6, 0, Math.PI*2);
                this.ctx.fill("evenodd");
            }
        }
    }

// --------------------------- METODOS DE TRATAMIENTO DE FICHAS ----------------------------------

    enPosDeUbicacion(x, y) {
        let ubicacionY = this.getAltoFicha() * 2 - this.getRadioParaFicha();
        let ubicacionX = this.getAnchoFichero() + this.getCeldaParaUbicar()/2;
        for(let col = 0; col < this.columna; col ++) {
            let x_ = ubicacionX - x;
            let y_ = ubicacionY - y;
            if(Math.sqrt(x_ * x_ + y_ * y_) < (this.getRadioParaFicha() * 0.8)) {
                return true;
            }
            ubicacionX += this.getCeldaParaUbicar();
        }
    }

    hayLugar(x, y) {    
        let x_ = this.getColumnaDeseada(x, y);
        let aux = this.arregloDePosiciones[x_][this.fila - 1];
        return aux[2] == null;
    }

    getColumnaDeseada(x, y) {
        let ubicacionY = this.getAltoFicha() * 2 - this.getRadioParaFicha();
        let ubicacionX = this.getAnchoFichero() + this.getCeldaParaUbicar()/2;
        for(let col = 0; col < this.columna; col ++) {
            let x_ = ubicacionX - x;
            let y_ = ubicacionY - y;
            if(Math.sqrt(x_ * x_ + y_ * y_) < (this.getRadioParaFicha() * 0.8)) {
                return col;
            }
            ubicacionX += this.getCeldaParaUbicar();
        }
    }

    getFilaPosible(x) {
        for(let fil = 0; fil < this.fila; fil ++) {
            let aux = this.arregloDePosiciones[x][fil];
            if(aux[2] == null) {
                return fil;
            }
        }
    }

    ubicarFicha(ficha, x, y) {
        let x_ = this.getColumnaDeseada(x, y);
        let y_ = this.getFilaPosible(x_);
        let aux = this.arregloDePosiciones[x_][y_];
        aux[2] = ficha;
        ficha.setColUbicada(x_);
        ficha.setFilUbicada(y_);
        ficha.setJugada(true);
        ficha.setPosicion(aux[0], aux[1]);
    }

// --------------------------- METODOS PARA CHEQUEAR GANADOR ----------------------------------

    hayGanador(ficha, ganadora) {
        if(ficha.getFilUbicada() > 0) {
            if(this.chequearAbajo(ficha) == ganadora) {
                return true;
            }
        }
        if(this.chequearDiagonalAsc(ficha) == ganadora 
            || this.chequearDiagonalDesc(ficha) == ganadora
            || this.chequearHorizontal(ficha) == ganadora) {
                return true;
        } 
        return false;
    }

// Chequeo de diagonal desde abajo hacia arriba en la matriz.
    chequearDiagonalAsc(ficha) {
        let cont = 1;
        if(ficha.getColUbicada() > 0 && ficha.getFilUbicada() > 0) {
            cont += this.izqAbajo(ficha);
        }
        if(ficha.getColUbicada() < this.columna - 1 && ficha.getFilUbicada() < this.fila - 1) {
            cont += this.derArriba(ficha);
        }
        return cont;
    }

    izqAbajo(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() > 0 && ficha.getFilUbicada() > 0) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() - 1][ficha.getFilUbicada() - 1];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.izqAbajo(aux[2]);
            } 
        }
        return cont;
    }

    derArriba(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() < this.columna - 1 && ficha.getFilUbicada() < this.fila - 1) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() + 1][ficha.getFilUbicada() + 1];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.derArriba(aux[2]);
            } 
        }
        return cont;
    }

// Chequeo de diagonal desde arriba hacia abajo en la matriz.
    chequearDiagonalDesc(ficha) {
        let cont = 1;
        if(ficha.getColUbicada() > 0 && ficha.getFilUbicada() < this.fila - 1) {
            cont += this.izqArriba(ficha);
        }
        if(ficha.getColUbicada() < this.columna - 1 && ficha.getFilUbicada() > 0) {
            cont += this.derAbajo(ficha);
        }
        return cont;
    }

    izqArriba(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() > 0 && ficha.getFilUbicada() < this.fila - 1) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() - 1][ficha.getFilUbicada() + 1];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.izqArriba(aux[2]);
            } 
        }
        return cont;
    }

    derAbajo(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() < this.columna - 1 && ficha.getFilUbicada() > 0) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() + 1][ficha.getFilUbicada() - 1];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.derAbajo(aux[2]);
            } 
        }
        return cont;
    }

// Chequeo horizontal de tablero
    chequearHorizontal(ficha) {
        let cont = 1;
        if(ficha.getColUbicada() > 0) {
            cont += this.izqHoriz(ficha);
        }
        if(ficha.getColUbicada() < this.columna - 1) {
            cont += this.derHoriz(ficha);
        }
        return cont;
    }
    
    izqHoriz(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() > 0) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() - 1][ficha.getFilUbicada()];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.izqHoriz(aux[2]);
            } 
        }
        return cont;
    }

    derHoriz(ficha) {
        let cont = 0;
        if(ficha.getColUbicada() < this.columna - 1) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada() + 1][ficha.getFilUbicada()];
            if(aux[2] != null && ficha.getJugador() == aux[2].getJugador()) {
                cont ++;
                cont += this.derHoriz(aux[2]);
            } 
        }
        return cont;
    }

// Chequeo vertical de tablero en sentido hacia abajo
    chequearAbajo(ficha) {
        let cont = 1;
        if(ficha.getFilUbicada() > 0) {
            let aux = this.arregloDePosiciones[ficha.getColUbicada()][ficha.getFilUbicada() - 1];
            if(ficha.getJugador() == aux[2].getJugador()) {
                cont += this.chequearAbajo(aux[2]);
            }
        }
        return cont;
    }

// --------------------------- METODOS DE OBTENCIÓN DE DATOS -------------------------------------

    getRadioParaFicha() {
        return this.getAltura() / (this.getFila() * 2); 
    }

    getCeldaParaUbicar() {
        return this.getAncho() / this.columna;
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

// --------------------------- METODOS PARA CARGAR MATRIZ -----------------------------------------

    cargarMatriz() {
        for(let x = 0; x < this.columna; x ++) {
            this.arregloDePosiciones[x] = new Array();
            this.llenarMatriz(x);
        }
        return this.arregloDePosiciones;
    }
    
    llenarMatriz(col) {
        for(let y = 0; y < this.fila; y ++) {
            this.arregloDePosiciones[col].push([this.getPosX(col), this.getPosY(y), null]);
        }
    }

    getPosY(variable) {
        return (this.getAltoCanvas() - this.getRadioParaFicha()) - (this.getAltoFicha() * variable);
    }

    getPosX(variable) {
        return (this.getAnchoFichero() + this.getCeldaParaUbicar()/2) + (this.getCeldaParaUbicar() * variable);
    }

}
                