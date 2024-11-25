const express = require('express');
const http = require('http');
const cors = require('cors');
const { socketSetup } = require('./socket');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
socketSetup(server);

server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
