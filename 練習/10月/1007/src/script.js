// 抓取標籤
const red = document.querySelector('#input-R')
const green = document.querySelector('#input-G')
const blue = document.querySelector('#input-B')
const convert = document.querySelector('.btn')
const hexText = document.querySelector('#text-hex')
const hexSquare = document.querySelector('#hex-square')


convert.addEventListener('click', event => {
  const hex = transform(red.value) + transform(green.value) + transform(blue.value)
  hexText.value = ""
  
  // 判斷輸入正確  
  if (hex.includes(NaN) || hex.includes(undefined)) {
    alert('請輸入0~255!')
  } else {
    hexText.value += "#" + hex
    hexSquare.style.background = hexText.value;
  }
})

// 轉換16進位
function transform(value) {
  if (value <= 255 && value >= 0) {
    let hexNum = parseInt(value).toString(16);
    return hexNum.length == 1 ? "0" + hexNum : hexNum ;
  }
}


