class Ficha {
    constructor(posX, posY, radius, ctx, fillStyle, strokeStyle, seleccionada, imgFicha, jugador) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = ctx;
        this.fill = fillStyle;
        this.stroke = strokeStyle;
        this.seleccionada = seleccionada;
        this.img = imgFicha;
        this.jugador = jugador;
        this.filUbicada = null;
        this.colUbicada = null;
        this.jugada = false;
        this.draw();
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fill;
        this.ctx.arc(this.posX, this.posY, this.radius * 0.9, 0, 2 * Math.PI);
        this.ctx.fill();
        if (this.seleccionada === true) {
            this.ctx.strokeStyle = this.strokeStyle;
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }
        this.ctx.drawImage(this.img, this.posX - this.radius, this.posY - this.radius, this.getTamaño(), this.getTamaño());
        this.ctx.closePath();
    }

    fichaSeleccionada(x, y) {
        let x_ = this.posX - x;
        let y_ = this.posY - y;
        return Math.sqrt(x_ * x_ + y_ * y_) < this.radius;
    } 

    setSeleccionada(valor) {
        this.seleccionada = valor;
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    getTamaño() {
        return this.radius * 2;
    }

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }

    getJugador() {
        return this.jugador;
    }

    getFilUbicada() {
        return this.filUbicada;
    }

    getColUbicada() {
        return this.colUbicada;
    }

    setFilUbicada(fila) {
        this.filUbicada = fila;
    }

    setColUbicada(columna) {
        this.colUbicada = columna;
    }

    getJugada() {
        return this.jugada;
    }

    setJugada(valor) {
        this.jugada = valor;
    }

}