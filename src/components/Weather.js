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
                        <p>{item.date}</p>
                        <p>{item.description}</p>
                    </div>
                ))}

            </>
        )
    }
}

export default Weather;