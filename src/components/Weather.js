import React from 'react';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
            <h2>Weather 3day forecast</h2>
                {this.props.weatherData.map((item, idx) => (
                    <div key={idx}>
                        <h4>{item.time}</h4>
                        <h5>{item.forecast}</h5>
                    </div>
                ))}

            </>
        )
    }
}

export default Weather;