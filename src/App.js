import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './components/Weather.js';
import Movie from './components/Movie.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMsg: '',
      lon: 0,
      lat: 0,
      mapState: '',
      showWeather: false,
      weatherData: [],
      movieData: []
    }
  }

  //Submit handler - request for latitude, longitude, and city name. **************************
  handleExploreSubmit = async (event) => {
    event.preventDefault();
    try {

      //Variables for map UI *******************************************************************
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(url);
      let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=15`
      
      //Set state of longitude and latitude ****************************************************
      let parsedLon = parseInt(cityData.data[0].lon);
      let parsedLat = parseInt(cityData.data[0].lat);

      this.setState({
        cityData: cityData.data[0],
        lon: parsedLon,
        lat: parsedLat
      })

      //Set state of the URL for request to location IQ *****************************************
      this.setState({
        mapState: mapUrl,
      })

      //End of try ******************************************************************************
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `Whoa, an error. You got an error ${error.response.status}`
      })
    }
    console.log('Request sent to server');
    this.handleWeather();
    this.handleMovie();
  }

  //Input handler. Gives us the data from the input. **********************************************
  handleExploreInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleWeather = async() => {
    //?city=${this.state.city}&lat=${this.state.lat}&lon=${this.state.lon}`;
      //Variables for requesting weather data from server
      let weatherEndpoint = `${process.env.REACT_APP_SERVER}/weather`
      let weatherRequest = await axios.get(weatherEndpoint, {params: {city: this.state.city, lat: this.state.lat, lon: this.state.lon}});
      //Set state of the weather request data object ********************************************
      this.setState({
        weatherData: weatherRequest.data,
        lon: weatherRequest.data.lon,
        lat: weatherRequest.data.lat
      })
  }

  handleMovie = async() => {
      //Movie ***********************************************************************************
      let movieEndpoint = `${process.env.REACT_APP_SERVER}/movie`;
      let movieRequest = await axios.get(movieEndpoint, {params: {city: this.state.city}});
      this.setState({
        movieData: movieRequest.data
      })
  }

  render() {
    return (
      <>
        {//Form to collect city data and submit request **************************************************
        }
        <form onSubmit={this.handleExploreSubmit}>
          <label>
            Enter a city name:
            <input type='text' onInput={this.handleExploreInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>

      <div id='holder'>
        {//Card that is rendered to the UI showing the city, lat, and long *************************
        }
        <Card style={{
          width: '25vw',
          height: '70vh',
          textAlign: 'center',
          backgroundColor: 'orange',
          margin: '30px auto',
          overflow: 'revert'
        }}>
          <Card.Title>
            <h2>City you're looking up</h2>
          </Card.Title>
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
          this.state.error ? <p style={{ textAlign: 'center' }}>{this.state.errorMsg}</p> : <p style={{ textAlign: 'center' }}>{this.state.errorMsg}</p>
        }
        {
          //Weather component ****************************************************************************
        }
        <Card style={{
          width: '24rem',
          height: '30rem',
          textAlign: 'center',
          margin: '30px auto',
          overflow: 'auto',
          backgroundColor: 'orange'
        }}>
        <Weather weatherData={this.state.weatherData} />
        </Card>

        {
          //Movie Component ******************************************************************************
        }
        <Card style={{
          width: '24rem',
          height: '30rem',
          textAlign: 'center',
          margin: '30px auto',
          overflow: 'auto',
          backgroundColor: 'orange'
        }}>
          <Card.Title>Movies with city in it</Card.Title>
        <Movie movieData={this.state.movieData} />
        </Card>
      </div>
      </>

    );
  }
}

export default App;
