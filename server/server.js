const express = require('express');
const http = require('http');
const cors = require('cors');
const { socketSetup } = require('./socket');

const app = express();
const PORT = 3000;

// Apply CORS configuration
app.use(cors());

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
socketSetup(server);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
