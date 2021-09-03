// /* A1 週年慶摸彩活動：字串處理
// Q1: 彩券號碼產生機
// 1. 分別、獨立產生六個字符
// 2. 前兩個字符為大寫英文字母
// 3. 後四個字符為數字

// 提示：你會需要運用 Math.random() 並控制亂數的變化範圍
// */

// let ticket = "";
// // write your code
// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ticket += letters[Math.floor(Math.floor(Math.random() * 26))];
// ticket += letters[Math.floor(Math.floor(Math.random() * 26))];
// ticket += Math.floor(Math.floor(Math.random() * 10));
// ticket += Math.floor(Math.floor(Math.random() * 10));
// ticket += Math.floor(Math.floor(Math.random() * 10));
// ticket += Math.floor(Math.floor(Math.random() * 10));

// console.log(ticket);

//// ----------------------------------------------------------------------------

// /*
// Q2: 加密姓名
// Bernard 先生中獎了！我們需要通知他這個好消息！
// 1. 名字的總長度不變
// 2. 顯示前兩個字母
// 3. 剩下改成 *

// 字串處理：裁切字串
// */

// // input
// let name = "Bernard";
// // write your code

// let newName = name.slice(0, 2);
// for (let i = 0; i < name.length - 2; i++) {
//   newName += "*";
// }

// // output
// console.log(newName);

//// ----------------------------------------------------------------------------

// /*
// Q3: 加密信箱
// 1. 程式最後需要將「加密後的 email」印出到螢幕上
// 2. 顯示 @ 後的資訊
// 3. 把 @ 前的字母覆蓋掉一半，隱藏的部分一律用三個點 ... 取代
// 4. 如果測試字串的長度是單數，例如 5，則只會留下 2 個字母 (如下圖)

// 字串處理：能夠組合、擷取、裁切字串
// 預期輸出：ber...@example.com
// */

// let email = "bernard@example.com";
// // write your code

// const emailFront = email.slice(0, 3);
// const emailEnd = email.slice(email.indexOf("@"));

// email = emailFront + "..." + emailEnd;

// // console.log(emailFront);
// // console.log(emailEnd);
// console.log(email);

//// ----------------------------------------------------------------------------

// /* A2: 週年慶摸彩活動：踢掉黑名單
// Q1: 單純的陣列
// 名單中的 Walter 和 Tim 是我們的拒絕往來戶，
// 我們不想要讓他們有得獎的機會，在執行抽獎程序之前，
// 我們需要把這些黑名單從資料中排除。

// 1. 使用迴圈掃描陣列
// 2. 使用 Array 的 splice 方法來刪除陣列項目
// 3. 使用 Array 的 includes 方法來檢查重覆

// 提示
// 1. 使用 splice 方法時，會「直接修改原本的陣列」，造成後續項目 index 向前遞補
// 2. 在這種情況下，你需要確保你真的有「掃描到 players 裡的每個項目」
// 3. 設計好你的迴圈後，請試著模擬迭代器每一輪的變化，當 Walter 被移出陣列時，Tim 的 index 變成多少？你要如何確保 Tim 有被選到？
// */

// const players = [
//   "Bernard",
//   "Youchi",
//   "Yenting",
//   "Angela",
//   "Yvonne",
//   "Ellen",
//   "Walter",
//   "Walter",
//   "Tim",
//   "Kevin",
//   "Russell",
// ];
// const blackList = ["Walter", "Tim"];
// // write your code

// for (let i = players.length -1 ; i >= 0; i--) {
//   if (blackList.includes(players[i])) {
//     players.splice(i, 1);
//   }
// }

// console.log(players);
// // should be ["Bernard", "Youchi", "Yenting", "Angela", "Yvonne", "Ellen", "Kevin", "Russell"]

//// ----------------------------------------------------------------------------

// /*
// Q2: 麻煩的陣列
// 承上題，如果名單裡裝的是物件呢？請你再試試看，剔除掉 walter@example.com 和 tim@example.com。
// (將以上兩位的所有資料，移除於參加者名單之外)

// */
// const players = [
//   { name: "Bernard", email: "bernard@example.com", ticket: "XL3558" },
//   { name: "Youchi", email: "youchi@example.com", ticket: "AH9188" },
//   { name: "Yenting", email: "yenting@example.com", ticket: "LO9903" },
//   { name: "Angela", email: "angela@example.com", ticket: "HY7212" },
//   { name: "Yvonne", email: "yvonne@example.com", ticket: "CH7684" },
//   { name: "Ellen", email: "ellen@example.com", ticket: "BB1750" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
//   { name: "Tim", email: "tim@example.com", ticket: "CK4592" },
//   { name: "Kevin", email: "kevin@example.com", ticket: "TT1804" },
//   { name: "Russell", email: "russell@example.com", ticket: "SI0305" },
// ];
// const blackList = [
//   { name: "Tim", email: "tim@example.com", ticket: "CK4592" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
// ];

// // write your code

// console.log(players.length);

// for (let i = players.length - 1; i >= 0; i--) {
//   for (let x = 0; x < blackList.length; x++) {
//     if (blackList[x].email === players[i].email) {
//       players.splice(i, 1);
//     }
//   }
// }

// console.log(players);

//// ----------------------------------------------------------------------------

// /* A3: 週年慶摸彩活動：封裝函式
// Q1: 回收你的程式碼
// 之前我們在【週年慶摸彩活動：字串處理】作業中設計了一些邏輯，
// 但這些邏輯並沒有被封裝成可重覆使用的程式碼。現在讓我們來回收自己的程式碼，
// 將這些零碎的邏輯封裝成函式，並且整合到同一份檔案裡。
// */

// function encodeName(name) {
//   // 請封裝你之前寫好的程式碼，並設計必要參數
//   let newName = name.slice(0, 2);
//   for (let i = 0; i < name.length - 2; i++) {
//     newName += "*";
//   }
//   return newName;
// }

// function encodeEmail(email) {
//   // 請封裝你之前寫好的程式碼，並設計必要參數
//   // write your code
//   const emailFront = email.slice(0, 3);
//   const emailEnd = email.slice(email.indexOf("@"));
//   email = emailFront + "..." + emailEnd;
//   return email;
// }

// // 呼叫函式
// console.log(encodeName("Bernard")); // Be*****
// console.log(encodeName("Youchi")); // Yo****
// console.log(encodeName("Yenting")); // Ye*****

// console.log(encodeEmail("bernard@example.com")); // ber...@example.com
// console.log(encodeEmail("youchi@example.com")); // you...@example.com
// console.log(encodeEmail("yenting@example.com")); // yen...@example.com

//// ----------------------------------------------------------------------------

// /* A4: 週年慶摸彩活動：誰是幸運兒
// Q1: 誰是幸運兒？
// 請你撰寫一支函式 drawWinner 來幫活動主持人公告得獎者。
// 每次抽出得獎者後，在 console 上會印出類似下圖的訊息。以下是連續呼叫 5 次函式後的預期回傳畫面：
// ST0305 | Kevin | kevin@example.com
// DT0885 | John | John@example.com
// FS0954 | David | David@example.com
// SA9854 | Ellen | Ellen@example.com
// FP4521 | Youchi | Youchi@example.com

// 提示
// 1. 需要將參加名單 players 傳給 drawWinner 函式
// 2. 注意，一個人只能被抽中一次
// 3. 你可以從這裡複製到相關程式碼，你只需要撰寫函式的部分
// */

// const players = [
//   { name: "Bernard", email: "bernard@example.com", number: "XL3558" },
//   { name: "Youchi", email: "youchi@example.com", number: "AH9188" },
//   { name: "Yenting", email: "yenting@example.com", number: "LO9903" },
//   { name: "Angela", email: "angela@example.com", number: "HY7212" },
//   { name: "Yvonne", email: "yvonne@example.com", number: "CH7684" },
//   { name: "Ellen", email: "ellen@example.com", number: "BB1750" },
//   { name: "Walter", email: "walter@example.com", number: "EI5724" },
//   { name: "Kevin", email: "kevin@example.com", number: "TT1804" },
//   { name: "Tim", email: "tim@example.com", number: "CK4592" },
//   { name: "Russell", email: "russell@example.com", number: "SI0305" },
// ];

// function drawWinner(players) {
//   // write your code here
//   const index = [Math.floor(Math.random() * players.length)];
//   const winner = players.splice([index], 1)[0]; // [0]是因為切出來是{}所以取裡面的第一位

//   return `${winner.number} | ${winner.name} | ${winner.email}`;
// }

// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));

//// ----------------------------------------------------------------------------

// /*
// Q2: 讓函式互相合作
// 完成上一題之後，拿出你之前封裝好的 encodeName 和 encodeEmail，
// 把「隱藏使用者資訊」的功能整合進來，讓輸出結果變成下圖的樣子。
// 讓輸出值加上*號
// */

// const players = [
//   { name: "Bernard", email: "bernard@example.com", number: "XL3558" },
//   { name: "Youchi", email: "youchi@example.com", number: "AH9188" },
//   { name: "Yenting", email: "yenting@example.com", number: "LO9903" },
//   { name: "Angela", email: "angela@example.com", number: "HY7212" },
//   { name: "Yvonne", email: "yvonne@example.com", number: "CH7684" },
//   { name: "Ellen", email: "ellen@example.com", number: "BB1750" },
//   { name: "Walter", email: "walter@example.com", number: "EI5724" },
//   { name: "Kevin", email: "kevin@example.com", number: "TT1804" },
//   { name: "Tim", email: "tim@example.com", number: "CK4592" },
//   { name: "Russell", email: "russell@example.com", number: "SI0305" },
// ];

// function drawWinner(players) {
//   // write your code here
//   const index = [Math.floor(Math.random() * players.length)];
//   const winner = players.splice([index], 1)[0];
//   return `${winner.number} | ${encodeName(winner.name)} | ${encodeEmail(
//     winner.email
//   )}`;
// }

// function encodeName(name) {
//   // write your code here
//   let newName = name.slice(0, 2);
//   for (let i = 0; i < name.length - 2; i++) {
//     newName += "*";
//   }
//   return newName;
// }

// function encodeEmail(email) {
//   // write your code here
//   const emailFront = email.slice(0, 3);
//   const emailEnd = email.slice(email.indexOf("@"));
//   email = emailFront + "..." + emailEnd;
//   return email;
// }

// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));
// console.log(drawWinner(players));

//// ----------------------------------------------------------------------------

/* A5: 週年慶摸彩活動：完整執行！
Q1: 摸彩活動後端程式

- 任務說明 -
讓我們重新確認這個活動的執行方式：

1. 每位客戶在結帳時可以得到一張摸彩券；
2. 每張彩券上有一組彩券號碼，彩券號碼必須是獨一無二的。號碼格式為：前兩個字符為大寫英文字母，後四個字符為數字
3. 參加者在彩券填上聯絡資訊，並將彩券丟出摸彩箱；一共有一獎、二獎、三獎，除了這三個獎項外，剩下的人都能得到參加獎。
4. 到了開獎日，系統會從摸彩箱裡選出三名得獎者，並在官網上公布得獎名單（包括參加獎）。
5. 在官網上公布的個人資料需要經過加密，加密方式為：名字的總長度不變，顯示前兩個字母，剩下改成 *
6. email 顯示 @ 之後的資訊，@ 之前的資訊覆蓋掉一半，隱藏的部分一律用三個點 ... 取代，
如果測試字串的長度是單數，則無條件捨去到整數位。例如長度 5，
則只會留下 2 個字母；若長度是 7，則只會留下 3 個字母，依此類推。(可參考下圖)

初始值
1. 初始的 players 資料
2. 公佈得獎者的格式 - 函式 announceMsg (winner, prize)
3. drawWinner (players, prize) 輸入與輸出
*/

// DATA /////////////////////////////////////

let players = [
  { name: "Bernard", email: "bernard@example.com" },
  { name: "Youchi", email: "youchi@example.com" },
  { name: "Yenting", email: "yenting@example.com" },
  { name: "Angela", email: "angela@example.com" },
  { name: "Yvonne", email: "yvonne@example.com" },
  { name: "Ellen", email: "ellen@example.com" },
  { name: "Walter", email: "walter@example.com" },
  { name: "Kevin", email: "kevin@example.com" },
  { name: "Tim", email: "tim@example.com" },
  { name: "Russell", email: "russell@example.com" },
];

// 用來檢查彩券號碼是否重複
// 1&2
const tickets = [];

// FUNCTIONS /////////////////////////////////////
// 1&2
function generateTicket() {
  let ticket = "";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // 處理英文
  for (let i = 0; i < 2; i++) {
    ticket += letters[Math.floor(Math.random() * 26)];
  }
  // 處理數字
  for (let i = 0; i < 4; i++) {
    ticket += Math.floor(Math.random() * 10);
  }

  // 檢查彩券號碼是否重複
  // 使用 indexOf 檢驗號碼是否已存在陣列中，如果沒有則返回 -1

  if (tickets.indexOf(ticket) >= 0) {
    // 0以上是有 -1是沒有
    return generateTicket();
  } else {
    tickets.push(ticket);
    return ticket;
  }
}

function drawWinner(players, prize) {
  const index = Math.floor(Math.random() * players.length);
  const winner = players.splice(index, 1)[0]; // array 被改變
  announceMsg(winner, prize);
}

function announceMsg(winner, prize) {
  console.log(
    `${winner.ticket} | ${encodeName(winner.name)} | ${encodeEmail(
      winner.email
    )} | ${prize}`
  );
}

function encodeName(name) {
  return name.slice(0, 2) + "*".repeat(name.length - 2);
}

function encodeEmail(email) {
  // 利用 slice 切割開 @ 前後的 email 字串
  const emailFront = email.slice(0, email.indexOf("@"));
  const emailEnd = email.slice(email.indexOf("@"), email.length);
  // emailFront 只留下字串長度的一半，其他以 ... 代替
  return (
    emailFront.slice(0, Math.floor(emailFront.length / 2)) + "..." + emailEnd
  );
}

// EXECUTING /////////////////////////////////////
// 提示：可依以下虛擬碼來實作流

// 1. each player gets a lottery ticket
for (let player of players) {
  player.ticket = generateTicket();
}

// 2. draw 3 winners and announce the results
// 提示：抽出得獎者後，記得要呼叫 announceMsg 在 console 印出得獎者
drawWinner(players, "頭獎");
drawWinner(players, "貮獎");
drawWinner(players, "叁獎");

// 3. the rest of players get participation award
for (let i = 0; i < players.length; i++) {
  announceMsg(players[i], "參加獎");
}

//// ----------------------------------------------------------------------------

// /* A6: 【選修魔王關】簡易 RPG 戰鬥：攻擊與補血

// 我們已經寫好了一些遊戲執行程序了，在這個程序中：

// 1. 每回合戰士先攻、魔法師後攻，若有任一方死掉，則回合結束
// 2. 攻擊者會呼叫 attack() 方法攻擊敵方，產生 1~100 點之間隨機點數的傷害；
// 3. 若被攻擊方沒有死，則會呼叫 cure() 方法 為自己補血，每次固定補寫 15 點 hp，需要消耗 mp 30 點。
// 4. cure() 這個方法中會傳入一個參數為 hp ，指的是想要補充的 hp 。每補充 1 點 hp 需要 2 點 mp，如果 mp 不足則無法成功補血。
// 5. 補血可以補超過原有的 hp，沒有 hp 最大值上限，只要有 mp 都可以補血

// 請你不要更動遊戲主程序，只能改寫 attack() 和 cure() 兩個函式的內容。
// */

// function createPlayer(name, hp, mp) {
//   return {
//     name: name,
//     hp: hp,
//     mp: mp,
//     cure: function (hp) {
//       // write your code
//     },
//     attack: function (enemy) {
//       // write your code
//     },
//   };
// }
// console.log("====== CREATE PLAYERS ======");
// const magician = createPlayer("Magician", 30, 100);
// const warrior = createPlayer("Warrior", 100, 30);
// console.log(magician); // {name: "Magician", hp: 30, mp: 100}
// console.log(warrior); // {name: "Warrior", hp: 100, mp: 30}
// console.log("====== START FIGHT ======");
// while (warrior.hp > 0 && magician.hp > 0) {
//   // 戰士先攻
//   console.log(warrior.attack(magician));
//   console.log(magician.cure(15)); // 固定補血 15 點
//   // 魔法師後攻
//   if (magician.hp > 0) {
//     console.log(magician.attack(warrior));
//     console.log(warrior.cure(15)); // 固定補血 15 點
//   }
//   console.log("======");
// }
