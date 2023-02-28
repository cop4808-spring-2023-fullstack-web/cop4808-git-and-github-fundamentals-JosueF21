const statusDisplay = document.querySelector('.status');
let gameActive = true;
let currentPlayer = ''
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;




const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];




function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusDisplay.innerHTML = currentPlayerTurn();
}

function checkWin () {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
       
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundWon;
        
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return roundDraw;
       } 
       return false;
    }

 function handleResultValidation() {
   
     checkWin()

    if(gameActive) { 
    handlePlayerChange();
    handleComputerMove();
    }

}
// Computer function
function handleComputerMove() {
    
     pickComputerMove()
     if(!checkWin())
     handlePlayerChange()
}

 function pickComputerMove() {

      while (true){
                // Loop through gameState and randomly find avaible spot
                  var m = Math.floor(Math.random()* 8)
                  if (gameState[m] =='' )   // search for empty spot
                  break;
     }

     gameState[m] = currentPlayer
     document.getElementById(m).innerHTML= currentPlayer

      // m will have the computer move 

 }

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
// check to see if current cell is available cell and game is active
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
function flipcoin(){

    var flip = Math.floor(Math.random() * 2)
    console.log(flip);

    if( flip === 0 )
      { 
         currentPlayer = "X"
      } else {

         currentPlayer = "O"
      }

      statusDisplay.innerHTML = currentPlayerTurn();
}

let score = 0; 

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
document.querySelector('.start').addEventListener('click', flipcoin);