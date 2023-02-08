import { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom"
import { getAllMovies } from "../../api/movies"
import messages from "../shared/AutoDismissAlert/messages"
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const MoviesIndex = (props) => {
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
        getAllMovies()
            .then(res => setMovies(res.data.movies))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting movies',
                    message: messages.getMoviesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    if (!movies) {
        return <LoadingScreen />
    } else if (movies.length === 0) {
        return <p>No movies yet, go add some!</p>
    }

    const movieCards = movies.map(movie => (
        <Card key={ movie.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ movie.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/movies/${movie.id}`} className="btn btn-info">View { movie.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={ cardContainerStyle }>
            { movieCards }
        </div>
    )
}

export default MoviesIndex