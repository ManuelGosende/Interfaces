"use strict";

/* Ocultar listas de usuario */

let buttonUserDesktop = document.querySelectorAll(".buttonCollections");
let collectionsUser = document.querySelectorAll(".contenedorListaUser");
let lastClickedDesktop = null;

for (let boton = 0; boton < buttonUserDesktop.length; boton ++) {
    buttonUserDesktop[boton].addEventListener("click", function() {
        collectionsUser[boton].style.transition = "2s"; 
        if (collectionsUser[boton] == lastClickedDesktop) {
            collectionsUser[boton].style.display = "none";
            buttonUserDesktop[boton].style.width = "200px";
            buttonUserDesktop[boton].style.borderRadius = "40px";
            lastClickedDesktop = null;
        } else {
            collectionsUser[boton].style.display = "flex";
            buttonUserDesktop[boton].style.borderRadius = "40px 40px 0px  0px";
            buttonUserDesktop[boton].style.width = "300px";
            lastClickedDesktop = collectionsUser[boton];
        }
        ocultarRestantesHome(collectionsUser[boton]);
    });
}

function ocultarRestantesHome(botonSeleccionado) {
    for (let boton = 0; boton < buttonUserDesktop.length; boton ++) {
        if(collectionsUser[boton] != botonSeleccionado) {
            collectionsUser[boton].style.display = "none";
            buttonUserDesktop[boton].style.width = "200px";
            buttonUserDesktop[boton].style.borderRadius = "40px";
            collectionsUser[boton].style.transition = "2s";
        }
    }
}
