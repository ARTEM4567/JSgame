let start = document.getElementById('start');
let game = document.querySelector('.game');
let inputTime = document.getElementById('game-time');
let time = document.getElementById('time');
let time_header = document.getElementById('time-header');
let result_header = document.getElementById('result-header');
let result = document.getElementById('result');

let isGameActive = false;

let score = 0;

inputTime.addEventListener('change', () => {
    time_header.classList.remove('hide');
    result_header.classList.add('hide');
    time.innerText = `${inputTime.value}.0`;
})

function endGame(){
    inputTime.removeAttribute('disabled');
    isGameActive = false;
    game.innerHTML = '';
    start.classList.remove('hide');
    game.style.backgroundColor = '#ccc';
    time_header.classList.add('hide');
    result.innerText = score;
    result_header.classList.remove('hide');
}

function startGame (){
    inputTime.setAttribute('disabled', true);
    time.innerText = inputTime.value;
    score = 0;
    time_header.classList.remove('hide');
    result_header.classList.add('hide');
    isGameActive = true;
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    renderBox();
    let interval = setInterval(function(){
        let currentTime = time.innerText;
        if (currentTime <= 0){
            clearInterval(interval);
            endGame();
        } else {
            time.innerText = (time.innerText - 0.1).toFixed(1);
        }
    },100)
}

function renderBox(){
    game.innerHTML = '';
    let randomScale = getRandom(30, 100);
    let enemy = document.createElement('div');
    enemy.style.width = `${randomScale}px`;
    enemy.style.height = `${randomScale}px`;
    enemy.style.top = `${getRandom(0, 300 - randomScale)}px`;
    enemy.style.left = `${getRandom(0, 300 - randomScale)}px`;
    enemy.style.position = 'absolute';
    enemy.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
    enemy.style.cursor = 'pointer';
    enemy.classList.add('box');
    game.appendChild(enemy);
}

game.addEventListener('click', gameBoxClick);

function gameBoxClick(event){
    if (!isGameActive) {
        return;   
    }

    if(event.target.classList.contains('box')){
        score = score + 1;
        renderBox();
    }

}

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min)) 
}

game.addEventListener('click', gameBoxClick);
start.addEventListener('click', startGame);