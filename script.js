const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const gameStatus = document.getElementById('gameStatus');
let currentPlayer = 'X';
let gameActive = true;

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark
    cell.textContent = currentPlayer;

    // Check for a winner
    if (checkWin()) {
        gameStatus.textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (isBoardFull()) {
        gameStatus.textContent = 'It\'s a draw! 🤝';
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a].textContent === currentPlayer &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

// Function to check if the board is full
function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== '');
}

// Function to reset the game
function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Attach event listener to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Reset button event listener
resetButton.addEventListener('click', resetGame);

// Set initial game status
gameStatus.textContent = `Player ${currentPlayer}'s turn`;
