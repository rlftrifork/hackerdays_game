const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {playRound, getGameState} = require("./gameState");
const io = new Server(server);

app.use(express.static('public'));
io.on('connection', (socket) => {
    socket.on("takeTurn", (e)=>{
        playRound(e)
        io.emit("roll", getGameState())
    })
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



server.listen(5000, () => {
    console.log('listening on *:5000');
});