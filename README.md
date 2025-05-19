# Real-Time Chat App

A simple, modern real-time chat website using Node.js, Express, Socket.IO, and Tailwind CSS.

## Features
- Password-protected chatroom (see `server.js` for password)
- Display name prompt before entering chat
- Real-time messaging with timestamps
- Responsive, clean UI (Tailwind CSS)
- All data in memory (no database)

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Build Tailwind CSS:**
   ```sh
   npx tailwindcss -i ./public/input.css -o ./public/dist/output.css --minify
   ```
   If you have issues with the above command on Windows/PowerShell, use a Tailwind CDN in `index.html` as a temporary workaround.
3. **Start the server:**
   ```sh
   node server.js
   ```
4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Notes
- The chatroom password is hardcoded in `server.js` (`CHAT_PASSWORD`).
- For production, replace the sound file `/sound/notify.mp3` with your own.
- All chat data is lost when the server restarts.
