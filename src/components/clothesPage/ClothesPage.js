import React, {useEffect, useState} from 'react';
import './clothesPage.css';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {ClothesItem} from "../clothesItem/ClothesItem";


export const ClothesPage = () => {
    const {path} = useParams()
    const {data} = useSelector(state => state.appState)
    const [searchVal, setSearchVal] = useState('')
    const [notFound, setNotFound] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(data.filter((i) => i.type === path).sort((a, b) => a.brand.localeCompare(b.brand)))
    }, [data, path])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        notFound && setNotFound(false)
        const items = data.filter((i) => i.type === path)
        const searchedItems = items.filter(i =>
            i.name.startsWith(searchVal) ||
            i.brand.startsWith(searchVal) ||
            i.sizes.map(s => s.toString()).includes(searchVal) ||
            i.colors.includes(searchVal));

        if (searchedItems.length) {
            searchVal.length < 2 && searchedItems.length > 5
                ? setItems(searchedItems.slice(5))
                : setItems(searchedItems)
        } else {
            setNotFound(true)
        }
    }

    return (
        <div className='clothes-main-section'>

            <div className="clothes-header">
                <img src={`./img/${path}.png`} alt="img" height={50}/>
                <h3 className='text-capitalize ms-3'>{path}</h3>
            </div>

            <div className='search-section'>
                <Form className='w-100' onSubmit={onSubmitHandler}>
                    <Row className='w-100 d-flex justify-content-center'>
                        <Col xs={7}>
                            <Form.Control placeholder="Search..." size='sm' value={searchVal}
                                          onChange={(e) => setSearchVal(e.target.value.toLowerCase())}/>
                        </Col>
                        <Col xs={1}>
                            <Button variant='outline-primary' type='submit' size='sm'>Search</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className="clothes-body">
                <p>Fond items: <b style={{color: 'blueviolet'}}>{items.length}</b></p>
                {
                    items.length
                        ? items.map((item, idx) => (
                            <ClothesItem key={item.id + idx} item={item}/>
                        ))
                        : <h3>Not found...</h3>
                }
            </div>
        </div>
    );
}
