"use strict";

let imgDesierto = document.querySelector(".desiertoAtard");
 // Píxeles que se han desplazado desde el extremo superior en Y
 let scrolling = null;

window.onscroll = function() {
    scrolling = window.scrollY;
    if(scrolling > 350) {
        imgDesierto.style.animation = "ocultarDesierto 5s ease-in-out 1";
        imgDesierto.style.transition = "2s"; 
        imgDesierto.style.positionY = 
    }



    let keyFrameParallax;
    keyFrameParallax = {
    0: {
      color: 'black'
    },
    20: { transform: `translateX(${shakeDistance}px)` },
    60: { transform: `translateX(-${shakeDistance}px)` },
    75: {
      color: `rgba(${randomColors.join(', ')})`
    },
    100: { color: 'black' }
  }
}

