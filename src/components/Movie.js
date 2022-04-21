import React from 'react';
import Card from 'react-bootstrap/Card';

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
                    <Card key={idx}>
                            <ul>{item.name}</ul>
                    </Card>
                ))}
            </>
        )
    }
}

export default Movie;