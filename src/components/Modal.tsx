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
            <div>
                <div className="modal-backdrop" onClick={() => setOpen(false)} />
                <div className="modal">
                    <div className="outer-container">
                        <div className="outer-container-header">
                            <div className="outer-container-header-title">
                                {ModalHeader}
                            </div>
                            <div className="outer-right-box">
                                <IoClose
                                    size={30}
                                    className="outer-right-box-button"
                                    onClick={() => setOpen(false)}
                                    type="button"    
                                />
                            </div>
                        </div>
                        <div className="outer-container-content">
                            {ModalContent}
                        </div>
                    </div>
                </div>
            </div>
    ,
    document.body)

    return <div> 
        {ModalButton}
        {portal}
    </div>;
};

export default Modal;
