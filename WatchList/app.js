import { db } from "../list.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { hideLoader, showLoader } from "../loader.js";

const cardRowEl = document.querySelector("#card-row");

//////////////////////
//////Functions//////
////////////////////
const makeCard = function (image, title, link) {
  return `
  <div class="col">
    <div class="horizontal-card card mx-auto">
      <div class="horizontal-card-img">
      <img src="${image}" alt="..." class="" />
      </div>
      <div class="horizontal-card-body">
        <div class="horizontal-card-text card-title">${title}</div>
        ${
          link === ""
            ? ""
            : `<a href="${link}" class="btn btn-primary horizontal-card-button" target="_blank" rel="noopener noreferrer"
            >Watch Now <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        }
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  </div>
    `;
};

const emptyListScreen = function () {
  return `
  <div class="container">
    <div class="alert alert-warning alert-dismissible fade show mx-auto my-5" 
      role="alert" 
      style="text-align: center; font-size: 1.5rem;">
        <strong>Great</strong> Start adding Anime to List.
    </div>
  </div>
  `;
};
const getFromDB = async function () {
  const docRef = collection(db, "WatchList");
  const q = query(docRef, orderBy("timeStamp"));
  const querySnapshot = await getDocs(q);
  cardRowEl.innerHTML = "";
  if (querySnapshot.empty) {
    cardRowEl.insertAdjacentHTML("afterbegin", emptyListScreen());
    hideLoader();
    return;
  }
  querySnapshot.forEach((doc) => {
    const { imageLink, title, link } = doc.data();
    console.log(link);

    cardRowEl.insertAdjacentHTML("afterbegin", makeCard(imageLink, title, link));
  });
  hideLoader();
};

const deleteFromDB = async function (e) {
  if (!e.target.classList.contains("fa-trash")) return;
  showLoader();
  const cardEl = e.target.closest(".card");
  const title = cardEl.querySelector(".card-title").textContent;

  await deleteDoc(doc(db, "WatchList", title));
  getFromDB();
  hideLoader();
};

getFromDB();

///////////////////////
////Event Listener////
/////////////////////
cardRowEl.addEventListener("click", deleteFromDB);
