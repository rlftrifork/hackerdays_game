const gameState = {}
const socket = io();

const dice = document.querySelector(".dice")
const hp = document.querySelector(".current-player-hp")
const totalAmount = document.querySelector(".total-amount")
const gameContainer = document.querySelector(".game-container")
const name = document.querySelector(".name")
const lobby = document.createElement("div")
lobby.classList.add("lobby")

const nameInput = document.createElement("label")
const newInput = document.createElement("input")
const newButton = document.createElement("button")
newButton.onclick =()=> submitNewPlayer()
newInput.type = "text"
newButton.innerHTML = "Tilføj ny spiller"

nameInput.appendChild(newInput)
nameInput.appendChild(newButton)
lobby.appendChild(nameInput)
gameContainer.appendChild(lobby)

let clientName = ""

socket.on("update", (gameState)=>{
    console.log(gameState)
    updateUI(gameState)
})

function updateUI(gameState){
    totalAmount.innerHTML = gameState.currentRound.amount
    dice.innerHTML = gameState.dice
    hp.innerHTML = gameState.players.find(p => p.name === clientName).hp
}

function roll(){
    socket.emit('takeTurn', "roll")
}

function chicken(){
    socket.emit('takeTurn', "chicken")
}

const submitNewPlayer=()=>{
    postData('http://localhost:5000/add', {name: newInput.value }).then(data=>{
        name.innerHTML = data.name
        clientName = data.name
    })
    lobby.remove()
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}