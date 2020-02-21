import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { resetGame } from '../actions/gameActions'
import { clearRainDropFactoryAndRainDrops } from '../actions/rainActions'

import playImage from '../images/playImage.png'
import aboutImage from '../images/aboutImage.png'

class NavBar extends Component {

    generalRestart = (e) => {
      this.props.resetGame()
      this.props.clearRainDropFactoryAndRainDrops()
    }



  render() {
    return(
      <div className={"navBar"}>
        <Link className={"navlink"} exact to="/" onClick={this.generalRestart}> <img src={playImage} /> </Link>
        <Link className={"navlink"} exact to="/about"> <img src={aboutImage} /> </Link>
      </div>

      )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    resetGame: () => dispatch(resetGame()),
    clearRainDropFactoryAndRainDrops: () => dispatch(clearRainDropFactoryAndRainDrops())
   }
}


export default connect(null, mapDispatchToProps)(NavBar)
