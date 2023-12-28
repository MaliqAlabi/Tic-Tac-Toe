const gameStatus = document.getElementById('gameStatus')
const restartBtn = document.getElementById('restartBtn')
let cellEl = Array.from(document.getElementsByClassName('cell'))


const O_PLAYER = "O"
const X_PLAYER = "X"
let currentPlayer = X_PLAYER
let option = ['', '', '', '', '', '', '', '', '']
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let playerMoves = 0


const startGame = () => {
    cellEl.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id
    if (!option[id] && playerMoves < 9) {
        option[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(winningResult() !==false){
            gameStatus.textContent = `${currentPlayer} has won`
            playerMoves = 10
            return
        }

        playerMoves++
        currentPlayer = currentPlayer == X_PLAYER ? O_PLAYER : X_PLAYER
    }

    if(playerMoves == 9){
        gameStatus.textContent = `DRAW GAME`
        cellEl.forEach(box => box.style.color = 'red');
    }
}

function winningResult(){
    for(pattern of winningPatterns){
        let [a,b,c] = pattern

        if(option[a] && option[a] == option[b] && option[b] == option[c]){
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', function () {
    option = ['', '', '', '', '', '', '', '', '']
    currentPlayer = X_PLAYER
    cellEl.forEach(box => box.textContent = '')
    cellEl.forEach(box => box.style.color = '#F2C14E')
    gameStatus.innerHTML = 'Tic Tac Toe'
    playerMoves = 0
})

startGame()