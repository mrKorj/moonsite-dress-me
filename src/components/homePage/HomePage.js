import React from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import './homePage.css'
import {useHistory} from "react-router-dom";
import {completeSet} from "../../store/actions";

export const HomePage = () => {
    const history = useHistory()
    const {clothesList, completedSets, selectedItems} = useSelector(state => state.appState)
    const dispatch = useDispatch()

    const onCompleteHandler = () => {
        dispatch(completeSet())
        history.push('/complete')
    }

    return (
        <div className='home-page'>
            <div className='home-page-maim-section'>
                <div className='home-page-maim-header'>
                    <div className='home-page-maim-header-left'>
                        <img src='./favicon.png' alt="pic" className='home-page-maim-header-left-img'/>
                        <div><h4>Moonsite dress mee</h4></div>
                    </div>
                    <div className='home-page-maim-header-right'>
                        <p>
                            Completed sets: <span style={{color: "red", fontSize: '1.2rem'}}> {completedSets}</span>
                        </p>
                    </div>
                </div>
                <div className='home-page-maim-body'>
                    <div>
                        <p>Selected <b style={{color: "red"}}>{selectedItems.length}</b> from 3 items.</p>
                    </div>
                    <div className='d-flex justify-content-center mb-2'>
                        {
                            clothesList.map(i => (
                                <div className='d-flex flex-column align-items-center p-2' key={i}>
                                    <div style={{height: '2rem'}}>
                                        {
                                            selectedItems.find(item => item.type === i) &&
                                            <span>&#10004;</span>
                                        }
                                    </div>
                                    <Button
                                        variant={"outline-primary"}
                                        onClick={() => history.push(i)}
                                    >
                                        {i.toUpperCase()}
                                    </Button>
                                </div>

                            ))
                        }
                    </div>

                    <div>
                        {
                            selectedItems.length && selectedItems.length === clothesList.length
                                ? <Button
                                    variant={"outline-success"}
                                    className='me-6'
                                    onClick={onCompleteHandler}
                                >
                                    Complete
                                </Button>
                                : null
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}
