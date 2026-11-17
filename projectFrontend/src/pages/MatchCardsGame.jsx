import React, { useState, useRef } from "react";

import axios from "axios";

import FlipCard from '../components/FlipCard';
import Header from '../components/Header';
import './MatchCardsGame.css';
import PlayerData from "../components/PlayerData";

function MatchCardsGame() {
  const [flips, setFlips] = useState([false, false, false, false]);
  const [gameStarted, setGameStarted] = useState(false);
  const playerName = useRef("");
  const state = useRef(0);
  const lastFlipCardIndex = useRef(null);

  const cards = [{
    index: 0,
    title: '0',
    name: 'monkey',
    frontImage: 'card2.jpg',
    backImage: 'monkey.jpg',
    status: flips,
    setStatus: UpdateEngine
  }, {
    index: 1,
    title: '1',
    name: 'pig',
    frontImage: 'card2.jpg',
    backImage: 'pig.jpg',
    status: flips,
    setStatus: UpdateEngine
  },
  {
    index: 2,
    title: '2',
    name: 'monkey',
    frontImage: 'card2.jpg',
    backImage: 'monkey.jpg',
    status: flips,
    setStatus: UpdateEngine
  },
  {
    index: 3,
    title: '3',
    name: 'pig',
    frontImage: 'card2.jpg',
    backImage: 'pig.jpg',
    status: flips,
    setStatus: UpdateEngine
  },];

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const intervalRef = useRef(null);

  function UpdateEngine(idx) {
    UpdateFlips(idx);
    switch (state.current) {
      case 0: lastFlipCardIndex.current = idx;
        state.current = 1;
        break;
      case 1:
        if (cards[idx]['name'] == cards[lastFlipCardIndex.current]["name"]) {
          state.current = 2;
        }
        else {
          state.current = 0;
          setTimeout(ResetFlipCards, 1000, lastFlipCardIndex.current, idx);
        }
        lastFlipCardIndex.current = null;
        break;
      case 2:
        state.current = 3;
        break;

      case 3: default:
        clearInterval(intervalRef.current);
        axios.post("http://localhost:8000/addScore", {
          user: playerName.current,
          time: Number(((endTime - startTime) / 1000).toFixed(3))
        }).catch(err => console.error("error is:", err));
        setTimeout(HandleGameComplete, 1000);
        break;
    }
  }

  function HandleStartButton() {
    setGameStarted(true);
    setStartTime(Date.now());
    intervalRef.current = setInterval(HandleInterval, 1);
  }

  function HandleInterval() {
    setEndTime(Date.now());
  }

  function UpdateFlips(idx) {
    var flipsCopy = Array.from(flips);
    flipsCopy[idx] = !flips[idx];

    setFlips(flipsCopy);
  }

  function ResetFlipCards(idx1, idx2) {
    var flipsCopy = Array.from(flips);
    flipsCopy[idx1] = false;
    flipsCopy[idx2] = false;

    setFlips(flipsCopy);
  }

  function HandleGameComplete() {
    setFlips([false, false, false, false]);
    state.current = 0;
    lastFlipCardIndex.current = null;
    setGameStarted(false);
  }

  return (
    <div>
      <Header></Header>
      {!gameStarted && <PlayerData playerName={playerName} handleStart={HandleStartButton}></PlayerData>}
      {gameStarted && <div className="deckColumn">
        <p>Time: {((endTime - startTime) / 1000).toFixed(3)}</p>
        <div className="deckRow">
          <FlipCard config={cards[0]}></FlipCard>
          <FlipCard config={cards[1]}></FlipCard>
        </div>
        <div className="deckRow">
          <FlipCard config={cards[2]}></FlipCard>
          <FlipCard config={cards[3]}></FlipCard>
        </div>
      </div>}
    </div>
  )
}

export default MatchCardsGame