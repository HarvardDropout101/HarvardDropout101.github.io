const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const CHAT_PASSWORD = 'Nigger'; // Hardcoded password
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// In-memory user list (not persistent)
let users = {};

io.on('connection', (socket) => {
  let username = null;

  socket.on('auth', (data) => {
    if (data.password === CHAT_PASSWORD) {
      socket.emit('auth-success');
    } else {
      socket.emit('auth-fail');
    }
  });

  socket.on('set-username', (name) => {
    username = name;
    users[socket.id] = name;
    socket.emit('join-success');
  });

  socket.on('chat-message', (msg) => {
    if (!username) return;
    const timestamp = new Date().toLocaleTimeString();
    io.emit('chat-message', {
      user: username,
      message: msg,
      time: timestamp
    });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
