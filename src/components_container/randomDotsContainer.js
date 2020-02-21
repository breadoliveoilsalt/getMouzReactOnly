import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../parentCSS.css'

import { addDotFactory, addDot, createDotFactory, clearDotFactoryandDots } from '../actions/randomDotsActions'

class RandomDotsContainer extends Component {

  componentDidMount(){

    let dotFactory = createDotFactory()
    this.props.addDotFactory(dotFactory)
    this.timer = setInterval(() => this.renderDot(), 750)

    // Version of a timer with a limit.  Note: need .bind for this to work. And need to return within the while loop.
    // this.timer = setInterval(
    //   function(){
    //     while (this.props.dots.length < 11) {
    //       return this.renderDot()}}.bind(this),
    //   1000
    // );

  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.props.clearDotFactoryandDots()
  }

  renderDot() {
    let dot = this.props.dotFactory.createDot()
    this.props.addDot(dot)
  }

  render() {

    const dotsDisplay = this.props.dots.map( (dot) => {

      const dotStyle = {
        position: "absolute",
        backgroundColor: dot.color,
        height: dot.height,
        width: dot.width,
        left: dot.left,
        bottom: dot.bottom
      }

      return  (<div id="{dot.id}" style={dotStyle}/>)
    })

    return(
      <div>
        <div className="non-game-screen">
          {dotsDisplay}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dotFactory: state.randomDots.dotFactory,
    dots: state.randomDots.dots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addDotFactory: (dotFactory) => dispatch(addDotFactory(dotFactory)),
      addDot: (dot) => dispatch(addDot(dot)),
      clearDotFactoryandDots: () => dispatch(clearDotFactoryandDots())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomDotsContainer)
