import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    route: '',
    stopName: '',
    direction: '',
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header>
          <h2>Next Bus</h2>
        </header>

        <form onSubmit={this.handleSubmit}>
          <label>Route: {' '}
            <input name="route" type="text"
              onChange={this.handleChange}
              value={this.state.route}
            />
          </label>
          <br />
          <label>Stop: {' '}
            <input name="stopName" type="text"
              onChange={this.handleChange}
              value={this.state.stopName}
            />
          </label>
          <br />
          <label>Direction: {' '}
            <input name="direction" type="number"
              onChange={this.handleChange}
              value={this.state.direction}
            />
          </label>
          <br />
          <input type="submit" value="Get Departure Time" />
        </form>
      </div>
    );
  }
}

export default App;
