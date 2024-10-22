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
                            <div className="modal-header">
                                {ModalHeader}
                                <button
                                    onClick={() => setOpen(false)}
                                    type="button"
                                    className="modal-exit"
                                >
                                    X
                                </button>
                            </div>
                            <div className="modal-form">
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
