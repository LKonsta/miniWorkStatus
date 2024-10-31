import { useState } from "react";
import "./Modal.scss"

interface ModalProps {
    ModalButton: string;
    ModalHeader: string;
    ModalContent: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ ModalButton, ModalHeader, ModalContent }) => {
    const [open, setOpen] = useState < boolean > (false);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                type="button"
            >
                {ModalButton}
            </button>
            {open && (
                <div>
                    <div
                        className="modal-backdrop"
                        onClick={() => setOpen(false)}
                    />
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
                                {ModalContent}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
