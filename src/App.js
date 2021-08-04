import React, { Component } from 'react';
import './App.css';
import JokeContainer from './JokeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokeContainer/>
      </div>
    )
  }
}

export default App;
