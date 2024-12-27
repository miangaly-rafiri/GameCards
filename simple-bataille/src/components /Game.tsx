import React, { useState, useEffect } from 'react';
import '../styles/Game.css';
import { createDeck } from './Deck'; // Importer la fonction depuis Deck.tsx
import { CardType } from '../types/CardType'; // Importer le type CardType

const Game: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [computerHand, setComputerHand] = useState<CardType[]>([]);
  const [playerCard, setPlayerCard] = useState<CardType | null>(null);
  const [computerCard, setComputerCard] = useState<CardType | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0); // Compteur de tours
  const [winnerMessage, setWinnerMessage] = useState<string>(''); // Message de victoire
  const [gameOver, setGameOver] = useState(false); // Vérifier si le jeu est terminé

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const newDeck = createDeck(); // Crée un deck mélangé
    const halfDeck = Math.floor(newDeck.length / 2);

    const initialPlayerHand = newDeck.slice(0, halfDeck); // Distribution des cartes
    const initialComputerHand = newDeck.slice(halfDeck);

    setPlayerHand(initialPlayerHand);
    setComputerHand(initialComputerHand);
    setPlayerCard(initialPlayerHand[0]); // Initialiser la première carte du joueur
    setComputerCard(initialComputerHand[0]); // Initialiser la première carte de l'ordinateur
  }, [gameOver]);

  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  const playRound = () => {
    if (playerHand.length === 0 || computerHand.length === 0 || gameOver) {
      return; // Si le jeu est terminé, rien ne se passe
    }

    const playerTopCard = playerHand[0];
    const computerTopCard = computerHand[0];

    setPlayerCard(playerTopCard);
    setComputerCard(computerTopCard);

    const playerCardValue = values.indexOf(playerTopCard.value);
    const computerCardValue = values.indexOf(computerTopCard.value);

    if (playerCardValue > computerCardValue) {
      setPlayerScore(playerScore + 1);
      setPlayerHand(playerHand.slice(1).concat([playerTopCard, computerTopCard]));
      setComputerHand(computerHand.slice(1));
    } else if (computerCardValue > playerCardValue) {
      setComputerScore(computerScore + 1);
      setComputerHand(computerHand.slice(1).concat([computerTopCard, playerTopCard]));
      setPlayerHand(playerHand.slice(1));
    } else {
      setPlayerHand(playerHand.slice(1));
      setComputerHand(computerHand.slice(1));
    }

    // Incrémenter le nombre de tours
    setRounds(rounds + 1);

    // Vérifier si un joueur a gagné après un certain nombre de tours
    if (rounds >= 10) {
      if (playerScore > computerScore) {
        setWinnerMessage('Tu as gagné ');
      } else if (computerScore > playerScore) {
        setWinnerMessage('L\'ordinateur a gagné ');
      } else {
        setWinnerMessage('Match nul');
      }
      setGameOver(true); // Arrêter le jeu
    }
  };

  // Fonction pour recommencer le jeu
  const restartGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRounds(0);
    setWinnerMessage('');
    setGameOver(false);
  };

  // Fonction pour obtenir l'émoji correspondant au suit
  const getSuitEmoji = (suit: "hearts" | "diamonds" | "clubs" | "spades"): string => {
    switch (suit) {
      case "hearts":
        return "❤️"; // Coeur
      case "diamonds":
        return "♦️"; // Carreau
      case "clubs":
        return "♣️"; // Trèfle
      case "spades":
        return "♠️"; // Pique
      default:
        return ""; // Retourne une chaîne vide si aucune correspondance
    }
  };
  return (
    <div className="game">
      {/* Pile de cartes du joueur */}
      <div className="card-stack player-stack">
        {playerHand.length > 0 ? (
          <div className="stack-card">🌹 Moi</div>
        ) : (
          <p>Aucune carte</p>
        )}
      </div>

      {/* Scores */}
      <div className="scores">
        <h3>Scores :</h3>
        <p>Moi: {playerScore}</p>
        <p>Ordi: {computerScore}</p>
      </div>

      {/* Pile de cartes de l'ordinateur */}
      <div className="card-stack computer-stack">
        {computerHand.length > 0 ? (
          <div className="stack-card">🚀 Ordi</div>
        ) : (
          <p>Aucune carte</p>
        )}
      </div>

      {/* Cartes jouées */}
      <div className="cards">
        {playerCard && computerCard && (
          <div className="round-cards">
            {/* Carte du joueur */}
            <div className="card player-card">
              <div className="corner top-left">{playerCard.value}</div>
              <div className="corner bottom-right">{playerCard.value}</div>
              <div className="center">{getSuitEmoji(playerCard.suit)}</div>
            </div>
            {/* Carte de l'ordinateur */}
            <div className="card computer-card">
              <div className="corner top-left">{computerCard.value}</div>
              <div className="corner bottom-right">{computerCard.value}</div>
              <div className="center">{getSuitEmoji(computerCard.suit)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Bouton pour jouer */}
      <button onClick={playRound} disabled={gameOver}>
        Lancer le tour
      </button>

      {/* Message de victoire */}
      {winnerMessage && <div className="winner-message">{winnerMessage}</div>}

      {/* Bouton pour recommencer */}
      {gameOver && (
        <button onClick={restartGame} className="restart-button">
          Recommencer
        </button>
      )}
    </div>
  );
};

export default Game;
