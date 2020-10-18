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

window.onscroll = function() {
    scrolling = window.scrollY;
    if(scrolling > 80) {
        if(scrolling < 100) {
            countDown.style.height = "150px";
            countDown.style.transition = "2s";
        }
        menu[0].style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        menu[0].style.transition = "2s";
        tituloMov[0].style.animation = `deslizarTitulo 3s 1`;
        tituloMov[0].style.visibility = "visible";  
    }
    else {
        countDown.style.height = "0px";
        countDown.style.transition = "2s";
        menu[0].style.backgroundColor = "rgb(5, 5, 5)";
        menu[0].style.transition = "2s";
    }
}

// botonera de eventos

let botones = document.getElementsByClassName("buttonAcordeon");
/* let guardado = false; */
let abierto = false;

for (let boton = 0; boton < botones.length; boton ++) {
    botones[boton].addEventListener("click", function() {
    this.classList.toggle("buttonActivo");
    let evento = this.nextElementSibling;
    evento.style.height = "0px";
    evento.style.transition = "2s";    
    if (evento.style.height == 280 || abierto) {
        evento.style.height = "0px";
        abierto = false;
    } else {
        evento.style.height = "280px";
        abierto = true;
    }
    ocultarRestantes(botones, botones[boton]);
  });
}

/* for (let boton = 0; boton < botones.length; boton ++) {
    botones[boton].addEventListener("click", function() {
    this.classList.toggle("buttonActivo");
    let evento = this.nextElementSibling;
    evento.style.height = "0px";
    evento.style.transition = "2s";    
    if (evento.style.height == 280) {
        evento.style.height = "0px";
    } else {
        evento.style.height = "280px";
    }
    ocultarRestantes(botones, botones[boton]);
  });
} */

function ocultarRestantes(botones, pos) {
    for (let boton = 0; boton < botones.length; boton ++) {
        if(botones[boton] != pos) {
            let evento = botones[boton].nextElementSibling;
            evento.style.transition = "2s";
            if(botones[boton].classList.contains("buttonActivo")) {
                evento.style.height = "0px";
                botones[boton].classList.toggle("buttonActivo", false);
            }
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

