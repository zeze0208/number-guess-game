let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resultGif = document.getElementById("result-gif");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 3;
let gameOver = false;
let history = [];
let answerArea = document.getElementById("answer-area")
let historyArea = document.getElementById("history-area")

// UP / DOWN / 정답 GIF 리스트
const upGifs = [
  "https://media1.giphy.com/media/x4O0fjpQfoBZS/200w.gif?cid=6c09b952gkuseev08ghgf0hf2prf105jgwt8jewdwyejitnp&ep=v1_gifs_search&rid=200w.gif&ct=g",
  "https://cliply.co/wp-content/uploads/2020/08/432008121_THUMBS_UP_3D_LIGHT_SKIN_TONE_400px.gif",
  "https://i.pinimg.com/originals/d8/d7/b0/d8d7b003cc98b44d2a4ca87e27f0c304.gif",
  "https://cdn.pixabay.com/animation/2024/06/21/16/52/16-52-17-475_512.gif",
  "https://www.gifcen.com/wp-content/uploads/2022/06/thumbs-up-gif-6.gif",
];

const downGifs = [
  "https://media.tenor.com/9GIOKQryLFsAAAAM/down-liz-lemon.gif",
  "https://data.textstudio.com/output/sample/animated/5/0/2/5/down-1-5205.gif",
  "https://cssbud.com/wp-content/uploads/2021/06/falling-arrow.gif",
  "https://i.pinimg.com/originals/3b/5d/d0/3b5dd0dddb316d6a61f7712633c3b663.gif",
  "https://media0.giphy.com/media/3LcOi1fXmCzNaYyemC/giphy.gif?cid=6c09b952ndvur2y54kudz86kmvog1up7n4zzc25g76dqzewj&ep=v1_gifs_search&rid=giphy.gif&ct=g",
];

const winGif =
  "https://media.tenor.com/_r-UUCjuC9MAAAAM/congratulations-congrats.gif"; // 정답을 맞췄을 때 GIF

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
  answerArea.textContent = `정답은 ${computerNum}`;

}

function updateHistory() {
    historyArea.textContent = `${history.join(", ")}`;
}

function play() {
  let userValue = parseInt(userInput.value);

  if (userValue < 1 || userValue > 100 || isNaN(userValue)) {
    resultArea.textContent = "⚠️ 1과 100 사이 숫자를 입력해주세요!";
    resultGif.style.display = "none";
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "⚠️ 이미 입력한 숫자입니다!";
    resultGif.style.display = "none";
    return;
  }


  chances--;
  chanceArea.textContent = `기회는 ${chances}번 뿐!`;


  if (userValue < computerNum) {
    resultArea.textContent = "⬆️ UP!";
    showRandomGif(upGifs);
  } else if (userValue > computerNum) {
    resultArea.textContent = "⬇️ DOWN!";
    showRandomGif(downGifs);
  } else if (userValue === computerNum){
    resultArea.textContent = "🎉 정답입니다! 🎉";
    chanceArea.textContent = "Reset후 재도전하세요"
    resultGif.src = winGif;
    resultGif.style.display = "block";
    gameOver = true;
    playButton.disabled = true;
    return;
  } 

  if (chances === 0) {
    resultArea.textContent = "앗, 실패했어요!";
    chanceArea.textContent = "Reset후 재도전하세요";
    resultGif.src = "https://sloanreview.mit.edu/wp-content/uploads/2012/03/fail-flickr-Jez-Page-500.jpg";
    resultGif.style.display = "block";
    gameOver = true;
    playButton.disabled = true;
    return;
  } 

//   history.push(userValue);
//   updateHistory(); 중복실행행


//   if (chances < 1) {
//     gameOver = true;
//     playButton.disabled = true;
//   }

//   if (gameOver == true) {
//     playButton.disabled = true;
//     resultGif.src = 
//     resultGif.style.display = "block";
//확인

  if (!gameOver) {
    history.push(userValue);
    updateHistory();
  }

}

function showRandomGif(gifArray) {
  let randomIndex = Math.floor(Math.random() * gifArray.length);
  resultGif.src = gifArray[randomIndex];
  resultGif.style.display = "block";
}

function reset() {
  userInput.value = "";
  pickRandomNum();
  resultArea.textContent = "숫자를 넣어보세요";
  resultGif.style.display = "none";
  chances = 3;
  history = [];
  historyArea.textContent = "";
  chanceArea.textContent = `기회는 ${chances}번!`;
  gameOver = false;
  playButton.disabled = false;
}

pickRandomNum();
