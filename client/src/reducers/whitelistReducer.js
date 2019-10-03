import {
    ADD_WHITELISTED,
    ADD_WHITELIST_ADMIN,
    RENOUNCE_WHITELISTED,
    RENOUNCE_WHITELIST_ADMIN,
    REMOVE_WHITELISTED,
    GET_WHITELIST_FOR_COUNTRY
} from '../actions/types'

export const initialState = {
    whitelistForCountry: []

}
// Figure out what else needs to be passed back for each case
export default function(state = initialState, action) {
    console.log(action)
    switch(action.type) {
        case ADD_WHITELISTED: 
            return {
                ...state,   
            }
        case ADD_WHITELIST_ADMIN: 
            return {
                ...state,   
            }
        case RENOUNCE_WHITELISTED: 
            return {
                ...state,   
            }
        case RENOUNCE_WHITELIST_ADMIN: 
            return {
                ...state,   
            }
        case REMOVE_WHITELISTED: 
            return {
                ...state,   
            }
        case GET_WHITELIST_FOR_COUNTRY:
            return {
                ...state,
                whitelistForCountry: action.payload
            }
        default:
            return state
    }
}