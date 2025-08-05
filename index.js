const gameBtns = document.querySelectorAll(".choice");
const playBtn = document.querySelector(".play-button");

const playerState = document.querySelector(".player");
const compState = document.querySelector(".computer");

let playerChoice = "";

let playerScore = 0;
let compScore = 0;

const gameChoices = {
  rock: 0,
  paper: 1,
  scissors: 2,
};

const getComputerChoice = () => {
  const randNum = Math.trunc(Math.random() * 3);
  for (let i in gameChoices) {
    if (gameChoices[i] === randNum) return i;
  }
};

let computerChoice = getComputerChoice();

const matchWinner = () => {
  if (computerChoice === playerChoice) {
    // draw scenario triggered
  } else if (playerChoice === "rock") {
    if (computerChoice === "scissors") {
      // player wins
    } else {
      // computer wins
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      // computer wins
    } else {
      // player wins
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      // player wins
    } else {
      // computer wins
    }
  }
  updateScore();
};

const updateScore = (playerWin, stalemate) => {
  if (!stalemate) {
    if (playerWin) playerScore++;
    else compScore++;
  }
};
