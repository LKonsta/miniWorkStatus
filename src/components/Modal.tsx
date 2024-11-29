import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/Modal.scss"    
import "./styles/Container.scss"
import { IoClose } from "react-icons/io5";

interface ModalProps {
    ModalButton: React.ReactNode;
    ModalHeader: string;
    ModalContent: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ ModalButton, ModalHeader, ModalContent, open, setOpen }) => {

    const toggleModal = () => {
        setOpen(!open);
    }

    if (!open) {
        return ModalButton
    }

    const portal = ReactDOM.createPortal(
            <>
                <div className="modal-backdrop" onClick={() => setOpen(false)} />
                <div className="modal">
                    <div className="outer-container">
                        <div className="header">
                            <div className="header-title">
                                {ModalHeader}
                            </div>
                            <div className="right-box-header">
                                <IoClose
                                    size={30}
                                    className="button"
                                    onClick={() => setOpen(false)}
                                    type="button"    
                                />
                            </div>
                        </div>
                        <div className="content-wrapper">
                            {ModalContent}
                        </div>
                    </div>
                </div>
            </>
    ,
    document.body)

    return <> 
        {ModalButton}
        {portal}
    </>;
};

export default Modal;
