# 🎥 WebRTC Video Chat

A simple, real-time video conferencing application where two people can connect and chat instantly. No complex setup, just open two browser tabs and start talking!


## Quick Start

### Needs
- Node.js installed on your computer
- Two browsers (or two tabs in the same browser)
- A webcam and microphone

### Let's Get Started

**Step 1: Install the Server**
```bash
cd server
npm install
```

**Step 2: Start the Server**
```bash
node server.js
```
You should see: `Server running on 8000`

**Step 3: Start the Client (in another terminal)**
```bash
cd client
npx serve .
```
Your browser will open to `localhost:3000`

**Step 4: Open Two Browser Windows**
- Open `http://localhost:3000` in Browser 1
- Open `http://localhost:3000` in Browser 2 (or new tab)

### Making Your First Call

**In Browser 1:**
1. Type your name (e.g., "Alice")
2. Type a room name (e.g., "my-room")
3. Click "Join Room"
4. Allow camera/microphone access when prompted

**In Browser 2:**
1. Type your name (e.g., "Bob")
2. Type the **same room name** ("my-room") 
3. Click "Join Room"
4. Allow camera/microphone access

**That's it!** 

## Features Explained

### 🎬 Video Conferencing
- Peer-to-peer connection (your video goes directly to them, not through our server)
- Crystal clear video and audio
- Works across different networks

### 🔇 Mute Button
- Click to mute/unmute your microphone
- The other person will see the mute icon change
- Your preference is saved - if you refresh, it stays muted

### 📹 Camera Toggle
- Turn your camera on and off with one click
- Other person sees a black screen when it's off
- Your setting is remembered across refreshes

### 💬 Chat System
- Send text messages while on your call
- Messages show who sent them and when
- All messages are stored, so new joiners see the history
- Messages stay even if someone disconnects

### 🔄 Auto-Rejoin
- If your page accidentally refreshes, you'll automatically rejoin the call
- Your username and room are remembered
- No need to re-enter your details

### 📱 Draggable Local Video
- Your video appears as a small box in the top-right
- You can drag it around the screen
- The other person's video takes up the main screen



## How It Works 

The application has three main parts:

1. **The Server** (`server.js`)
   - Sits in the middle and helps you find each other
   - Stores your chat messages
   - Tells both of you when the other person is ready

2. **The Client** (`index.html`)
   - Runs in your browser
   - Handles your camera and microphone
   - Displays the video and chat
   - Stores your preferences locally

3. **The Styling** (`styles.css`)
   - Positions the videos and chat properly
   - Handles the button animations



## File Structure

```
WebRTC Video Conferencing/
├── server/
│   ├── server.js          # The server that does the introductions
│   └── package.json       # Server dependencies
├── client/
│   ├── index.html         # The main app (video + chat)
│   ├── styles.css         # How it looks
│   └── package.json       # Client dependencies
├── .gitignore             # What to ignore in git
├── DOCUMENTATION.md       # Technical deep-dive
└── README.md              # This file!
```

## Technologies Used

- **WebRTC** - For peer-to-peer video/audio (the cool stuff!)
- **Socket.io** - For real-time messaging and introductions
- **Node.js** - For the server
- **JavaScript** -  just plain JavaScript

