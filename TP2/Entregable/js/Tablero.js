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
    
    constructor(w,h,ctx,cvs,i){
        this.width=w;
        this.height=h;
        this.img = new Image()
        this.img.src = "./image/imagen.png";
        this.totalFichas=i;
        this.firstDrawing(ctx,cvs)
    }

   /*  crearTablero(filas, columnas) {
        this.filas = filas
        this.columnas = columnas
    } */
    
    firstDrawing(ctx,cvs){
        let tabler=this;
        this.img.onload=function(){
            tabler.drawMy(ctx,cvs,this,this.width,this.height)
            console.log(this.height)
        }
    }

    drawMy(ctx,cvs,image,w,h){
        this.width=w;
        this.height=h;
        let ptoX=(cvs.width/2)-(this.width/2);
        //let ptoY=canvas.height/2;
        let filasDeFichas= this.totalFichas /this.height;
        let pxMargin= //pxsize(filasDeFichas);
        let image=ctx.createImageData(ctx.width-pxMargin , this.height);
        ctx.drawImage(image, ptoX, 0, cvs.width, cvs.height);
        console.log(cvs);
    }
}