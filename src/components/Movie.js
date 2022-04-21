import React from 'react';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
            <h2>Movies connected to the city you searched</h2>
                {this.props.movieData.map((item, idx) => (
                    <div key={idx}>
                        <ul>{item.name}</ul>
                    </div>
                ))}
            </>
        )
    }
}

export default Movie;