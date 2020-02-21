
///// PUBLIC FUNCTIONS /////


export function createDotFactory(){
  return new DotFactory()
}

export function addDotFactory(payload) {
  return (
    {type: 'ADD_DOT_FACTORY',
    payload: payload}
  )
}

export function addDot(payload) {
  return (
    {type: 'ADD_DOT',
     payload: payload}
   )
}

export function clearDotFactoryandDots(){
  return (
    {type: 'CLEAR_DOT_FACTORY_AND_DOTS'}
  )
}
///// PRIVATE FUNCTIONS /////

// Wrapper for Dots, to create and add id number and other attributes.
// There are probably different ways of doing this: perhaps use a component's
// state to start an ID counter, and then assign that state to the object's id
// as it is created? I'm running with this for now.

export class DotFactory {

  constructor() {
    this.idCounter = 0
  }

  createDot() {
    this.idCounter += 1

    let id = this.idCounter
    let color = this.selectColor()

    let size = this.selectSize()
    let sizeToString = `${size}em`

    let xCoordinate = this.selectCoordinate(size)
    let xCoordinateToString = `${xCoordinate}em`

    let yCoordinate = this.selectCoordinate(size)
    let yCoordinateToString = `${yCoordinate}em`

    return ({
        id: id,
        color: color,
        height: sizeToString,
        width: sizeToString,
        left: xCoordinateToString,
        bottom: yCoordinateToString
      })
  }

  selectColor() {
    let colors = ["pink", "brown", "green", "blue", "grey", "red"]
    let index = this.getRandom(0, 5)
    return colors[index]
  }

  selectSize() {
    return this.getRandom(1,3)
  }

  selectCoordinate(size) {
    switch (size) {
      case 1:
        return this.getRandom(0,29)
      case 2:
        return this.getRandom(0,28)
      case 3:
        return this.getRandom(0,27)
      default:
        return 0
    }
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
