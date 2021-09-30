const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const PEOPLE_PAGE = 10;

const peopleInfoArr = [];
let filteredPeople = [];

const peopleCards = document.querySelector(".people-cards");
const paginator = document.querySelector("#paginator");
const peopleSearch = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const home = document.querySelector("#home");

function renderPeopleCards(data) {
  let rawHTML = "";

  data.forEach((item) => {
    rawHTML += `
    <div class="card p-3 m-2 " >
      <img src="${item.avatar}" class="rounded-circle">  
      <h3 class="card-title text-center mt-2">${item.name}</h3>
      <hr/>
      <div class="card-body d-flex justify-content-around ">
        <button type="button" class="btn btn-favorite btn-primary" data-toggle="modal" data-target="#personInfoModal" data-id="${item.id}">
          More Info
        </button>
        <a type="button" class="btn btn-favorite btn-primary" data-id="${item.id}">
          🤍
        </a>
      </div>
    </div>
    `;
  });
  peopleCards.innerHTML = rawHTML;
}

function showInfoModal(id) {
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data;

    const modalInfoList = document.querySelector(".modal-info-list");
    modalInfoList.innerHTML = `
      <li>Id: ${data.id}</li>
      <li>Name: ${data.name}</li>
      <li>Surname: ${data.surname}</li>
      <li>Email: ${data.email}</li>
      <li>Gender: ${data.gender}</li>
      <li>Age: ${data.age}</li>
      <li>Region: ${data.region}</li>
      <li>Birthday: ${data.birthday}</li>
      <li>Avatar - <a href="${data.avatar}" target="_blank">${data.avatar}</a></li>
    `;
  });
}

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / PEOPLE_PAGE);

  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;

    paginator.innerHTML = rawHTML;
  }
}

function getPeopleData(page) {
  const data = filteredPeople.length ? filteredPeople : peopleInfoArr;

  const startIndex = (page - 1) * PEOPLE_PAGE;
  return data.slice(startIndex, startIndex + PEOPLE_PAGE);
}

function addToFavorite(id) {
  // function isPersonMatched(faverList) {
  //   return faverList.id === id;
  // }

  const personlist = JSON.parse(localStorage.getItem("favoritePerson")) || [];
  const faverList = peopleInfoArr.find((faverList) => faverList.id === id);

  if (personlist.some((faverList) => faverList.id === id)) {
    return alert("已收藏");
  }
  personlist.push(faverList);
  console.log(personlist);

  localStorage.setItem("favoritePerson", JSON.stringify(personlist));
}

peopleCards.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    showInfoModal(+event.target.dataset.id);
  } else if (event.target.tagName === "A") {
    console.log(+event.target.dataset.id);
    addToFavorite(+event.target.dataset.id);
  }
});

paginator.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  const page = +event.target.dataset.page;
  renderPeopleCards(getPeopleData(page));
});

peopleSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  console.log(searchInput.value);

  filteredPeople = peopleInfoArr.filter((list) =>
    list.name.toLowerCase().includes(keyword)
  );

  if (filteredPeople.length === 0) {
    return alert("Not find person!!");
  }

  renderPaginator(filteredPeople.length);
  renderPeopleCards(getPeopleData(1));
});

axios
  .get(INDEX_URL)
  .then((response) => {
    // response.data.results 為 Array(80)
    peopleInfoArr.push(...response.data.results);
    renderPaginator(peopleInfoArr.length);
    renderPeopleCards(getPeopleData(1));
  })
  .catch((err) => console.log(err));

// home.addEventListener("click", (event) => {
//   filteredPeople = [];
//   renderPeopleCards(getPeopleData(1));
//   renderPaginator(peopleInfoArr.length);
// });
