"use strict";

// Movimiento de logo en Hero

let logo = document.querySelector(".logo");
logo.addEventListener("mousemove", perspectiva);
let enPerspectiva = false;

function perspectiva(e) {
    enPerspectiva = true;
    let xPersp = (window.innerWidth / 2 - e.pageX) / 15;
    let yPersp = (window.innerHeight / 2 - e.pageY) / 15;
    logo.style.transform = `rotateX(${xPersp}deg) rotateY(${yPersp}deg)`;
    logo.style.transition = "none"; 
}

logo.addEventListener("mouseleave", function() {
    if(enPerspectiva) {
        logo.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`; 
        logo.style.transition = "3s"; 
    }
    enPerspectiva = false;
}); 

// CountDown

let fecha = new Date('11/05/2020 9:30 AM');

let segundo = 1000;
let minuto = segundo * 60;
let hora = minuto * 60;
let dia = hora * 24;
let tiempo;
let textCountDown = document.getElementById("textCountDown");

function generarCountDown() {
    var newFecha = new Date();
    var distancia = fecha - newFecha;
    if (distancia < 0) {
        clearInterval(tiempo);
        document.getElementById('countdown').innerHTML = '¡Peli estrenada!';
        return;
    }
    let dias = Math.floor(distancia / dia);
    let horas = Math.floor((distancia % dia) / hora);
    let minutos = Math.floor((distancia % hora) / minuto);
    let segundos = Math.floor((distancia % minuto) / segundo);
    textCountDown.innerHTML = dias + ': ';
    textCountDown.innerHTML += horas + ': ';
    textCountDown.innerHTML += minutos + ': ';
    textCountDown.innerHTML += segundos;
}

tiempo = setInterval(generarCountDown, 1000);

// y-y0=(y1-y0/x1-x0)*(x-x0)

// movimiento de objetos con Scroll en Y

let scrolling = 0;
let menu = document.getElementsByTagName("header");
let countDown = document.querySelector(".countDownContenedor");
countDown.style.height = "0px";
let tituloMov = document.querySelectorAll(".tituloMov");
for(let t = 0; t < tituloMov.length; t ++) {
    tituloMov[t].style.visibility = "hidden";
}
let heisenberg = document.querySelector(".heisenberg");
let angulo = null;
let profesor = document.querySelector(".profesor");

window.onscroll = function() {
    scrolling = window.scrollY;
    console.log(scrolling);
    if(scrolling > 80) {
        countDown.style.height = "150px";
        countDown.style.transition = "2s";
        menu[0].style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        ulDesplegable.style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        menu[0].style.transition = "2s";
        ulDesplegable.style.transition = "2s";
        tituloMov[0].style.animation = `deslizarTitulo 3s 1`;
        tituloMov[0].style.visibility = "visible";  
    }
    else {
        countDown.style.height = "0px";
        countDown.style.transition = "2s";
        menu[0].style.backgroundColor = "rgb(5, 5, 5)";
        ulDesplegable.style.backgroundColor = "rgb(5, 5, 5)";
        menu[0].style.transition = "2s";
        ulDesplegable.style.transition = "2s";
    }
    if(scrolling > 240 && scrolling < 900) {
        let avance = scrolling - 240;
        angulo = avance;
        heisenberg.style.transform = `rotate(${angulo}deg)`;
        heisenberg.style.marginLeft = avance * 2 + "px";
        heisenberg.style.transition = "3s";
    }
    if(scrolling > 800) {
        profesor.style.transition = "3s";
        profesor.style.transform = `scale(1.1)`;
    }
    else {
        profesor.style.transition = "3s";
        profesor.style.transform = `scale(1)`;
    }
}

// botonera de eventos

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

function mouseMove(publicidad, e) {
    let xPerson = (window.innerWidth / 5 - e.offsetX) / 10;
    let yPerson = (window.innerHeight / 5 - e.offsetY) / 10;
    publicidad.style.transform = `rotateX(${xPerson}deg) rotateY(${yPerson}deg)`;
    publicidad.style.transition = "none"; 
}
  
function mouseLeave(publicidad) {
publicidad.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
publicidad.style.transition = "3s"; 
}

