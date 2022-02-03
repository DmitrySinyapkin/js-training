let field = document.querySelector('.field');
let cells = document.querySelectorAll('.inner');
let start = document.querySelector('.start');
let statusLine = document.querySelector('.status');
let rules = document.querySelector('.rules');
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
     20, 21, 22, 23, 24, 25];
let timeLimit = 75;
let time;
let currentTimer;
let step;

start.addEventListener('click', startGame);

function startGame() {
    rules.style.display = 'none';
    statusLine.style.display = 'block';
    field.style.display = 'grid';
    start.value = 'Начать сначала';
    start.removeEventListener('click', startGame);
    start.addEventListener('click', restartGame);

    restartGame();
}

function fillCells() {
    let randomArr = shuffle(values);

    for (let i = 0; i < randomArr.length; i++) {
        cells[i].innerHTML = randomArr[i];
        cells[i].style.fontSize = getRandomInt(12, 35) + 'px';
        cells[i].style.color = 'rgb(' + getRandomInt(0, 255) + ',' + 
        getRandomInt(0, 255) + ',' + getRandomInt(0, 255) + ')';
    }
}

function shuffle(arr){
	let j, temp;
	for(let i = arr.length - 1; i > 0; i--) {
		j = Math.floor( Math.random()*(i + 1) );
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function nextStep() {
    step++;
    this.style.background = 'red';
    this.removeEventListener('click', nextStep);
    if (step <= cells.length) {
        for (let cell of cells) {
            if (cell.innerHTML == step) {
                cell.parentElement.addEventListener('click', nextStep);
            }
        }
    } else {
        showVictory();
    }
}

function showVictory() {
    clearInterval(currentTimer);
    statusLine.innerHTML = 'Вы выиграли!';
}

function restartGame() {
    step = 1;
    time = timeLimit;
    clearInterval(currentTimer);

    for (let cell of cells) {
        cell.parentElement.style.background = 'white';
    }

    statusLine.innerHTML = `Времени осталось: ${time}`;

    fillCells();

    for (let cell of cells) {
        if (cell.innerHTML == 1) {
            cell.parentElement.addEventListener('click', nextStep);
        }
    }

    currentTimer = setInterval(timer, 1000);
}

function timer() {
    statusLine.innerHTML = `Времени осталось: ${time}`;
    time--;
    checkLoose();
}

function checkLoose() {
    if (time < 0) {
        clearInterval(currentTimer);
        statusLine.innerHTML = 'Вы проиграли!';

        for (let cell of cells) {
            cell.parentElement.removeEventListener('click', nextStep);
        }
    }
}