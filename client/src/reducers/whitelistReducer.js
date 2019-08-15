import {
    ADD_WHITELISTED,
    ADD_WHITELIST_ADMIN,
    RENOUNCE_WHITELISTED,
    RENOUNCE_WHITELIST_ADMIN,
    REMOVE_WHITELISTED
} from '../actions/types'

const initialState = {

}
// Figure out what else needs to be passed back for each case
export default function(state = initialState, action) {
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
        default:
            return state
    }
}