const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const PEOPLE_PAGE = 24;

const peopleInfoArr = JSON.parse(localStorage.getItem("favoritePerson"));
console.log(peopleInfoArr);
let filteredPeople = [];

const peopleCards = document.querySelector(".people-cards");
const paginator = document.querySelector("#paginator");
const peopleSearch = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

function renderPeopleCards(data) {
  let rawHTML = "";

  data.forEach((item) => {
    rawHTML += `
    <div class="people-card m-2">
      <a class="avatar" style="cursor: pointer" data-toggle="modal" data-target="#personInfoModal" data-id="${item.id}">
        <img class="border rounded" src="${item.avatar}" />
      </a>
      <div class="name">
        <large class="card-title ">${item.name}</s>
        <button type="button" class="btn btn-favorite btn-primary btn-sm" data-id="${item.id}">
          ❤
        </button>
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

function removeFromFavorite(id) {
  const peopleIndex = peopleInfoArr.findIndex((list) => list.id === id);

  peopleInfoArr.splice(peopleIndex, 1);
  localStorage.setItem("favoritePerson", JSON.stringify(peopleInfoArr));

  renderPeopleCards(peopleInfoArr);
}

peopleCards.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    showInfoModal(+event.target.parentElement.dataset.id);
  } else if (event.target.tagName === "BUTTON") {
    console.log(+event.target.dataset.id);
    removeFromFavorite(+event.target.dataset.id);
  }
});

peopleSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  console.log(keyword);

  filteredPeople = peopleInfoArr.filter((list) =>
    list.name.toLowerCase().includes(keyword)
  );
  console.log(filteredPeople);

  if (filteredPeople.length === 0) {
    return alert("Not find person!!");
  }

  renderPeopleCards(filteredPeople);
});

renderPeopleCards(peopleInfoArr);
