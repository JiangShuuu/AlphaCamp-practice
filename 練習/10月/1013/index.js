// 定義遊戲狀態
const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardsMatchFailed: "CardsMatchFailed",
  CardsMatched: "CardsMatched",
  GameFinished: "GameFinished",
};

const Symbols = [
  "https://image.flaticon.com/icons/svg/105/105223.svg", // 黑桃
  "https://image.flaticon.com/icons/svg/105/105220.svg", // 愛心
  "https://image.flaticon.com/icons/svg/105/105212.svg", // 方塊
  "https://image.flaticon.com/icons/svg/105/105219.svg", // 梅花
];
const view = {
  //回傳正面元素
  getCardContent(index) {
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];

    return `
        <p>${number}</p>
        <img src="${symbol}" />
        <p>${number}</p>`;
  },

  //回傳牌背元素
  getCardElement(index) {
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];
    return `
      <div data-index="${index}" class="card back">
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
  // 傳入已經打散的陣列，去做顯示的動作
  displayCards(indexes) {
    const rootElement = document.querySelector("#cards");

    rootElement.innerHTML = indexes
      .map((index) => this.getCardElement(index))
      .join("");
  },

  // flipCard(card)
  // flipCard(1, 2, 3, 4, 5)
  // flipCard[1, 2, 3, 4, 5]
  flipCards(...cards) {
    cards.map((card) => {
      if (card.classList.contains("back")) {
        // 回傳正面
        card.classList.remove("back");
        card.innerHTML = this.getCardContent(+card.dataset.index);
        return;
      }

      card.classList.add("back");
      card.innerHTML = null;
    });
  },

  pairCards(...cards) {
    cards.map((card) => {
      card.classList.add("paired");
    });
  },

  renderScore(score) {
    document.querySelector(".score").textContent = `Score : ${score}`;
  },

  renderTriedTimes(times) {
    document.querySelector(
      ".tried"
    ).textContent = `You've tried: ${times} time`;
  },

  appendWrongAnimation(...cards) {
    cards.map((card) => {
      card.classList.add("wrong");
      card.addEventListener(
        "animationend",
        (event) => {
          card.classList.remove("wrong");
        },
        {
          once: true,
        }
      );
    });
  },

  showGameFinished() {
    const div = document.createElement("div");
    div.classList.add("completed");
    div.innerHTML = `
      <p>Complete!</p>
      <p>Score: ${model.score}</p>
      <p>You've tried: ${model.triedTimes} times</p>
    `;
    const header = document.querySelector("#header");
    header.before(div);
  },
};

const utility = {
  getRandomNumberArray(count) {
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

const model = {
  revealedCards: [],

  // 配對成功或失敗
  isRevealedCardsMatched() {
    return (
      this.revealedCards[0].dataset.index % 13 ===
      this.revealedCards[1].dataset.index % 13
    );
  },

  score: 0,
  triedTimes: 0,
};

// 狀態
const controller = {
  // 初始狀態
  currentState: GAME_STATE.FirstCardAwaits,

  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52));
  },

  // 依照不同的遊戲狀態，做不同的行為
  dispatchCardAction(card) {
    if (!card.classList.contains("back")) {
      return;
    }

    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.flipCards(card);
        model.revealedCards.push(card);
        this.currentState = GAME_STATE.SecondCardAwaits;
        break;
      case GAME_STATE.SecondCardAwaits:
        view.renderTriedTimes(++model.triedTimes);

        view.flipCards(card);
        model.revealedCards.push(card);

        if (model.isRevealedCardsMatched()) {
          // 配對正確
          view.renderScore((model.score += 10));
          this.currentState = GAME_STATE.CardsMatched;
          view.pairCards(...model.revealedCards); //加效果
          model.revealedCards = []; //用來判斷配對的[]清空
          if (model.score === 260) {
            console.log("showGameFinished");
            this.currentState = GAME_STATE.GameFinished;
            view.showGameFinished(); // 加在這裡
            return;
          }
          this.currentState = GAME_STATE.FirstCardAwaits;
        } else {
          // 配對失敗
          this.currentState = GAME_STATE.CardsMatchFailed;
          view.appendWrongAnimation(...model.revealedCards);
          setTimeout(this.resetCards, 1000);
        }
        break;
    }
    console.log("this.currentState", this.currentState);
    console.log(
      "revealedCards",
      model.revealedCards.map((card) => card.dataset.index)
    );
  },

  resetCards() {
    view.flipCards(...model.revealedCards);
    model.revealedCards = [];
    controller.currentState = GAME_STATE.FirstCardAwaits;
  },
};

controller.generateCards();

// Node List
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    // view.appendWrongAnimation(card);
    controller.dispatchCardAction(card);
  });
});
