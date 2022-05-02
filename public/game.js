const gameState = {}

const socket = io();

const dice = document.querySelector(".dice")


function roll(){
    let fisk = 0
    socket.emit('takeTurn', "roll")
    socket.on("roll", e=>{
        fisk += 1
        console.log(fisk)
        console.log(e)
        // dice.innerHTML = e
    })
}

