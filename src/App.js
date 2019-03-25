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
    let baseUrl = 'http://svc.metrotransit.org/NexTrip'
    let dir = directions[this.state.direction.toLowerCase()]
    axios({
      method: 'GET',
      url: `${baseUrl}/Routes`
    }).then(response => {
      let routeData = response.data.filter(dataPoint => (
        dataPoint.Description.includes(this.state.route)
      ))
      let route = routeData.length && routeData[0].Route
      console.log(route)
      route && axios({
        method: 'GET',
        url: `${baseUrl}/Stops/${route}/${dir}`
      }).then(response => {
        let stopData = response.data.filter(dataPoint => (
          dataPoint.Text.includes(this.state.stopName)
        ))
        let stop = stopData.length && stopData[0].Value
        console.log(stop)
        axios({
          method: 'GET',
          url: `${baseUrl}/${route}/${dir}/${stop}`
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log('ERROR:', error)
          alert('There was an error with this request.')
        })
      }).catch(error => {
        console.log('ERROR:', error)
        alert('There was an error with this request.')
      })
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
