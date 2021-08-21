import React from 'react';
import {Spinner} from "react-bootstrap";
import './loader.css'

export const Loader = () => {
    return (
        <div className='loader'>
            <Spinner animation="border" variant="warning" style={{width: '60px', height: '60px'}}/>
        </div>
    );
}
