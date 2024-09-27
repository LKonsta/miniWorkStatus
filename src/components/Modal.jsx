import { useState } from "react";

const Modal = ({ ModalButton, ModalHeader, ModalContent }) => {

    const [open, setOpen] = useState(false);

    return(
        <diV>
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
                onClick={() => setOpen(!open)}
              />
              <div className="modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <>
                      {ModalHeader}
                    </>
                    <button 
                      onClick={() => setOpen(!open)}
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
        </diV>
    )
}

export default Modal