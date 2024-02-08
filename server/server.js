// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Add Firebase products that you want to use
import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
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

async function checkHaveThisTypeRoom(hotel, typeRoom) {
  try {
    const chooseTypeRoom = {
      "Апартамент за 4-ма": "quadrupleApartment",
      "Апартамент за 3-ма": "quadrupleApartment",
      "Стая за 2-ма и 2-ен диван": "doubleRoomWithDoubleSofa",
      "Стая за 2-ма и диван": "doubleRoomWithSofa",
      "Стая за 3-ма": "tripleApartment",
      "Стая за 2-ма": "doubleRoom",
    };
    const q = doc(FIREBASE_DB, "rooms", `Hotel ${hotel}`);
    const data = await getDoc(q);
    const information = data.data();
    const room = chooseTypeRoom[typeRoom];
    const numberOfRoom = information[room];

    if (numberOfRoom !== 0) {
      await updateDoc(q, { [room]: numberOfRoom - 1 });
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
export { sendReservation, sendMessage, checkHaveThisTypeRoom };
