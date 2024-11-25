const express = require('express');
const http = require('http');
const cors = require('cors');
const { socketSetup } = require('./socket');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
socketSetup(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
