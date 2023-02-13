import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllMovies = () => {
    return axios(`${apiUrl}/movies`)
}

// READ -> Show
export const getOneMovie = (id) => {
    return axios(`${apiUrl}/movies/${id}`)
}

// Create (create a movie)
export const createMovie = (user, newMovie) => {
    console.log('this is the user', user)
    console.log('this is the new movie', newMovie)
    return axios({
        url: `${apiUrl}/movies`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { movie: newMovie }
    })
}

// Update (update a movie)
export const updateMovie = (user, updatedMovie) => {
    return axios({
        url: `${apiUrl}/movies/${updatedMovie.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { movie: updatedMovie }
    })
}


// Delete (delete a movie)
export const removeMovie = (user, movieId) => {
    return axios({
        url: `${apiUrl}/movies/${movieId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}