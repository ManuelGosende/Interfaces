"user strict";

/* Nav */

let btnHome = document.querySelector("#btnHome")
let btnSearch = document.querySelector("#btnSearch")
let btnUser = document.querySelector("#btnUser")

function setButtonsHome() {
    // btnHome.getElementsByTagName(img).item
    btnHome.className = '';
    btnHome.classList = "selected";   
    btnSearch.className = '';
    btnSearch.classList = "search_for_home displayHoriz";
    btnUser.className ='';
    btnUser.classList = "displayHoriz";
}

function setButtonsSearch(){
    // btnSearch.getElementsByTagName(img).item
    btnSearch.className = '';
    btnSearch.classList = "selected";   
    btnHome.className = '';
    btnHome.classList = "home_for_search displayHoriz";
    btnUser.className = '';
    btnUser.classList = "user_for_search displayHoriz";
}

function setButtonsUser(){
    // btnHome.getElementsByTagName(img).item
    btnUser.className = '';
    btnUser.classList = "selected";   
    btnHome.className = '';
    btnHome.classList = "home_for_user displayHoriz";
    btnSearch.className = '';
    btnSearch.classList = "home_for_search displayHoriz";
}

/* Desplegar DropDown */

let homeColSugs = document.querySelectorAll(".contenedorAudios")
for (let colSug of homeColSugs) {
    let itemsSug = colSug.getElementsByClassName("displayVert");    
    for(let item of itemsSug) {
        item.addEventListener("click", function() { slideDropDown(this) })
    }
}
    
let dropsDown = document.querySelectorAll(".dropDown");
let header = document.getElementsByTagName("header");
let dropClicked = null;

function slideDropDown(item) {
    let inputTypeArchive = item.getElementsByTagName("input");
    let typeArchive = inputTypeArchive[0].value;
    for(let drop of dropsDown) {
        let typeAudio = drop.getAttribute("data-value");
        if(typeArchive == typeAudio) {
            drop.classList.remove("oculto");
            drop.classList.add("dropFijo");
            dropClicked = drop;
        }
        header[0].style.display = "none";
    }
}

/* Ocultar DropDown */

let xDrop = document.querySelectorAll(".xDrop");
for (let x = 0; x < xDrop.length; x ++) {
    xDrop[x].addEventListener("click", function() {
        dropClicked.classList.remove("dropFijo");
        dropClicked.classList.add("oculto");
        dropClicked = null;
        header[0].style.display = "flex";
    });
}

/* Ver opiniones */

let buttonsOpinion = document.getElementsByClassName("buttonOpinions");
let formOpinion = document.querySelectorAll(".formOpinion");
let lastClicked = null;

for (let boton = 0; boton < buttonsOpinion.length; boton ++) {
    buttonsOpinion[boton].addEventListener("click", function() {
        formOpinion[boton].style.transition = "2s"; 
        if (formOpinion[boton] == lastClicked) {
            formOpinion[boton].style.height = "0px";
            buttonsOpinion[boton].style.width = "200px";
            buttonsOpinion[boton].style.borderRadius = "40px";
            lastClicked = null;
        }
        else {
            formOpinion[boton].style.height = "auto";
            buttonsOpinion[boton].style.width = "280px";
            buttonsOpinion[boton].style.borderRadius = "40px 40px 0px  0px";
            lastClicked = formOpinion[boton];
        }
    });
}

let estrellas = document.getElementsByClassName("estrella");
for(let e = 0; e < estrellas.length; e ++) {
    estrellas[e].addEventListener("click", function() {
        if(estrellas[e] == estrellas[0]) {
            console.log("es la primera")
            /* estrellas[e].getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "networking") */
            estrellas[e].getSVGDocument().setAttribute("fill", "#BDFF00");
        }
        else {
            // llamo funcion hasta mi
        }
    }); 
}

// setButtonsUser();
// setButtonsSearch();
// setButtonsHome();