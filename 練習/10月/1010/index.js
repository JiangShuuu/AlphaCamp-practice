const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const PEOPLE_PAGE = 10;

const peopleInfoArr = [];
let filteredPeople = [];
const personlist = JSON.parse(localStorage.getItem("favoritePerson")) || [];
let page = 1;

const peopleCards = document.querySelector(".people-cards");
const paginator = document.querySelector("#paginator");
const peopleSearch = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const peopleGender = document.querySelector("#otherBtn");

function renderPeopleCards(data) {
  let rawHTML = "";
  let btnHTML = "";

  data.forEach((item) => {
    btnHTML = personlist.some((list) => list.id === item.id) ? `❤` : `🤍`;

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
          ${btnHTML}
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

let numberOfPages = 0;

// 分頁數
function renderPaginator(nowPage) {
  let rawHTML = "";

  const among = filteredPeople.length
    ? filteredPeople.length
    : peopleInfoArr.length;
  numberOfPages = Math.ceil(among / PEOPLE_PAGE);

  //前一頁按鈕
  rawHTML += `  
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" id="previous-page">
        &laquo;
      </a>
    </li>
  `;

  //前兩頁
  if (nowPage === 2) {
    rawHTML += `  
        <li class="page-item"><a class="page-link" href="#" data-page='1'>1</a></li>
      `;
  } else if (nowPage === 3) {
    rawHTML += `  
        <li class="page-item"><a class="page-link" href="#" data-page='1'>1</a></li>
        <li class="page-item"><a class="page-link" href="#" data-page='2'>2</a></li>
      `;
  } else if (nowPage > 3) {
    rawHTML += `  
      <li class="page-item"><a class="page-link" href="#" data-page='${
        nowPage - 2
      }'>${nowPage - 2}</a></li>
      <li class="page-item"><a class="page-link" href="#" data-page='${
        nowPage - 1
      }'>${nowPage - 1}</a></li>
    `;
  }

  //目前頁數
  rawHTML += `  
      <li class="page-item active"><a class="page-link" href="#" data-page='${nowPage}'>${nowPage}</a></li>
    `;
  //後兩頁
  let n = 0;
  while (nowPage < numberOfPages) {
    nowPage++;
    rawHTML += `  
      <li class="page-item"><a class="page-link" href="#" data-page='${nowPage}'>${nowPage}</a></li>
    `;
    n++;
    if (n === 2) {
      break;
    }
  }

  //下一頁
  rawHTML += ` 
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" id="next-page">
        &raquo;
      </a>
    </li>
  `;
  paginator.innerHTML = rawHTML;
}

paginator.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") return;
  // let page = +event.target.dataset.page;
  // console.log(+event.target.dataset.page);
  if (event.target.matches("#previous-page")) {
    //按到上一頁
    if (page === 1) return; //無法在上一頁，跳出函式
    page--;
  } else if (event.target.matches("#next-page")) {
    //按到下一頁
    if (page === numberOfPages) return; //無法在下一頁，跳出函式
    page++;
  } else {
    page = Number(event.target.dataset.page); ////按到頁數
  }
  renderPaginator(page);
  renderPeopleCards(getPeopleData(page));
});

function getPeopleData(page) {
  const data = filteredPeople.length ? filteredPeople : peopleInfoArr;

  const startIndex = (page - 1) * PEOPLE_PAGE;
  return data.slice(startIndex, startIndex + PEOPLE_PAGE);
}

function addToFavorite(id) {
  const faverList = peopleInfoArr.find((faverList) => faverList.id === id);
  personlist.push(faverList);

  localStorage.setItem("favoritePerson", JSON.stringify(personlist));
}

function removeFavorite(id) {
  const favoriteIndex = personlist.findIndex((list) => list.id === id);
  if (personlist.some((faverList) => faverList.id === id)) {
    personlist.splice(favoriteIndex, 1);
    localStorage.setItem("favoritePerson", JSON.stringify(personlist));
    return alert("已移除");
  }
}

peopleCards.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    showInfoModal(+event.target.dataset.id);
  } else if (event.target.innerText === "🤍") {
    addToFavorite(+event.target.dataset.id);
    event.target.innerText = "❤";
  } else if (event.target.innerText === "❤") {
    removeFavorite(+event.target.dataset.id);
    event.target.innerText = "🤍";
  }
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

  renderPaginator(page);
  renderPeopleCards(getPeopleData(1));
});

peopleGender.addEventListener("click", (event) => {
  chooseGender = event.target.id;
  curpage = 1;
  filteredPeople.length = 0;

  const data = filteredPeople.length ? filteredPeople : peopleInfoArr;

  if (chooseGender !== "all") {
    filteredPeople.push(...filterUserGender(data, chooseGender));
    if (filteredPeople.length <= 0) {
      renderPaginator(0);
      renderPeopleCards([]);
      return;
    }
    renderPaginator(page);
    renderPeopleCards(getPeopleData(curpage));
  } else {
    renderPaginator(page);
    renderPeopleCards(getPeopleData(curpage));
  }
});

function filterUserGender(data, gender) {
  let filteredPeople = [];

  data.forEach((item) => {
    if (item.gender === gender) {
      filteredPeople.push(item);
    }
  });
  return filteredPeople;
}

axios
  .get(INDEX_URL)
  .then((response) => {
    peopleInfoArr.push(...response.data.results);
    renderPaginator(page);
    //peopleInfoArr.length
    renderPeopleCards(getPeopleData(1));
  })
  .catch((err) => console.log(err));

// let man = [];
// if (peopleInfoArr.some((faverList) => faverList.gender === "male")) {
//   man.push(peopleInfoArr);
// }[

// home.addEventListener("click", (event) => {
//   filteredPeople = [];
//   renderPeopleCards(getPeopleData(1));
//   renderPaginator(peopleInfoArr.length);
// });
