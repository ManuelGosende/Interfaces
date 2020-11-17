"use strict";

let botones = document.getElementsByClassName("buttonAcordeon");
let evento = document.querySelectorAll(".evento");
let lastClicked = null;

for (let boton = 0; boton < botones.length; boton ++) {
    botones[boton].addEventListener("click", function() {
        evento[boton].style.transition = "2s"; 
        if (evento[boton] == lastClicked) {
            evento[boton].style.height = "0px";
            lastClicked = null;
        } else {
            evento[boton].style.height = "280px";
            lastClicked = evento[boton];
        }
        ocultarRestantes(evento[boton]);
    });
}

function ocultarRestantes(eventoAbierto) {
    for (let boton = 0; boton < botones.length; boton ++) {
        if(evento[boton] != eventoAbierto) {
            evento[boton].style.height = "0px";
            evento[boton].style.transition = "2s";
        }
    }
}