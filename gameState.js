let players = [
    { name: "",
    hp: 6 }
]
let currentRound = {amount: 0, currentPlayer: 0}
let dice = 0

const addPlayerToGame = () => {
    players.push({name: "Test", hp: 6})
}

const resetGame = () =>{
    players.forEach(p=>p.hp = 6)
    currentRound = {amount: 0, currentPlayer: 0}
    dice = 0
}

const playRound = (state) =>{
    if (state === "roll"){
        rollDice()
    }
    if (state === "chicken"){
        players[currentRound.currentPlayer].hp -=1
    }

    //Tab eller næste
    if (currentRound.amount >= 16){
        console.log("Tabt")
    } else {
        if (players.length - 1 === currentRound.currentPlayer){
            //Reset if it's the last players turn
            currentRound.currentPlayer = 0
        } else {
            // Else next player
            currentRound.currentPlayer++
        }
    }
}

function rollDice (){
    let roll = Math.floor( (Math.random()* 6) + 1)

    if (roll !== 3 ){
        currentRound.amount += roll
    }

    dice = roll
}


const getGameState = () => {
    return {players, currentRound, dice}
}

module.exports = {
    playRound,
    getGameState,
    addPlayerToGame
}