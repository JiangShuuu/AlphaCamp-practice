let a = Number(prompt("請輸入第一條三角形邊長 (a)"));
let b = Number(prompt("請輸入第二條三角形邊長 (b)"));
let c = Number(prompt("請輸入第三條三角形邊長 (c)"));

// write your code

const triangle = function () {
  if ((a === b) === c) {
    console.log("等邊三角形");
  } else if (a === b || b === c || c === a) {
    console.log("等腰三角形");
  } else {
    console.log("不等邊三角形");
  }
};

answer =
  a + b > c && b + c > a && a + c > b
    ? triangle(a, b, c)
    : console.log("invalid");

/*
if (a+b>c && b+c>a && a+c>b) {
   triangle(a, b, c)
 } else {
   console.log ('invalid')
 }
*/
