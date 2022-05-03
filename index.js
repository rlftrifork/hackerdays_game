const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { addPlayerToGame, playRound, getGameState } = require("./gameState");
const io = new Server(server);

app.use(express.static('public'));
io.on('connection', (socket) => {
    addPlayerToGame()
    socket.on("takeTurn", (e)=>{
        playRound(e)
        if (e === "roll") {
            io.emit("roll", getGameState()) 
        } 
        
        if (e === "chicken") {
            io.emit("chicken", getGameState())
        }
        
    })
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



server.listen(5000, () => {
    console.log('Games is running');
});