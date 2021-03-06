const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;

const movies = [];
let filteredMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const switchIcon = document.querySelector("#switch-btn");

function listMovieModel(data) {
  let rawHTML = "";

  data.forEach((item) => {
    rawHTML += `<div class="col-md-12" id="list">
            <ul class="list-group list-group-flush">
              <li class="list-group-item text-muted">
                <div class="row movie-button">
                  <span class="col list-title">${item.title}</span>
                  <button class="btn btn-primary mr-2 btn-show-movie" data-toggle="modal" data-target="#movie-Modal" data-id="${item.id}">More</button>
                  <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
                </div>
              </li>
            </ul>
        </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}

function renderMovieList(data) {
  let rawHTML = "";

  // procssing
  data.forEach((item) => {
    // title ,image
    rawHTML += `<div class="col-sm-3" id="card">
          <div class="mb-2">
            <div class="card">
              <img src="${
                POSTER_URL + item.image
              }" class="card-img-top" alt="Movie Poster">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-Modal" data-id="${
                  item.id
                }">More</button>
                <button class="btn btn-info btn-add-favorite" data-id="${
                  item.id
                }">+</button>
              </div>
            </div>
          </div>
        </div>`;
  });

  dataPanel.innerHTML = rawHTML;
}

function renderPaginator(amount) {
  //  80 / 12 = 6 ... 8 = 7page
  // Math.ceil???????????????
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }

  paginator.innerHTML = rawHTML;
}

paginator.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  const page = +event.target.dataset.page;
  let viewPage = dataPanel.firstElementChild.id;

  if (viewPage.includes("list")) {
    listMovieModel(getMoviesByPage(page));
  } else if (viewPage.includes("card")) {
    renderMovieList(getMoviesByPage(page));
  }
});

// page -> ????????????
function getMoviesByPage(page) {
  // page 1 -> movies 0 - 11
  // page 2 -> movies 12 - 23
  // page 3 -> movies 24 - 35
  // ...

  // movies ? "movies" : "filteredMovies"
  const data = filteredMovies.length ? filteredMovies : movies;

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="img-fluid">`;
  });
}

function addToFavorite(id) {
  // console.log(movies);
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || []; //????????????????????????????????????
  // console.log(list);
  function isMovieIdMatched(movie) {
    return movie.id === id;
  }
  const movie = movies.find(isMovieIdMatched);
  // const movie = movies.find((movie) => movie.id === id);
  // console.log(movie); // ???????????? ??????

  if (list.some((movie) => movie.id === id)) {
    return alert("??????????????????????????????");
  }
  list.push(movie);

  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  // map, filter, reduce ????????????
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  console.log(filteredMovies);

  if (filteredMovies.length === 0) {
    return alert("Cannot find movie with keyword: " + keyword);
  }

  let viewPage = dataPanel.firstElementChild.id;

  if (viewPage.includes("list")) {
    renderPaginator(filteredMovies.length);
    listMovieModel(getMoviesByPage(1));
  } else if (viewPage.includes("card")) {
    renderPaginator(filteredMovies.length);
    renderMovieList(getMoviesByPage(1));
  }
});

switchIcon.addEventListener("click", (event) => {
  targetId = event.target.dataset.id;
  if (targetId === "card") {
    renderPaginator(filteredMovies.length);
    renderMovieList(getMoviesByPage(1));
  } else if (targetId === "list") {
    renderPaginator(filteredMovies.length);
    listMovieModel(getMoviesByPage(1));
  }
});

axios
  .get(INDEX_URL)
  .then((response) => {
    // Array(80)
    // for (const movie of response.data.results) {
    //   movies.push(movie)
    // }
    movies.push(...response.data.results);
    // renderMovieList(movies);
    renderPaginator(movies.length);
    renderMovieList(getMoviesByPage(1));
    // listMovieModel(getMoviesByPage(1));
  })
  .catch((err) => console.log(err));
