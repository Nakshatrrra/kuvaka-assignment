# Chat Application

Live :- https://kuvaka-task-nakshatra.netlify.app/

Hosted api base URL:- https://kuvaka-assignment-pge7.onrender.com

This is sole project done by me(Nakshatra Trivedi)!

This repository contains a **real-time chat application** built using **Node.js**, **Socket.IO**, and **ReactJS**. It is organized into two main directories:

- **client/**: The ReactJS-based frontend.
- **server/**: The Node.js backend with Socket.IO for real-time communication.

I've tried following this structure:  Models, Controller, Services , routes and config.

## Features

- Join chat rooms and communicate in real-time with a unique `chatID`.
- View a list of active users in the room.
- Message synchronization across all connected clients.
- Group chat functionality using `chatID`.
- Mongodb integration to store chats and users.
- Allow user login before starting chat to create secure environment.
- Used JWT for secure API.
- Added .env for mongodb url.
- used netlify to host frontend and render for backend.
- used atlas for mongodb


---

## Run this App Locally

To run the chat application locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Nakshatrrra/kuvaka-assignment

2. **Backend:**

   create .env add MONGO_URI = {YOUR_URL}
   
   ```bash
   cd server
   npm i
   npm run dev

1. **Frontend:**

   ```bash
   cd client
   npm i
   npm start


P.s. :- I've already used chat functionality using socket.io in my last internship at Storytent.
Here's the link to website:
https://storytent.in/
