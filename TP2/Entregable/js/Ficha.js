class Ficha {
    constructor(posX, posY, radius, ctx, fillStyle, strokeStyle, seleccionada, imgFicha) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.ctx = ctx;
        this.fill = fillStyle;
        this.stroke = strokeStyle;
        this.seleccionada = seleccionada;
        this.img = imgFicha;
        /* this.img = new Image();
        this.img.src= "./image/Ficha.png"; */
        //this.firstDrawing(ctx, imgFicha);
        this.draw();
    }

    /* firstDrawing(ctx, imgFicha) {
        let ficha = this;
        
        imgFicha.onload = function() {
            ficha.draw(this, ctx);
        }
    } */

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fill;
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
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
        console.log((x_ * x_ + y_ * y_));
        console.log("< radius")
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

}