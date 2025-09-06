import React, { useState, useEffect } from 'react';
import '../styles/Game.css';
import { createDeck } from './Deck';
import { CardType } from '../types/CardType';

const Game: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [computerHand, setComputerHand] = useState<CardType[]>([]);
  const [playerCard, setPlayerCard] = useState<CardType | null>(null);
  const [computerCard, setComputerCard] = useState<CardType | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [winnerMessage, setWinnerMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const maxCardsPerPlayer = 5;

  // Initialisation du jeu au montage
  useEffect(() => {
    restartGame();
  }, []);

  const playRound = () => {
    if (gameOver || playerHand.length === 0 || computerHand.length === 0) return;

    const playerTopCard = playerHand[0];
    const computerTopCard = computerHand[0];

    setPlayerCard(playerTopCard);
    setComputerCard(computerTopCard);

    const playerValue = values.indexOf(playerTopCard.value);
    const computerValue = values.indexOf(computerTopCard.value);

    let newPlayerHand = playerHand.slice(1);
    let newComputerHand = computerHand.slice(1);

    if (playerValue > computerValue) {
      newPlayerHand = [...newPlayerHand, playerTopCard, computerTopCard];
      setPlayerScore(prev => prev + 1);
    } else if (computerValue > playerValue) {
      newComputerHand = [...newComputerHand, computerTopCard, playerTopCard];
      setComputerScore(prev => prev + 1);
    }

    setPlayerHand(newPlayerHand);
    setComputerHand(newComputerHand);
    setRounds(prev => prev + 1);

    // Vérifie la fin de partie
    if (newPlayerHand.length === 0 || newComputerHand.length === 0) {
      if (newPlayerHand.length > newComputerHand.length) setWinnerMessage('Tu as gagné 🎉');
      else if (newComputerHand.length > newPlayerHand.length) setWinnerMessage("L'ordinateur a gagné 💻");
      else setWinnerMessage('Match nul 🤝');
      setGameOver(true);
    }
  };

  const restartGame = () => {
    const newDeck = createDeck();
    setPlayerHand(newDeck.slice(0, maxCardsPerPlayer));
    setComputerHand(newDeck.slice(maxCardsPerPlayer, maxCardsPerPlayer * 2));
    setPlayerCard(null);
    setComputerCard(null);
    setPlayerScore(0);
    setComputerScore(0);
    setRounds(0);
    setWinnerMessage('');
    setGameOver(false);
  };

  const getSuitEmoji = (suit: "hearts" | "diamonds" | "clubs" | "spades") => {
    switch (suit) {
      case "hearts": return "❤️";
      case "diamonds": return "♦️";
      case "clubs": return "♣️";
      case "spades": return "♠️";
      default: return "";
    }
  };

  return (
    <div className="game">
      {/* Piles de cartes */}
      <div className="card-stack player-stack">
        {playerHand.length > 0 ? <div className="stack-card">🌹 Moi ({playerHand.length})</div> : <p>Aucune carte</p>}
      </div>
      <div className="scores">
        <h3>Scores :</h3>
        <p>Moi: {playerScore}</p>
        <p>Ordi: {computerScore}</p>
        <p>Tour: {rounds}</p>
      </div>
      <div className="card-stack computer-stack">
        {computerHand.length > 0 ? <div className="stack-card">🚀 Ordi ({computerHand.length})</div> : <p>Aucune carte</p>}
      </div>

      {/* Cartes jouées */}
      <div className="cards">
        {playerCard && computerCard && (
          <div className="round-cards">
            <div className="card player-card">
              <div className="corner top-left">{playerCard.value}</div>
              <div className="corner bottom-right">{playerCard.value}</div>
              <div className="center">{getSuitEmoji(playerCard.suit)}</div>
            </div>
            <div className="card computer-card">
              <div className="corner top-left">{computerCard.value}</div>
              <div className="corner bottom-right">{computerCard.value}</div>
              <div className="center">{getSuitEmoji(computerCard.suit)}</div>
            </div>
          </div>
        )}
      </div>

      <button onClick={playRound} disabled={gameOver}>Lancer le tour</button>

      {winnerMessage && <div className="winner-message">{winnerMessage}</div>}
      {gameOver && <button onClick={restartGame} className="restart-button">Recommencer</button>}
    </div>
  );
};

export default Game;
