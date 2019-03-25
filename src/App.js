import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const directions = {
  north: '4',
  south: '1',
  east: '2',
  west: '3',
}

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
    let dir = directions[this.state.direction.toLowerCase()]
    axios({
      method: 'GET',
      url: `http://svc.metrotransit.org/NexTrip/${this.state.route}/${dir}/${this.state.stopName}`
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log('ERROR:', error)
      alert('There was an error with this request.')
    })
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
            <input name="direction" type="text"
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
