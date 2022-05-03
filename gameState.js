let players = []
let playerIndex = 0
let currentRound = {amount: 0, currentPlayer: playerIndex}
let dice = 0

const resetGame = () =>{
    players.forEach(p=>p.hp = 6)
    dice = 0
    currentRound = {amount: 0, currentPlayer: players[0]}
}

const playRound = (state) =>{
    if (state === "roll"){
        rollDice()
    }
    if (state === "chicken"){
        players[playerIndex].hp -=1
    }

    //Tab eller næste
    if (currentRound.amount >= 16){
        resetGame()
    } else {
        if (players.length === playerIndex + 1){
            //Reset if it's the last players turn
            currentRound.currentPlayer = players[0].name
            playerIndex = 0
        } else {
            // Else next player
            playerIndex++
            if (players.length > 0) currentRound.currentPlayer= players[playerIndex].name
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

const submitNewPlayer=(player)=>{
players.push({
    name: player.name,
    hp:6
})
    console.log(players)
}



module.exports = {
    submitNewPlayer,
    playRound,
    getGameState
}