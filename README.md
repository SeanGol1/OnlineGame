# 🎮 OnlineGame – Real-Time Multiplayer Games Platform

OnlineGame is a real-time multiplayer games platform built using **WebSockets**, allowing multiple players to connect, interact, and play games together simultaneously through the browser.

The project is designed as a **multi-game hub**, where different games share the same real-time networking infrastructure.

The main completed game is a **real-time multiplayer trivia quiz**, with additional games such as the Irish card game **Twenty-Five (25)** and several experimental test games currently in development.

---

## 🚀 Features

- 🔌 Real-time multiplayer gameplay using **WebSockets**
- 👥 Multiple players connected at the same time
- 🧠 **Trivia Quiz Game**
  - Real-time questions and answers
  - Live score tracking
  - Synchronized game state across all players
- 🃏 **Irish Card Game – Twenty-Five (25)** (work in progress)
- 🧪 Experimental / test games
- 🌐 Browser-based client
- 🧱 Architecture designed to support multiple games

---

## 🕹️ Games Included

### 🧠 Trivia Quiz
- Multiplayer quiz game played in real time
- Players receive questions simultaneously
- Answers are sent via WebSockets
- Server validates answers and updates scores
- Game state is broadcast to all connected players
- Host Screen is used for everyone to view

### 🃏 Twenty-Five (25) – Irish Card Game
- Digital implementation of the traditional Irish card game
- Multiplayer structure in place
- Core gameplay logic partially implemented
- UI and rule handling still in progress
- No Host screen needed for this. 

### 🧪 Test / Experimental Games
- Used to experiment with:
  - WebSocket messaging
  - Game state synchronization
  - Multiplayer interactions
- Some test games are incomplete or non-functional
  - Guess Who
  - Risk

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- TypeScript / JavaScript
- Browser-based UI

### Backend
- C#
- WebSocket server

### Communication
- **WebSockets** for:
  - Player connections
  - Game events
  - State synchronization
  - Live score updates

---

## 🧱 Architecture Overview

- Clients connect to the server using WebSockets
- Each game runs as a real-time session
- The server:
  - Manages connected players
  - Maintains authoritative game state
  - Broadcasts updates to all clients
- The client:
  - Sends player actions
  - Renders game updates in real time

This architecture allows new games to be added without modifying the core networking layer.

---

## 🧠 Learning Goals & Motivation

This project was built to:
- Learn and apply real-time WebSocket communication
- Design multiplayer game architecture
- Synchronize game state across multiple clients
- Experiment with multiple game types on a shared platform

---

## 🧪 Known Limitations

- Some test games are incomplete
- UI styling is minimal and functionality-focused
- No authentication system implemented yet

---

## 🔮 Future Improvements

- Lobby and matchmaking system
- Improved UI/UX
- Complete Twenty-Five (25) gameplay
- Player authentication
- Persistent scores and statistics
- Mobile-friendly layout

---

## 🤝 Contributing

This project is a learning and experimentation platform.  
Suggestions, improvements, and pull requests are welcome.

---

## 📄 License

This project is for educational and portfolio purposes.
