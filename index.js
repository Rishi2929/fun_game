const pcScoreElement = document.getElementById("pc-score");
const plScoreElement = document.getElementById("pl-score");
const triangleElement = document.getElementById("triangle");
const resultAreaElement = document.getElementById("resultArea");
const nextBtnElement = document.getElementById("next-btn");
const scoreBoardElement = document.getElementById("score-board");
const congratulationsElement = document.getElementById("congratulations");
const rulesNextBtnElement = document.getElementById("both-btns");
const ruleBtnElement = document.getElementById("rule-btn");
const rulesBoxElement = document.getElementById("rules-box");
const closeBtnElement = document.getElementById("close-btn");

const gameRules = [
  { choice: 'rock', beats: 'scissor' },
  { choice: 'paper', beats: 'rock' },
  { choice: 'scissor', beats: 'paper' }
];

const data = {
  rock :{
    key: 1, //rock
    name: "rock",
    group: "assets/rock-group.png",
    avatar: "assets/rock.png"
  },
  paper: {
    key: 2, //scissor
    name: "scissor",
    group: "assets/scissor-group.png",
    avatar: "assets/scissor.png"
  },
  scissor: {
    key: 3, //paper
    name: "paper",
    group: "assets/paper-group.png",
    avatar: "assets/paper.png"
  }
}

let pcScore = 0;
let plScore = 0;
let flag = 0;
let resultHtmlGlobalArray = [];

// document.addEventListener('DOMContentLoaded', function() {
//   document.addEventListener("click", function(e) {
//     const clickedDiv = e.target.closest('div[id]');
//     if (clickedDiv) {
//       console.log(clickedDiv.id);
//       if (clickedDiv.id === "1") {
//         console.log("rock");
//       }
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('triangle').addEventListener("click", function(e) {
    const clickedDiv = e.target.closest('div[id]');
    if (clickedDiv) {
      const clickedImage = e.target.closest('img');
      if (clickedImage) {
        // Now you have both the clicked div's ID and the clicked image element
        console.log("Clicked Div id", clickedDiv.id);
        console.log("Image clicked:", clickedImage.src);
        if (clickedDiv.id === "1") {
          console.log("rock");
          decider(clickedDiv.id);
        }
        else if(clickedDiv.id === "2") {
          console.log("scissor");
          decider(clickedDiv.id);
        }
        else if(clickedDiv.id === "3") {
          console.log("paper");
          decider(clickedDiv.id);
        }
      }
    }
  });
});

function decider(clickedDivId) {
  let pcObject = '';
  let plObject = '';
  const pcChoice = computerChoice();
  for(element in data) {
    const item = data[element];
    if(item.key == Number(clickedDivId)) {
      updateScore(item.name, pcChoice);
      console.log("player decider item: ", item)
      plObject = item;
    }
    if(item.name == pcChoice) {
      console.log("pc decider item: ", item)
      pcObject = item;
    }
  }
  console.log("pl deccc", plObject);
  resultHtmlPasser(plObject, pcObject); //sending objects of what pl and pc have chosed
}

nextBtnElement.addEventListener("click", function(e) {
  let messageArray = [];

  let messageHtml = `
    <div id="congratulations" class="congratulations-container">
      <div class="star-container">
        <img src="assets/star1.png" alt="star1" class="star star1">
        <img src="assets/star2.png" alt="star2" class="star star2">
        <img src="assets/star4.png" alt="star4" class="star star4">
        <img src="assets/star5.png" alt="star5" class="star star5">
        <img src="assets/star6.png" alt="star6" class="star star6">
        <img src="assets/star7.png" alt="star7" class="star star7">
        <img src="assets/star8.png" alt="star8" class="star star8">
        <img src="assets/star9.png" alt="star9" class="star star9">
        <img src="assets/vector.png" alt="victor" class="victor">
      </div>
      <h1>HURRAY!!</h1>
      <p>You won the game!</p>
      <button id="play-again-btn-id" class="play-again-btn final-play-again-btn">Play Again</button>
    </div> 
  `

  messageArray.push(messageHtml)
  resultHtmlGlobalArray = messageArray;
  
  scoreBoardElement.style.display = "none";
  nextBtnElement.style.display = "none";
  // rulesNextBtnElement.style.display = "none";

  render();
})

function resultHtmlPasser(plChoiceObj, pcChoiceObj) {
  let resText = resultText(plChoiceObj.name, pcChoiceObj.name);
  let resultHtmlArray = resultHtml(plChoiceObj, pcChoiceObj, resText);
  resultHtmlGlobalArray = resultHtmlArray;

  const isPlayerWins = isPlayerWon(plChoiceObj.name, pcChoiceObj.name);
  console.log("Player Won", isPlayerWins);
  if(isPlayerWins == true) {
    nextBtnElement.style.display = "inline-block";
  }
  else {
    nextBtnElement.style.display = "none";
  }

  render();
}

document.addEventListener("click", function(e) {
  // console.log("Clicked element:", e.target);
  if(e.target.matches('#play-again-btn-id')) {
    console.log("clicking play button")
    resetDisplayScreen();
  }
})

function isPlayerWon(plChoice, pcChoice) {
  const isPlayerWins = gameRules.find(rule => plChoice == rule.choice && pcChoice == rule.beats);
  if(isPlayerWins) {
    return true;
  }
  else
    return false;
}

function resultText(plChoice, pcChoice) {
  const isPlayerWins = gameRules.find(rule => plChoice == rule.choice && pcChoice == rule.beats);

  if(plChoice == pcChoice) {
    return "TIE UP";
  }
  else if(isPlayerWins) {
    return "YOU WIN";
  }
  else {
    return "YOU LOST";
  }
}

function resetDisplayScreen() {
  flag = 0;
  triangleElement.style.display = "grid";
  nextBtnElement.style.display = "none";
  scoreBoardElement.style.display = "flex";
  // rulesNextBtnElement.style.display = "flex";
  resultAreaElement.innerHTML = "";
  render();
}

function computerChoice() {
  const randomIndex = Math.floor(Math.random() * gameRules.length);
  return gameRules[randomIndex].choice;
}

function updateScore(playerChoice, pcChoice) {
  const isPlayerWins = gameRules.find(rule => playerChoice == rule.choice && pcChoice == rule.beats);
  console.log("isPlayerWins: ", isPlayerWins)
  if(playerChoice == pcChoice) {
    //tie
  }
  else if(isPlayerWins) {
    //Player Wins
    plScore++;
  }
  else{
    //Pc Wins
    pcScore++;
  }

  // console.log("player Choice", playerChoice)
  // console.log("pc Choice", pcChoice)

  localStorage.setItem('plScore', plScore);
  localStorage.setItem('pcScore', pcScore);

  updateScoreDisplay();
}

function updateScoreDisplay() {
  plScore = parseInt(localStorage.getItem('plScore')) || 0;
  pcScore = parseInt(localStorage.getItem('pcScore')) || 0;

  pcScoreElement.textContent = `${pcScore}`;
  plScoreElement.textContent = `${plScore}`;
}

ruleBtnElement.addEventListener("click", function() {
  rulesBoxElement.classList.toggle('hidden');
})

closeBtnElement.addEventListener("click", function() {
  rulesBoxElement.classList.toggle('hidden');
}) 

function resultHtml(plChoiceObj, pcChoiceObj, resText) {
  let html = ``;
  let htmlArray = [];
  flag = 1;
  
  let msg = 'AGAINST PC';
  if(resText == "TIE UP") msg = "";

  console.log("both objects in resultHTML",plChoiceObj, pcChoiceObj)

  let wrapperHtml = `
    <div class="wrapper">
      <div class="circle">
        <div class="circle1">
          <div class="circle2"></div>
        </div>
      </div>
    </div>
  `

  html = `
    <div class="result-right both-side">
    <h3>YOU PICKED</h3>
    <div class="player-wrapper">
      <div id="${plChoiceObj.key}" class="item-${plChoiceObj.name}">
        <img src="${plChoiceObj.group}" alt="${plChoiceObj.key} group">
        <img src="${plChoiceObj.avatar}" alt="${plChoiceObj.key} avatar">
      </div>
      ${resText == "YOU WIN" ? wrapperHtml : ''}
    </div>
    </div>
    <div class="result-middle both-side">
      <h1>${resText}</h1>
      <h2>${msg}</h2>
      <button id="play-again-btn-id" class="play-again-btn play-again-btn-first">${resText == "TIE UP" ? "REPLAY" : "Play Again"}</button>
    </div>
    <div class="result-left both-side">
      <h3>PC PICKED</h3>
      <div class="pc-wrapper">
        <div id="${pcChoiceObj.key}" class="item-${pcChoiceObj.name}">
          <img src="${pcChoiceObj.group}" alt="${pcChoiceObj.key} group">
          <img src="${pcChoiceObj.avatar}" alt="${pcChoiceObj.key} avatar">
        </div>
        ${resText == "YOU LOST" ? wrapperHtml : ''}
      </div>
    </div>
  `

  htmlArray.push(html);
  return htmlArray;
}

function TriangleHtml() {
  let html = ``;
  let htmlArray = [];

  for(element in data) {
    const item = data[element];
    // console.log(item);
    html += `
      <div id="${item.key}" class="item-${item.name}">
        <img src="${item.group}" alt="${item.key} group">
        <img src="${item.avatar}" alt="${item.key} avatar">
      </div>
    `
  }

  html += `
    <div class="main-container">
      <div class="main">
        <div class="arrow-down"></div>    <!-- Triangle -->
        <div class="arrow-down2"></div>   <!-- another triangle on upper side of above traingle -->
      </div>
    </div>
  `

  htmlArray.push(html);
  console.log(htmlArray);

  return htmlArray;
}

function render() {
  const triangleHtmlArray = TriangleHtml();

  if(flag == 1) {
    triangleElement.style.display = "none";
    resultAreaElement.innerHTML = resultHtmlGlobalArray;
  }

  triangleElement.innerHTML = triangleHtmlArray;
  
}

nextBtnElement.style.display = "none";

render();
updateScoreDisplay();