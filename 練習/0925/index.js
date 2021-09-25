const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = [];
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

function renderMovieList(data) {
  let rawHTML = "";

  // procssing
  data.forEach((item) => {
    // title ,image
    rawHTML += `<div class="col-sm-3">
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
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || []; //先執行左邊沒有的話就右邊

  // function isMovieIdMatched(movie) {
  //   return movie.id === id;
  // }
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已在收藏清單中");
  }
  list.push(movie);

  localStorage.setItem("favoriteMovies", JSON.stringify(list));
  console.log(list);
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
  let filteredMovies = [];

  // map, filter, reduce 陣列三寶
  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filteredMovies.length === 0) {
    return alert("Cannot find movie with keyword: " + keyword);
  }

  // if (!keyword.length) {
  //   return alert("please try again!");
  // }

  // for (const movie of movies) {
  //   if (movie.title.toLowerCase().includes(keyword)) {
  //     filteredMovies.push(movie);
  //   }
  // }

  renderMovieList(filteredMovies);
});

axios.get(INDEX_URL).then((response) => {
  // Array(80)
  // for (const movie of response.data.results) {
  //   movies.push(movie)
  // }
  movies.push(...response.data.results);
  renderMovieList(movies);
});

localStorage.setItem("default_language", "english");
