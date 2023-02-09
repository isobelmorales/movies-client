import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneMovie, removeMovie } from '../../api/movies'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

const ShowMovie = (props) => {
    const [movie, setMovie] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate

    const { user, msgAlert } = props
    console.log('user in ShowMovie props', user)
    console.log('msgAlert in ShowMovie props', msgAlert)

    useEffect(() => {
        getOneMovie(id)
            .then(res => setMovie(res.data.movie))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting movies',
                    message: messages.getMoviesFailure,
                    variant: 'danger'
                })
            })
    }, [])

    const deleteMovie = () => { 
        removeMovie(user, movie.id)
            .then(() => { 
                msgAlert({
                    heading: 'Success',
                    message: messages.removeMovieSuccess,
                    variant: 'success'
                })
             })
            .then(() => { navigate('/') })
            .catch(err => { 
                msgAlert({
                    heading: 'Error',
                    message: messages.removeMovieFailure,
                    variant: 'danger'
                })
             })
     }

    if(!movie) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ movie.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Rated: { movie.rating }</small></div>
                            <div><small>{ movie.genre }</small></div>
                            <div><small>Length: { movie.length } mins</small></div>
                            <div><small>Watched? { movie.watched ? 'yes' : 'no' }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            movie.owner && user && movie.owner.id === user.id
                            ?
                            <>
                                <Button className="m-2" variant="danger" onClick={() => deleteMovie()}>
                                    Delete {movie.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowMovie
