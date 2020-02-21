import React from 'react'
import catImageSmall from '../images/cat-small.png'

const CatComponent = (props) => {

  let cat = null

  if (props.catPosition) {
    const catPositionStyle = {
      display: `inline-block`,
      position: `absolute`,
      bottom: `${props.catPosition.bottom}em`,
      left: `${props.catPosition.left}em`,
      hight: `3em`,
      width: `3em`
    }

    cat = <img id={"cat-game-image"} src={catImageSmall} style={catPositionStyle}/>
  }

  return(

    <div>
      { cat }
    </div>

    )

}

export default CatComponent
