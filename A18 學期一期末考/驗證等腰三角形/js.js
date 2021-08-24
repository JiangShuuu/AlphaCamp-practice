// 定義初始值
let a = 0;
let b = 0;
let count = 0;

// a、b值用for迴圈循環1~10
for (let i = 1; i < 10; i++) {
  (a += 1), (b += 1);
  // c值用for迴圈循環1~10
  for (let c = 1; c < 10; c++) {
    // 判斷是否為三角形
    if (a + b > c && b + c > a && a + c > b) {
      // 判斷是否為等腰三角形 & 三邊長加總小於20
      if ((a, b !== c && a + b + c <= 20)) {
        count++;
        console.log(`發現等腰三角形 ! 三邊長分別為：${a}、${b}、${c}`);
      }
    }
  }
}

console.log(`共找到 ${count} 組等腰三角形`);
