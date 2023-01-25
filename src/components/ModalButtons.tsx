import React, { FC } from 'react';

interface IModalButtons {
  textSubmit: string;
  setShowModal: (value: boolean) => void;
  handleClick: () => void;
  cancelClick: () => void;
}

const ModalButtons:FC<IModalButtons> = ({ textSubmit, setShowModal, handleClick, cancelClick }) => (
  <>
    <button
      type="button"
      className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
      onClick={() => {
        setShowModal(false);
        handleClick();
      }}
    >
      {textSubmit}
    </button>
    <button
      type="button"
      onClick={cancelClick}
      className="bg-Tangaroa rounded-md text-white py-3 px-10"
    >
      Cancel
    </button>
  </>
);

export default ModalButtons;
