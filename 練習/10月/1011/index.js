const Symbols = [
  "https://image.flaticon.com/icons/svg/105/105223.svg", // 黑桃
  "https://image.flaticon.com/icons/svg/105/105220.svg", // 愛心
  "https://image.flaticon.com/icons/svg/105/105212.svg", // 方塊
  "https://image.flaticon.com/icons/svg/105/105219.svg", // 梅花
];
const view = {
  getCardElement(index) {
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];
    return `
      <div class="card">
        <p>${number}</p>
        <img src="${symbol}" />
        <p>${number}</p>
      </div>`;
  },
  transformNumber(number) {
    switch (number) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return number;
    }
  },
  displayCards() {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = utility
      .getRandomNumberArrat(52)
      .map((index) => this.getCardElement(index))
      .join("");
  },
};

const utility = {
  getRandomNumberArrat(count) {
    // count = 5 => [2, 4, 0, 3, 1]
    const number = Array.from(Array(count).keys());
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index],
      ];
    }
    return number;
  },
};

view.displayCards();

console.log(utility.getRandomNumberArrat(5));
