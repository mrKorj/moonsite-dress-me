import {actionTypes} from "../actionTypes";

const initialAlertState = {
    message: '',
    type: '',
    title: '',
    isShow: false,
    dismiss: {duration: 7000, showIcon: true},
}

export const alertReducer = (state = initialAlertState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ALERT: {
            return {...state, ...action.payload}
        }
        case actionTypes.HIDE_ALERT: {
            return {...initialAlertState}
        }
        default:
            return state
    }
}
