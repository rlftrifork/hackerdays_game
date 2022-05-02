let players = [
    {name: "",
    hp:1}
]
let currentRound = {amount: 0, currentPlayer: 0}
let dice = 0

const playRound = (state) =>{
    if (state === "roll"){
        rollDice()
    }
    // killing

    //slå

    //Tab eller næste
    if (currentRound.amount >= 16){
        console.log("Tabt")
    }
}

function rollDice (){
    dice = Math.floor( (Math.random()* 6) + 1)
    currentRound.amount += dice
}


const getGameState = () => {
    return {players, currentRound, dice}
}

module.exports = {
    playRound,
    getGameState
}