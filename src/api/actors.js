import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /actors/:movieId
export const createActor = (movieId, newActor) => {
    return axios({
        url: `${apiUrl}/actors/${movieId}`,
        method: 'POST',
        data: { actor: newActor }
    })
}

// UPDATE
// /actors/:movieId/:actorId
export const updateActor = (user, movieId, updatedActor) => {
    return axios({
        url: `${apiUrl}/actors/${movieId}/${updatedActor._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { actor: updatedActor }
    })
}

// DELETE
// /actors/:movieId/:actorId
export const deleteActor = (user, movieId, actorId) => {
    // console.log('this the actorId', actorId)
    return axios({
        url: `${apiUrl}/actors/${movieId}/${actorId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}