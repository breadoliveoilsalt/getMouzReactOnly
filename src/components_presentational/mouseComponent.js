import React from 'react'
import mouseImage from '../images/mouse.png'
import mouseCaughtImage from '../images/mouse-caught.png'

const MouseComponent = (props) => {

  let mouse = null

  if (props.mousePosition) {

    const mousePositionStyle = {
      display: `inline-block`,
      position: `absolute`,
      bottom: `${props.mousePosition.bottom}em`,
      left: `${props.mousePosition.left}em`,
      hight: `3em`,
      width: `3em`
    }

    mouse = <img id={"mouse-game-image"} src={props.mouseCaught ? mouseCaughtImage : mouseImage } style={mousePositionStyle}/>
  }

  return(

    <div>
      {mouse}
    </div>

    )

}

export default MouseComponent
