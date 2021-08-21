import {actionTypes} from "../actionTypes";

const initialState = {
    isLoading: false,
    data: [],
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER: {
            return {...state, isLoading: true}
        }

        default:
            return state
    }
}
