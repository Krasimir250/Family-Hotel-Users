import { sendReservation, sendMessage } from "../server/server.js";

const navigateBtns = document.querySelectorAll("#navigateBtn");
const sendBtn2 = document.querySelector("#sub2");
const switchBut1 = document.querySelector("#switchBut1");
const switchBut2 = document.querySelector("#switchBut2");
const minusBtn = document.querySelector("#minusBtn");
const plusBtn = document.querySelector("#plusBtn");
const dateClicker = document.querySelector("#date");

let switchPage = false;
let switchBut1On = false;
let switchBut2On = false;
//for spinner buttons

$(function ($) {
  $("#handleCounter1").handleCounter({
    minimum: 1,
    maximize: 100,
  });

  $("#handleCounter2").handleCounter({
    minimum: 1,
    maximize: 100,
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
const caclulator = (sumForOne) => {
  const price = document.getElementById("price");
  const numRooms = document.getElementById("numberRooms").value;
  const numPeople = document.getElementById("numberPeople").value;

  const sum = sumForOne * numPeople * numRooms;

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

    const fullPrice = caclulator(sumForOne);
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

  const rooms = document.getElementById("numberRooms").value;
  const people = document.getElementById("numberPeople").value;
  const typeRoom = document.getElementById("typeRooms").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phTel = document.getElementById("phoneNumber").value;
  const price = document.getElementById("price").textContent;

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

  await sendReservation({
    rooms,
    people,
    typeRoom,
    name,
    email,
    phTel,
    date,
    price,
    downPayment: false,
    typeRes: switchBut1On ? "HB" : "All inclusive",
    inHotel: switchBut2On ? "M2" : "M1",
    createDate: new Date(),
  });

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

minusBtn?.addEventListener("click", function () {
  getInformationForPrice();
});

plusBtn?.addEventListener("click", function () {
  getInformationForPrice();
});

dateClicker?.addEventListener("blur", function () {
  getInformationForPrice();
});
