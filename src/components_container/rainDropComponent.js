import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGameLost, touchRain, updateTopScores } from '../actions/gameActions'

class RainDrop extends Component {

  componentDidMount() {
    this.timer = setInterval(() => this.updateSegments(), this.getRandomTiming())
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  updateSegments() {
    let segmentsToUpdate = [...this.props.segments]
    segmentsToUpdate.forEach( (segment) => {
      segment.bottom -= 1
      segment.left -= 0.1
    })
    if (segmentsToUpdate[2].bottom < 0 || segmentsToUpdate[2].left < 0) {
      this.props.clearRainDrop(this.props.idNumber)
      this.props.increaseScore(15)
    } else {
      let rainDropToUpdate = {}
      rainDropToUpdate[this.props.idNumber] = segmentsToUpdate
      this.props.updateRainDrop(rainDropToUpdate)
      if (this.props.catPosition && !this.props.caughtMouse && !this.props.touchedRain) {
        this.checkIfGameLost()
      }
    }
  }

  checkIfGameLost() {
    this.props.segments.forEach( (segment) => {
      let xOverlapWithCat = this.props.thereIsOverlap(this.props.catPosition.left, 3, segment.left, .2)
      let yOverlapWithCat = this.props.thereIsOverlap(this.props.catPosition.bottom, 3, segment.bottom, 1)

      if (xOverlapWithCat && yOverlapWithCat) {
        segment.backgroundColor = "red" // Note: this probably changes the redux state directly
        clearInterval(this.timer) // -- This only stops the rain drop that caused the game to be lost.
          // It's intended to prevent going from winning screen to losing screen.
          // This is repetitous of code in updateSegments, but I think needed, b/c each segment is embued with ability to check of game lost and might already have that ability and be checking once the original touchedRain is indicated.
        if (!this.props.caughtMouse && !this.props.touchedRain) {
          Promise.resolve(this.props.touchRain())
          .then(setTimeout(this.props.setGameLost, 1500))
        }
      }

    })

  }
  // This affects how far each segment moves each time it is updated by the parent component
  getRandomTiming() {
    return Math.floor(Math.random() * (1500 - 250 + 1) + 250)
  }

  render() {

    // If I make a separate Segment component, each segment will have to be wrapped in a div pair.
    // That's a lot of divs! Too many.  So left things this way without a Segment component.
    const segments = this.props.segments.map( (segment) => {

      if (
        segment.left >= 0 && segment.left <= 29 &&
        segment.bottom >= 0 && segment.bottom <= 29) {

        const segmentStyle = {
            position: segment.position,
            backgroundColor: segment.backgroundColor,
            height: segment.height,
            width: segment.width,
            left: `${segment.left}em`,
            bottom: `${segment.bottom}em`
        }

        return (<div style={segmentStyle} />)
      }

    })

    return (
      <div>
        {segments}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.game.score,
    caughtMouse: state.game.caughtMouse,
    touchedRain: state.game.touchedRain
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameLost: () => dispatch(setGameLost()),
    touchRain: () => dispatch(touchRain()),
    updateTopScores: (points) => dispatch(updateTopScores(points))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RainDrop)
