import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION
}  from '../actions/types'
import { actionTypes } from 'redux-firestore';

const initialState = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
}

export default function (state = initialState, action) {
    switch(action.type){
        case DISABLE_BALANCE_ON_ADD:
        return {
            disableBalanceOnAdd: !state.disableBalanceOnAdd
        }
        case DISABLE_BALANCE_ON_EDIT:
        return {
            disableBalanceOnEdit: !state.disableBalanceOnEdit
        }
        case ALLOW_REGISTRATION:
        return {
            allowRegistration: !state.disableBalanceOnEdit
        }
        default: {return state}
    }
}