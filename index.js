const gameBtns = document.querySelectorAll(".choice");

const playerState = document.querySelector(".player");
const compState = document.querySelector(".computer");

const playerCurrentScore = document.getElementById("player-score");
const computerCurrentScore = document.getElementById("computer-score");

const seriesCount = document.getElementById("best-of");

const gameHeader = document.querySelector(".game-header-label");
const restartBtn = document.querySelector(".restart");

let playerScore = 0;
let compScore = 0;
let count = 3;
let seriesNum = seriesCount.value;

let playerWin = false;
let stalemate = false;

let playerChoice;
let computerChoice;

const [ROCK, PAPER, SCISSORS] = ["ROCK", "PAPER", "SCISSORS"];

const gameChoices = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};

const getComputerChoice = () => {
  const randNum = Math.trunc(Math.random() * 3);
  for (let i in gameChoices) {
    if (gameChoices[i] === randNum) return i;
  }
};

const clearContent = (node) => {
  node.textContent = "";
};

const resetGame = () => {
  playerWin = false;
  stalemate = false;
  playerScore = 0;
  compScore = 0;
  seriesNum = seriesCount.value;
  clearContent(playerState);
  clearContent(compState);
  gameHeader.textContent = "ROCK PAPER SCISSORS";
  playerCurrentScore.style.color = "#555";
  computerCurrentScore.style.color = "#555";
  computerCurrentScore.textContent = compScore;
  playerCurrentScore.textContent = playerScore;
  document.body.classList.remove("win-bg", "lose-bg", "draw-bg");
  toogleBtn(false);
};

const toogleBtn = (value) => {
  gameBtns.forEach((x) => {
    x.disabled = value;
  });
  seriesCount.disabled = value;
  restartBtn.disabled = value;
};

const updateWinnerLabel = () => {
  if (!stalemate) {
    gameHeader.textContent = playerWin ? "YOU WON!!" : "COMPUTER WON!!";
    playerCurrentScore.style.color = playerWin ? "green" : "red";
    computerCurrentScore.style.color = !playerWin ? "green" : "red";
  } else {
    gameHeader.textContent = "STALEMATE!!";
    playerCurrentScore.style.color = "black";
    computerCurrentScore.style.color = "black";
  }
};

const displayImage = (image, player, playerStr) => {
  let node = document.createElement("img");
  node.classList.add("game-img");
  node.src = `./Assets/${playerStr}/${image}.webp`;
  clearContent(player);
  player.appendChild(node);
};

const updateScore = () => {
  if (!stalemate) {
    if (playerWin) {
      playerScore++;
      playerCurrentScore.textContent = playerScore;
    } else {
      compScore++;
      computerCurrentScore.textContent = compScore;
    }
  }
};

const checkGameOver = () => {
  if (seriesNum === 0) {
    toogleBtn(true);
    if (playerScore !== compScore) {
      console.log("trial");
      const isGameWon = playerScore > compScore;
      gameHeader.textContent = isGameWon
        ? "YOU WON THE GAME!!!"
        : "YOU LOST THE GAME!!!";
      document.body.classList.add(isGameWon ? "win-bg" : "lose-bg");
    } else {
      console.log("test");
      gameHeader.textContent = "YOU DREW THE GAME!!!";
      document.body.classList.add("draw-bg");
    }
  }
  restartBtn.disabled = false;
};
const matchWinner = () => {
  let timer = setInterval(() => {
    if (count === 0) {
      clearContent(compState);
      clearInterval(timer);
      if (computerChoice === playerChoice) {
        stalemate = true;
      } else if (playerChoice === ROCK) {
        stalemate = false;
        playerWin = computerChoice === SCISSORS ? true : false;
      } else if (playerChoice === SCISSORS) {
        stalemate = false;
        playerWin = computerChoice === ROCK ? false : true;
      } else if (playerChoice === PAPER) {
        stalemate = false;
        playerWin = computerChoice === ROCK ? true : false;
      }
      updateScore();
      displayImage(computerChoice, compState, "computer");
      updateWinnerLabel();
      toogleBtn(false);
      checkGameOver();
    } else {
      toogleBtn(true);
      compState.textContent = count;
      count -= 1;
      gameHeader.textContent = "Thinking....";
    }
  }, 500);
  count = 3;
};

gameBtns.forEach((x) => {
  x.addEventListener("click", (e) => {
    playerChoice = e.target.textContent;
    computerChoice = getComputerChoice();
    matchWinner();
    displayImage(playerChoice, playerState, "player");
    seriesNum--;
  });
});

seriesCount.addEventListener("change", () => {
  seriesNum = seriesCount.value;
  resetGame();
});

restartBtn.addEventListener("click", () => {
  resetGame();
});
