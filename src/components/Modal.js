import React from 'react';
import classes from '../style/Modal.module.css'
const Modal = ({isOpen, children, onClose}) => {
    return (
        <div className={classes.modal__wrapper} onClick={()=> onClose()}>
            <div onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
