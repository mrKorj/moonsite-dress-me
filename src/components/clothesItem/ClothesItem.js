import React, {useState} from 'react';
import {Card, Button} from "react-bootstrap";
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

    const onCancelHandler = () => {
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
                <Card.Text className='d-flex justify-content-center text-capitalize'><span>Brand: <b>{item.brand}</b></span></Card.Text>
                <Card.Text className='d-flex justify-content-center text-capitalize'>
                    <span>Model name: <b>{item.name}</b></span>
                </Card.Text>
                <Card.Text className='d-flex justify-content-center'>
                    choose a color:
                    {
                        [...new Set(item.colors)].map(c => (
                            <Button size={'sm'} className={'ms-2'} key={c} style={{background: c, color: c === 'white' ? 'black' : null, borderColor: 'blueviolet'}}
                                    onClick={() => onColorHandler(c)}>{c}</Button>
                        ))
                    }
                </Card.Text>
                <Card.Text className='d-flex justify-content-center'>
                    {
                        showButtons &&
                        <>
                            choose a size:
                            {
                                item.sizes.map(s => (
                                    <Button variant='outline-primary' size={'sm'} className={'ms-2'} onClick={() => onSizeHandler(s)} key={s}>{s}</Button>
                                ))
                            }
                        </>
                    }
                </Card.Text>
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
