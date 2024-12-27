import React from 'react';

type CardProps = {
  value: string;
  suit: string;
  isFaceUp: boolean;
};

const Card: React.FC<CardProps> = ({ value, suit, isFaceUp }) => {
  const suitSymbols: { [key: string]: string } = {
    spades: '♠',  
    hearts: '♥', 
    diamonds: '♦', 
    clubs: '♣',  
  };

  const cardValue = value;
  const cardSuit = suitSymbols[suit];

  return (
    <div className={`card ${isFaceUp ? 'face-up' : 'face-down'}`}>
      {isFaceUp ? (
        <div className="card-content">
          {/* Coin haut gauche */}
          <div className="corner top-left">{cardValue}</div>

          {/* L'enseigne au centre */}
          <div className="center">{cardSuit}</div>

          {/* Coin bas droit */}
          <div className="corner bottom-right">{cardValue}</div>
        </div>
      ) : (
        <div className="card-back">🌹</div> // Dos de la carte
      )}
    </div>
  );
};

export default Card;
