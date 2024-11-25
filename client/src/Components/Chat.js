import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3000'); 

const Chat = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (joined) {
            socket.on('message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data]);
            });

            socket.on('userList', (userList) => {
                setUsers(userList);
            });

            return () => socket.disconnect(); 
        }
    }, [joined]);

    const joinRoom = () => {
        if (username.trim() && room.trim()) {
            socket.emit('joinRoom', { username, room });
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            const data = { user: username, text: message, room };
            socket.emit('sendMessage', data); 
            setMessage('');
        }
    };
    

    return (
        <div className="chat-container">
            {!joined ? (
                <div className="join-container">
                    <h2>Join a Chat Room</h2>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter room code"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join</button>
                </div>
            ) : (
                <>
                    <div className="users-list">
                        <h3>Users in this room:</h3>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>{user.username}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.user === username ? 'sent' : 'received'}`}>
                                <strong>{msg.user}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chat;
