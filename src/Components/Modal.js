import React from 'react'
import ReactDOM from 'react-dom'
import '../modal.css'

const Modal = (props) => {

    const {modal, hideModal, children} = props

    const showHideClassName = modal ? "modal display-block" : "modal display-none";

  return ReactDOM.createPortal(
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="btn btn-dark" onClick={hideModal}> Close </button>
      </section>
    </div>,
  document.getElementById('portal'))
}

export default Modal