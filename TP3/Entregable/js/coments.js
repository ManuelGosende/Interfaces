"use strict";

let menu = document.getElementsByTagName("header");
let tituloMov = document.querySelectorAll(".tituloMov");
tituloMov[0].style.animation = `deslizarTitulo 3s 1`;
tituloMov[0].style.visibility = "visible";

for(let t = 1; t < tituloMov.length; t ++) {
  tituloMov[t].style.visibility = "hidden";
}

let caraIzq = document.querySelector(".caraIzq");
let caraDer = document.querySelector(".caraDer");
let form = document.getElementsByTagName("form");
form[0].style.opacity = "0";

window.onscroll = function() {
    let scrolling = window.scrollY;
    if(scrolling > 120) {
        menu[0].style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        ulDesplegable.style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        menu[0].style.transition = "2s";
        ulDesplegable.style.transition = "2s";
        tituloMov[1].style.animation = `deslizarTitulo 3s 1`;
        tituloMov[1].style.visibility = "visible";
    }
    else {
        menu[0].style.backgroundColor = "rgb(5, 5, 5)";
        ulDesplegable.style.backgroundColor = "rgb(5, 5, 5)";
        menu[0].style.transition = "2s";
        ulDesplegable.style.transition = "2s";
    }
    if(scrolling > 500) {
        caraIzq.style.transition = "2s";
        caraDer.style.transition = "2s";
        caraIzq.style.transform = `translateX(-180px)`;
        caraDer.style.transform = `translateX(180px)`;
        form[0].style.animationDelay = "1s";
        form[0].style.transition = "4s";
        form[0].style.opacity = "1";
    }
    else {
        caraIzq.style.transition = "2s";
        caraDer.style.transition = "2s";
        caraIzq.style.transform = `translateX(0px)`;
        caraDer.style.transform = `translateX(0px)`;
        form[0].style.transition = "2s";
        form[0].style.opacity = "0";
    }
}