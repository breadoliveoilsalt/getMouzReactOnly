///// PUBLIC FUNCTIONS /////

export function createRainFactory(){
  return new RainDropFactory()
}

export function addRainDropFactory(payload) {
  return (
    {type: 'ADD_RAIN_DROP_FACTORY',
    payload: payload}
  )
}

export function addRainDrop(payload) {
  return (
    {type: 'ADD_RAIN_DROP',
     payload: payload}
   )
}

export function updateRainDrop(payload) {
  return (
    {type: 'UPDATE_RAIN_DROP',
     payload: payload}
  )
}

export function clearRainDrop(payload) {
    // payload is just an id number
  return (
    {type: 'CLEAR_RAIN_DROP',
      payload: payload}
  )
}

export function clearRainDropFactoryAndRainDrops(){
  return (
    {type: 'CLEAR_RAIN_DROP_FACTORY_AND_RAIN_DROPS'}
  )
}



///// PRIVATE FUNCTIONS /////


class RainDropFactory {

  constructor(){
    this.idCounter = 0
  }

  createRainDrop() {

    // This function returns an object where id number is the key and value is an array with segments.
    // This should make lookup and iteration easier.

    this.idCounter++

    let startingXCoordinate = this.getRandom(0,29)

    let startingYCoordinate = 29

    let currentId = this.idCounter

    let returnObject = {}
    returnObject[currentId] = this.createSegments(startingXCoordinate, startingYCoordinate)

    return returnObject

      // Note re the last few lines above, this would not work:
      // { currentId: this.createSegments(startingXCoordinate, startingYCoordinate)}

  }


  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  createSegments(startingXCoordinate, startingYCoordinate) {

    let xCoordinate = startingXCoordinate
    let yCoordinate = startingYCoordinate

    let rainDropSegments = []

    for (let i = 0; i < 3; i++) {

        // Keeping all mutable segment info as integers rather than strings might make updating easier!
      let segment = {
        position: "absolute",
        backgroundColor: "white",
        height: "1em",
        width: ".2em",
        left: Math.round(xCoordinate * 100)/100, // to round to 2 decimal places
        bottom: yCoordinate
      }

      rainDropSegments.push(segment)

      xCoordinate += 0.1
      yCoordinate += 1

    }

    return rainDropSegments

  }
}
