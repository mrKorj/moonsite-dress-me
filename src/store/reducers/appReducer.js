import {actionTypes} from "../actionTypes";

const initialState = {
    isLoading: false,
    theme: 'dark',
    data: [],
    clothesList: [],
    completedSets: 0,
    selectedItems: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER: {
            return {...state, isLoading: true}
        }
        case actionTypes.HIDE_LOADER: {
            return {...state, isLoading: false}
        }
        case actionTypes.CHANGE_THEME: {
            return {...state, theme: action.payload}
        }
        case actionTypes.GET_DATA_FROM_LOCALSTORAGE: {
            return {...state, ...action.payload}
        }
        case actionTypes.GET_DATA_FROM_API: {
            const clothesList = [...new Set(action.payload.results.map(i => i.type))]
            return {...state, data: action.payload.results, clothesList}
        }

        case actionTypes.ADD_ITEM_TO_SELECTED: {
            let selectedItems = state.selectedItems
            if (state.selectedItems.length) {
                !state.selectedItems.find(i => i.type === action.payload.type)
                    ? selectedItems.push(action.payload)
                    : selectedItems = state.selectedItems.map(i => {
                        if (i.type === action.payload.type) return action.payload
                        return i
                    })
            } else {
                selectedItems.push(action.payload)
            }

            return {...state, selectedItems}
        }

        default:
            return state
    }
}
