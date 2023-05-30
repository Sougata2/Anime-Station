// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7fY73kX2yN6uMk18D9ktdLfPAdaElVuE",
  authDomain: "animestation-3aff9.firebaseapp.com",
  projectId: "animestation-3aff9",
  storageBucket: "animestation-3aff9.appspot.com",
  messagingSenderId: "520824269870",
  appId: "1:520824269870:web:a64dfd7224981e50b883bf",
  measurementId: "G-FPRQYTPG96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

///////////////////////
///////Varibles///////
/////////////////////
const cardsContainerEl = document.querySelector(".cards-container");

///////////////////////
///////Function///////
/////////////////////
const notifyOnAdd = function () {
  cardsContainerEl.insertAdjacentHTML(
    "beforeBegin",
    `
  <div class="alert alert-success d-flex align-items-center" role="alert">
    <i class="fa fa-solid fa-circle-check"></i>
    <div>
      Added To Watch List
    </div>
  </div>
  `
  );
  setTimeout(() => {
    document.querySelector(".alert-success").remove();
  }, 2000);
};
const addToList = async function (e) {
  if (!e.target.classList.contains("fa-plus")) return;
  const cardEl = e.target.closest(".card");
  const imgLink = cardEl.querySelector(".card-img-top")?.src;
  const title = cardEl.querySelector(".card-title")?.textContent;
  const link = cardEl.querySelector("#link")?.href;
  const timeStamp = new Date();

  try {
    await setDoc(doc(db, "WatchList", title), {
      imageLink: imgLink,
      title: title,
      link: link ? link: '',
      timeStamp: timeStamp,
    });
    notifyOnAdd();
  } catch (e) {
    console.error("Error adding to List: ", e);
  }
};

/////////////////////////
//////Event Listener////
///////////////////////
cardsContainerEl.addEventListener("click", addToList);
