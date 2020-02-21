import React from 'react'

import RandomDotsContainer from '../components_container/randomDotsContainer'
import RainContainer from '../components_container/rainContainer'
import { Link } from 'react-router-dom'


const AboutContainer = () => {

    return (
      <div className={"text-container"} >

        <p className={"basic-text"}>
          Thanks for stopping by.  This funny little game was built with React and has a Redux-managed state.  It evolved from an interest in studying how React and Redux could work together to make things move and appear at different times.  When I sat down to build something toward this end, I didn't have the game in mind.  I simply made a container where different squares would appear at random...
        </p>

        <RandomDotsContainer />

        <p className={"basic-text"} >
          Once that was done, I said to myself, "Cool, now what if I wanted some movement, like tiny cascading divs falling down."  So I built this...
        </p>

        <RainContainer />

        <p className={"basic-text"} >
          And once I realized that this looked like rain, a completely random thought popped into my head: "You know who hates rain? Our nutty tabby." She's a funny little character, completely obsessed with any tiny movement under a sheet or behind a door that could even remotely be a mouse. The prospect of getting a mouse is probably the only thing that could make her stand to be out in the rain. So I popped an awkward photo of her under the rain drops with the ability to move it around, and I couldn't stop laughing at how silly it looked.  The rest of the game ran from there, with me continuing to laugh and have a good time.  All of the photos you see are pictures of our tabby.
        </p>

        <p className={"basic-text"} >
          Hope you enjoyed the game! The code can be found on GitHub <a className={"external-link"} target="_blank" href="https://github.com/breadoliveoilsalt/getMouz">here</a>, and additional projects I've created can be found <a className={"external-link"} target="_blank" href="https://www.breadoliveoilsalt.com/projects/">here</a>.  Thanks again for stopping by.
        </p>

        <p className={"basic-text"} style={{textAlign: "center"}} >
          <Link className={"external-link"} exact to="/">Back to the Game</Link>
        </p>

        <p>
        </p>

      </div>
    )
}

export default AboutContainer
