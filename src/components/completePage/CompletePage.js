import React, {useEffect, useRef, useState} from 'react';
import './completePage.css'
import {Table, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {showAlert, startNewSet} from "../../store/actions";

export const CompletePage = ({timer}) => {
    const history = useHistory()
    const {selectedItems, theme} = useSelector(state => state.appState)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const randomPic = useRef(Math.floor(Math.random() * (8 - 1 + 1)) + 1)

    if (!selectedItems.length) history.push('/')

    useEffect(() => {
        setText(
            selectedItems.map(i => {
                return [i.type, i.brand, i.name, i.color, i.size]
            }).join(';\n')
        )
    }, [selectedItems])

    const onNewSetHandler = () => {
        dispatch(startNewSet())
        history.push('/')
    }

    const onShareHandler = async () => {
        try {
            await navigator.share({
                title: 'Moonsite dress me APP',
                text: text,
                url: window.location.href,
            })
        } catch (e) {
            dispatch(showAlert({
                message: e.message,
                type: 'warning',
                isShow: true
            }))
        }
    }

    const onCopyHandler = async () => {
        try {
            await navigator.clipboard.writeText('Congratulations your set is completed!\n' + text)
            dispatch(showAlert({
                message: 'Copied to clipboard.',
                type: 'success',
                isShow: true
            }))
        } catch (e) {
            dispatch(showAlert({
                message: e.message,
                type: 'warning',
                isShow: true
            }))
        }
    }

    return (
        <div className='d-flex  flex-column align-items-center p-4 complete'>
            <h2>Congratulations your set is completed!</h2>
            <h5 className='mt-3'>It took you <span
                style={{color: "red"}}>{Math.floor(timer / 60)}:{('0' + Math.floor(timer % 60)).slice(-2)}</span> min to choose this
                set.</h5>
            <Table striped bordered hover variant={theme} className='mt-4'>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Brand</th>
                    <th>Model name</th>
                    <th>Color</th>
                    <th>Size</th>
                </tr>
                </thead>
                <tbody>
                {
                    selectedItems.map(i => (
                        <tr key={i.id}>
                            <td className='text-capitalize'>{i.type}</td>
                            <td className='text-capitalize'>{i.brand}</td>
                            <td className='text-capitalize'>{i.name}</td>
                            <td className='text-capitalize'>{i.color}</td>
                            <td>{i.size}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>

            <div className='mt-3'>
                <Button variant={'success'} onClick={onNewSetHandler}>Choose new set</Button>
                <Button className='ms-1' variant={'link'} onClick={onShareHandler}>Share</Button>
                <Button className='ms-1' variant={'link'} onClick={onCopyHandler}>Copy</Button>
            </div>

            <div className='mt-5'>
                <img src={`./img/${randomPic.current}.jpg`} alt="pic" style={{maxHeight: '100px'}}/>
            </div>
        </div>
    )
}
