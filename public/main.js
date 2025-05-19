// main.js
const socket = io();

const app = document.getElementById('app');
let username = '';

function showPasswordPrompt() {
  app.innerHTML = `
    <div class="bg-white p-8 rounded shadow-md w-full">
      <h2 class="text-xl font-bold mb-4">Enter Chatroom Password</h2>
      <input id="password" type="password" class="border p-2 w-full mb-4" placeholder="Password" />
      <button id="submitPassword" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Enter</button>
      <div id="passwordError" class="text-red-500 mt-2 hidden">Incorrect password. Try again.</div>
    </div>
  `;
  document.getElementById('submitPassword').onclick = () => {
    const password = document.getElementById('password').value;
    socket.emit('auth', { password });
  };
}

function showNamePrompt() {
  app.innerHTML = `
    <div class="bg-white p-8 rounded shadow-md w-full">
      <h2 class="text-xl font-bold mb-4">Enter Display Name</h2>
      <input id="displayName" type="text" class="border p-2 w-full mb-4" placeholder="Your name" />
      <button id="submitName" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Join Chat</button>
    </div>
  `;
  document.getElementById('submitName').onclick = () => {
    username = document.getElementById('displayName').value.trim();
    if (username) {
      socket.emit('set-username', username);
    }
  };
}

function showChat() {
  app.innerHTML = `
    <div class="flex flex-col h-[80vh]">
      <div id="messages" class="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-t"></div>
      <form id="chatForm" class="flex mt-2">
        <input id="msgInput" autocomplete="off" class="flex-1 border rounded-l p-2" placeholder="Type a message..." />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
      </form>
    </div>
  `;
  const form = document.getElementById('chatForm');
  form.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('msgInput');
    const msg = input.value.trim();
    if (msg) {
      socket.emit('chat-message', msg);
      input.value = '';
    }
  };
}

function addMessage({ user, message, time }) {
  const messages = document.getElementById('messages');
  const isSelf = user === username;
  const msgDiv = document.createElement('div');
  msgDiv.className = `mb-2 flex ${isSelf ? 'justify-end' : 'justify-start'}`;
  msgDiv.innerHTML = `
    <div class="${isSelf ? 'bg-blue-100' : 'bg-gray-200'} rounded px-3 py-2 max-w-xs">
      <span class="font-semibold">${user}</span>: <span>${message}</span>
      <span class="block text-xs text-gray-500 text-right">${time}</span>
    </div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
  // Play sound
  const snd = document.getElementById('msg-sound');
  if (snd) snd.play();
}

// Socket events
socket.on('auth-success', showNamePrompt);
socket.on('auth-fail', () => {
  document.getElementById('passwordError').classList.remove('hidden');
});
socket.on('join-success', showChat);
socket.on('chat-message', addMessage);

// Start
showPasswordPrompt();
