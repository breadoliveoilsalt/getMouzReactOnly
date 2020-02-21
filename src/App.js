import React, { Component } from 'react'
import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components_presentational/header'
import NavBar from './components_container/navBar'
import GameWindowsContainer from './components_container/gameWindowsContainer'
import AboutContainer from './components_presentational/aboutContainer'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>

          <Header />
          <NavBar />

          <Switch>
            <Route path="/" exact component={GameWindowsContainer} />
            <Route path="/about" exact component={AboutContainer} />
          </Switch>

        </div>
      </BrowserRouter>
    )
  }
}

export default App;
