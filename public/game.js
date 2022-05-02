const gameState = {}

const socket = io();

const dice = document.querySelector(".dice")

const totalAmount = document.querySelector(".total-amount")

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

