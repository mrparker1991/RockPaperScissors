/* Java for Rock, Paper, Scissors */

//Define DOM methods

const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorButton = document.querySelector('#scissors');

const reply = document.querySelector('.reply');
const message = document.createElement('div');
  message.setAttribute('id','message');
const scoreName = document.createElement('div');
  scoreName.setAttribute('id','scores');
const scoreNum = document.createElement('div');
  scoreNum.setAttribute('id','number');
const startLog = document.createElement('p');
  startLog.textContent = 'Choose a hand to start. Choose wisely.';
const compScore = document.createElement('p');
  compScore.setAttribute('class','scoreName');
  compScore.textContent = 'Computer:';
const userScore = document.createElement('p');
  userScore.setAttribute('class','scoreName');
  userScore.textContent = 'Player:';
const userNum = document.createElement('p');
  userNum.setAttribute('class','scoreNumb');
  userNum.textContent = '0';
const compNum = document.createElement('p');
  compNum.setAttribute('class','scoreNumb');
  compNum.textContent = '0';
const reset = document.createElement('button');
  reset.setAttribute('id','reset');
  reset.textContent = 'Try Again?';
const winMessage = document.createElement('p');
  winMessage.setAttribute('id','win');

  reply.appendChild(message);
  reply.appendChild(scoreName);
  reply.appendChild(scoreNum);
  message.appendChild(startLog); 
  scoreName.appendChild(userScore);
  scoreName.appendChild(compScore);
  scoreNum.appendChild(userNum);
  scoreNum.appendChild(compNum);

//Add EventListeners

rockButton.addEventListener('click', () => {
  rockButton.style.borderColor = "green";
  paperButton.style.borderColor = "white";
  scissorButton.style.borderColor = "white";
});
paperButton.addEventListener('click', () => {
  rockButton.style.borderColor = "white";
  paperButton.style.borderColor = "green";
  scissorButton.style.borderColor = "white";
});
scissorButton.addEventListener('click', () => {
  rockButton.style.borderColor = "white";
  paperButton.style.borderColor = "white";
  scissorButton.style.borderColor = "green";
});

reset.onclick = resetGame;

//Define variables for Game

let playerSelection;
let computerSelection;
let gameCount = 0;
let playerScore = 0;
let computerScore = 0;

//Game logic and related functions

function computerChoice() {
  let num = Math.random()*100;
  let selection;
  if (num <= 33) {
    selection = 'Rock';
    rockButton.style.borderColor = "red";
  } else if (num <= 67) {
    selection = 'Paper';
    paperButton.style.borderColor = "red";
  } else {
    selection = 'Scissors';
    scissorButton.style.borderColor = "red";
  }
    return selection;
  }

function playRound(playerSelection, computerSelection) {
  let player = playerSelection.toLowerCase();
  let computer = computerSelection.toLowerCase();
  let playerUpper = player.slice(0,1).toUpperCase() + player.slice(1);
  let messageWin = 'You chose... wisely. ' + playerUpper + ' beats ' + computer + '.';
  let messageLoss = 'You chose... poorly. ' + computerSelection + ' beats ' + player + '.';
  let messageTie = 'It\'\s a tie! You live to see another day.';
  if (player === computer) {   
    return messageTie;
  } else if (player == 'rock') {
    if (computer == 'scissors') {
      return messageWin;
    } else {
      return messageLoss;
    }
  } else if (player == 'paper') {
    if (computer == 'rock') {
       return messageWin;
    } else {
       return messageLoss;
    }
  } else if (player == 'scissors') {
     if (computer == 'paper') {
          return messageWin;
      } else {
          return messageLoss;
      }
  } else {
     return 'Please enter Rock, Paper, or Scissors. The gods are impatient.';
  } 
}

function game(result) {
  if (result.indexOf('wise') !== -1) {
    playerScore++;
  }
  else if (result.indexOf('poor') !== -1){
    computerScore++;
  }
  userNum.textContent = playerScore;
  compNum.textContent = computerScore;
  gameCount = Math.max(playerScore,computerScore);
  startLog.textContent = result;
  score();
}  

function score() {
  if (playerScore == 5) {
    winMessage.textContent = 'The gods shine upon you. Victory is yours.'
    message.appendChild(winMessage);
    message.appendChild(reset);
  } else if (computerScore == 5) {
    winMessage.textContent = 'You have been defeated. The gods are angered.'
    message.appendChild(winMessage);
    message.appendChild(reset);
  }
}

function resetGame() {
  playerScore = 0;
  userNum.textContent = '0';
  computerScore = 0;
  compNum.textContent = '0';
  gameCount = 0;
  reset.remove();
  winMessage.remove();
  startLog.textContent = 'Choose a hand to start. Choose wisely.';
  rockButton.style.borderColor = "white";
  paperButton.style.borderColor = "white";
  scissorButton.style.borderColor = "white";
}

//Button Function to initaite action

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
     playerSelection = button.id;
     computerSelection = computerChoice();
     if (playerSelection == computerSelection.toLowerCase()) {
       e.target.style.borderColor = "blue";
     } 
  if (gameCount <= 4) {
    game(playRound(playerSelection,computerSelection));
  } else {
    rockButton.style.borderColor = "white";
    paperButton.style.borderColor = "white";
    scissorButton.style.borderColor = "white";
  }
  });
});