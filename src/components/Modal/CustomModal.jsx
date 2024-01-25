import React from 'react';
import './CustomModal.css'

const CustomModal = ({ open, handleClose }) => {
  const modalDisplay = open ? 'block' : 'none';

  return (
    <div className="Modal" style={{ display: modalDisplay }}>
      <div className="Modal__content">
        <h2 className='Modal__description'>Invalid Pokémon name</h2>
        <button className='Modal__btn' onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CustomModal;
