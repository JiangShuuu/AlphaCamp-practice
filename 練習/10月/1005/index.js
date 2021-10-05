//////// 在這裡寫你的答案 /////////
function toRoman(num){
  // Romas rules
  const romans = [
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1]
  ]

  // 空字串
  let result = ""

  // key遍歷romans陣列
  for (let key of romans) {
    // 定義每次的romans文字、數字
    let [romansWord, n] = key;
    // while篩選正確romans文字 
    while (num >= n) {
      num -= n;
      result += romansWord
    }
  }
  return result
}


//////// 以下是測試程式，請勿更動 /////////
const expect = (name, value, result) => {
  if (value === result) { return true; }

  throw new Error(`${name} failed successfully`);
};

expect('toRoman(1)', toRoman(1), 'I');
expect('toRoman(2)', toRoman(2), 'II');
expect('toRoman(3)', toRoman(3), 'III');
expect('toRoman(4)', toRoman(4), 'IV');
expect('toRoman(5)', toRoman(5), 'V');
expect('toRoman(6)', toRoman(6), 'VI');
expect('toRoman(9)', toRoman(9), 'IX');
expect('toRoman(10)', toRoman(10), 'X');
expect('toRoman(27)', toRoman(27), 'XXVII');
expect('toRoman(48)', toRoman(48), 'XLVIII');
expect('toRoman(59)', toRoman(59), 'LIX');
expect('toRoman(93)', toRoman(93), 'XCIII');
expect('toRoman(141)', toRoman(141), 'CXLI');
expect('toRoman(150)', toRoman(150), 'CL');
expect('toRoman(163)', toRoman(163), 'CLXIII');
expect('toRoman(402)', toRoman(402), 'CDII');
expect('toRoman(575)', toRoman(575), 'DLXXV');
expect('toRoman(911)', toRoman(911), 'CMXI');
expect('toRoman(1024)', toRoman(1024), 'MXXIV');
expect('toRoman(1050)', toRoman(1050), 'ML');
expect('toRoman(1500)', toRoman(1500), 'MD');
expect('toRoman(1505)', toRoman(1505), 'MDV');
expect('toRoman(3000)', toRoman(3000), 'MMM');

console.log('all pass!');
