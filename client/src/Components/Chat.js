import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./Chat.css";

const socket = io("http://localhost:3000"); 

const Chat = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (joined) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on("userList", (userList) => {
        setUsers(userList);
      });

      return () => socket.disconnect();
    }
  }, [joined]);

  useEffect(() => {
    if (room && token) {
      axios
        .get(`http://localhost:3000/api/chat/chats/${room}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.error("Error fetching chat history:", err));
    }
  }, [room, token]);

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password,
      });
      alert("Registration successful! Please log in.");
    } catch (err) {
      console.error("Registration failed:", err.response.data);
      alert("Registration failed. Try again.");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      setToken(res.data.token);
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err.response.data);
      alert("Login failed. Check your credentials.");
    }
  };

  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { username, room });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const data = { user: username, text: message, room };
      socket.emit("sendMessage", data);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      {!token ? (
        <div className="auth-container">
          <h2>User Authentication</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </div>
        </div>
      ) : !joined ? (
        <div className="join-container">
          <h2>Join a Chat Room</h2>
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
              <div
                key={index}
                className={`message ${
                  msg.username === username ? "sent" : "received"
                }`}
              >
                <strong>
                  {msg.username === username ? "You" : msg.username}:
                </strong>{" "}
                {msg.message}
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