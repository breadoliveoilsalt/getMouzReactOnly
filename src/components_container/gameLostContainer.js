import React, { Component } from 'react'
import gameLostImage from '../images/game-lost-image.png'

class GameLostContainer extends Component {

  componentDidMount() {
    this.props.updateTopScores()
  }

  render() {

    return(

         <div className="game-screen" tabIndex="0">

             <a onClick={this.props.restartGame}>
               <img className="cat-menu-image" src={gameLostImage} />
             </a>
           </div>

       )

  }
}

export default GameLostContainer
