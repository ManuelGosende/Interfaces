class Ficha {
    constructor(posX, posY, radius, context, color) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
    }

    draw() {
        this.context
    }

    fichaSeleccionada(x, y) {
        let x_ = this.posX - x;
        let y_ = this.posY - y;
        return Math.sqrt(x_ * x_ + y_ * y_) < this.radius
    } 
}