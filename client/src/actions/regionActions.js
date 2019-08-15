import axios from 'axios'

import { GET_ERRORS, REMOVE_REGION, LIST_REGIONS, UPDATE_REGION, CREATE_REGION } from './types'

export const removeRegion = (regionIdew) => dispatch => {
    axios
        .delete(`http://localhost:3003/api/regions/${regionId}`)
        // Figure out what to be done after the a region is deleted
        .then()
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
}

export const listRegions = () => dispatch => {
    axios
        .get(`http://localhost:3003/api/regions`)
        .then()
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
}

export const updateRegion = (regionId) => dispatch => {
    axios
        .patch(`http://localhost:3003/api/regions/${regionId}`)
        .then()
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
}

export const createRegion = (regionData) => dispatch => {
    axios
        .post(`http://localhost:3003/api/regions`, regionData)
        .then()
        .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          )
}