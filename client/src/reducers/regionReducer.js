import {
    REMOVE_REGION,
    // LIST_REGIONS,
    UPDATE_REGION,
    CREATE_REGION,
    GET_REGION,
    GET_REGION_DONATION
} from '../actions/types'

const initialState = {
    regionName: '',
    contractAddress: '',
    addr1: '',
    addr2: '',
    addr3: '',
    numberOfScbhools: 0,
    areaOfRegion: 0,    
    donationsForRegion: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REMOVE_REGION: 
            return {...state,}
        case UPDATE_REGION: 
            return {...state,}
        case CREATE_REGION: 
            return {...state, }
        case GET_REGION:{
            
            return { ...state, 
                regionName: action.payload.regionName,
                contractAddress: action.payload.contractAddress,
                addr1: action.payload.addressForMultiSig1,
                addr2: action.payload.addressForMultiSig2,
                addr3: action.payload.addressForMultiSig3,
            }
        }
        case GET_REGION_DONATION:
            {
                return {...state, donationsForRegion: action.payload.data }
            }
        default:
            return state
    }
}