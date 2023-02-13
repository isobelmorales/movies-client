import { Card, Button } from 'react-bootstrap'
import { deleteActor } from '../../api/actors'
import { useState } from 'react'
import EditActorModal from './EditActorModal'


const ShowActor = (props) => {
    const { actor, user, movie, msgAlert, triggerRefresh } = props

    const [editModalShow, setEditModalShow] = useState(false)


    const setBgCondition = (list) => {
        if (list === 'A') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (list === 'B') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    const removeActor = () => {
        deleteActor(user, movie.id, actor._id)
            .then(() => {
                msgAlert({
                    heading: 'Actor Deleted',
                    message: 'Bye bye actor!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh)
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(actor.list)}>
                <Card.Header>{actor.name}</Card.Header>
                <Card.Body>
                    <small>{actor.age}</small><br/>
                    <small>
                        {actor.isGoodAtActing ? 'feels like real life' : 'obviously just acting'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>{actor.list} List Actor</small><br />
                    {
                        user && movie.owner && user._id === movie.owner._id 
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Actor
                            </Button>
                            <Button
                                onClick={() => removeActor()}
                                variant="danger"
                                className="m-2"
                            >
                                Delete Actor
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditActorModal
                user={user}
                movie={movie}
                actor={actor}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowActor