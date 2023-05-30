const cardRowEle = document.querySelector(".card-row");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0f602f195dmshb4ce39bfe95e95ep1e2fd2jsnf97895daa3dd",
    "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
  },
};

function hideSpinner() {
  document.querySelector(".cards-container").classList.remove("hidden");
  document.querySelector(".spinner-container").classList.add("hidden");
}

const makeCard = function (result) {
//   console.log(result);
  const { picture_url: image, title, aired_on, myanimelist_url: url } = result;
  const changed_image = image.replace("/r/50x70", "");
  const cardHtml = `
      <div class="col">
      <div class="card mx-auto" style="width: 18rem; height: 40rem">
      <img
          src="${changed_image}"
          class="card-img-top img-0"
          style="width: 100%; height: 25rem"
          alt="..."
      />
      <div class="card-body">
          <h5 class="card-title title-0">${title}</h5>
          <p class="card-text ep-no-0">Aired On: ${aired_on}</p>
          <a href="${url}" id="link" class="btn btn-primary ep-link-0" target="_blank" rel="noopener noreferrer"
          >Know More <i class="fa-solid fa-arrow-up-right-from-square"></i
          ></a>
          <i class="fa fa-solid fa-plus"></i>
      </div>
      </div>
      </div>
      `;
  cardRowEle.insertAdjacentHTML("beforeend", cardHtml);
};

fetch("https://myanimelist.p.rapidapi.com/anime/top/upcoming", options)
  .then((response) => response.json())
  .then((response) => {
    response.forEach(makeCard);
    hideSpinner();
  })
  .catch((err) => {
    console.error(err);
    alert(err.message);
  });
