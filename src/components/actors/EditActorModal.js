import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ActorForm from '../shared/ActorForm'
import { updateActor } from '../../api/actors'

const EditActorModal = (props) => {
    const { user, movie, show, handleClose, msgAlert, triggerRefresh } = props

    const [actor, setActor] = useState(props.actor)

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
        updateActor(user, movie.id, actor)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The actor is better than ever',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
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
                    heading="Update The Actor"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditActorModal