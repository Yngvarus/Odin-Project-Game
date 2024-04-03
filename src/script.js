let plChoice;
let pcChoice;
let turn;
let pl_point = 0;
let pc_point = 0;
let suit = ["rock", "paper", "scissors"];

function showChoices() {
    const playerChoiceDiv = document.getElementById('player-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');

    playerChoiceDiv.innerHTML = `<img src="${plChoice}.jpg" alt="${plChoice}">`;
    computerChoiceDiv.innerHTML = `<img src="${pcChoice}.jpg" alt="${pcChoice}">`;
}

function generatePcChoice(){
    pcChoice = suit[Math.floor(Math.random() * 3)];
}

function calcPoint() {
    if (plChoice === pcChoice) {
        // Pareggio
    } else if ((plChoice === 'rock' && pcChoice === 'scissors') ||
               (plChoice === 'paper' && pcChoice === 'rock') ||
               (plChoice === 'scissors' && pcChoice === 'paper')) {
        // Giocatore vince
        pl_point++;
    } else {
        // Computer vince
        pc_point++;
    }
}

function resetGame() {
    plChoice = undefined;
    pcChoice = undefined;
    turn = undefined;
    pl_point = 0;
    pc_point = 0;
}