import {
    REMOVE_REGION,
    // LIST_REGIONS,
    UPDATE_REGION,
    CREATE_REGION,
    GET_REGION
} from '../actions/types'

const initialState = {
    regionName: '',
    contractAddress: '',
    addr1: '',
    addr2: '',
    addr3: '',
    numberOfScbhools: 0,
    areaOfRegion: 0,    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REMOVE_REGION: 
            return {...state,}
        case UPDATE_REGION: 
            return {...state,}
        case CREATE_REGION: 
            return {...state, }
        case GET_REGION:
            return action.payload
        default:
            return state
    }
}