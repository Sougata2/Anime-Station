const spinner = document.querySelector(".spinner-container");
const cardsContainer = document.querySelector(".cards-container");
const paginationContainer = document.querySelector(".pagination-container");

export const showLoader = function () {
  spinner.classList.remove("hidden");
  cardsContainer.classList.add("hidden");
  paginationContainer?.classList.add("hidden");
};
export const hideLoader = function () {
  spinner.classList.add("hidden");
  cardsContainer.classList.remove("hidden");
  paginationContainer?.classList.remove("hidden");
};
