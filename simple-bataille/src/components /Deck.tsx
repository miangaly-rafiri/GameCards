import { CardType } from '../types/CardType'; // Importer le type CardType

export const createDeck = (): CardType[] => {
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits: CardType['suit'][] = ['spades', 'hearts', 'diamonds', 'clubs']; // Définir les couleurs possibles pour suit
  const deck: CardType[] = [];

  // Créer le deck en combinant chaque valeur et chaque couleur
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Mélange les cartes
  }

  return deck;
};
