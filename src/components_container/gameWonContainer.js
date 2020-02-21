import React from 'react'
import gameWonImage from '../images/game-won-image-v2.png'

const GameWonContainer = (props) => {
  return(

      <div className="game-screen" tabIndex="0">

          <a onClick={props.continueGame}>
            <img className="cat-menu-image" src={gameWonImage} />
          </a>
        </div>
    )

}

export default GameWonContainer
