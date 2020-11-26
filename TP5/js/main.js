

let dropsDown = document.querySelectorAll(".dropDown");
let header = document.getElementsByTagName("header");
let dropClicked = null;


/* Desplegar DropDown Options*/
let seeOptions = document.querySelectorAll(".seeDropDown");
for (let seeOpt of seeOptions){
    let inptArchive= seeOpt.getElementsByTagName("input")[0].value

    seeOpt.addEventListener("click", function() { slideDropDown("option",inptArchive) })
}

/* Desplegar DropDown Profiles*/

let seeProfiles = document.querySelectorAll(".seeProfile")

for (let seeProf of seeProfiles){
    let inpt= seeProf.getElementsByTagName("input")
    let inptArchive= inpt[0].value
    seeProf.addEventListener("click", function() { slideDropDown("profile",inptArchive)})
}

//type define que Tipo de Drop debo mostrar(Profile or Option)
//archive define que archivo Drop debo mostrar)(artista,song,etc)
function slideDropDown(type,archive) {
    console.log(type)
    console.log(archive)
    let typeItems=document.querySelectorAll("."+type)
    if(type!="option"){
        //muestro todos los items de perfiles
        for(let type of typeItems) {
            type.classList.remove("hidden");
            dropClicked = type;
        }
        let NOtypeItems=document.querySelectorAll(".option")
        //todos los option se esconden
        for(let type of NOtypeItems) {
            type.classList.add("hidden");
            dropClicked = type;
        }
    }else{
        //muestra todos los items de options
        for(let type of typeItems) {
            type.classList.remove("hidden");
        }
        let NOtypeItems=document.querySelectorAll(".profile")
        //escondes todos los perfiles
        for(let type of NOtypeItems) {
            type.classList.add("hidden");
        }
    }
        //obtengo el drop del archive y lo muestro
    for(let drop of dropsDown) {
        let typeAudio = drop.getAttribute("data-value");
        if(archive == typeAudio) {
            drop.classList.remove("hidden");
            drop.classList.add("dropFijo");
            dropClicked = drop;
        }
        header[0].style.display = "none";
    }


}

// function slideDropDown(item) {
//     let inputTypeArchive = item.getElementsByTagName("input");
//     let typeArchive = inputTypeArchive[0].value;
//     for(let drop of dropsDown) {
//         let typeAudio = drop.getAttribute("data-value");
//         if(typeArchive == typeAudio) {
//             drop.classList.remove("hidden");
//             drop.classList.add("dropFijo");
//             dropClicked = drop;
//         }
//         header[0].style.display = "none";
//     }
// }

/* Ocultar DropDown */

let xDrop = document.querySelectorAll(".xDrop");
for (let x = 0; x < xDrop.length; x ++) {
    xDrop[x].addEventListener("click", function() {
        dropClicked.classList.remove("dropFijo");
        dropClicked.classList.add("hidden");
        dropClicked = null;
        header[0].style.display = "flex";
    });
}