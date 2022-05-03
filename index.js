const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const {playRound, getGameState, submitNewPlayer} = require("./gameState");
const io = new Server(server);

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

function update(){
    io.emit("update",getGameState())
}

io.on('connection', (socket) => {
    socket.on("takeTurn", (e)=>{
        playRound(e)
        if (e === "roll") {
            io.emit("roll", getGameState())
            update()
        }
        if (e === "chicken") {
            io.emit("chicken", getGameState())
            update()
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/add",(req, res) => {
    submitNewPlayer(req.body)
    res.send(req.body)
})



server.listen(5000, () => {
    console.log('Games is running');
});