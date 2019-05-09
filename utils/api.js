import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, setDummyData } from './_deck'

export function fetchDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((decks) => {
      if (decks === null) {
        return setDummyData()
      } else {
        return JSON.parse(decks)
      }
    })
}

export function submitDeck(title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
  .catch(() => {
    console.warn('Error on submitting deck.')
  })
}

export function submitCard(deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((data) => {
      const decks = JSON.parse(data)
      decks[deck] = {
        title: deck,
        questions: decks[deck].questions.concat(card)
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
}