function rainReducer(state = {
  rainDropFactory: null,
  rainDrops: {}
  },
  action) {
    switch(action.type) {
      case 'ADD_RAIN_DROP_FACTORY':
        return Object.assign({}, state, {rainDropFactory: action.payload})
      case 'ADD_RAIN_DROP':
        return Object.assign({}, state, {rainDrops: {...state.rainDrops, ...action.payload} })
      case 'UPDATE_RAIN_DROP':
        return Object.assign({}, state, {rainDrops: {...state.rainDrops, ...action.payload} })
      case 'CLEAR_RAIN_DROP':
        let stateCopy = Object.assign({}, state)
        delete stateCopy.rainDrops[action.payload]
        return stateCopy
      case 'CLEAR_RAIN_DROP_FACTORY_AND_RAIN_DROPS':
        return {rainDropFactory: null, rainDrops: []}
      default:
        return state
      }
}

export default rainReducer
