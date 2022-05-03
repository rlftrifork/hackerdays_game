const gameState = {}

const socket = io();

const dice = document.querySelector(".dice")

const totalAmount = document.querySelector(".total-amount")

const gameContainer = document.querySelector(".game-container")
const name = document.querySelector(".name")


const lobby = document.createElement("div")
lobby.classList.add("fisk")
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

socket.on("update", (d)=>{
    console.log(d)
})

function updateUI(gameState){

}

function roll(){
    let fisk = 0
    socket.emit('takeTurn', "roll")
    socket.once("roll", e=>{
        fisk += 1
        console.log(fisk)
        console.log(e)
        // dice.innerHTML = e
        totalAmount.innerHTML = e.currentRound.amount
    })
}
function chicken(){
    socket.emit('takeTurn',"chicken")
}

const submitNewPlayer=()=>{
    console.log(newInput.value)


    postData('http://localhost:5000/add', {name: newInput.value }).then(data=>{
        console.log(data)
        name.innerHTML = data.name

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