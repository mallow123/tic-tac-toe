const ticTacToeIcon = document.getElementById("ticTacToeIcon");
const gameWindow = document.getElementById("gameWindow");
const closeButton = document.getElementById("closeButton");
const restartButton = document.getElementById("restartButton");
const cells = document.querySelectorAll("[data-cell]");
const messageElement = document.getElementById("message");
const winnerMessageText = document.getElementById("winner-message");
let isPlayerOTurn = false;  // Player X goes first
let boardState = Array(9).fill(null);
let isGameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to open the game window when the icon is clicked
ticTacToeIcon.addEventListener('click', () => {
  gameWindow.style.display = 'block'; // Show game window
  resetGame(); // Reset game state when opening
  gameWindow.classList.add('show'); // Add show class to animate the opening
});

// Function to close the game window
closeButton.addEventListener('click', () => {
  gameWindow.classList.remove('show'); // Animate the game window closing
  setTimeout(() => {
    gameWindow.style.display = 'none'; // Hide game window after animation
  }, 300); // Match the animation duration
  resetGame(); // Reset game when window is closed
});

// Function to handle cell click event
function handleCellClick(event) {
  if (isGameOver) return;
  
  const index = Array.from(cells).indexOf(event.target);

  // Prevent clicking on an already occupied cell
  if (boardState[index] || messageElement.style.display !== 'none') return;

  // Player's move
  boardState[index] = 'x';
  event.target.classList.add('x');

  // Check if the player wins
  checkWinner();

  // If no winner, let the AI play
  if (!isGameOver) {
    isPlayerOTurn = !isPlayerOTurn;
    setTimeout(aiMove, 500);  // AI makes its move after a delay
  }
}

// AI's move - Random AI (Basic)
function aiMove() {
  const availableCells = boardState.map((value, index) => value === null ? index : null).filter(value => value !== null);

  if (availableCells.length === 0) return;

  // Pick a random index from available cells
  const randomMove = availableCells[Math.floor(Math.random() * availableCells.length)];
  
  // AI makes its move
  boardState[randomMove] = 'o';
  cells[randomMove].classList.add('o');

  // Check if the AI wins
  checkWinner();
  
  isPlayerOTurn = !isPlayerOTurn;  // Switch turns
}

// Function to check for a winner
function checkWinner() {
  for (const [a, b, c] of winningCombinations) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      setTimeout(() => {
        winnerMessageText.textContent = `${boardState[a].toUpperCase()} Wins!`;
        messageElement.style.display = 'block';
        isGameOver = true;  // End the game
      }, 300);
      return;
    }
  }

  // If there are no more empty cells and no winner, it's a draw
  if (!boardState.includes(null)) {
    winnerMessageText.textContent = "It's a Draw!";
    messageElement.style.display = 'block';
    isGameOver = true;  // End the game
  }
}

// Function to restart the game
function restartGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => cell.classList.remove('x', 'o'));
  messageElement.style.display = 'none';
  isGameOver = false;
  isPlayerOTurn = false;  // Player X starts
}

// Reset game state
function resetGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => cell.classList.remove('x', 'o'));
  messageElement.style.display = 'none';
  isGameOver = false;
  isPlayerOTurn = false;  // Player X starts
}

// Add event listeners to cells for player moves
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event listener to restart button
restartButton.addEventListener('click', restartGame);
