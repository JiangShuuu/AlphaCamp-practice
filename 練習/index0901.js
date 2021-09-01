// // input
// let name = 'Bernard'
// // write your code
// let new1 = name.slice(0, 2)

// for (let i = 0; i < name.length -2; i++) {
//   new1 += '*';
// }

// // // output
// // console.log(new1)

// let email = 'bernard@example.com'
// // write your code
// let new1 = email.slice(0, 2)
// let newend = email.slice(email.indexOf('@'))


// let email0 = new1 + '...' + newend
// console.log(newend)
// console.log(new1)
// console.log(email0)

/*

function encodeName (name) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let pasName = name.slice(0, 2);

  for (let i = 0; i < name.length -2 ; i++) {
    pasName += '*';
  }
  return pasName
}

function encodeEmail (email) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let new_email_front = email.slice(0, 3)
  let new_email_end = email.slice(email.indexOf('@'))
  return new_email = new_email_front + '...' + new_email_end
}

// 呼叫函式
console.log(encodeName('Bernard'))  // Be*****
console.log(encodeName('Youchi'))  // Yo****
console.log(encodeName('Yenting'))  // Ye*****

console.log(encodeEmail('bernard@example.com'))  // ber...@example.com
console.log(encodeEmail('youchi@example.com'))  // you...@example.com
console.log(encodeEmail('yenting@example.com'))  // yen...@example.com
*/


const players = [
  { name: 'Bernard', email: 'bernard@example.com', ticket: 'XL3558' },
  { name: 'Youchi', email: 'youchi@example.com', ticket: 'AH9188' },
  { name: 'Yenting', email: 'yenting@example.com', ticket: 'LO9903' },
  { name: 'Angela', email: 'angela@example.com', ticket: 'HY7212' },
  { name: 'Yvonne', email: 'yvonne@example.com', ticket: 'CH7684' },
  { name: 'Ellen', email: 'ellen@example.com', ticket: 'BB1750' },
  { name: 'Walter', email: 'walter@example.com', ticket: 'EI5724' },
  { name: 'Kevin', email: 'kevin@example.com', ticket: 'TT1804' },
  { name: 'Tim', email: 'tim@example.com', ticket: 'CK4592' },
  { name: 'Russell', email: 'russell@example.com', ticket: 'SI0305' }
]

function drawWinner (players) {
  const index = Math.floor(Math.random() * players.length)
  const winner = players[index]
  players.splice(index, 1)
  return `${winner.ticket} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)}`
}

function encodeName (name) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let pasName = name.slice(0, 2);

  for (let i = 0; i < name.length -2 ; i++) {
    pasName += '*';
  }
  return pasName
}

function encodeEmail (email) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let new_email_front = email.slice(0, 3)
  let new_email_end = email.slice(email.indexOf('@'))
  return new_email = new_email_front + '...' + new_email_end
}

console.log(drawWinner(players))
console.log(drawWinner(players))
console.log(drawWinner(players))
console.log(drawWinner(players))
console.log(drawWinner(players))


/*
// DATA /////////////////////////////////////

const players = [
  { name: 'Bernard', email: 'bernard@example.com' },
  { name: 'Youchi', email: 'youchi@example.com' },
  { name: 'Yenting', email: 'yenting@example.com' },
  { name: 'Angela', email: 'angela@example.com' },
  { name: 'Yvonne', email: 'yvonne@example.com' },
  { name: 'Ellen', email: 'ellen@example.com' },
  { name: 'Walter', email: 'walter@example.com' },
  { name: 'Kevin', email: 'kevin@example.com' },
  { name: 'Tim', email: 'tim@example.com' },
  { name: 'Russell', email: 'russell@example.com' }
]

// 用來檢查彩券號碼是否重複
const tickets = []

// FUNCTIONS /////////////////////////////////////

function generateTicket () {
  let ticket = ''
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  // 處理英文
  for (let i = 0; i < 2; i++) {
    ticket += letters[Math.floor(Math.random() * 26)]
  }
  // 處理數字
  for (let i = 0; i < 4; i++) {
    ticket += Math.floor(Math.random() * 10)
  }
  
  // 檢查彩券號碼是否重複
  // 使用 indexOf 檢驗號碼是否已存在陣列中，如果沒有則返回 -1
  if (tickets.includes(ticket) >= 0) {
   return generateTicket() 
  } else {
   tickets.push(ticket)
   return ticket 
  }
}


function drawWinner (players, prize) {
  const index = Math.floor(Math.random() * players.length)
  const winner = players.splice(index, 1)[0] // array 被改變
  announceMsg(winner, prize)
}

function announceMsg (winner, prize) {
  console.log(`${winner.ticket} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

function encodeName (name) {
  return name.slice(0, 2) + '*'.repeat(name.length - 2)
}

function encodeEmail (email) {
  // 利用 slice 切割開 @ 前後的 email 字串
  const emailFront = email.slice(0, email.indexOf('@'))
  const emailEnd = email.slice(email.indexOf('@'), email.length)
  // emailFront 只留下字串長度的一半，其他以 ... 代替
  return emailFront.slice(0, Math.floor(emailFront.length / 2)) + '...' + emailEnd
}

// EXECUTING /////////////////////////////////////
// 提示：可依以下虛擬碼來實作流

// 1. each player gets a lottery ticket
for (let player of players) {
  player.ticket = generateTicket()
}

// 2. draw 3 winners and announce the results
// 提示：抽出得獎者後，記得要呼叫 announceMsg 在 console 印出得獎者
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// 3. the rest of players get participation award
// 提示：抽出得獎者後，記得要呼叫 announceMsg 在 console 印出得獎者
for (let i = 0; i < players.length; i++) {
  announceMsg(players[i], '參加獎')
}
*/