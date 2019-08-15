import {
    REMOVE_REGION,
    LIST_REGIONS,
    UPDATE_REGION,
    CREATE_REGION
} from '../actions/types'

const initialState = {
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REMOVE_REGION: 
            return {...state,}
        case LIST_REGIONS: 
            return {...state,}
        case UPDATE_REGION: 
            return {...state,}
        case CREATE_REGION: 
            return {...state,}
        default:
            return state
    }
}