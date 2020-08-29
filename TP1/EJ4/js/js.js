"use strict";

let ctx = document.querySelector("#myCanvas").getContext("2d");

let width = 300;
let height = 300;
let imageData = ctx.createImageData(width, height);

let coeficiente = 255/height;
let r = 0;
let g = 0;
let b = 0;

for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
        r = y * coeficiente;
        g = y * coeficiente;
        b = y * coeficiente;
        setPixel(imageData, x, y, r, g, b, 255);
    }
}

ctx.putImageData(imageData, width/2, height/2); // Así lo centro en la página

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}