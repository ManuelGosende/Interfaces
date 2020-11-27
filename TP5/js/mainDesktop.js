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

/* let verMas = document.querySelectorAll(".verMas");
let verMenos = document.getElementsByTagName("verMenos");
let verMenosDesplegado = null;
for (let botonVerMas = 0; botonVerMas < verMas.length; botonVerMas ++) {
    verMas[botonVerMas].addEventListener("click", function() {
        let ocultador = verMas[botonVerMas].nextElementSibling;
        let ocultos = verMas[botonVerMas].previousElementSibling;
        ocultos.classList.remove("hidden");
        verMas[botonVerMas].classList.add("hidden");
        ocultador.classList.remove("hidden");
        verMenosDesplegado = ocultos;
    });
} */

// ------------------VISUALIZAR PERFILES-----------------------------

let profiles =document.querySelectorAll(".desktopProfile")
// let header = document.getElementsByTagName("header");
let profClicked = null;

let seeProf = document.querySelectorAll(".seeProfDesktop");
for (let seeOpt of seeProf){
    console.log(seeOpt)
    let inptArchive= seeOpt.getElementsByTagName("input")[0].value
    
    seeOpt.addEventListener("click", function() { slideProfile(inptArchive) })
}

//archive define que archivo Drop debo mostrar)(artista,song,etc)
function slideProfile(archive) {
    console.log(archive)
    //obtengo el drop del archive y lo muestro
    for(let profDrop of profiles) {
        let typeAudio = profDrop.getAttribute("data-value");
        if(archive == typeAudio) {
            profDrop.classList.remove("hidden");
            profDrop.classList.add("dropFijo");
            // profDrop.onscroll=function(e){showOpiniosOnScroll(e,this)}
            dropClicked = profDrop;
            console.log(profDrop)
        }
    }
    // hiddeOpinionsCards()
}


