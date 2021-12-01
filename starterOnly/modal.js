/********************************************************************************************/
/*********************************** Déclaration des variables ******************************/
/********************************************************************************************/

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalOpenBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const formElt = document.querySelectorAll("#form");

const confirmationMessageElt = document.querySelectorAll("#confirmation-message");
const closeConfirmationMessageBtn= document.querySelectorAll("#confirmation-close-btn")

const formData = document.querySelectorAll(".formData");
const modalSubmitbutton = document.querySelectorAll(".btn-submit");

/** Form elements */
const firstNameElt = document.getElementById("firstName");
const lastNameElt = document.getElementById("lastName");
const emailElt = document.getElementById("email");
const birthdateElt = document.getElementById("birthdate");
const quantityElt = document.getElementById("quantity");
const cityElt = document.querySelector("input[type=radio]");
const conditionsElt = document.getElementById("checkbox1");

/** Regex Formats */

const emailFormat = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const birthdateFormat = /^(19|20)\d{2}[-](0?[1-9]|1[012])[-](0[1-9]|[12]\d|3[01])$/;
const quantityFormat = /^\+?(0|[1-9]\d*)$/;


/********************************************************************************************/
/************************************** Les évènements **************************************/
/********************************************************************************************/

// launch modal event
modalOpenBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Validate input form event
formElt.forEach((elt) => elt.addEventListener("submit", checkIfFormIsValid));

// close confirmation message event
closeConfirmationMessageBtn.forEach((btn) => btn.addEventListener("click", closeModal));



/********************************************************************************************/
/************************************** Les functions ***************************************/
/********************************************************************************************/

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  formElt[0].style.display = "block";
  confirmationMessageElt[0].style.display = "none";
}

// ISSUE 2-1: Close modal form when we click on the cross
function closeModal() {
  modalbg.style.display = "none";
  formElt[0].style.display = "none";
  confirmationMessageElt[0].style.display = "none";
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ISSUE 2-2: Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
function checkIfFormIsValid(event) {
  event.preventDefault(); // move all default reactions on fields

  let firstName = isFirstNameValid();
  let lastName = isLastNameValid();
  let email = isEmailValid();
  let birthdate = isBirthdateValid();
  let quantity = isQuantityValid();
  let city = isCityValid();
  let conditions = isConditionsValid();

  let isFormValid = firstName && lastName && email && birthdate && quantity && city && conditions;
  if (isFormValid) displaySubmitConfirmationMessage();
}

/** ISSUE 2-2-1: Check if FirstName is valid
 * FirstName is valid when the current lenght is >= to the minimum Length =2 letters
 * (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
 * @returns {boolean}
*/
function isFirstNameValid() {
  let inputFirstName = new InputFormElement(firstNameElt, "Le champ Prénom a un minimum de 2 caractères");
  let isValid = (firstNameElt.value.length >= 2);
  removeOrDisplayError(inputFirstName, isValid);
  return isValid;
}

/** ISSUE 2-2-2: Check if LastName is valid
 * LastName is valid when the current lenght is >= to the minimum Length =2 letters
 * (2) Le champ Nom a un minimum de 2 caractères / n'est pas vide.
 * @returns {boolean}
*/
function isLastNameValid() {
  let inputLastName = new InputFormElement(lastNameElt, "Le champ Nom a un minimum de 2 caractères");
  let isValid = (lastNameElt.value.length >= 2);
  removeOrDisplayError(inputLastName, isValid);
  return isValid;
}


/** ISSUE 2-2-3: Check if Email is valid
 * Email is valid when it matches with Email Format defined with regex
 * (3) L'adresse électronique est valide.
 * @returns {boolean}
 */
function isEmailValid() {
  let inputEmail = new InputFormElement(emailElt, "Le format du Champ Email est invalide");
  let isValid = checkRegexFormat(emailElt.value, emailFormat);
  removeOrDisplayError(inputEmail, isValid);
  return isValid;
}


/** ISSUE 2-2-x: Check if Birthdate is valid
 * Birthdate is valid when it matches with Birthdate Format defined with regex
 * 
 * @returns {boolean}
 */
 function isBirthdateValid() {
  let inputBirthdate = new InputFormElement(birthdateElt, "Le format du Champ date de Naissance est invalide");
  let isValid = checkRegexFormat(birthdateElt.value, birthdateFormat);
  removeOrDisplayError(inputBirthdate, isValid);
  return isValid;
}


/** ISSUE 2-2-4: Check if Quantity is valid
 * Quantity is valid when it is a numeric value
 * (4) Pour le nombre de concours, une valeur numérique est saisie.
 * @returns {boolean}
 */
 function isQuantityValid() {
  let inputQuantity = new InputFormElement(quantityElt, "Le Champ Quantité doit avoir une valeur numérique");
  let isValid = checkRegexFormat(quantityElt.value, quantityFormat);
  removeOrDisplayError(inputQuantity, isValid);
  return isValid;
}


/** ISSUE 2-2-5: Check if City is valid
 * City is valid One radia button is selectec
 * (5) Un bouton radio est sélectionné.
 * @returns {boolean}
 */
 function isCityValid() {
  let inputCity = new InputFormElement(cityElt, "Veuillez choisir au moins une ville");
  let isValid = document.querySelectorAll("input[type=radio]:checked").length > 0;
  removeOrDisplayError(inputCity, isValid);
  return isValid;
}


/** ISSUE 2-2-6: Check if City is valid
 * City is valid One radia button is selectec
 * (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
 * @returns {boolean}
 */
 function isConditionsValid() {
  let inputConditions = new InputFormElement(conditionsElt, "Veuillez choisir au moins une ville");
  let isValid = document.getElementById("checkbox1").checked;
  removeOrDisplayError(inputConditions, isValid);
  return isValid;
}






/** check if a string matches a regex format
 * @param {string} str string to check
 * @param {string} strFormat Regex format
 * @returns {boolean}
 */
function checkRegexFormat(str, strFormat) {
  return strFormat.test(str);
}

/** ISSUE 3: remove or display error message under inputs
 * @param {object} elt input element
 * @param {boolean} isValid state of the element check
 */
 function removeOrDisplayError(elt, isValid) {
  isValid ? elt.removeDisplayError() : elt.displayError();
}

class InputFormElement {
  constructor(element, errorMessage) {
    this.element = element;
    this.errorMessage = errorMessage;
  }

  getParent() {
    return this.element.parentElement;
  }

  displayError() {
    this.getParent().setAttribute("data-error-visible", "true");
    this.getParent().setAttribute("data-error", this.errorMessage);
  }

  removeDisplayError() {
    this.getParent().removeAttribute("data-error-visible");
    this.getParent().removeAttribute("data-error");
  }
}
/*
ISSUE 4:Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur 
(ex. "Merci ! Votre réservation a été reçue.")*/

/** ISSUE 4: Add a submit confirmation message when success
 */
function displaySubmitConfirmationMessage() {
  let currentHeight = formElt[0].offsetHeight;

  formElt[0].style.display = "none";

  confirmationMessageElt[0].style.display = "flex";
  confirmationMessageElt[0].style.height = currentHeight + "px";
}