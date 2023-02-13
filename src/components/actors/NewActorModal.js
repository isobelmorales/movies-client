import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { createActor } from '../../api/actors'
import { createActorFailure, createActorSuccess } from '../shared/AutoDismissAlert/messages'
import ActorForm from '../shared/ActorForm'


const NewActorModal = (props) => {
    const { movie, show, handleClose, msgAlert, triggerRefresh } = props

    const [actor, setActor] = useState({})

    const onChange = (e) => {
        e.persist()

        setActor(prevActor => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'isGoodAtActing' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isGoodAtActing' && !e.target.checked) {
                updatedValue = false
            }

            const updatedActor = {
                [updatedName] : updatedValue
            }

            console.log('the actor', updatedActor)
            console.log('the actor (state)', actor)

            return {
                ...prevActor, ...updatedActor
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createActor(movie.id, actor)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: createActorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createActorFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ActorForm
                    actor={actor}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${movie.name} an actor!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewActorModal