const contactForm = document.querySelector("#contactform");
const userName = document.querySelector("#name");
const nameErr = document.querySelector("#nameErr");
const email = document.querySelector("#email");
const emailErr = document.querySelector("#emailErr");
const subject = document.querySelector("#subject");
const subjectErr = document.querySelector("#subjectErr");
const message = document.querySelector("#message");
const messageErr = document.querySelector("#messageErr");
console.log(contactForm);

function formValidator(form) {
  form.preventDefault();
  /* Trim extra whitespace and validate for min 5 characters and no numbers */
  const trimmedName = userName.value.trim();
  nameErr.innerHTML = "";

  if (trimmedName.length < 5) {
    nameErr.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Navn må være minst 5 tegn.';
  }
  if (/\d/.test(trimmedName)) {
    nameErr.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Navn kan ikke inneholde tall.';
  }
  /* Trim whitespace and check against email regex */
  const trimmedEmail = email.value.trim();
  emailErr.innerHTML = "";
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(trimmedEmail)) {
    emailErr.innerHTML +=
      '<i class="fas fa-exclamation-circle"></i> Skriv inn en gyldig e-post adresse';
  }
  /*Trim whitespace and check for min 15 char length  */
  const trimmedSubject = subject.value.trim();
  subjectErr.innerHTML = "";
  if (trimmedSubject.length < 15) {
    subjectErr.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Emne må være minst 15 tegn.';
  }
  /* Trim whitespace and check for min 25 char length */
  const trimmedMessage = message.value.trim();
  messageErr.innerHTML = "";
  if (trimmedMessage.length < 25) {
    messageErr.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Melding må være minst 25 tegn.';
  }
  /* Check that all input fields are valid before submitting form */
  if (
    nameErr.innerHTML === "" &&
    emailErr.innerHTML === "" &&
    subjectErr.innerHTML === "" &&
    messageErr.innerHTML === ""
  ) {
    form.submit();
    console.log("Submitted");
  }
}
contactForm.addEventListener("submit", formValidator);
