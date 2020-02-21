import { combineReducers } from 'redux'
import randomDotsReducer from './randomDotsReducer'
import rainReducer from './rainReducer'
import gameReducer from './gameReducer'

const rootReducer = combineReducers(
  {
    randomDots: randomDotsReducer,
    rain: rainReducer,
    game: gameReducer
  }
)

export default rootReducer
