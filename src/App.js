import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './components/Weather.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMsg: '',
      lon: '',
      lat: '',
      mapState: '',
      showWeather: false,
      weatherData: ''

    }
  }

  //Submit handler. Submits the request for latitude, longitude, and city name.
  handleExploreSubmit = async (event) => {
    event.preventDefault();
    try {
      let mapUrl;
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(url);
      this.setState({
        cityData: cityData.data[0],
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat
      }, () => {
        mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=14`;
        this.setState({
          mapState: mapUrl
        }, () => {
          let weatherUrl = `${process.env.REACT_APP_SERVER}/weather&city=${this.state.city}&lat=${this.state.lat}&lon=${this.state.lon}`;
          let weatherData = axios.get(weatherUrl);
          console.log(weatherUrl);
          this.setState({
            weatherData: weatherData.data
          })
        })
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `Whoa, an error. You got an error ${error.response.status}`
      })
    }
    console.log('Request sent to server');
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
          width: '24rem',
          height: '30rem',
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
            <Card.Img variant='top' src={this.state.mapState} alt='Map' style={{ width: '100%' }} />
            <Card.Title>{this.state.city}</Card.Title>
            <Card.Text>Latitude: {this.state.lat}</Card.Text>
            <Card.Text>Longitude: {this.state.lon}</Card.Text>
          </Card.Body>
        </Card>

        {
          this.state.error ? <p style={{ textAlign: 'center' }}>{this.state.errorMsg}</p> : <p style={{ textAlign: 'center' }}>All is well.</p>
        }

        {//Form to collect city data and submit request
        }
        <form onSubmit={this.handleExploreSubmit}>
          <label>
            Enter a city name:
            <input type='text' onInput={this.handleExploreInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>

        <Weather weatherData={this.state.weatherData}/>
      </>

    );
  }
}

export default App;
