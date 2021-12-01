/********************************************************************************************/
/*********************************** Déclaration des variables ******************************/
/********************************************************************************************/

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalOpenBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");


/********************************************************************************************/
/************************************** Les évènements **************************************/
/********************************************************************************************/

// launch modal event
modalOpenBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));



/********************************************************************************************/
/************************************** Les functions ***************************************/
/********************************************************************************************/

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
