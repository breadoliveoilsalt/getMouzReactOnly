import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRainFactory, addRainDropFactory, addRainDrop, updateRainDrop, clearRainDrop, clearRainDropFactoryAndRainDrops } from '../actions/rainActions'

import RainDrop from './rainDropComponentForAboutPage'

class RainContainer extends Component {

  componentDidMount() {
    let rdFactory = createRainFactory()
    this.props.addRainDropFactory(rdFactory)
    this.timer = setInterval(() => this.renderOrClearRainDrops(), 750)
    // Was  helpful for testing a one off rainDrop: setTimeout(function() {this.renderRainDrop()}.bind(this), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.props.clearRainDropFactoryAndRainDrops()
  }

  renderOrClearRainDrops() {
    let drop = this.props.rainDropFactory.createRainDrop()
    this.props.addRainDrop(drop)
  }

  render() {

    const dropsToRender = []

    for (let segmentKey in this.props.rainDrops) {
        let segments = this.props.rainDrops[segmentKey]
        dropsToRender.push(<RainDrop idNumber={segmentKey} segments={segments} updateRainDrop={this.props.updateRainDrop} clearRainDrop={this.props.clearRainDrop}/>)
    }

    return (
      <div>
        <div className="non-game-screen">
          {dropsToRender}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rainDropFactory: state.rain.rainDropFactory,
    rainDrops: state.rain.rainDrops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addRainDropFactory: (rainDropFactory) => dispatch(addRainDropFactory(rainDropFactory)),
      addRainDrop: (drop) => dispatch(addRainDrop(drop)),
      updateRainDrop: (drop) => dispatch(updateRainDrop(drop)),
      clearRainDrop: (id) => dispatch(clearRainDrop(id)),
      clearRainDropFactoryAndRainDrops: () => dispatch(clearRainDropFactoryAndRainDrops())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RainContainer)
