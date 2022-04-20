import React from 'react';

class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render() {
        return(
            <>
            <p>{this.props.weatherData}</p>
            
            </>
        )
    }
}

export default Weather;