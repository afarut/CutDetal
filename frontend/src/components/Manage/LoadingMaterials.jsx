import React from 'react';
import module from '../Home/home.module.css';
import LoadingProcess from '../Home/loadingProcess';

const LoadingMaterials = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-center px-5 py-5">
          <LoadingProcess />

          
        </div>
        <span className='flex justify-center items-center text-[23px] font-medium text-[Montserrat]'>
        Обновление....
        </span>
      </div>
    </div>
  );
};

export default LoadingMaterials;
