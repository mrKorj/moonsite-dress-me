import React from 'react';
import {Modal, Button} from "react-bootstrap";

export const ModalComponent = ({show, onHide, titleText, content, onCancel}) => {
    return (
        <>
            <Modal show={show} onHide={onHide} centered backdrop="static" size='sm'>
                <Modal.Header className='d-flex justify-content-center'>
                    <Modal.Title>{titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center flex-column align-items-center'>
                    {content}
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="success" onClick={onHide}>Add this Item</Button>
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
