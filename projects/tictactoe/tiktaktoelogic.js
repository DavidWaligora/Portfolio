const tiktaktoeGebied = document.getElementById("tiktaktoegGebied");
const playerChoiceFill = document.getElementById("playerChoice");
const restart = document
  .getElementById("restart")
  .addEventListener("click", () => {
    //reset
    initializeBoard();
  });

// tiktaktoegebied voor seamless transition
let tiktaktoegGebied2 = document.createElement("div");

//const and let
const playerX = Array(6).fill(null);
const playerO = Array(6).fill(null);
let playerChoice = true; // as i only use 2 players i could use a bool
let counterX = 1; //counter to track move number to remove the last
let counterO = 1;
let tiktaktoeBoard = Array(3) // Select the game area and fill it empty
  .fill(null)
  .map(() => Array(3).fill(null));
let tiktaktoeBoard2 = Array(3) //second tiktaktoeboard for smooth transition when a change occurs
  .fill(null)
  .map(() => Array(3).fill(null));
  let firstX = 0
  let firstO = 0

// Handle button click
function handleButtonClick(event) {
  //data van event ophalen
  const button = event.target;
  const row = button.dataset.row;
  const col = button.dataset.col;

  // Place X if the button is empty
  if (playerChoice) {
    if (!tiktaktoeBoard[row][col]) {
      if (!playerX[0]) {
        playerX[0] = counterX;
        playerX[3] = [row + col];
        counterX++;
      } else if (!playerX[1]) {
        playerX[1] = counterX;
        playerX[4] = [row + col];
        counterX++;
      } else if (!playerX[2]) {
        playerX[2] = counterX;
        playerX[5] = [row + col];
        counterX++;
      } else {
        if (playerX[0] < playerX[1]) {
          playerX[0] = counterX;
          playerX[3] = [row + col];
          counterX++;
        } else if (playerX[1] < playerX[2]) {
          playerX[1] = counterX;
          playerX[4] = [row + col];
          counterX++;
        } else if (playerX[2] < playerX[0]) {
          playerX[2] = counterX;
          playerX[5] = [row + col];
          counterX++;
        }
      }
      updateTiktaktoeboard(playerX);
      playerSwitch();
    } else {
      alert("Invalid move! This cell is already occupied.");
    }
  } else {
    if (!tiktaktoeBoard[row][col]) {
      if (!playerO[0]) {
        playerO[0] = counterO;
        playerO[3] = [row + col];
        counterO++;
      } else if (!playerO[1]) {
        playerO[1] = counterO;
        playerO[4] = [row + col];
        counterO++;
      } else if (!playerO[2]) {
        playerO[2] = counterO;
        playerO[5] = [row + col];
        counterO++;
      } else {
        if (playerO[0] < playerO[1]) {
          playerO[0] = counterO;
          playerO[3] = [row + col];
          counterO++;
        } else if (playerO[1] < playerO[2]) {
          playerO[1] = counterO;
          playerO[4] = [row + col];
          counterO++;
        } else if (playerO[2] < playerO[0]) {
          playerO[2] = counterO;
          playerO[5] = [row + col];
          counterO++;
        }
      }
      updateTiktaktoeboard();
      playerSwitch();
    } else {
      alert("Invalid move! This cell is already occupied.");
    }
  }
  const winner = checkWinner();
  winner && handlewinner(winner);
}
function handlewinner(winner) {
  alert(`Player ${winner} wins!`);
  initializeBoard();
}
// update board
function updateTiktaktoeboard() {
  resetBoard();
  let p = playerX;
  // Loop through player X's moves
  for (let i = 0; i < 3; i++) {
    if (p[i]) {
      const rowX = parseInt(String(p[3 + i])[0]); // Get the row
      const colX = parseInt(String(p[3 + i])[1]); // Get the column
      tiktaktoeBoard2[rowX][colX] = "X";
    }
  }
  
  p = playerO;
  // Loop through player O's moves
  for (let i = 0; i < 3; i++) {
    if (p[i]) {
      const rowO = parseInt(String(p[3 + i])[0]); // Get the row
      const colO = parseInt(String(p[3 + i])[1]); // Get the column
      tiktaktoeBoard2[rowO][colO] = "O";
    }
  }

  tiktaktoeBoard = tiktaktoeBoard2;

  tiktaktoegGebied2.innerHTML = "";

    // Find first move (smallest counter) for Player X
    const a = playerX[0] ? playerX[0] : 0
    const b = playerX[1] ? playerX[1] : 2
    const c = playerX[2] ? playerX[2] : 3
    firstX = Math.min(a, b, c);

    const aa = playerO[0] ? playerO[0] : 0
    const bb = playerO[1] ? playerO[1] : 2
    const cc = playerO[2] ? playerO[2] : 3
    firstO = Math.min(aa, bb, cc);


  // Add the updated buttons to the grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const div = document.createElement("div");
      div.className = "col-span-1 text-center";
      const button = document.createElement("button");
      button.className =
        "rounded w-16 h-16 m-2 bg-gray-600 hover:bg-zinc-500 text-white text-lg font-bold";
      button.dataset.row = row;
      button.dataset.col = col;
      button.innerText = tiktaktoeBoard[row][col] || "";

      // Check if this is player X's first move
      if (button.innerText === "X") {
        if (playerX[0] === firstX && String(playerX[3]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
        }
        else if (playerX[1] === firstX && String(playerX[4]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
          // Highlight player X's first move
        }
        else if (playerX[2] === firstX && String(playerX[5]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
        }
      }

      // Check if this is player O's first move
      if (button.innerText === "O") {
        if (playerO[0] === firstO && String(playerO[3]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
        }
        else if (playerO[1] === firstO && String(playerO[4]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
        }
        else if (playerO[2] === firstO && String(playerO[5]) === `${row}${col}`) {
          button.className += " text-blue-500"; // Highlight player X's first move
        }
      }


      button.addEventListener("click", handleButtonClick);
      div.appendChild(button);
      tiktaktoegGebied2.appendChild(div);
    }
  }
  tiktaktoeGebied.innerHTML = "";
  Array.from(tiktaktoegGebied2.children).forEach((child) => {
    tiktaktoeGebied.appendChild(child);
  });
}
// player switch logic
function playerSwitch() {
  playerChoice = !playerChoice;
  if (playerChoice) {
    playerChoiceFill.innerText = "Player X turn";
  } else {
    playerChoiceFill.innerText = "Player O turn";
  }
}

// reset functions
function initializeBoard() {
  resetPlayers(); //reset players
  resetTiktaktoeBoard(); //reset tiktaktoeBoard

  firstO = 0
  firstX = 0
  counterO = 1
  counterX = 1
  //Reset turn
  playerChoice = true;
  tiktaktoeGebied.innerHTML = ""; // Clear previous buttons
  playerChoiceFill.innerText = "Player X turn";


  // make the board
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      div.className = "col-span-1 text-center";
      button.className =
        "rounded w-16 h-16 m-2 bg-gray-600 hover:bg-zinc-500 text-white text-lg font-bold";
      button.dataset.row = row;
      button.dataset.col = col;

      button.innerText = tiktaktoeBoard[row][col];
      button.addEventListener("click", handleButtonClick);
      div.appendChild(button);
      tiktaktoeGebied.appendChild(div);
    }
  }
}
function resetBoard() {
  tiktaktoeBoard2 = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
}
function resetPlayers() {
  playerX[0] = null;
  playerO[0] = null;
  playerX[1] = null;
  playerO[1] = null;
  playerX[2] = null;
  playerO[2] = null;
  playerX[3] = null;
  playerO[3] = null;
  playerX[4] = null;
  playerO[4] = null;
  playerX[5] = null;
  playerO[5] = null;
}
function resetTiktaktoeBoard() {
  tiktaktoeBoard = tiktaktoeBoard.map((row) => row.fill(null));
}

function checkWinner() {
  //for loop for handling all rows
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      tiktaktoeBoard[i][0] &&
      tiktaktoeBoard[i][0] === tiktaktoeBoard[i][1] &&
      tiktaktoeBoard[i][1] === tiktaktoeBoard[i][2]
    ) {
      return tiktaktoeBoard[i][0]; // Return the winner ('X' or 'O')
    }

    // Check columns
    if (
      tiktaktoeBoard[0][i] &&
      tiktaktoeBoard[0][i] === tiktaktoeBoard[1][i] &&
      tiktaktoeBoard[1][i] === tiktaktoeBoard[2][i]
    ) {
      return tiktaktoeBoard[0][i]; // Return the winner ('X' or 'O')
    }
  }
  // Check diagonals
  if (
    tiktaktoeBoard[0][0] &&
    tiktaktoeBoard[0][0] === tiktaktoeBoard[1][1] &&
    tiktaktoeBoard[1][1] === tiktaktoeBoard[2][2]
  ) {
    return tiktaktoeBoard[0][0]; // Return the winner ('X' or 'O')
  }
  if (
    tiktaktoeBoard[0][2] &&
    tiktaktoeBoard[0][2] === tiktaktoeBoard[1][1] &&
    tiktaktoeBoard[1][1] === tiktaktoeBoard[2][0]
  ) {
    return tiktaktoeBoard[0][2]; // Return the winner ('X' or 'O')
  }
}

initializeBoard();
