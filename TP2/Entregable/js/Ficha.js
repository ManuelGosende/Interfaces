class Ficha {
    constructor(posX, posY, radius, ctx, canvas,fillStyle,strokeStyle) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.fill=fillStyle;
        this.stroke=strokeStyle;
        this.img=new Image();
        img.src="./image/Ficha.png";
        firstDrawing(ctx, canvas);
    }
    firstDrawing(ctx, canvas){
        let ficha = this;
        this.img.onload= function() {
            ficha.drawMy(this,ctx,canvas);
        }
    }

    drawMy(img,ctx, canvas) {
        ctx.begingPath();
        ctx.fill(this.fill);
        ctx.arc(this.posX,this.posY,this.radius,0, 2*Math.PI);
        ctx.closepath();
    }

    fichaSeleccionada(x, y) {
        let x_ = this.posX - x;
        let y_ = this.posY - y;
        return Math.sqrt(x_ * x_ + y_ * y_) < this.radius;
    } 
}