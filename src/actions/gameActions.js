
export function startGame() {
  return {
    type: 'START_GAME'
  }
}

export function resetGame() {
  return {
    type: 'RESET_GAME'
  }
}

export function restartGame() {
  return {
    type: 'RESTART_GAME'
  }
}

export function continueGame() {
  return {
    type: 'CONTINUE_GAME'
  }
}

export function updateCatPosition(coordinates) {
  return {
    type: 'UPDATE_CAT_POSITION',
    payload: coordinates
  }
}

export function setMousePosition(coordinates) {
  return {
    type: 'SET_MOUSE_POSITION',
    payload: coordinates
  }
}

export function setCatPosition(coordinates) {
  return {
    type: 'SET_CAT_POSITION',
    payload: coordinates
  }
}


export function setGameWon() {
  return {
    type: 'GAME_WON'
  }
}

export function setGameLost() {
  return {
    type: 'GAME_LOST'
  }
}

export function catchMouse() {
  return {
    type: 'CATCH_MOUSE'
  }
}

export function touchRain() {
  return {
    type: 'TOUCH_RAIN'
  }
}

export function increaseScore(num) {
  return {
    type: 'INCREASE_SCORE',
    payload: num
  }
}

export function populateScores(scores) {
  return {
    type: 'POPULATE_SCORES',
    payload: scores
  }
}

export function getTopScores() {
  return function(dispatch) {
    fetch('/api/scores')
      .then(response => response.json())
      .then(scores => {
        let tempScores = scores.map( score => score.points)
        dispatch(populateScores(tempScores))
      })
  }
}

export function updateTopScores() {
  return function(dispatch, getState) {

    let currentScore = getState().game.score
    let currentTopScores = getState().game.topScores

      // This is to short circuit the thunk if multiple rain drops touch and this
      // is called multiple times
    if (currentTopScores.includes(currentScore)) {
      return
    }

    if (currentTopScores[4] === undefined || currentScore > currentTopScores[4]) {
      let tempScores = [...currentTopScores, currentScore]
      tempScores.sort(function(a,b) {
        return b - a})
      tempScores.splice(5)
      dispatch(populateScores(tempScores))

      fetch('/api/scores', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({points: currentScore})
      })
      .then(res => {
        if (res.errors) {
          throw res.errors
        }})
      .then(console.log("at least we tried fetching"))
      .catch(err => {
        console.log("Sorry, the following error occured: ", err)
      })
    }
  }
}
