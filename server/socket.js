const { Server } = require('socket.io');
const { handleUserConnections } = require('./services/socketService');

let io;

const socketSetup = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        handleUserConnections(io, socket);
    });
};

module.exports = { socketSetup };
