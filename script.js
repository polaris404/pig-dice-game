"use strict";

const rules = document.querySelector(".btn-rules");

const player = document.querySelector(".player");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector(".score--0");
const score1 = document.querySelector(".score--1");
const current0 = document.querySelector(".current--0");
const current1 = document.querySelector(".current--1");

const submit = document.querySelector(".submit");

const rollDice = document.querySelector(".btn-roll");
const hold = document.querySelector(".btn-hold");
const newGame = document.querySelector(".btn-newgame");

let currentPlayer, dice, currentScore, scores, playing;

let maxScore = 100;

//* Resets the game
const gameReset = function () {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.add("current-player");
  player1.classList.remove("current-player");

  document.querySelector(`.name--0`).textContent = "Player 1";
  document.querySelector(`.name--1`).textContent = "player 2";

  document.querySelector(`.img`).classList.add(`hidden`);
};

gameReset();

//* Generate Random Number from 1 to 6
const generateRandomNumber = function () {
  let n = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(".img").src = `imgs/dice-${n}.png`;
  return n;
};

//* Helper Functions
const openModal = function () {
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
};

const closeModal = function () {
  document.querySelector(".modal").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
};

const updateCurrentScore = function (score) {
  document.querySelector(`.current--${currentPlayer}`).textContent = score;
};

const updateFinalScore = function (score) {
  document.querySelector(`.score--${currentPlayer}`).textContent = score;
};

const switchPlayer = function () {
  currentScore = 0;
  updateCurrentScore(0);
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  updateCurrentScore(0);
  player0.classList.toggle("current-player");
  player1.classList.toggle("current-player");
};

//* Game Rules
rules.addEventListener("click", function () {
  openModal();
});

document.querySelector(".overlay").addEventListener("click", closeModal);
document.querySelector(".close-modal").addEventListener("click", closeModal);

//* Max Score Event
submit.addEventListener("click", function () {
  gameReset();
  maxScore = Number(document.querySelector("#max-score").value);
});

//* Roll Dice
rollDice.addEventListener("click", function () {
  if (playing) {
    document.querySelector(`.img`).classList.remove(`hidden`);
    dice = generateRandomNumber();
    if (dice !== 1) {
      currentScore += dice;
      updateCurrentScore(currentScore);
    } else {
      switchPlayer();
    }
  }
});

//* Hold
hold.addEventListener("click", function () {
  if (playing) {
    scores[currentPlayer] += currentScore;
    updateFinalScore(scores[currentPlayer]);
    if (scores[currentPlayer] >= maxScore) {
      document.querySelector(`.img`).classList.add(`hidden`);
      playing = false;
      document.querySelector(`.name--${currentPlayer}`).textContent =
        "Winner !!!";
    } else {
      switchPlayer();
    }
  }
});

//* New Game
newGame.addEventListener("click", gameReset);
