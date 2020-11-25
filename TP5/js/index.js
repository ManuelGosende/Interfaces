"use strict";


let botonesLog = document.getElementsByClassName("buttonLog");
let formOpinion = document.querySelectorAll(".formLog");
let lastClicked = null;

for (let boton = 0; boton < botonesLog.length; boton ++) {
    botonesLog[boton].addEventListener("click", function() {
        formOpinion[boton].style.transition = "2s"; 
        if (formOpinion[boton] == lastClicked) {
            formOpinion[boton].style.height = "0px";
            botonesLog[boton].style.width = "200px";
            botonesLog[boton].style.borderRadius = "40px";
            lastClicked = null;
        } else {
            formOpinion[boton].style.height = "auto";
            botonesLog[boton].style.borderRadius = "40px 40px 0px  0px";
            botonesLog[boton].style.width = "240px";
            lastClicked = formOpinion[boton];
        }
        ocultarRestantes(formOpinion[boton]);
    });
}

function ocultarRestantes(botonSeleccionado) {
    for (let boton = 0; boton < botonesLog.length; boton ++) {
        if(formOpinion[boton] != botonSeleccionado) {
            formOpinion[boton].style.height = "0px";
            botonesLog[boton].style.width = "200px";
            botonesLog[boton].style.borderRadius = "40px";
            formOpinion[boton].style.transition = "2s";
        }
    }
}


