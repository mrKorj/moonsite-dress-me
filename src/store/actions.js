import {actionTypes} from "./actionTypes";
import axios from "axios";

axios.defaults.validateStatus = (status) => status >= 200

export const showAlert = (alertObj) => {
    return {
        type: actionTypes.SHOW_ALERT,
        payload: alertObj
    }
}

export const hideAlert = () => {
    return {type: actionTypes.HIDE_ALERT}
}

export const changeTheme = (theme) => {
    return {
        type: actionTypes.CHANGE_THEME,
        payload: theme
    }
}

export const getDataFromLocalStorage = (data) => {
    return {
        type: actionTypes.GET_DATA_FROM_LOCALSTORAGE,
        payload: data
    }
}

export const addItemToSelected = (item) => {
    return {
        type: actionTypes.ADD_ITEM_TO_SELECTED,
        payload: item
    }
}

export const getDataFromApi = (url) => {
    return async dispatch => {
        await fetchData({
            dispatch,
            actionType: actionTypes.GET_DATA_FROM_API,
            url
        })
    }
}

async function fetchData({dispatch, actionType, method = 'GET', url, data = null}) {
    dispatch({type: actionTypes.SHOW_LOADER})
    try {
        const res = await axios({method, url, data})
        dispatch({
            type: actionType,
            payload: res.data
        })
        dispatch({type: actionTypes.HIDE_LOADER})
    } catch (e) {
        dispatch({type: actionTypes.HIDE_LOADER})
        dispatch(showAlert({
            message: e.message,
            type: 'danger',
            title: 'Something went wrong',
            isShow: true
        }))
    }
}
