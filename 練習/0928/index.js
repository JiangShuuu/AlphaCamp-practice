const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const PEOPLE_PAGE = 24;

const peopleInfoArr = [];
const peopleCards = document.querySelector(".people-cards");
const paginator = document.querySelector("#paginator");

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

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / PEOPLE_PAGE);

  let rawHTML = "";

  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;

    paginator.innerHTML = rawHTML;
  }
}

function getPeopleData(page) {
  const startIndex = (page - 1) * PEOPLE_PAGE;
  return peopleInfoArr.slice(startIndex, startIndex + PEOPLE_PAGE);
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoritePerson")) || [];
  console.log(list);
  // console.log(id);
  const faverList = peopleInfoArr.find((faverList) => faverList.id === id);
  // console.log(faverList);

  if (list.some((faverList) => faverList.id === id)) {
    return alert("已收藏");
  }
  list.push(faverList);

  localStorage.setItem("favoritePerson", JSON.stringify(list));
}

peopleCards.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    showInfoModal(+event.target.parentElement.dataset.id);
  } else if (event.target.tagName === "BUTTON") {
    console.log(event.target.dataset.id);
    addToFavorite(+event.target.dataset.id);
  }
});

paginator.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  const page = +event.target.dataset.page;
  renderPeopleCards(getPeopleData(page));
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
