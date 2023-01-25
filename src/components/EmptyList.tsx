import React from 'react';
import empty from '../assets/img/empty.jpg';

const EmptyList = () => (
  <div className="mb-6">
    <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
      <img src={empty} alt="img" />
    </div>
    <p className="text-center text-Gray ">You have not todos, please add one</p>
  </div>
);

export default EmptyList;
