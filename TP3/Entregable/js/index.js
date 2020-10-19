"use strict";

// Grilla de Personajes 

// NO SUPE CÓMO CONSULTAR SI EL USUARIO ESTÁ POSICIONADO SOBRE UN PERSONAJE,
// POR LO QUE LLAMÉ A LOS SIGUIENTES MÉTODOS EN EL html. 

function mouseMove(personaje, e) {
  let xPerson = (window.innerWidth / 5 - e.offsetX) / 10;
  let yPerson = (window.innerHeight / 5 - e.offsetY) / 10;
  personaje.style.transform = `rotateX(${xPerson}deg) rotateY(${yPerson}deg)`;
  personaje.style.transition = "none"; 
}

function mouseLeave(personaje) {
  personaje.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
  personaje.style.transition = "3s"; 
}

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
for(let t = 0; t < tituloMov.length; t ++) {
  tituloMov[t].style.visibility = "hidden";
}
let imgDesierto = document.querySelector(".desiertoAtard");
let menu = document.getElementsByTagName("header");
let cards = document.querySelectorAll(".personaje");
for(let c = 0; c < cards.length; c ++) {
  cards[c].style.visibility = "hidden";
}

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
    ulDesplegable.style.backgroundColor = "rgba(26, 26, 26, 0.960)";
    menu[0].style.transition = "2s";
    ulDesplegable.style.transition = "2s";
    tituloMov[0].style.animation = `deslizarTitulo 3s 1`;
    tituloMov[0].style.visibility = "visible";
  }
  else {
    menu[0].style.backgroundColor = "rgb(5, 5, 5)";
    ulDesplegable.style.backgroundColor = "rgb(5, 5, 5)";
    menu[0].style.transition = "2s";
    ulDesplegable.style.transition = "2s";
  }
  if(scrolling > 550) {
    tituloMov[1].style.animation = `deslizarTitulo 3s 1`;
    tituloMov[1].style.visibility = "visible";
    ingresoCards();
  }
  if(scrolling > 1000) {
    tituloMov[2].style.animation = `deslizarTitulo 3s 1`;
    tituloMov[2].style.visibility = "visible";
  }
}

function ingresoCards() {
  for(let i = 0; i < cards.length; i ++) {
    cards[i].style.animationDelay = "1s";
    cards[i].style.animation = "ingresarPersonaje 2s 1";
    cards[i].style.visibility = "visible";
  }
}

