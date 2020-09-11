"use strict";

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let canOriginalW = canvas.width;
let canOriginalH = canvas.height;
let imageData = ctx.createImageData(canvas.width, canvas.height);
let originalImage = [];

let filterBasic = document.querySelector('.filtroBasic');
let filterComplex = document.querySelector('.filtroComplex');
let original = document.querySelector('.originalImage');
let titlesB = document.querySelector('.titlesBasic');
let titlesC = document.querySelector('.titlesComplex');
original.disabled = true;
filterBasic.disabled = true;
filterComplex.disabled = true;
titlesB.disabled = true;
titlesC.disabled = true;
recoverImage();

let r = 0;
let g = 0;
let b = 0;

// ---------------------------- GUARDAR IMAGEN ORIGINAL ----------------------------- //

function saveOriginalImage() {
    originalImage = [];
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            originalImage[originalImage.length] = getRed(x, y);
            originalImage[originalImage.length] = getGreen(x, y);
            originalImage[originalImage.length] = getBlue(x, y);
            originalImage[originalImage.length] = getAlpha(x, y);
        }
    }
}

function resetImage() {
    let pos = 0;
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            setPixel(imageData, x, y, originalImage[pos], originalImage[pos+1], originalImage[pos+2], originalImage[pos+3]);
            pos += 4;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// ---------------------------- LIMPIAR LIENZO ----------------------------- //

let cleanCanvas = document.querySelector('.clean');
cleanCanvas.addEventListener("click", function() {
    console.log(canOriginalH);
    console.log(canOriginalW);
    originalImage = [];
    imageData = ctx.createImageData(canOriginalW, canOriginalH);
    ctx.putImageData(imageData, 0, 0);
    recoverImage();
});

// ---------------------------- CARGAR IMAGEN ----------------------------- //

let selectImage = document.querySelector('.openImage');

selectImage.onchange = e => {
    let file = e.target.files[0];
    if(areImg(file)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let image = new Image();
            image.src = content;

            image.onload = function () {
                let arr = adaptCanvas(this);
                let imageScaledWidth = arr[0];
                let imageScaledHeight = arr[1];
                imageData = ctx.createImageData(imageScaledWidth, imageScaledHeight);
                ctx.drawImage(image, 0, 0, imageScaledWidth, imageScaledHeight);
                imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
                ctx.putImageData(imageData, 0, 0);
                saveOriginalImage();
                recoverImage();
            }
        }
        
    }
    else {
        alert("El archivo que quiere subir no es válido.");
    }
    selectImage.value = null;
}

function areImg(image) {    
    let isImg = true;
    let imgType = image['type'];
    if(imgType == 'image/jpeg' || imgType == 'image/jpg' || imgType =='image/png') {
        isImg = true;
    } else {
        isImg = false;
    }
    return isImg;
}

function adaptCanvas(picture) {
    let arr = [];
    let imageAspectRatio;
    let imageScaledWidth;
    let imageScaledHeight;
    if(picture.width > picture.height) {
        imageAspectRatio = (1.0 * picture.height) / picture.width;
        imageScaledWidth = canOriginalW;
        imageScaledHeight = canOriginalH * imageAspectRatio;
    }
    else {
        imageAspectRatio = (1.0 * picture.width) / picture.height;
        imageScaledWidth = canOriginalW * imageAspectRatio; 
        imageScaledHeight = canOriginalH;                    
    }
    arr.push(imageScaledWidth);
    arr.push(imageScaledHeight);
    canvas.width = imageScaledWidth;
    canvas.height = imageScaledHeight;     
    return arr;
}

// ---------------------------- RECUPERAR IMAGEN ORIGINAL ----------------------------- //



function recoverImage() {
    if(originalImage.length > 0) {
        original.style.display = '';
        original.style.visibility = 'visible';
        original.disabled = false;

        filterBasic.style.display = '';
        filterBasic.style.visibility = 'visible';
        filterBasic.disabled = false;

        filterComplex.style.display = '';
        filterComplex.style.visibility = 'visible';
        filterComplex.disabled = false;

        titlesB.style.display = '';
        titlesB.style.visibility = 'visible';
        titlesB.disabled = false;

        titlesC.style.display = '';
        titlesC.style.visibility = 'visible';
        titlesC.disabled = false;

        let getOriginalImage = document.querySelector('.originalImage');
        getOriginalImage.addEventListener("click", function() {
            resetImage();
        });
    } 
    else {
        original.style.display = 'none';
        original.style.visibility = 'hidden';
        original.disabled = true;

        filterBasic.style.display = 'none';
        filterBasic.style.visibility = 'hidden';
        filterBasic.disabled = true;

        filterComplex.style.display = 'none';
        filterComplex.style.visibility = 'hidden';
        filterComplex.disabled = true;

        titlesB.style.display = 'none';
        titlesB.style.visibility = 'hidden';
        titlesB.disabled = true;

        titlesC.style.display = 'none';
        titlesC.style.visibility = 'hidden';
        titlesC.disabled = true;
    }
}

// ---------------------------- DESCARGAR IMAGEN ----------------------------- //

let downloadImage = document.querySelector("#download");
downloadImage.addEventListener("click", download);

function download() {
    downloadImage.href = canvas.toDataURL();
    downloadImage.download = "image-canvas.png";
}

// ---------------------------- SELECCIONAR HERRAMIENTA ----------------------------- //

let tool = "pintar";
let toolController = document.querySelector(".herramienta").addEventListener("change", function() {
    let execution = document.getElementsByName("accion");
    for(let i = 0; i < execution.length; i ++) {
        if(execution[i].checked) {
            tool = execution[i].value;
        }
    }
})

// ---------------------------- SELECCIONAR PINCEL ----------------------------- //

let size = 1;
document.querySelector(".pinceles").addEventListener("change", function() {
    let radio = document.getElementsByName("pixel");
    for(let i = 0; i < radio.length; i ++) {
        if(radio[i].checked) {
            size = radio[i].value;
        }
    }
})

// ---------------------------- UTILIZAR HERRAMIENTA ----------------------------- //

let action = false;
let lines = [];

canvas.addEventListener("mousedown", function() {
    action = true;
});

canvas.addEventListener("mousemove", function(e) {
    if (action) {
        if(tool == "pintar") {
            r = 0;
            g = 0;
            b = 0;
        }
        else {
            r = 255;
            g = 255;
            b = 255;
        }
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        // Unirá puntos sólo cuando haya más de un pixel pintado en el canvas.
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
                if(size == 1) {
                    executionTool(Math.round(auxX), Math.round(auxY), r, g, b);
                }
                else {
                    executionToolWithSize(Math.round(auxX), Math.round(auxY), size, r, g, b); 
                }
            }
        }   
        lines.push([x, y]);
        if(size == 1) {
            executionTool(x, y, r, g, b);
        }
        else {
            executionToolWithSize(x, y, size, r, g, b);
        }
        ctx.putImageData(imageData, 0, 0);
    }
});

canvas.addEventListener("mouseup", function() {
    action = false;
    lines = [];
});

canvas.onmouseleave = (function() {
    action = false;
    lines = [];
})

function executionTool(x, y, r, g, b) {
    if(x < canvas.width && x >= 0 && y < canvas.height && y >= 0) {
        setPixel(imageData, x, y, r, g, b, 255);
    }
}

function executionToolWithSize(x, y, size, r, g, b) {
    let distance = size - 1;
    for(let horiz = x - distance; horiz <= x + distance; horiz ++) {
        for(let vert = y - distance; vert <= y + distance; vert ++) {
            executionTool(horiz, vert, r, g, b);
        }
    }
}

function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

// ---------------------------- FILTROS BÁSICOS ----------------------------- //

function getRed(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
}

function getGreen(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
}

function getBlue(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
}

function getAlpha(x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index+3];
}

// -- NEGATIVO

document.getElementById("negativo").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = 255 - getRed(x, y);
            let newGreen = 255 - getGreen(x, y);
            let newBlue = 255 - getBlue(x, y);
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// -- SEPIA

document.getElementById("sepia").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {    
                let average = Math.floor((getRed(x, y) + getGreen(x, y) + getBlue(x, y))/3);
                let newRed = Math.min(average + 40, 255);
                let newGreen = Math.min(average + 15, 255);
                let newBlue = Math.min(average, 255);
                setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
});

// -- BRILLO

document.getElementById("brillo").addEventListener("click", function() {
    let variation = 25;
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = Math.min(getRed(x, y) + variation, 255);
            let newGreen = Math.min(getGreen(x, y) + variation, 255);
            let newBlue = Math.min(getBlue(x, y) + variation, 255);
            setPixel(imageData, x, y, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});

// -- BINARIZACIÓN

document.getElementById("binarizacion").addEventListener("click", function(){
    let umbral = 80;
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let average = Math.floor((getRed(x, y) + getGreen(x, y) + getBlue(x, y))/3);
            if(average > umbral) {
                setPixel(imageData, x, y, 255, 255, 255, 255);
            }else {
                setPixel(imageData, x, y, 0, 0, 0, 255);
            }
        }
    }
    ctx.putImageData(imageData,0,0);
});

// -- ESCALA DE GRISES

document.getElementById("grises").addEventListener("click", function() {
    for(let x = 0; x < canvas.width - 1; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let newRed = getRed(x, y) * 0.2126;
            let newGreen = getGreen(x, y) * 0.7152;
            let newBlue = getBlue(x, y) * 0.0722;
            let scale = newRed + newGreen + newBlue;
            setPixel(imageData, x, y, scale, scale, scale, 255);
        }
    }
    ctx.putImageData(imageData,0,0);
});

// ---------------------------- FILTROS COMPLEJOS ----------------------------- //


// -- DESENFOQUE

document.getElementById("desenfoque").addEventListener("click", function() {
    Filters.blur(imageData, matReference, false);
});

let matReference = [1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36,
                    1/36, 1/36, 1/36 ];

let Filters = {}
Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
    return this.tmpCtx.createImageData(w,h);
};

Filters.blur = function(imageData, matReference, opaque) {
    let side = Math.round(Math.sqrt(matReference.length));
    let halfSide = Math.floor(side/2);
    let src = imageData.data;
    let sw = imageData.width;
    let sh = imageData.height;
    let w = sw;
    let h = sh;
    let output = Filters.createImageData(w, h);
    let dst = output.data;
    let alphaFac = opaque ? 1 : 0;
    for (let y=0; y<h; y++) {
        for (let x=0; x<w; x++) {
            let sy = y;
            let sx = x;
            let dstOff = (y*w+x)*4;
            let r=0, g=0, b=0, a=0;
            for (let cy=0; cy<side; cy++) {
                for (let cx=0; cx<side; cx++) {
                    let scy = sy + cy - halfSide;
                    let scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        let srcOff = (scy * sw + scx)*4;
                        let wt = matReference[cy*side+cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff+1] * wt;
                        b += src[srcOff+2] * wt;
                        a += src[srcOff+3] * wt;
                    }       
                }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
        }
    }
    imageData = output;
    ctx.putImageData(imageData, 0, 0);
};

// -- SATURACIÓN

document.getElementById("saturacion").addEventListener("click", function() {
    Filters.saturation();
});

Filters.saturation = function() {
    for(let i = 0; i < canvas.width - 1; i++) {
        for(let j = 0; j < canvas.height; j++) {
            let red = getRed(i, j);
            let green = getGreen(i, j);
            let blue = getBlue(i, j);
            let r = red/255;
            let g = green/255;
            let b = blue/255;
            let cmax = Math.max(r, g, b); // Obtengo el más grande de los tres.
            let cmin = Math.min(r, g, b); // Obtengo el menor de los tres.
            let delta = cmax - cmin;
            // Convierto en HSL
            let hue = calculateHue(delta, cmax, r, g, b);
            let light = calculateLight(cmax, cmin);
            let sat = calculateSat(light, delta) + 0.2;
            // Calculo el cxm
            let c = calculateC(sat, light);
            let x = getX(hue, c);
            let m = light - (c/2);
            let arrayNewRGB = calcularNewRGB(hue, c, x);
            let r1 = arrayNewRGB[0];
            let g1 = arrayNewRGB[1];
            let b1 = arrayNewRGB[2];
            let newRed = (r1 + m)*255;
            let newGreen = (g1 + m)*255;
            let newBlue = (b1 + m)*255; 
            setPixel(imageData, i, j, newRed, newGreen, newBlue, 255);
        }
    }
    ctx.putImageData(imageData,0,0)
}

function calcularNewRGB(hue, c, x) {
    if(hue >= 0 && hue < 60) {
        return [c, x, 0];
    }else if (hue >= 60 && hue < 120) {
        return [x, c, 0];
    }else if (hue >= 120 && hue < 180) {
        return [0, c, x];
    }else if (hue >= 180 && hue < 240) {
        return [0, x, c];
    }else if (hue >= 240 && hue < 300) {
        return [x, 0, c];
    }else {
        return [c, 0, x];
    }
}

function getX(hue, c) {
    let aux = ((hue / 60) % 2) - 1;
    if (aux < 0) {
        aux = aux * -1;
    }
    return c * (1 - aux);
}

function calculateC(sat, light) {
    let aux = 2 * light - 1;
    if (aux < 0) {
        aux = aux * -1;
    }
    return (1 - aux) * sat;
}

function calculateHue(delta, cmax, r, g, b) {
    if (delta == 0){
        return 0
    }else if (cmax == r) {
        return Math.floor(60*(((g-b)/delta)%6));
    }else if(cmax == g){
        return Math.floor(60*(((b-r)/delta)+2));
    }else{
        return Math.floor(60*(((r-g)/delta)+4));
    }
}

function calculateLight(cmax, cmin) {
    return (cmax + cmin) / 2;
}

function calculateSat(light, delta) {
    if (delta == 0) {
        return 0;
    }else {
        let aux = (2 * light) -1;
        if (aux < 0) {
            aux = aux * -1;
        }
        return delta/(1-((2*light)-1));
    }
}