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
                {this.props.movieData.map((item, idx) => (
                    <Card key={idx}>
                        <Card.Body>
                        <Card.Title><h5>{item.name}</h5></Card.Title>
                        <Card.Img variant="top" src={item.image} alt={item.overview} style={{width: '50%'}}/>    
                            <Card.Text>{item.overview}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </>
        )
    }
}

export default Movie;