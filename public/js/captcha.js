/* eslint-env node, jquery */

function recaptcha_callback() {
  document.getElementById("form-submit").removeAttribute("disabled");
  document.getElementById("reminder").classList.remove("is-visible");
}

function recaptchaExpired() {
  document.getElementById("form-submit").setAttribute("disabled");
  document.getElementById("reminder").classList.add("is-visible");
  grecaptcha.reset();
}

