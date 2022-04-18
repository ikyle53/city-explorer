import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMsg: '',
      lon: '',
      lat: ''
    }
  }

  //Submit handler. Submits the request for latitude, longitude, and city name.
  handleExploreSubmit = async (event) => {
    event.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
    let cityData = await axios.get(url);
    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0],
      lon: cityData.data[0].lon,
      lat: cityData.data[0].lat
    })
    console.log(this.state)
  }

  //Input handler. Gives us the data from the input.
  handleExploreInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  render() {
    return (
      <>
        {//Card that is rendered to the UI showing the city, lat, and long
        }
        <Card style={{
          width: '17rem',
          height: '17rem',
          borderRadius: '50%',
          textAlign: 'center',
          backgroundColor: 'orange',
          margin: '30px auto',
        }}>
          <Card.Body style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Card.Title>{this.state.city}</Card.Title>
            <Card.Text>Latitude: {this.state.lat}</Card.Text>
            <Card.Text>Longitude: {this.state.lon}</Card.Text>
          </Card.Body>
        </Card>
        {//Form to collect city data and submit request
        }
        <form onSubmit={this.handleExploreSubmit}>
          <label>
            Enter a city name:
            <input type='text' onInput={this.handleExploreInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>
      </>
    );
  }
}

export default App;
