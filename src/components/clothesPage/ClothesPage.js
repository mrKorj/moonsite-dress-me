import React from 'react';
import './clothesPage.css';
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ClothesItem} from "../clothesItem/ClothesItem";


export const ClothesPage = () => {
    const {path} = useParams()
    const {data} = useSelector(state => state.appState)

    return (
        <div className='clothes-main-section'>
            <div className="clothes-header">
                <h2 className='text-capitalize'>{path} Page</h2>
            </div>
            <Row className="clothes-body">
                {
                    data.filter((i) => i.type === path)
                        .sort((a, b) => a.brand.localeCompare(b.brand))
                        .map((item, idx) => (
                            <ClothesItem key={item.id + idx} item={item}/>
                        ))
                }
            </Row>
        </div>
    );
}
