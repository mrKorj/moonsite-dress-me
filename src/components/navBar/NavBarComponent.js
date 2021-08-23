import React from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { changeTheme} from "../../store/actions";
import './navbarComponent.css'

export const NavBarComponent = ({timer}) => {
    const appState = useSelector(state => state.appState)
    const dispatch = useDispatch()


    const onChangeThemeHandler = () => {
        const newTheme = appState.theme === 'dark' ? 'light' : 'dark'
        dispatch(changeTheme(newTheme))
    }

    return (
        <Navbar style={{borderBottom: '1px solid blueviolet'}} bg={appState.theme} variant={appState.theme} expand="lg">
            <Container>
                <Navbar.Brand href="/" className='me-5'>
                    <img
                        alt="logo"
                        src="/favicon.png"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                    <span style={{fontSize: '1.2rem', marginLeft: '1rem'}}>
                        <b style={{color: 'blueviolet'}}>Moonsite</b> Shop</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <NavLink className="nav-link font-weight-bold ps-2 pe-2 fw-bold" to="/" exact>Home</NavLink>
                        {
                            appState.clothesList.map(i => (
                                <NavLink key={i} className="nav-link font-weight-bold ps-2 pe-2 fw-bold text-capitalize" to={i}>{i}</NavLink>
                            ))
                        }

                    </Nav>
                    <Navbar.Text className='d-flex justify-content-center align-items-center'>
                        <label className='mt-1 me-5 d-flex justify-content-center align-items-center'>
                            timer: {timer}
                        </label>
                        <Button
                            style={{marginTop: '7px'}}
                            onClick={onChangeThemeHandler}
                            size='sm'
                            variant={appState.theme === 'light' ? 'outline-dark' : 'outline-light'}
                        >
                            {
                                appState.theme === 'light' ? "🌜 Dark theme" : "🌞 Light theme"
                            }
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
