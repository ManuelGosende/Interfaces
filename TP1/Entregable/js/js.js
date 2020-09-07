"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let selectImage = document.querySelector('.openImage');

let imageData = ctx.createImageData(canvas.width, canvas.height);

// ---------------------------- CARGAR IMAGEN ----------------------------- //

selectImage.onchange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let image = new Image();
        image.src = content;

        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;

            ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

            let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
            
            ctx.putImageData(imageData, 0, 0);
        }
    }
}

// ---------------------------- DESCARGAR IMAGEN ----------------------------- //

let downloadImage = document.querySelector("#download");
downloadImage.addEventListener("click", download);

function download() {
    downloadImage.href = canvas.toDataURL();
    downloadImage.download = "image-canvas.png";
}

// ---------------------------- SELECCIONAR PINCEL ----------------------------- //

let size = -1;
document.querySelector(".pinceles").addEventListener("change", function() {
    let radio = document.getElementsByName("pixel");
    for(let i = 0; i < radio.length; i ++) {
        if(radio[i].checked) {
            size = radio[i].value;
        }
    }
})

// ---------------------------- DIBUJAR ----------------------------- //

let action = false;
let lines = [];

canvas.addEventListener("mousedown", function() {
    action = true;
});

canvas.addEventListener("mousemove", function(e) {
    if (action) {
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;

        if(lines.length > 0) {
            let distanceY = y - lines[lines.length - 1][1];
            let distanceX = x - lines[lines.length - 1][0];
            let moduleY = Math.abs(distanceY);
            let moduleX = Math.abs(distanceX);
            let aux = 0;
            if(moduleX > moduleY) {
                aux = moduleX;
            }
            else {
                aux = moduleY;
            }
            let auxX = lines[lines.length - 1][0];
            let auxY = lines[lines.length - 1][1];
            for(let i = 0; i < aux; i ++) {
                auxX += distanceX / aux;
                auxY += distanceY / aux;
                if(size > 0) {
                    if(size == 3) {
                        drawWithSize(x, y, 2);
                    }
                    if(size == 5) {
                        drawWithSize(x, y, 4);
                    }
                }
                else {
                    draw(Math.round(auxX), Math.round(auxY));
                }
            }
        }
        lines.push([x, y]);
        if(size > 0) {
            if(size == 3) {
                drawWithSize(x, y, 2);
            }
            if(size == 5) {
                drawWithSize(x, y, 4);
            }
        }
        else {
            draw(x, y);
        }
        ctx.putImageData(imageData, 0, 0);
    }
});

canvas.addEventListener("mouseup", function() {
    action = false;
    lines = [];
});

canvas.onmouseleave = (function() {
    action = false
    lines = []
})

let r = 0;
let g = 0;
let b = 0;

function draw(x, y) {
    setPixel(imageData, x, y, r, g, b, 255);
}

function drawWithSize(x, y, distance) {
    console.log("3 pix");
    for(let horiz = x - distance; horiz <= x + distance; horiz ++) {
        for(let vert = y - distance; vert <= y + distance; vert ++) {
            draw(horiz, vert);
        }
    }
}

function setPixel(imageData, y, x, r, g, b, a) {
    let index = (y + x * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}