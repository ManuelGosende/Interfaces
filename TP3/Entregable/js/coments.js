"use strict";

let menu = document.getElementsByTagName("header");

window.onscroll = function() {
    let scrolling = window.scrollY;
    if(scrolling > 80) {
        menu[0].style.backgroundColor = "rgba(26, 26, 26, 0.960)";
        menu[0].style.transition = "2s";
    }
      else {
          menu[0].style.backgroundColor = "rgb(5, 5, 5)";
          menu[0].style.transition = "2s";
    }
}