'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winner=document.querySelector('.winner');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling the Dice Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1: if true,switch to Next player
    if (dice != 1) {
      //4.Add rolled number to current player's score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
let playerwin = false;
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's Score is greater than 100
    if (scores[activePlayer] >= 10) {
      //Finish the game
      playerwin = true;
      diceEl.classList.add('hidden');
      winner.textContent = `Player ${activePlayer+1} Wins🎉🎉`;
      winner.classList.remove('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Switch to the next player
    else switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  if (playerwin) {
    playerwin = false;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  }
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
  winner.classList.add('hidden');

});
