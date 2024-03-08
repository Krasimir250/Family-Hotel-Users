function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return true;
    }
  }
  return false;
}

var isReservationValue = getCookie("isReservation");
const screen = document.querySelector(".informationSection");
const footer = document.querySelector("footer");
const errorText = document.querySelector(".errorText");

if (!isReservationValue) {
  screen.style.display = "none";
  footer.style = "position: absolute; bottom: 0;";
  errorText.style.display = "block";
}

window.onload = getCookie;
