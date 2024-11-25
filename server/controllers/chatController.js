let users = {};

const joinRoom = (socket, { username, room }) => {
    if (!users[room]) {
        users[room] = [];
    }
    const newUser = { id: socket.id, username };
    users[room].push(newUser);
    socket.join(room);

    console.log(`${username} joined room: ${room}`);

    socket.emit('userList', users[room]);

    socket.to(room).emit('message', { user: 'System', text: `${username} has joined the room.` });
};

const sendMessage = (socket, { user, text, room }) => {
    socket.to(room).emit('message', { user, text });
    socket.emit('message', { user, text });
};

const userDisconnected = (socket) => {
    console.log(`User disconnected: ${socket.id}`);
    for (const room in users) {
        users[room] = users[room].filter((user) => user.id !== socket.id);
        socket.to(room).emit('userList', users[room]);
    }
};

module.exports = {
    joinRoom,
    sendMessage,
    userDisconnected
};
