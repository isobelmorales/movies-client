import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMovie } from '../../api/movies'
import { createMovieFailure, createMovieSuccess } from '../shared/AutoDismissAlert/messages'
import MovieForm from '../shared/MovieForm'


const CreateMovie = (props) => {
    const { user, msgAlert } = props
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [movie, setMovie] = useState({
        name: '',
        releaseDate: '',
        rating: '',
        genre: '',
        length: '',
        watched: false
    })
    
    const onChange = (e) => {
        e.persist()

        setMovie(prevMovie => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

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

        createMovie(user, movie)
            .then(res => { navigate(`/movies/${res.data.movie.id}`)})
            .then(() => { 
                msgAlert({
                    heading: 'Yay!',
                    message: createMovieSuccess,
                    variant: 'success'
                })
             })
            .catch(() => { 
                msgAlert({
                    heading: 'Oh No!',
                    message: createMovieFailure,
                    variant: 'danger'
                })
             })
    }

    return (
        <MovieForm
            movie={movie}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new movie!"
        />
    )
}

export default CreateMovie