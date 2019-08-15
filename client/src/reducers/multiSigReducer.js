import {
    DEPOSIT_FUNDS_TO_MULTI_SIG,
    ADD_OWNER_TO_MULTI_SIG,
    REMOVE_OWNER_FROM_MULTI_SIG,
    REPLACE_OWNER_IN_MULTI_SIG,
    CHANGE_REQUIREMENT_FROM_MULTI_SIG,
    SUBMIT_TRANSACTION_FROM_MULTI_SIG,
    CONFIRM_TRANSACTION_FROM_MULTI_SIG,
    REVOKE_CONFIRMATION_FROM_MULTI_SIG,
    EXECUTE_TRANSACTION_FROM_MULTI_SIG,
    IS_CONFIRMED_FROM_MULTI_SIG
} from '../actions/types'

const initialState = {

}

export default function(state = initialState, action) {
    switch(action.type) {
        case DEPOSIT_FUNDS_TO_MULTI_SIG:
            return {
                ...state
            }
        case ADD_OWNER_TO_MULTI_SIG:
            return {
                ...state
            }
        case REMOVE_OWNER_FROM_MULTI_SIG:
            return {
                ...state
            }
        case REPLACE_OWNER_IN_MULTI_SIG:
            return {
                ...state
            }
        case CHANGE_REQUIREMENT_FROM_MULTI_SIG:
            return {
                ...state
            }
        case SUBMIT_TRANSACTION_FROM_MULTI_SIG:
            return {
                ...state
            }
        case CONFIRM_TRANSACTION_FROM_MULTI_SIG:
            return {
                ...state
            }
        case REVOKE_CONFIRMATION_FROM_MULTI_SIG:
            return {
                ...state
            }
        case EXECUTE_TRANSACTION_FROM_MULTI_SIG:
            return {
                ...state
            }
        case IS_CONFIRMED_FROM_MULTI_SIG:
            return {
                ...state
            }
        default:
            return state
    }
}