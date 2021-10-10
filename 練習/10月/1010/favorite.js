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
const peopleGender = document.querySelector("#otherBtn");

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
        <a type="button" class="btn btn-outline-light" data-id="${item.id}">
          💔
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

function removeFromFavorite(id) {
  const peopleIndex = peopleInfoArr.findIndex((list) => list.id === id);

  peopleInfoArr.splice(peopleIndex, 1);
  localStorage.setItem("favoritePerson", JSON.stringify(peopleInfoArr));

  renderPeopleCards(peopleInfoArr);
}

function filterUserGender(data, gender) {
  let filteredPeople = [];

  data.forEach((item) => {
    if (item.gender === gender) {
      filteredPeople.push(item);
      console.log(item.gender);
    }
  });
  return filteredPeople;
}

function getPeopleData(page) {
  const data = filteredPeople.length ? filteredPeople : peopleInfoArr;

  const startIndex = (page - 1) * PEOPLE_PAGE;
  return data.slice(startIndex, startIndex + PEOPLE_PAGE);
}

peopleGender.addEventListener("click", (event) => {
  chooseGender = event.target.id;
  curpage = 1;
  filteredPeople.length = 0;

  const data = filteredPeople.length ? filteredPeople : peopleInfoArr;
  console.log(chooseGender);

  if (chooseGender !== "all") {
    filteredPeople.push(...filterUserGender(data, chooseGender));
    if (filteredPeople.length <= 0) {
      renderPeopleCards([]);
      return;
    }

    renderPeopleCards(getPeopleData(curpage));
  } else {
    renderPeopleCards(getPeopleData(curpage));
  }
});

peopleCards.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    showInfoModal(+event.target.dataset.id);
  } else if (event.target.tagName === "A") {
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
