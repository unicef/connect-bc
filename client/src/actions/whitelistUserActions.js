import axios from 'axios'

import {
    GET_ERRORS,
    GET_WHITELIST_FOR_COUNTRY
} from './types'

export const listWhitelistUsers = (countryName) => dispatch => {
    return axios
        .get(`http://localhost:3002/api/whitelist-users/all/${countryName}`)
        .then(res => { 
            console.log(res)
            dispatch({
                type: GET_WHITELIST_FOR_COUNTRY,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const addWhitelistUser = (whitelistUserData) => dispatch => {
    // Need to add the user to the database
    // Then we need to update the smart contract to add that person
    // to the whitelist as well 
    console.log('Adding whitelist user to ', whitelistUserData)
    return axios
    .post(`http://localhost:3002/api/whitelist-users/`, whitelistUserData)
    .then(res => { 
        console.log(res)
        // Need to add the user here
        return axios
            .post(`http://localhost:3001/api/blockchain-requests/whitelist/add`, {
                regionName: whitelistUserData.country,
                addressToAddToWhitelist: whitelistUserData.wallet
            })
            .then(res => { 
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}


export const updateWhitelistUser = () => dispatch => {
    // Should not be required at this time
}

export const deleteWhitelistUser = (blockchainAddress) => dispatch => {
    // Need to remove the user on the smart contract first
    // Once that is complete, then we need to update the database to 
    // reflect that this user is not on the whitelist
    return axios
        .delete(`http://localhost:3002/api/whitelist-users/${blockchainAddress}`)
        .then(res => { 
            console.log(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}