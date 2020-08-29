"use strict";

let ctx = document.querySelector("#myCanvas").getContext("2d");

let image = new Image();
image.src = "image/imagen.png";

image.onload = function() {
    drawImage(this);
}

function drawImage(image) {
    ctx.drawImage(image, 20, 20);
}