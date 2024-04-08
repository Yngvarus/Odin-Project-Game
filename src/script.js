// Costanti
const SUIT = ["rock", "paper", "scissors", "lizard", "spock"]; // Elenco "mosse"
const MAX_ROUNDS = 3;

const CHOICES = {
    rock: { beats: ['scissors', 'lizard'] }, // La roccia batte le forbici e il lucertola
    paper: { beats: ['rock', 'spock'] }, // La carta batte la roccia e Spock
    scissors: { beats: ['paper', 'lizard'] }, // Le forbici battono la carta e il lucertola
    lizard: { beats: ['paper', 'spock'] }, // Il lucertola batte la carta e Spock
    spock: { beats: ['rock', 'scissors'] } // Spock batte la roccia e le forbici
};

// Variabili di gioco
let plChoice = ""; // Scelta del giocatore
let pcChoice = ""; // Scelta del computer
let turn = 0; // Numero di turni giocati
let plPoint = 0; // Punteggio del giocatore
let pcPoint = 0; // Punteggio del computer
let winner = ""; // Vincitore del turno
let loser = ""; // Perdente del turno

// Funzioni

// Mostra le scelte del giocatore e del computer
function showChoices() {    
    showPoints();
    const playerChoiceDiv = document.getElementById('player-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');

    let plImage = "../images/" + plChoice + ".png";
    let pcImage = "../images/" + pcChoice + ".png";

    playerChoiceDiv.innerHTML = `<img src="${plImage}" alt="noimage" width="80%" height="80%">`;
    computerChoiceDiv.innerHTML = `<img src="${pcImage}" alt="noimage" width="80%" height="80%">`;

}

// Mostra i punteggi
function showPoints() {
    let winnerScore, loserScore, plDraw, pcDraw;
    
    if (winner === 'draw') {
        plDraw = document.querySelector('#pl-circle' + turn.toString());
        pcDraw = document.querySelector('#pc-circle' + turn.toString());
        requestAnimationFrame(() => {
            plDraw.innerHTML = "-";
            pcDraw.innerHTML = "-";
        });
    } else{
         if (winner === 'pl') {
        winnerScore = document.querySelector('#pl-circle' + turn.toString());
        loserScore = document.querySelector('#pc-circle' + turn.toString());
        } else if (winner === 'pc') {
            loserScore = document.querySelector('#pl-circle' + turn.toString());
            winnerScore = document.querySelector('#pc-circle' + turn.toString());
        }
        requestAnimationFrame(() => {
            winnerScore.innerHTML = "O";
            loserScore.innerHTML = "X";
        });
    }
}

// Genera la scelta del computer
function generatePcChoice(){
    pcChoice = SUIT[Math.floor(Math.random() * SUIT.length)];
}

// Determina il vincitore del turno
function determineWinner() {
    if (plChoice === pcChoice) {
        return 'draw';
    } else if (CHOICES[plChoice].beats === pcChoice) {
        return 'pl';
    } else {
        return 'pc';
    }
}

// Calcola i punteggi
function calcPoint() {
    winner = determineWinner();
    if(winner !== 'draw'){
        loser = (winner === 'pl') ? 'pc' : ((winner === 'pc') ? 'pl' : 'draw');

    if (winner === 'pl') {
        plPoint++;
    } else if(winner === 'pc'){
        pcPoint++;
    }   
    } else {
        loser = "draw";

    }
}

// Reimposta il gioco
function resetGame() {
    plChoice = "";
    pcChoice = "";
    turn = 0;
    plPoint = 0;
    pcPoint = 0;
    winner = "";
    loser = "";
}

// Dichiara il vincitore del gioco
function declareWinner() {
    let message;
    if (plPoint === pcPoint) {
        message = "È un pareggio!";
    } else if (plPoint > pcPoint) {
        message = "Hai vinto!";
    } else {
        message = "Hai perso!";
    }

    document.getElementById("msg-box").style.display = "block";
    document.getElementById("result-message").innerText = message;
}

// Funzione richiamata quando si clicca sul pulsante di chiusura
document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("msg-box").style.display = "none";
    resetGame();
    resetPoints();
}

// Reimposta i punti
function resetPoints() {
    const plPointCircleGrid = document.querySelector('.pl-point-circle-grid').querySelectorAll('.circle');
    const pcPointCircleGrid = document.querySelector('.pc-point-circle-grid').querySelectorAll('.circle');

    plPointCircleGrid.forEach(circle => {
        circle.textContent = "";
    });

    pcPointCircleGrid.forEach(circle => {
        circle.textContent = "";
    });

    const playerChoiceDiv = document.getElementById('player-choice');
    const computerChoiceDiv = document.getElementById('computer-choice');

    playerChoiceDiv.innerHTML = "";
    computerChoiceDiv.innerHTML = "";
}

// Funzione richiamata quando si clicca su un pulsante di scelta
function clickBtn(choice) {
    turn++;
    plChoice = choice;
    generatePcChoice();
    calcPoint();
    showChoices();
    if(plPoint >= 2 || pcPoint >= 2 || turn >= 3){
        declareWinner();
    }
}

// Attende che il DOM sia completamente caricato per eseguire la funzione
document.addEventListener('DOMContentLoaded', function() {
    showOverlay();
  });
  
  // Funzione per mostrare l'overlay
  function showOverlay() {
    document.getElementById('overlay').style.display = 'block';
  }
  
  // Funzione per nascondere l'overlay
  function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }
  
  // Funzione per gestire l'invio del modulo
  document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const playerName = document.getElementById('player-name').value;
    document.getElementById('player-title').innerHTML = playerName;
    hideOverlay(); // Nascondi l'overlay dopo l'invio del modulo
  });
