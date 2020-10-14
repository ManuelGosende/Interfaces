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
let divCountDown = document.getElementById("countdown");

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
    divCountDown.style.padding = "1%";
    divCountDown.style.border = "solid 2px rgb(26, 26, 26)";
    divCountDown.style.borderRadius = "25px";
    divCountDown.style.color = "rgb(26, 26, 26)";
    divCountDown.style.fontFamily = "Arial, Helvetica, sans-serif";
    divCountDown.style.width = "300px";
    divCountDown.style.display = "flex";
    divCountDown.style.justifyContent = "center";
    divCountDown.innerHTML = dias + ': ';
    divCountDown.innerHTML += horas + ': ';
    divCountDown.innerHTML += minutos + ': ';
    divCountDown.innerHTML += segundos + ' PARA EL ESTRENO';
}

tiempo = setInterval(generarCountDown, 1000);

// Grilla de Personajes 

    /* let personajes = document.querySelectorAll('.personaje');
    personajes.addEventListener('mousemove', function(e) {
        let xPerson = (window.innerWidth / 2 - e.pageX) / 5;
        let yPerson = (window.innerHeight / 2 - e.pageY) / 10;
        personajes.style.transform = `rotateY(${xPerson}deg) rotateX(${yPerson}deg)`;
    }); */
    
    // NO SUPE CÓMO CONSULTAR SI EL USUARIO ESTÁ POSICIONADO SOBRE UN PERSONAJE,
    // POR LO QUE LLAMÉ A LOS SIGUIENTES MÉTODOS EN EL html. 

function mouseMove(personaje, e) {
    let xPerson = (window.innerWidth / 2 - e.layerX) / 25;
    let yPerson = (window.innerHeight / 2 - e.layerY) / 35;
    personaje.style.transform = `rotateX(${xPerson}deg) rotateY(${yPerson}deg)`;
    personaje.style.transition = "none"; 
}

function mouseLeave(personaje) {
    personaje.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
    personaje.style.transition = "3s"; 
}

