import { sendReservation, sendMessage } from "../server/server.js";

const navigateBtns = document.querySelectorAll("#navigateBtn");
const sendBtn2 = document.querySelector("#sendMess");
const switchBut1 = document.querySelector("#switchBut1");
const switchBut2 = document.querySelector("#switchBut2");
const minusBtns = document.querySelectorAll(".counter-minus");
const plusBtns = document.querySelectorAll(".counter-plus");
const dateClicker = document.querySelector("#date");
const sendReservationBtn = document.querySelector("#sendReservationBtn");

let switchPage = false;
let switchBut1On = false;
let switchBut2On = false;
//for spinner buttons

$(function ($) {
  $("#handleCounter1").handleCounter({
    minimum: 1,
    maximize: 50,
  });

  $("#handleCounter2").handleCounter({
    minimum: 1,
    maximize: 50,
  });

  $("#handleCounter3").handleCounter({
    minimum: 0,
    maximize: 50,
  });

  $("#handleCounter4").handleCounter({
    minimum: 0,
    maximize: 50,
  });

  $("#handleCounter5").handleCounter({
    minimum: 0,
    maximize: 50,
  });

  $("#handleCounter6").handleCounter({
    minimum: 0,
    maximize: 50,
  });

  $("#handleCounter7").handleCounter({
    minimum: 0,
    maximize: 50,
  });
});

//for datepicker

addEventListener("DOMContentLoaded", function () {
  pickmeup(".range", {
    mode: "range",
    separator: "    до    ",
    position: "bottom",
    format: "d b y",
  });
});

// image slider main
$(document).ready(function () {
  $(".single").slick({
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
    draggable: false,
  });

  $(".left").click(function () {
    $(".single").slick("slickPrev");
  });

  $(".right").click(function () {
    $(".single").slick("slickNext");
  });

  $(".room").slick({
    autoplay: false,
    slidesToShow: 3,
    pauseOnFocus: true,

    arrows: false,
    draggable: true,
    swipeToSlide: true,
  });

  $(".review").slick({
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnFocus: true,
    pauseOnHover: false,
    arrows: false,
    draggable: true,
  });
});

//scrolltotop

$(function () {
  $.scrollUp({
    scrollName: "scrollUp", // Element ID
    topDistance: "600", // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: "fade", // Fade, slide, none
    animationInSpeed: 500, // Animation in speed (ms)
    animationOutSpeed: 500, // Animation out speed (ms)
    scrollText: "^",
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  });
});

// Send messge

async function send() {
  const regexForUserName = /^[а-яА-ЯёЁ\s'-]+ [а-яА-ЯёЁ\s'-]+ [а-яА-ЯёЁ\s'-]+$/;
  const regexForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexForPhone = /^\+359[0-9]{9}$/;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phTel = document.getElementById("number").value;
  const mess = document.getElementById("message").value;

  if (!regexForUserName.test(name)) {
    alert("Именто ви е невалидно!");
    return;
  }

  if (!regexForEmail.test(email)) {
    alert("Email ви е невалиден!");
    return;
  }

  if (!regexForPhone.test(phTel)) {
    alert("Номера ви е невалиден!");
    return;
  }

  if (mess.length === 0) {
    alert("Напишете вашето съобшение!");
    return;
  }

  await sendMessage({
    name,
    email,
    phTel,
    mess,
    createDate: new Date(),
    isRead: false,
  });

  window.location.href = "index.html";
}

// Calculate price
const caclulator = (sumForOne, tripDays) => {
  const childrenFrom12To16 =
    document.getElementById("childrenFrom12To16").value;
  const childrenFrom2To12 = document.getElementById("childrenFrom2To12").value;
  const childrenMore16 = document.getElementById("childrenMore16").value;
  const numParents = document.getElementById("numberParents").value;
  const numberPets = document.getElementById("numberPets").value;
  const numRooms = document.getElementById("numberRooms").value;
  const price = document.getElementById("price");
  const babes = document.getElementById("numberBabes").value;

  let sum = 0;

  if (numParents === 1) {
    sum += 0.8 * sumForOne;
  }

  if (childrenFrom2To12 - 1 > 0) {
    sum += (childrenFrom2To12 - 1) * 30;
  }

  if (childrenFrom12To16 > 0) {
    sum += 35 * childrenFrom12To16;
  }

  if (childrenMore16 > 0) {
    sum += 0.8 * sumForOne * childrenMore16;
  }

  if (numParents === 1 && childrenFrom2To12 === 1) {
    sum += sumForOne + sumForOne * 0.9;
  }

  if (numParents === 1 && childrenFrom2To12 === 2) {
    sum += 2 * sumForOne;
  }

  sum +=
    babes * tripDays * 5 + numberPets * tripDays * 10 + numParents > 1
      ? numParents * sumForOne * numRooms
      : 0;

  price.textContent = sum;
  return sum;
};

const getInformationForPrice = () => {
  setTimeout(() => {
    const switchBut1 = document.getElementById("switchBut1").checked;

    const datte = document.getElementById("date").value;
    const date = datte.split("    ");
    date.sort().pop();
    const [startD, endD] = date;
    const [startDay, startMount, startYear] = startD.split(" ");
    const [endDay, endMount, endYear] = endD.split(" ");

    const shortMount = [
      "Ян",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Юн",
      "Юл",
      "Авг",
      "Сеп",
      "Окт",
      "Ное",
      "Дек",
    ];

    const startMountNum = shortMount.findIndex((str) => str === startMount) + 1;
    const endMountNum = shortMount.findIndex((str) => str === endMount) + 1;

    const startDate = new Date(`20${startYear}-${startMountNum}-${startDay}`);

    const startDateT = new Date(startYear, startMountNum, startDay);
    const endDateT = new Date(endYear, endMountNum, endDay);

    const tripDays = Math.abs(
      Math.round((endDateT.getTime() - startDateT.getTime()) / 86400000)
    );

    function isDateBetween(startDate, endDate, targetDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const target = new Date(targetDate);

      return target >= start && target <= end;
    }

    let sumForOne = 0;

    for (let index = 0; index < tripDays; index++) {
      if (isDateBetween("2024-06-21", "2024-06-30", startDate)) {
        switchBut1 ? (sumForOne += 55) : (sumForOne += 65);
      } else if (isDateBetween("2024-07-01", "2024-07-11", startDate)) {
        switchBut1 ? (sumForOne += 65) : (sumForOne += 75);
      } else if (isDateBetween("2024-07-12", "2024-08-17", startDate)) {
        switchBut1 ? (sumForOne += 78) : (sumForOne += 88);
      } else if (isDateBetween("2024-08-18", "2024-08-31", startDate)) {
        switchBut1 ? (sumForOne += 70) : (sumForOne += 80);
      } else if (isDateBetween("2024-09-01", "2024-09-07", startDate)) {
        switchBut1 ? (sumForOne += 65) : (sumForOne += 75);
      } else if (isDateBetween("2024-09-08", "2024-09-14", startDate)) {
        switchBut1 ? (sumForOne += 55) : (sumForOne += 65);
      } else {
        console.log("Error!!!");
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    caclulator(sumForOne, tripDays);
  }, 100);
};

// Get information for reservation

async function getDate() {
  const regexForUserName = /^[а-яА-ЯёЁ\s'-]+ [а-яА-ЯёЁ\s'-]+ [а-яА-ЯёЁ\s'-]+$/;
  const regexForEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexForPhone = /^\+359[0-9]{9}$/;

  // For date
  const datte = document.getElementById("date").value;
  const date = datte.split("    ");
  date.sort().pop();

  const childrenFrom12To16 =
    document.getElementById("childrenFrom12To16").value;
  const childrenFrom2To12 = document.getElementById("childrenFrom2To12").value;
  const childrenMore16 = document.getElementById("childrenMore16").value;
  const parents = document.getElementById("numberParents").value;
  const numberPets = document.getElementById("numberPets").value;
  const typeRoom = document.getElementById("typeRooms").value;
  const babes = document?.getElementById("numberBabes").value;
  const rooms = document.getElementById("numberRooms").value;
  const phTel = document.getElementById("phoneNumber").value;
  const price = document.getElementById("price").textContent;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;

  if (!regexForUserName.test(name)) {
    alert("Именто ви е невалидно!");
    return;
  }

  if (!regexForEmail.test(email)) {
    alert("Email ви е невалиден!");
    return;
  }

  if (!regexForPhone.test(phTel)) {
    alert("Номера ви е невалиден!");
    return;
  }

  const obj = {
    name,
    date,
    rooms,
    email,
    price,
    phTel,
    babes,
    parents,
    typeRoom,
    numberPets,
    childrenMore16,
    childrenFrom2To12,
    childrenFrom12To16,
    downPayment: false,
    createDate: new Date(),
    inHotel: switchBut2On ? "M2" : "M1",
    typeRes: switchBut1On ? "HB" : "All inclusive",
  };

  await sendReservation(obj);

  window.location.href = "index.html";
}

// Change page of reservation

navigateBtns.forEach((navigateBtn) => {
  navigateBtn.addEventListener("click", () => {
    const page = document.querySelector(".tm-page1");

    switchPage
      ? (page.style.marginLeft = "")
      : (page.style.marginLeft = "-100%");

    switchPage = !switchPage;
  });
});

// Choose type hotel

const chooseHotel = (switchBut2On) => {
  if (switchBut2On) {
    document.querySelector("#typeRooms").innerHTML = `
    <option value="Апартамент за 3-ма">Апартамент за 3-ма</option>
    <option value="Апартамент за 4-ма">Апартамент за 4-ма</option>
    <option value="Стая за 2-ма и 2-ен диван">2-на стая с 2-ен диван</option>
    <option value="Стая за 2-ма и диван">Двойна стая с диван</option>
    <option value="Стая за 2-ма">Двойна стая</option>
    `;
  } else {
    document.querySelector("#typeRooms").innerHTML = `
    <option value="Апартамент за 4-ма">Апартамент за 4-ма</option>
    <option value="Стая за 2-ма и 2-ен диван">2-на стая с 2-ен диван</option>
    <option value="Стая за 2-ма и диван">Двойна стая с диван</option>
    <option value="Стая за 3-ма">Стая за 3-ма</option>
    <option value="Стая за 2-ма">Двойна стая</option>
    `;
  }
};

sendBtn2?.addEventListener("click", function () {
  send();
});

switchBut1?.addEventListener("click", function () {
  switchBut1On = !switchBut1On;
  getInformationForPrice(switchBut1On);
});

switchBut2?.addEventListener("click", function () {
  switchBut2On = !switchBut2On;
  chooseHotel(switchBut2On);
});

minusBtns.forEach((minusBtn) => {
  minusBtn?.addEventListener("click", function () {
    getInformationForPrice();
  });
});

plusBtns.forEach((plusBtn) => {
  plusBtn?.addEventListener("click", function () {
    getInformationForPrice();
  });
});

dateClicker?.addEventListener("blur", function () {
  getInformationForPrice();
});

sendReservationBtn?.addEventListener("click", function () {
  getDate();
});
