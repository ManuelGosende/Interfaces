"use strict";

 // Píxeles que se han desplazado desde el extremo superior en Y
 /* let scrolling = null; */

/* window.onscroll = function() {
    scrolling = window.scrollY;
    if(scrolling > 350) {
        imgDesierto.style.animation = "ocultarDesierto 5s ease-in-out 1";
        imgDesierto.style.transition = "2s";
    }

    scrolling = window.scrollY;
    console.log(scrolling);
} */

/* let imgParallax = document.querySelector(".imgParallax");

window.onscroll = function() {
  scrolling = window.scrollY;
  if(scrolling > 0) {
    for(let i = 1; i < 4; i ++) {
      let img = imgParallax.getElementsByClassName("parallax_"+ i);
      img[0].style.transform = "translateY(50px)"; 
    }
  }
} */

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

// Deslizar "ESCENA DESTACADA"

let textEscDest = document.getElementById("escDestacada");
window.onscroll = function() {
  let scrolling = window.scrollY;
  if(scrolling > 100) {
    textEscDest.style.animation = `deslizarDestacada 3s 1`;
    textEscDest.style.visibility = "visible";
  }
}

