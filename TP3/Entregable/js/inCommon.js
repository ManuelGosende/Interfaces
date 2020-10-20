"use strict";

// Loading

let pagina = document.querySelector(".divContenedor");
loader();

function loader() {
  pagina.style.display = "none";
  setTimeout(loadingPage, 3000);
}

function loadingPage() {
  document.getElementById("loader").style.display = "none";
  pagina.style.display = "block";
}

let menuClick = document.getElementById("menu");
let ulDesplegable = document.querySelector(".desplegable");
ulDesplegable.style.height = "0px";


menuClick.addEventListener("click", function(e) {
  ulDesplegable.style.transition = "2s";
  if(ulDesplegable.style.height == "0px") {
    ulDesplegable.style.height = "170px";
  }
  else {
    ulDesplegable.style.height = "0px";
  }
});