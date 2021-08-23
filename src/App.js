import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getDataFromApi, getDataFromLocalStorage, hideAlert} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {HomePage} from "./components/homePage/HomePage";
import {ClothesPage} from "./components/clothesPage/ClothesPage";
import {NavBarComponent} from "./components/navBar/NavBarComponent";
import ReactNotification, {store} from 'react-notifications-component';
import {Loader} from "./components/loader/Loader";
import {FooterComponent} from "./components/footer/FooterComponent";
import 'react-notifications-component/dist/theme.css';
import './App.css';
import {apiUrl} from "./localVariables/urls";
import {CompletePage} from "./components/completePage/CompletePage";

export const App = () => {
    const {isLoading, theme, completedSets, timerRunning} = useSelector(state => state.appState)
    const alertState = useSelector(state => state.alertState)
    const dispatch = useDispatch()
    const [timer, setTimer] = useState(0)
    const timerId = useRef(null)

    useEffect(() => {
        dispatch(getDataFromLocalStorage(JSON.parse(localStorage.getItem('moonsite-shop')) || {}))
        dispatch(getDataFromApi(apiUrl))
    }, [dispatch])

    useEffect(() => {
        if (timerId.current && !timerRunning) {
            clearInterval(timerId.current)
        }

        if (timerRunning) {
            setTimer(0)
            timerId.current = setInterval(() => {
                setTimer(prevState => ++prevState)
            }, 1000)
        }
    }, [timerRunning])


    useEffect(() => {
        localStorage.setItem('moonsite-shop', JSON.stringify({completedSets, theme}));
    }, [completedSets, theme])

    useEffect(() => {
        if (alertState.isShow) {
            store.addNotification({
                title: alertState.title,
                message: alertState.message,
                type: alertState.type,
                insert: "top",
                container: "bottom-left",
                dismiss: alertState.dismiss,
                width: 400,
                onRemoval: () => {
                    dispatch(hideAlert())
                }
            })
        }
    }, [alertState.isShow]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <div className={`app ${theme}`}>
                <ReactNotification/>
                {
                    isLoading && <Loader/>
                }
                <NavBarComponent/>
                <div className='container main flex-grow-1'>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/complete' exact><CompletePage timer={timer}/></Route>
                        <Route path='/:path' component={ClothesPage}/>
                    </Switch>
                    <FooterComponent/>
                </div>
            </div>
        </BrowserRouter>
    )
}

