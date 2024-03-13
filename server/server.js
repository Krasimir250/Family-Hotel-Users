// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Add Firebase products that you want to use
import {
  getFirestore,
  addDoc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { httpsCallable } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-functions.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVGeTPL0x2xZortBKiKHJ33uXagJuEzCo",
  authDomain: "family-hotel-m1-m2.firebaseapp.com",
  projectId: "family-hotel-m1-m2",
  storageBucket: "family-hotel-m1-m2.appspot.com",
  messagingSenderId: "306301412739",
  appId: "1:306301412739:web:863f6960cbe4d247d542b6",
  measurementId: "G-5Y19HSK9V6",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

async function sendReservation(information) {
  try {
    const doc = await addDoc(
      collection(FIREBASE_DB, "reservations"),
      information
    );
    await updateDoc(doc, { id: doc.id });
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage(information) {
  try {
    const doc = await addDoc(collection(FIREBASE_DB, "messages"), information);
    await updateDoc(doc, { id: doc.id });
  } catch (error) {
    console.log(error);
  }
}

// Example usage:
async function checkRoomFree(startDate, endDate, roomType, inHotel) {
  const reservationsRef = collection(FIREBASE_DB, "reservations");

  const q = query(
    reservationsRef,
    where("typeRoom", "==", roomType),
    where("inHotel", "==", inHotel)
  );

  const docs = await getDocs(q);

  const reservations = [];

  docs.forEach((doc) => reservations.push(doc.data()));

  const conflicts = reservations.filter((res) => {
    return (
      startDate <= res.endDate.toDate() && endDate >= res.startDate.toDate()
    );
  });

  console.log(conflicts);

  const rooms = {
    M1: {
      "Апартамент за 3-ма": 6,
      "Апартамент за 4-ма": 1,
      "Стая за 2-ма и 2-ен диван": 6,
      "Стая за 2-ма и диван": 8,
      "Стая за 2-ма": 5,
    },
    M2: {
      "Апартамент за 4-ма": 1,
      "Стая за 2-ма и 2-ен диван": 3,
      "Стая за 2-ма и диван": 21,
      "Стая за 2-ма": 1,
    },
  };

  console.log(rooms[inHotel][roomType]);
  return conflicts.length <= rooms[inHotel][roomType];
}

export { sendReservation, sendMessage, checkRoomFree };
