"use strict";

let enPerspectiva = false;

let logo = document.querySelector(".logo");
logo.addEventListener("mousemove", perspectiva);
logo.addEventListener   

function perspectiva(e) {
    enPerspectiva = true;
    let xPersp = (window.innerWidth / 2 - e.pageX) / 15;
    let yPersp = (window.innerHeight / 2 - e.pageY) / 15;
    logo.style.transform = `rotateX(${xPersp}deg) rotateY(${yPersp}deg)`;
    logo.style.transform = "transform  0.2s linear";
}

logo.addEventListener("mouseleave", function() {
    if(enPerspectiva) {
        logo.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
        logo.style.transform = "transform  0.2s linear"; 
    }
    enPerspectiva = false;
}); 