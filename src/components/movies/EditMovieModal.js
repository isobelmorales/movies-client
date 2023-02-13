import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { updateMovieFailure, updateMovieSuccess } from '../shared/AutoDismissAlert/messages'
import MovieForm from '../shared/MovieForm'

const EditMovieModal = (props) => {
    const { user, show, handleClose, updateMovie, msgAlert, triggerRefresh } = props

    const [movie, setMovie] = useState(props.movie)

    const onChange = (e) => {
        e.persist()

        setMovie(prevMovie => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            if (updatedName === 'watched' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'watched' && !e.target.checked) {
                updatedValue = false
            }

            const updatedMovie = {
                [updatedName]: updatedValue
            }

            console.log('the movie', updatedMovie)

            return {
                ...prevMovie, ...updatedMovie
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        updateMovie(user, movie)
            .then(() => handleClose())
            .then(() => { 
                msgAlert({
                    heading: 'Yay!',
                    message: updateMovieSuccess,
                    variant: 'success'
                })
             })
            .then(() => triggerRefresh())
            .catch(() => { 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateMovieFailure,
                    variant: 'danger'
                })
             })
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MovieForm 
                    movie={movie}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Movie"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMovieModal