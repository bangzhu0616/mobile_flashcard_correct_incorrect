import { RECEIVE_DECKS, ADD_DECK } from '../actions/deck';
import { ADD_CARD } from '../actions/card';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card),
        },
      };
    default:
      return state;
  }
}

export default decks;
