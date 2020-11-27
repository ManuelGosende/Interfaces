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

/* Ver más en Home y Search */

let verMas = document.querySelectorAll(".verMas");
let verMenos = document.querySelectorAll(".verMenos");
for (let botonVerMas = 0; botonVerMas < verMas.length; botonVerMas ++) {
    verMas[botonVerMas].addEventListener("click", function() {
        let ocultos = verMas[botonVerMas].previousElementSibling;
        ocultos.classList.remove("hidden");
        verMas[botonVerMas].classList.add("hidden");
        verMenos[botonVerMas].classList.remove("hidden");
    });
}

for (let botonVerMenos = 0; botonVerMenos < verMenos.length; botonVerMenos ++) {
    verMenos[botonVerMenos].addEventListener("click", function() {
        let desplegado = verMenos[botonVerMenos].previousElementSibling;
        desplegado.classList.add("hidden");
        verMenos[botonVerMenos].classList.add("hidden");
        verMas[botonVerMenos].classList.remove("hidden");
    });
}










