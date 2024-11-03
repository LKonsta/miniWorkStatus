import React, { useState } from "react";
import "./Modal.scss"    

interface ModalContentProps {
    content: 
}

interface ModalProps {
    ModalButton: React.ReactNode;
    ModalHeader: string;
    ModalContent: (content: React.ReactNode, toggleModal: () => void) => React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ ModalButton, ModalHeader, ModalContent }) => {
    const [open, setOpen] = useState <boolean> (false);

    const toggleModal = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    return (
        <div>
            <div onClick={toggleModal}>
                {ModalButton}
            </div>
            {open && (
                <div>
                    <div className="modal-backdrop" onClick={() => setOpen(false)} />
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-content-header">
                                <div className="modal-content-header-title">
                                    {ModalHeader}
                                </div>
                                <button
                                    className="modal-content-header-exit"
                                    onClick={() => setOpen(false)}
                                    type="button"    
                                >X</button>
                            </div>
                            <div className="modal-content-form">
                                {ModalContent(ModalContent, toggleModal)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
