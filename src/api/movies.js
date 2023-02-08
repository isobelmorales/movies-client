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

// Update (update a movie)

// Delete (delete a movie)