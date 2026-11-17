# React Card Flip game

A timed memory card game built with React, with a Node.js/Express API and MongoDB for storing high scores. Players enter a name, flip cards to find the matching pairs as fast as they can, and their time is saved to a leaderboard.

## Features

- Card-flip memory game with animated flips
- Live timer that starts when the game begins and stops when every pair is matched
- Start button stays disabled until a player name is entered
- Matching logic: mismatched cards flip back after one second
- High-scores page that lists every saved time and highlights the fastest in red
- Routing with React Router (game, high scores, about) and an error page for unknown routes
- REST API that saves and retrieves scores from MongoDB

## Tech stack

| Area | Technologies |
|---|---|
| Frontend | React, React Router, Axios, react-card-flip, JavaScript, CSS |
| Backend | Node.js, Express.js, CORS |
| Database | MongoDB (Atlas) |

## Project structure

```
src/
  main.jsx                  App entry point
  App.jsx                   Routes (/, /scores, /about)
  components/
    Header.jsx / .css       Navigation bar
    FlipCard.jsx            Single flippable card
    PlayerData.jsx          Player name input and Start button
  pages/
    MatchCardsGame.jsx      Game logic, timer and score submission
    ShowHighScores.jsx      Leaderboard table
    About.jsx
    Error500.jsx
db.js                       Express API and MongoDB connection
```

## API

| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/addScore` | `{ "user": "Alex", "time": 12.345 }` | `{ "success": true }` |
| GET | `/getScores` | none | `{ "scores": [ { "_id": "...", "user": "Alex", "time": 12.345 } ] }` |

`time` is the completion time in seconds.

## How the game works

1. Enter a player name and press **Start**. The timer begins.
2. Flip two cards. If they match, they stay face up; if not, they flip back after one second.
3. When every pair is matched, the time is posted to the API and the game resets.
4. Open **High Scores** to see all saved times, with the fastest highlighted in red.
