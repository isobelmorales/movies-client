import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneMovie, removeMovie, updateMovie } from '../../api/movies'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditMovieModal from './EditMovieModal'
import ShowActor from '../actors/ShowActor'
import NewActorModal from '../actors/NewActorModal'

const actorCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowMovie = (props) => {
    const [movie, setMovie] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [actorModalShow, setActorModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

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
    }, [updated])

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

     let actorCards
     if (movie) {
        if (movie.actors.length > 0) {
            actorCards = movie.actors.map(actor => (
                <ShowActor
                    key={actor.id}
                    actor={actor}
                    user={user}
                    movie={movie}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
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
                            <div><small>Watched: { movie.watched ? 'yes' : 'no' }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className="m-2"
                            variant="info"
                            onClick={() => setActorModalShow(true)}
                        >
                            Add an actor in {movie.name}!
                        </Button>
                        {
                            movie.owner && user && movie.owner.id === user.id
                            ?
                            <>
                                <Button 
                                    className="m-2" 
                                    variant="warning" 
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {movie.name}
                                </Button>
                                <Button 
                                    className="m-2" 
                                    variant="danger" 
                                    onClick={() => deleteMovie()}
                                >
                                    Delete {movie.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={actorCardContainerLayout}>
                {actorCards}
            </Container>
            <EditMovieModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateMovie={updateMovie}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                movie={movie}
            />
            <NewActorModal
                movie={movie}
                show={actorModalShow}
                handleClose={() => setActorModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowMovie
