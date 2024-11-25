const express = require('express');
const { getChats } = require('../controllers/chatController');

const router = express.Router();

router.get('/chats/:room', getChats);

module.exports = router;
