"use strict";

// Carrousel de imágenes

let slideIndex = 0;
moverCarrousel();

function moverCarrousel() {
  let slides = document.getElementsByClassName("slide");
  let ubic = document.getElementsByClassName("carrouselUbic");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex ++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }    
  for (let i = 0; i < ubic.length; i++) {
    ubic[i].className = ubic[i].className.replace(" ubicActiva", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  ubic[slideIndex-1].className += " ubicActiva";
  setTimeout(moverCarrousel, 3000);
}

// movimiento de objetos con Scroll en Y

let tituloMov = document.querySelectorAll(".tituloMov");
let imgDesierto = document.querySelector(".desiertoAtard");
let menu = document.getElementsByTagName("header");

window.onscroll = function() {
  let scrolling = window.scrollY;
  if(scrolling > 10 && scrolling < 500) {
    imgDesierto.style.transform = `translateY(${scrolling/4}px)`;
    imgDesierto.style.transition = "2s";
  }
  else {
    imgDesierto.style.transform = `translateY(${0}px)`;
    imgDesierto.style.transition = "2s";
  }
  if(scrolling > 100) {
    menu[0].style.backgroundColor = "rgba(26, 26, 26, 0.960)";
    menu[0].style.transition = "2s";
    tituloMov[0].style.animation = `deslizarTitulo 3s 1`;
    tituloMov[0].style.visibility = "visible";
  }
  else {
    menu[0].style.backgroundColor = "rgb(5, 5, 5)";
    menu[0].style.transition = "2s";
  }
  if(scrolling > 450) {
    tituloMov[1].style.animation = `deslizarTitulo 3s 1`;
    tituloMov[1].style.visibility = "visible";
  }
}

