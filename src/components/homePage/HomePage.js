import React from 'react';
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import './homePage.css'
import {useHistory} from "react-router-dom";

export const HomePage = () => {
    const history = useHistory()
    const {clothesList, completedSets, selectedItems} = useSelector(state => state.appState)


    return (
        <div className='home-page'>
            <div className='home-page-maim-section'>
                <div className='home-page-maim-header'>
                    <div className='home-page-maim-header-left'>
                        <img src='./favicon.png' alt="pic" className='home-page-maim-header-left-img'/>
                        <h3>Moonsite Shop</h3>
                    </div>
                    <div className='home-page-maim-header-right'>
                        <p>
                            Completed sets <span style={{color: "red", fontSize: '1.5rem'}}> {completedSets}</span>
                        </p>
                    </div>
                </div>
                <div className='home-page-maim-body'>
                    {
                        clothesList.map(i => (
                            <Button
                                key={i}
                                variant={"outline-primary"}
                                className='me-3'
                                onClick={() => history.push(i)}
                            >
                                {i.toUpperCase()}
                            </Button>
                        ))
                    }
                    {
                        selectedItems.length === clothesList.length &&
                        <Button
                            variant={"outline-success"}
                            className='me-6'
                            onClick={() => history.push('/complete')}
                        >
                            Complete
                        </Button>
                    }
                </div>
            </div>

        </div>
    )
}
