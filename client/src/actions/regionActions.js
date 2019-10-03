import axios from 'axios'

import { 
  GET_ERRORS, 
  // REMOVE_REGION, 
  // LIST_REGIONS, 
  // UPDATE_REGION, 
  // CREATE_REGION, 
  GET_REGION, 
  GET_REGION_DONATION} from './types'

export const listRegions = () => dispatch => {
  return axios
    .get(`http://localhost:3001/api/contract-creations/region`)
    .then(res => res.data)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
export const getRegion = (regionName) => dispatch => {
  console.log('Getting information about a region', regionName)
  axios
    .get(`http://localhost:3001/api/contract-creations/region/${regionName}`)
    .then(response => {
      console.log(response)
      dispatch({
        type: GET_REGION,
        payload: response.data[0]
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    })
}
export const postRegion = (regionData) => dispatch => {
  axios
    .post(`http://localhost:3001/api/contract-creations/region`, regionData)
    .then()
    .catch()
}

export const getTotalDonationsForRegion = (regionName) => dispatch => {
  axios
    .post(`http://localhost:3001/api/blockchain-requests/contract/get-balance`, { regionName})
    .then(response => {
      console.log('XXX', response)
      dispatch({
        type: GET_REGION_DONATION,
        payload: response
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
/** These are for the regions-api... might not need this if we decide to make everything decentralized
  export const removeRegion = (regionId) => dispatch => {
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
*/