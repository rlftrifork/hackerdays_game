let players = [
    {name: "",
    hp:1}
]
let currentRound = {amount: 0, currentPlayer: 0}
let dice = 0

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
        if (players.length ===currentRound.currentPlayer){
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
        dice += roll
    }

    currentRound.amount += dice
}


const getGameState = () => {
    return {players, currentRound, dice}
}

module.exports = {
    playRound,
    getGameState
}