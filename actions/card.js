export const ADD_CARD = 'ADD_CARD'

export function addCard(deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card,
  }
}