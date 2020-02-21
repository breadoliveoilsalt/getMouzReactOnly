function randomDotsReducer(state = {
  dotFactory: null,
  dots: []
  },
  action) {

  switch (action.type) {
    case 'ADD_DOT_FACTORY':
      return Object.assign({}, state, {dotFactory: action.payload} )
    case 'ADD_DOT':
      return Object.assign({}, state, {dots: [...state.dots, action.payload]})
    case 'CLEAR_DOT_FACTORY_AND_DOTS':
      return {dotFactory: null, dots: []}
    default:
      return state
  }
}

export default randomDotsReducer
