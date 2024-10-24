// server.js
const cors = require('cors');
const socketIO = require('socket.io');
const { createServer } = require('http');
const express = require('express');

// Import models
const { startBoard } = require('./Models/StartBoard.js');

// Import utils
const { checkCaptureMoves, checkPossibleMoves, movePiece } = require('./Utils/GameUtils.js');

// Constants
const MAX_PLAYERS = 2;


// App setup
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


const lobbies = [];

const getOtherPlayer = (lobbyCode, player) => {
    const lobby = lobbies[lobbyCode];
    const currentTurnPlayerIndex = lobby.players.indexOf(player);
    const otherPlayerIndex = Math.abs(currentTurnPlayerIndex - 1);
    return lobby.players[otherPlayerIndex];
}

// Socket.IO connection for real-time game handling
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle lobby join / create
    socket.on('joinLobby', lobbyCode => {
        const room = io.sockets.adapter.rooms.get(lobbyCode);
        const numPlayers = room ? room.size : 0;

        if (numPlayers < MAX_PLAYERS) {
            if (!lobbies[lobbyCode]) {
                lobbies[lobbyCode] = {
                    players: [socket.id],
                    currentTurn: socket.id,
                    board: startBoard('', '')
                };
            } else {
                const lobby = lobbies[lobbyCode];
                const players = lobby.players;
                players.push(socket.id);
                lobby.board = startBoard(players[0], players[1]);
            }
            // Add player to the lobby
            socket.join(lobbyCode);
            console.log(`Player joined lobby: ${lobbyCode} - ${socket.id}`);
            io.to(lobbyCode).emit('turnChanged', lobbies[lobbyCode].currentTurn);

            if (numPlayers === 1) {
                io.to(lobbyCode).emit('board', lobbies[lobbyCode].board);
                io.to(lobbyCode).emit('players', lobbies[lobbyCode].players);
            };
        } else {
            // Send error message to client
            socket.emit('lobbyFull', { message: 'החדר שאתה מנסה להכנס אליו מלא' });
        }

        socket.on('disconnect', () => {
            const lobby = lobbies[lobbyCode];

            try {
                if (!lobby.players.includes(socket.id)) { return };
                
                lobby.players = lobby.players.filter(player => player !== socket.id);
                lobby.currentTurn = lobby.players[0];
                io.to(lobbyCode).emit('players', lobby.players);

                if (lobby.players.length === 0) {
                    delete lobbies[lobbyCode];
                    console.log(`lobby ${lobbyCode} deleted`);
                }
            } catch {};
        })
    });

    socket.on('possibleMoves', lobbyCode => {
        const lobby = lobbies[lobbyCode];
        if (!lobby) { return }
        const board = lobby.board;
        const players = lobby.players;
        const player = socket.id;
        const isFirstPlayer = players.indexOf(player) === 0;

        const possibleMoves = checkPossibleMoves(board, player, isFirstPlayer);
        const mustMoves = checkCaptureMoves(board, player, isFirstPlayer);

        if (players.length === 2 && Object.keys(possibleMoves).length === 0 && Object.keys(mustMoves).length == 0) {
            io.to(lobbyCode).emit('winner', getOtherPlayer(lobbyCode, player));
            delete lobbies[lobbyCode];
        } else {
            socket.emit('possibleMoves', { possibleMoves, mustMoves });
        }

    });

    socket.on('makeMove', async ({ lobbyCode, from, to }) => {
        const lobby = lobbies[lobbyCode];
        const board = lobby.board;
        const players = lobby.players;
        const player = socket.id;
        const isFirstPlayer = players.indexOf(player) === 0;

        const hasEat = movePiece(board, players, from, to);

        await io.to(lobbyCode).emit('board', lobby.board);
        const secondCapture = checkCaptureMoves(board, player, isFirstPlayer, isKing=true)[`${to[0]}-${to[1]}`];

        if (secondCapture && hasEat) {
            const mustMoves = { [`${to[0]}-${to[1]}`]: secondCapture };
            socket.emit('possibleMoves', { possibleMoves: [], mustMoves });
        } else {
            // Switch turns
            lobby.currentTurn = getOtherPlayer(lobbyCode, player);
            io.to(lobbyCode).emit('turnChanged', lobby.currentTurn);
        }
    });

    socket.on('timerExpired', lobbyCode => {
        io.to(lobbyCode).emit('winner', getOtherPlayer(lobbyCode, socket.id));
        delete lobbies[lobbyCode];
        console.log(`lobby ${lobbyCode} deleted`);
    });

    socket.on('opponentSelect', ({ lobbyCode, location }) => {
        io.to(lobbyCode).emit('opponentSelect', location)
    });

    socket.on('leaveLobby', lobbyCode => {
        socket.leave(lobbyCode);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT,
    () => console.log(`Server running on port ${PORT}`)
);
