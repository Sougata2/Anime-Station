import { db } from "../list.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { hideLoader, showLoader } from "../loader.js";

const cardRowEl = document.querySelector("#card-row");

//////////////////////
//////Functions//////
////////////////////
const makeCard = function (image, title, link) {
  return `
  <div class="col">
  <div class="card mx-auto" style="width: 18rem; height: 30rem">
  <img
      src="${image}"
      class="card-img-top img-0"
      style="width: 100%; height: 20rem"
      alt="..."
  />
  <div class="card-body">
      <h5 class="card-title title-0">${title}</h5>
      ${link === '' ? '': `<a href="${link}" id="link" class="btn btn-primary ep-link-0" target="_blank" rel="noopener noreferrer"
      >Watch Now <i class="fa-solid fa-arrow-up-right-from-square"></i
      ></a>`}
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
  const querySnapshot = await getDocs(collection(db, "WatchList"));
  cardRowEl.innerHTML = "";
  if (querySnapshot.empty) {
    cardRowEl.insertAdjacentHTML("beforeend", emptyListScreen());
    hideLoader();
    return;
  }
  querySnapshot.forEach((doc) => {
    const { imageLink, title, link } = doc.data();

    cardRowEl.insertAdjacentHTML("beforeend", makeCard(imageLink, title, link));
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
