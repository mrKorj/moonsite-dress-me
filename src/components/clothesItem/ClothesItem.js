import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import './clothesItem.css'
import {ModalComponent} from "../modal/ModalComponent";
import {addItemToSelected, showAlert} from "../../store/actions";

export const ClothesItem = ({item}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [showButtons, setShowButtons] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const onColorHandler = color => {
        setColor(color)
        setShowButtons(true)
    }

    const onSizeHandler = size => {
        setSize(size)
        setShowModal(true)
        console.log(item, 'size: ', size, 'color: ', color)

    }

    const addItemHandler = () => {
        setShowModal(false)
        dispatch(addItemToSelected({...item, size, color}))
        history.push('/')
        dispatch(showAlert({
            message: 'Item added successfully.',
            type: 'success',
            isShow: true
        }))
    }

    const onCancelHandler =() => {
        setShowModal(false)
        setShowButtons(false)
        setSize('')
        setColor('')
        dispatch(showAlert({
            message: 'Canceled.',
            type: 'warning',
            isShow: true
        }))
    }

    const modalContent = (
        <div>
            <p>Brand: {item.brand}</p>
            <p>Model name: {item.name}</p>
            <p>Color: {color}</p>
            <p>Size: {size}</p>
        </div>
    )

    return (
        <Card className='clothes-item-card'>
            <Card.Body>
                {/*<Card.Img variant="top" src={`./weatherIcons/${item.WeatherIcon}.png`} alt="pic" width={45}/>*/}
                <Card.Title className='d-flex justify-content-center text-capitalize'>Brand: {item.brand}</Card.Title>
                <Card.Text className='d-flex justify-content-center'>
                    Model name: {item.name}
                </Card.Text>
                <Card.Title className='d-flex justify-content-center'>
                    available colors:
                    {
                        [...new Set(item.colors)].map(c => (
                            <button key={c} style={{background: c}} onClick={() => onColorHandler(c)}>{c}</button>
                        ))
                    }
                    {
                        showButtons &&
                        <>
                            {
                                item.sizes.map(s => (
                                    <button onClick={() => onSizeHandler(s)} key={s}>{s}</button>
                                ))
                            }
                        </>
                    }
                </Card.Title>
            </Card.Body>
            <ModalComponent
                onHide={addItemHandler}
                show={showModal}
                titleText={"Add the item to the list?"}
                content={modalContent}
                onCancel={onCancelHandler}
            />
        </Card>
    )
}
