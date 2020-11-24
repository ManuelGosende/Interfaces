//------------------------NAV------------------------
let btnHome = document.querySelector("#btnHome")
let btnSearch = document.querySelector("#btnSearch")
let btnUser = document.querySelector("#btnUser")

function setButtonsHome(){
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

// setButtonsUser();
// setButtonsSearch();
// setButtonsHome();