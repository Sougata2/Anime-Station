const cardRowEle = document.querySelector("#card-row");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const pageNumberEle = document.querySelector("#page-no");
const spinner = document.querySelector(".spinner-container");
const cardsContainer = document.querySelector(".cards-container");
const searchBtn = document.querySelector("#search-by-name");
const paginationContainer = document.querySelector(".pagination-container");
const searchBar = document.querySelector("#search-anime");
let query = "naruto";
let currPage = 1;

/*******************************Fuctions*******************************/
// Spinner component
const showLoader = function () {
  spinner.classList.remove("hidden");
  searchBtn.classList.add("hidden");
  cardsContainer.classList.add("hidden");
  paginationContainer.classList.add("hidden");
};
const hideLoader = function () {
  spinner.classList.add("hidden");
  searchBtn.classList.remove("hidden");
  cardsContainer.classList.remove("hidden");
  paginationContainer.classList.remove("hidden");
};

// Get form data
const getSearchQuery = function () {
  query = searchBar.value;
  currPage = 1;
  getApiData();
};

// Making card for every anime object.
const makeCard = function (result) {
  //   console.log(result);
  const { image, title, releaseDate, subOrDub, url } = result;
  const cardHtml = `
    <div class="col">
    <div class="card mx-auto" style="width: 18rem; height: 40rem">
    <img
        src="${image}"
        class="card-img-top img-0"
        style="width: 100%; height: 25rem"
        alt="..."
    />
    <div class="card-body">
        <h5 class="card-title title-0">${title}</h5>
        <p class="card-text ">${releaseDate}</p>
        <p class="card-text ">Sub/Dub: ${subOrDub}</p>
        <a href="${url}" id="link" class="btn btn-primary ep-link-0" target="_blank" rel="noopener noreferrer"
        >Watch Now <i class="fa-solid fa-arrow-up-right-from-square"></i
        ></a>

    </div>
    </div>
    </div>
    `;
  cardRowEle.insertAdjacentHTML("beforeend", cardHtml);
};

// Creating the page
const makePage = function (results, hasNextPage) {
  cardRowEle.innerHTML = "";
  results.forEach(makeCard);
  pageNumberEle.textContent = currPage;

  // show next btn;
  if (!hasNextPage) nextBtn.classList.add("hidden");
  else nextBtn.classList.remove("hidden");

  // show prev btn;
  if (currPage > 1) prevBtn.classList.remove("hidden");
  else prevBtn.classList.add("hidden");
};
// next page.
const goToNextPage = function () {
  currPage++;
  console.log(currPage);
  getApiData();
};

// previous page.
const goToPrevPage = function () {
  currPage--;
  console.log(currPage);
  getApiData();
};

/*************************************API function*************************************/
// Getting Api response;
const getResponse = function (response) {
  console.log(response);
  const { data } = response;
  const { hasNextPage, results } = data;
  if (results.length === 0) {
    alert("No Results Found 🤔");
  }
  makePage(results, hasNextPage);
  hideLoader();
};

// Fetching API
const getApiData = function () {
  showLoader();
  const url = `https://api.consumet.org/anime/gogoanime/${query}?page=${currPage}`;
  axios.get(url).then(getResponse);
};

//////////////////////////////////////////
////////////Event Handling////////////////
//////////////////////////////////////////
nextBtn.addEventListener("click", goToNextPage);
prevBtn.addEventListener("click", goToPrevPage);
//////////////////////////////////////////
getApiData();
