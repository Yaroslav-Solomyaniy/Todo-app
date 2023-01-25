import React, { FC } from 'react';

interface IButtonCreateTask {
  setShowModal: (value: boolean) => void;
}

const ButtonCreateTask:FC<IButtonCreateTask> = ({ setShowModal }) => (
  <button
    type="button"
    onClick={() => setShowModal(true)}
    className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
  >
    Add Task
  </button>
);

export default ButtonCreateTask;
