import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateCatPosition, setMousePosition, setCatPosition, setGameWon, catchMouse, touchRain, increaseScore } from '../actions/gameActions'
import { createRainFactory, addRainDropFactory, addRainDrop, updateRainDrop, clearRainDrop, clearRainDropFactoryAndRainDrops } from '../actions/rainActions'
import RainDrop from './rainDropComponent'
import MouseComponent from '../components_presentational/mouseComponent'
import CatComponent from '../components_presentational/catComponent'

class GameStartedContainer extends Component {

  componentDidMount() {
      // need 'ref' in container div below so focus is on div when component loads and keys will trigger movement
    this._gameContainer.focus()

    this.rainTimer = null

    Promise.resolve(this.props.clearRainDropFactoryAndRainDrops())
      .then(createRainFactory)
      .then((factory) => {
        this.props.addRainDropFactory(factory)
      })
      .then(this.rainTimer = setInterval(() => this.renderRainDrops(), 350))
      .then(setTimeout(() => this.generateMouse(), 2000))
      .then(setTimeout(() => this.generateCat(), 3000))
  }

  componentWillUnmount() {
    clearInterval(this.rainTimer);
    this.props.clearRainDropFactoryAndRainDrops()
  }

  renderRainDrops() {
      let drop = this.props.rainDropFactory.createRainDrop()
      this.props.addRainDrop(drop)
      this.props.increaseScore(3)
  }

  generateMouse() {
    let mouseBottom = Math.floor(Math.random() * (27 - 26 + 1) + 26)
    let mouseLeft = Math.floor(Math.random() * (27) + 1)
    this.props.setMousePosition({left: mouseLeft, bottom: mouseBottom})
  }

  generateCat() {
    let catLeft = Math.floor(Math.random() * (27) + 1)
    this.props.setCatPosition({left: catLeft, bottom: 1})
  }

  moveCat = (e) => {
    e.preventDefault()

    if (this.props.catPosition) {
      // moving up:
      if (e.keyCode === 38 && this.props.catPosition.bottom < 27) {
        this.props.updateCatPosition({
          left: this.props.catPosition.left,
          bottom: this.props.catPosition.bottom + 1
        })
      }
      // moving down:
      if (e.keyCode === 40 && this.props.catPosition.bottom > 0) {
        this.props.updateCatPosition({
          left: this.props.catPosition.left,
          bottom: this.props.catPosition.bottom - 1
        })
      }
      // moving left:
      if (e.keyCode === 37 && this.props.catPosition.left > 0) {
        this.props.updateCatPosition({
          left: this.props.catPosition.left - 1,
          bottom: this.props.catPosition.bottom
        })
      }
      // moving right:
      if (e.keyCode === 39 && this.props.catPosition.left < 27) {
        this.props.updateCatPosition({
          left: this.props.catPosition.left + 1,
          bottom: this.props.catPosition.bottom
        })
      }

      this.props.increaseScore(10)

      if (this.props.mousePosition && !this.props.touchedRain && !this.props.mouseCaught) {
        if (this.checkIfGameWon()) {
          this.props.catchMouse()
          this.props.increaseScore(1000)
          setTimeout(this.props.setGameWon, 1500)
        }
      }
    }
  }

  checkIfGameWon() {
    let xOverlap = this.thereIsOverlap(this.props.catPosition.left + 1, 1, this.props.mousePosition.left, 3)
    let yOverlap = this.thereIsOverlap(this.props.catPosition.bottom, 2, this.props.mousePosition.bottom, 3)

    return xOverlap && yOverlap
  }

  thereIsOverlap(start1, length1, start2, length2) {
    let highestStartPoint = Math.max(start1, start2)
    let lowestEndPoint = Math.min(start1 + length1, start2 + length2)

    if (highestStartPoint <= lowestEndPoint) {
      return true
    } else {
      return false
    }
  }

  render() {

    const dropsToRender = []

    for (let segmentKey in this.props.rainDrops) {
        let segments = this.props.rainDrops[segmentKey]
        dropsToRender.push(
          <RainDrop
            idNumber={segmentKey}
            segments={segments}
            updateRainDrop={this.props.updateRainDrop}
            clearRainDrop={this.props.clearRainDrop}
            increaseScore={this.props.increaseScore}
            catPosition={this.props.catPosition}
            thereIsOverlap={this.thereIsOverlap}
            />
        )
    }

    return (
      <div ref={d => (this._gameContainer = d)} className="game-screen" onKeyDown={this.moveCat} tabIndex="0">
        { dropsToRender }
        < MouseComponent mousePosition={this.props.mousePosition} mouseCaught={this.props.mouseCaught} />
        < CatComponent catPosition={this.props.catPosition}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    catPosition: state.game.catPosition,
    mousePosition: state.game.mousePosition,
    rainDropFactory: state.rain.rainDropFactory,
    rainDrops: state.rain.rainDrops,
    mouseCaught: state.game.mouseCaught,
    touchedRain: state.game.touchedRain,
    gameWon: state.game.gameWon,
    gameLost: state.game.gameLost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCatPosition: (coordinates) => dispatch(updateCatPosition(coordinates)),
    setMousePosition: (coordinates) => dispatch(setMousePosition(coordinates)),
    setCatPosition: (coordinates) => dispatch(setCatPosition(coordinates)),
    setGameWon: () => dispatch(setGameWon()),
    catchMouse: () => dispatch(catchMouse()),
    touchRain: () => dispatch(touchRain()),
    increaseScore: (num) => dispatch(increaseScore(num)),
    addRainDropFactory: (rainDropFactory) => dispatch(addRainDropFactory(rainDropFactory)),
    addRainDrop: (drop) => dispatch(addRainDrop(drop)),
    updateRainDrop: (drop) => dispatch(updateRainDrop(drop)),
    clearRainDrop: (id) => dispatch(clearRainDrop(id)),
    clearRainDropFactoryAndRainDrops: () => dispatch(clearRainDropFactoryAndRainDrops())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStartedContainer)
