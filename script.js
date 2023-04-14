'use strict';

const dice = document.querySelector('.dice');
let currentScore = document.querySelector('.current-score');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const changePlayer = (currentPlayer) => currentPlayer==player0 ? currentScore = playerActiveStatus(player0,player1) : currentScore = playerActiveStatus(player1,player0);

//POCZĄTEK DZIAŁANIA FUNKCJONALNOŚCI .ROLL-DICE
function whichPlayerIsActive() {
 return player0.classList.contains('player--active') === true ? player0:player1;
}

function playerActiveStatus(current, end){
  current.classList.remove('player--active')
  end.classList.add('player--active')
  return document.querySelector(`.${end.classList[1]} .current-score`)
}

document.querySelector('.btn--roll').addEventListener('click', function () {
  const randomNumber = Math.round(Math.random() * 5 + 1);
  dice.src = `dice-${randomNumber}.png`;
  if(randomNumber===1){
    currentScore.textContent=0
    changePlayer(whichPlayerIsActive())
  }else{
    currentScore.textContent =Number(currentScore.textContent) + randomNumber;
  }
});

//KONIEC DZIAŁANIA FUNKCJONALNOŚCI .ROLL-DICE
//POCZĄTEK FUNKCJONALNOŚCI .HOLD-DICE
function hideElement(element){
  document.querySelector(element).classList.add('hidden')
}

function showElement(element){
  document.querySelector(element).classList.remove('hidden')
}

document.querySelector('.btn--hold').addEventListener('click', function(){
  const gracz = whichPlayerIsActive();
  const playerScore = gracz.querySelector('.score')
  const playerCurrentScore = gracz.querySelector('.current-score')

  playerScore.textContent =  Number(playerScore.textContent)+Number(playerCurrentScore.textContent)
  if(Number(playerScore.textContent)>=100){
    playerScore.textContent="You won!"
    hideElement('.btn--hold')
    hideElement('.btn-roll')
  }else{
    playerCurrentScore.textContent=0
    changePlayer(gracz)
  }
})
//KONIEC FUNKCJONALNOŚCI .HOLD-DICE

//RESET GAME BUTTON
document.querySelector('.btn--new').addEventListener('click', function(){
  playerActiveStatus(player1,player0)
  player0.querySelector('.score').textContent=0;
  player1.querySelector('.score').textContent=0;
  player0.querySelector('.current-score').textContent=0;
  player1.querySelector('.current-score').textContent=0;
  showElement('.btn--hold')
  showElement('.btn-roll')
})