import { CardType } from '../types/CardType';

/**
 * @param customValues 
 * @param customSuits 
 * @returns 
 */
export const createDeck = (
  customValues?: string[],
  customSuits?: CardType['suit'][]
): CardType[] => {
  const values = customValues ?? ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const suits = customSuits ?? ['spades', 'hearts', 'diamonds', 'clubs'];

  const deck: CardType[] = [];

  // Création du deck
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }

  // Mélange Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};
