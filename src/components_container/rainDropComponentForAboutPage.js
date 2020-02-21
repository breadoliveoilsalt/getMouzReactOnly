import React, { Component } from 'react'

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
    } else {
      let rainDropToUpdate = {}
      rainDropToUpdate[this.props.idNumber] = segmentsToUpdate
      this.props.updateRainDrop(rainDropToUpdate)
    }
  }


  // This affects how far each segment moves each time it is updated by the parent component
  getRandomTiming() {
    return Math.floor(Math.random() * (1500 - 250 + 1) + 250)
  }

  render() {

    // If I make a separate Segment component, each segment will have to be wrapped in a div pair.
    // That's a lot of divs! Too many.  So left things this way without a Segment component
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

export default RainDrop
