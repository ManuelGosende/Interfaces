"use strict";

let botones = document.getElementsByClassName("buttonLog");
let formLog = document.querySelectorAll(".formLog");
let lastClicked = null;

for (let boton = 0; boton < botones.length; boton ++) {
    botones[boton].addEventListener("click", function() {
        formLog[boton].style.transition = "2s"; 
        if (formLog[boton] == lastClicked) {
            formLog[boton].style.height = "0px";
            lastClicked = null;
        } else {
            formLog[boton].style.height = "280px";
            lastClicked = formLog[boton];
        }
        ocultarRestantes(formLog[boton]);
    });
}

function ocultarRestantes(eventoAbierto) {
    for (let boton = 0; boton < botones.length; boton ++) {
        if(formLog[boton] != eventoAbierto) {
            formLog[boton].style.height = "0px";
            formLog[boton].style.transition = "2s";
        }
    }
}