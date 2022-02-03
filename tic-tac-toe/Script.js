let player = 'X';

for ( let cell of document.querySelectorAll('.cell') ) {
    cell.addEventListener('click', markCell);
    cell.addEventListener('click', checkVictory);
}

document.querySelector('input').addEventListener('click', startGame);


function markCell() {
    if (!this.innerHTML) {
        this.innerHTML = player;
    } else {
        return;
    }
    
    if (player == 'X') {
        player = 'O';
    } else {
        player = 'X';
    }
    
    document.querySelector('.queue').firstElementChild.innerHTML = player;
}


function checkVictory() {
    let winner = this.innerHTML;

    // check rows
    for (let i = 0; i <= 6; i += 3) {
        if (winner == document.querySelectorAll('.cell')[i].innerHTML &&
            winner == document.querySelectorAll('.cell')[i+1].innerHTML &&
            winner == document.querySelectorAll('.cell')[i+2].innerHTML) {
            showWinner(winner);
            return;
        }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
        if (winner == document.querySelectorAll('.cell')[i].innerHTML &&
            winner == document.querySelectorAll('.cell')[i+3].innerHTML &&
            winner == document.querySelectorAll('.cell')[i+6].innerHTML) {
            showWinner(winner);
            return;
        }
    }

    // check diagonals
    if (winner == document.querySelectorAll('.cell')[0].innerHTML &&
        winner == document.querySelectorAll('.cell')[4].innerHTML &&
        winner == document.querySelectorAll('.cell')[8].innerHTML ||
        winner == document.querySelectorAll('.cell')[2].innerHTML &&
        winner == document.querySelectorAll('.cell')[4].innerHTML &&
        winner == document.querySelectorAll('.cell')[6].innerHTML) {
            showWinner(winner);
            return;
        }

    // check draw
    let stepCount = 0;
    for ( let cell of document.querySelectorAll('.cell') ) {
        if (cell.innerHTML) {
            stepCount++;
        }
    }
    if (stepCount == 8) {
        showDraw();
    }
          
}

function showWinner(winner) {
    document.querySelector('.queue').firstChild.textContent = `Выиграл: `;
    document.querySelector('.queue').firstElementChild.innerHTML = winner;
    if (winner == 'X') {
        document.querySelectorAll('span')[1].innerHTML = +document.querySelectorAll('span')[1].innerHTML + 1;
    } else {
        document.querySelectorAll('span')[2].innerHTML = +document.querySelectorAll('span')[2].innerHTML + 1;
    }
}


function showDraw() {
    document.querySelector('.queue').firstChild.textContent = 'Ничья';
    document.querySelector('.queue').firstElementChild.style.visibility = 'hidden'; 
    document.querySelectorAll('span')[3].innerHTML = +document.querySelectorAll('span')[3].innerHTML + 1;
}

function startGame() {
    stepCount = 0;
    for ( let cell of document.querySelectorAll('.cell') ) {
        cell.innerHTML = '';
    }

    document.querySelector('.queue').firstElementChild.style.visibility = 'visible';
    document.querySelector('.queue').firstElementChild.innerHTML = player;
    document.querySelector('.queue').firstChild.textContent = `Ходит: `; 
}
