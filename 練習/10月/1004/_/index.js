const dataPanel = document.querySelector("#data-panel");
const paginator = document.querySelector("#paginator");
const filterGender = document.querySelector("#filter-gender");
const userSearch = document.querySelector("#user-search");
const userModal = document.querySelector("#user-modal");

const HOST_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = HOST_URL + "/api/v1/users/";
const USER_PER_PAGE = 12;
const PAGINATOR_PAGE_RADIUS = 2; //The showing page amount will be (2 * R + 1).

const users = [];
const filtered = [];
const searched = [];

let currentGender = "all"; //Record current gender filter status.
let currentPage = 1; //Record current page number.

// Get and show user data.
axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results);
    renderPaginator(users.length);
    renderUserData(getUsersByPage(1));
  })
  .catch((e) => console.log(e));

function renderUserData(data) {
  let tempHTML = "";
  let gender = "";
  let color = "";

  data.forEach((item) => {
    // Choose gender icon and its color according to user's info.
    switch (item.gender) {
      case "male":
        gender = "fa-mars";
        color = "#85abf0";
        break;
      case "female":
        gender = "fa-venus";
        color = "#f06ab9";
        break;
      default:
        gender = "fa-question";
        color = "#f0a238";
    }

    tempHTML += `
			<div class="col-6 col-sm-3 col-lg-2">
				<div class="mb-2">
					<div class="card">
						<button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#user-modal">
							<img src="${item.avatar}" class="card-img-top user-thumbnail" alt="..." data-id="${item.id}">
						</button>
						<div class="card-body d-flex justify-content-between p-0">
							<h7 class="card-text ps-1">${item.name}</h7>
							<div class="gender pe-1">
								<i class="fas ${gender}" style="color:${color};"></i>
							
    `;
    // Add icon if user is in the like list.
    if (isAddedToLike(Number(item.id)))
      tempHTML += '<i class="fas fa-heart" style="color:#e64c48;"></i>';

    tempHTML += `
              </div>
						</div >
					</div >
				</div >
			</div >
    `;
  });
  dataPanel.innerHTML = tempHTML;
}

function isAddedToLike(id) {
  const temp = JSON.parse(localStorage.getItem("likeUsers")) || [];
  if (temp.some((user) => user.id === id)) return true;
  return false;
}

// Render paginator.
paginator.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName === "A") {
    const data = filtered.length
      ? filtered
      : searched.length
      ? searched
      : users;
    let fix = 0; //Change if user press "pre" or "next" button.

    if (target.matches(".page-pre")) fix--;
    if (target.matches(".page-next")) fix++;

    currentPage = Number(target.dataset.page) + fix;
    renderPaginator(data.length);
    renderUserData(getUsersByPage(Number(target.dataset.page) + fix));
  }
});

function renderPaginator(length) {
  const maxPageNum = Math.ceil(length / USER_PER_PAGE);
  const pageNum = PAGINATOR_PAGE_RADIUS * 2 + 1;
  let temp = [];
  let tempHTML = `
    <li class="page-item">
      <a class="page-link page-pre" href="#" aria-label="Previous" data-page="${currentPage}">&laquo;</a>
    </li>
  `;

  // Disable "pre" button if current page is at the start.
  // Using 'data-page="${currentPage}"' to help event listener calculating the page number.
  if (currentPage <= 1) {
    tempHTML = `
      <li class="page-item disabled">
        <a class="page-link page-pre" href="#" aria-label="Previous" data-page="${currentPage}">&laquo;</a>
      </li>`;
  }

  if (maxPageNum <= pageNum) {
    // If the actual page amount is less than the setting(according to PAGINATOR_PAGE_RADIUS), showing every pages.
    for (let p = 1; p <= maxPageNum; p++) {
      if (p === currentPage) {
        tempHTML += `<li class="page-item active"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
      } else {
        tempHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${p}">${p}</a></li>`;
      }
    }
  } else {
    let fix = 0;
    // Generate number of showing page.
    for (let i = 0; i < pageNum; i++) {
      temp[i] = currentPage - PAGINATOR_PAGE_RADIUS + i;
    }

    // Fix the number if it's out of boundary.
    if (temp[0] < 1) fix = 1 - temp[0];
    if (temp[pageNum - 1] > maxPageNum) fix = maxPageNum - temp[pageNum - 1];

    temp.forEach((item) => {
      // Using "active" class according to current page.
      if (item + fix === currentPage) {
        tempHTML += `<li class="page-item active"><a class="page-link" href="#" data-page="${
          item + fix
        }">${item + fix}</a></li>`;
      } else {
        tempHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${
          item + fix
        }">${item + fix}</a></li>`;
      }
    });
  }

  // Disable "next" button if current page is at the end.
  if (currentPage >= maxPageNum) {
    tempHTML += `
    <li class="page-item disabled">
      <a class="page-link page-next" href="#" aria-label="Next" data-page="${currentPage}">&raquo;</a>
    </li>`;
  } else {
    tempHTML += `
    <li class="page-item">
      <a class="page-link page-next" href="#" aria-label="Next" data-page="${currentPage}">&raquo;</a>
    </li>`;
  }

  paginator.innerHTML = tempHTML;
}

function getUsersByPage(page) {
  const startId = (page - 1) * USER_PER_PAGE;
  const data = filtered.length ? filtered : searched.length ? searched : users;

  return data.slice(startId, startId + USER_PER_PAGE);
}

// Filter user according to gender(male/female/others).
filterGender.addEventListener("input", (event) => {
  currentGender = event.target.id;
  currentPage = 1;
  const data = searched.length ? searched : users;
  filtered.length = 0; //Clear current filtered list.

  if (currentGender !== "all") {
    filtered.push(...filterUserGender(data, currentGender));
    if (filtered.length <= 0) {
      renderUserData([]);
      return;
    }
    renderPaginator(filtered.length);
    renderUserData(getUsersByPage(currentPage));
  } else {
    renderPaginator(data.length);
    renderUserData(getUsersByPage(currentPage));
  }
});

function filterUserGender(data, gender) {
  const filtered = [];
  console.log(data);

  if (gender === "others") {
    data.forEach((item) => {
      if (item.gender !== "female" && item.gender !== "male") {
        filtered.push(item);
      }
    });
  } else {
    data.forEach((item) => {
      if (item.gender === gender) {
        filtered.push(item);
      }
    });
  }
  console.log(filtered);
  return filtered;
}

// Search user with keywords.
userSearch.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();
  let data = searched;
  searched.length = 0; //Clear current searched list.
  currentPage = 1;

  if (keyword.length > 0) {
    searched.push(...searchUserWithKeyword(users, keyword));
    if (searched.length <= 0) {
      renderPaginator(0);
      renderUserData([]);
      return;
    }
  } else {
    data = users;
  }

  // Filter result if the specific gender has been chosen.
  if (currentGender !== "all") {
    // Update current filtered list.
    filtered.length = 0;
    filtered.push(...filterUserGender(data, currentGender));
    if (filtered.length <= 0) {
      renderPaginator(0);
      renderUserData([]);
      return;
    }
    renderPaginator(filtered.length);
    renderUserData(getUsersByPage(currentPage));
  } else {
    renderPaginator(data.length);
    renderUserData(getUsersByPage(currentPage));
  }
});

function searchUserWithKeyword(data, keyword) {
  const searched = [];

  data.forEach((item) => {
    if (item.name.toLowerCase().includes(keyword)) {
      searched.push(item);
    }
  });

  return searched;
}

// Click thumbnail to show more user info.
dataPanel.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches(".user-thumbnail")) {
    showMoreUserInfo(target.dataset.id);
  }
});

function showMoreUserInfo(id) {
  const modalTitle = document.querySelector("#user-modal-title");
  const modalImg = document.querySelector("#user-modal-img img");
  const modalInfo = document.querySelector("#user-modal-info").children;
  const modalEmail = document.querySelector("#user-modal-email");
  const modalBtn = document.querySelector("#user-modal-btn");

  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data;

      modalTitle.innerHTML = `<b>${data.name}'s Info</b>`;
      modalImg.src = data.avatar;
      modalInfo[0].innerHTML = `<b>Name:</b> ${data.name} ${data.surname}`;
      modalInfo[1].innerHTML = `<b>Age:</b> ${data.age}`;
      modalInfo[2].innerHTML = `<b>Gender:</b> ${data.gender}`;
      modalEmail.href = `mailto:${data.email}`;
      modalBtn.dataset.id = id;

      // Render 'Add/Delete Like' button according to the like list.
      if (isAddedToLike(Number(id))) {
        modalBtn.children[1].classList.remove("btn-primary");
        modalBtn.children[1].classList.add("btn-danger");
        modalBtn.children[1].classList.remove("btn-add-like");
        modalBtn.children[1].classList.add("btn-delete-like");
        modalBtn.children[1].innerHTML =
          '<i class="fas fa-heart-broken"></i> Delete';
      } else {
        modalBtn.children[1].classList.remove("btn-danger");
        modalBtn.children[1].classList.add("btn-primary");
        modalBtn.children[1].classList.remove("btn-delete-like");
        modalBtn.children[1].classList.add("btn-add-like");
        modalBtn.children[1].innerHTML = '<i class="fas fa-heart"></i> Like';
      }
    })
    .catch((e) => console.log(e));
}

Button event of user modal.
userModal.addEventListener("click", (event) => {
  const target = event.target;

  if (target.matches(".btn-add-like")) {
    addToLike(Number(target.parentElement.dataset.id));
  } else if (target.matches(".btn-delete-like")) {
    deleteFromLike(Number(target.parentElement.dataset.id));
  }
});

function addToLike(id) {
  const temp = JSON.parse(localStorage.getItem("likeUsers")) || [];

  if (temp.some((user) => user.id === id)) {
    return alert("The user has been in your like list!");
  }

  temp.push(users.find((user) => user.id === id));
  localStorage.setItem("likeUsers", JSON.stringify(temp));
  showMoreUserInfo(id);
  renderUserData(getUsersByPage(currentPage));
}

function deleteFromLike(id) {
  const temp = JSON.parse(localStorage.getItem("likeUsers")) || [];
  const userIndex = temp.findIndex((user) => user.id === id);

  if (!temp) return alert("Your like list is empty!");
  if (userIndex === -1)
    return alert("The user doesn't exist in your like list!");

  temp.splice(userIndex, 1);
  localStorage.setItem("likeUsers", JSON.stringify(temp));
  showMoreUserInfo(id);
  renderUserData(getUsersByPage(currentPage));
}

