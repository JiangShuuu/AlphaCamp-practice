const panel = document.querySelector("#data-panel");
const button = document.querySelector("button");
const url = "https://randomuser.me/api/";

button.addEventListener("click", (e) => {
  axios.get(url).then((response) => {
    console.log(response);
    let user = response.data.results[0];
    console.log(user);
    let name = `${user.name.first} ${user.name.last}`;
    let avatar = user.picture.large;
    let email = user.email;
    panel.innerHTML = `
      <h3>${name}</h3>
      <img src="${avatar}">
      <p>${email}</p>
    `;
  });
});
