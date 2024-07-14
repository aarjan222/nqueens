let n = 8;  // Default board size
let board = Array.from({ length: n }, () => Array(n).fill(0));

function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
        if (board[row][i]) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) return false;
    }
    for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
        if (board[i][j]) return false;
    }
    return true;
}

function placeQueen(row, col) {
    if (board[row][col] === 1) {
        board[row][col] = 0;
    } else if (isSafe(board, row, col)) {
        board[row][col] = 1;
    }
    drawBoard();
    checkWin();
}

function drawBoard() {
    const table = document.getElementById('chessboard');
    table.innerHTML = '';
    for (let i = 0; i < n; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('td');
            cell.className = (i + j) % 2 === 0 ? 'white' : 'black';
            if (board[i][j] === 1) {
                cell.innerHTML = 'Q';
                cell.classList.add('queen');
            }
            cell.addEventListener('click', () => placeQueen(i, j));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function checkWin() {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 1) count++;
        }
    }
    if (count === n) {
        alert('Congratulations! You have placed all queens safely.');
    }
}

function changeBoardSize(newSize) {
    n = newSize;
    board = Array.from({ length: n }, () => Array(n).fill(0));
    drawBoard();
}

document.addEventListener('DOMContentLoaded', () => drawBoard());
