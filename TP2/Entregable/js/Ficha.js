class Ficha {
    constructor(posX, posY, radius, ctx, fillStyle, strokeStyle) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill = fillStyle;
        this.stroke = strokeStyle;
        this.img = new Image();
        this.img.src= "./image/Ficha.png";
        this.firstDrawing(ctx);
    }

    firstDrawing(ctx) {
        let ficha = this;
        this.img.onload = function() {
            ficha.drawMy(this, ctx);
        }
    }

    drawMy(img, ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.fill;
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI);
        ctx.fill();
        //ctx.drawImage(img, this.posX, this.posY);
        ctx.closePath();
    }

    fichaSeleccionada(x, y) {
        let x_ = this.posX - x;
        let y_ = this.posY - y;
        return Math.sqrt(x_ * x_ + y_ * y_) < this.radius;
    } 
}