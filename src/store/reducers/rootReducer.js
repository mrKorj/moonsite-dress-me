import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./appReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {alertReducer} from "./alertReducer";

export const rootReducer = combineReducers({
    appState: appReducer,
    alertState: alertReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
