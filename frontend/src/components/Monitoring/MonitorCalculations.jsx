import { useState } from "react";

import MonitoringListItem from "./MonitoringListItem";
import LoadingProcess from "../Home/loadingProcess.jsx";

const MonitorCalculations = ({
  data,
  currentPage,
  setCurrentPage,
  next,
  prev,
  isLoading
}) => {


  return (
    <>
      {isLoading ? <div className="flex justify-center items-center mb-[50px]"><LoadingProcess /></div> : <div>
    {data.map((el) => (
      <MonitoringListItem
        image={el.svg_file}
        fileName={el.dxf_file}
        date={el.date}
        width={el.width}
        height={el.height}
        name={el.name}
        key={el.id}
      />
    ))}

    <div className="flex justify-center items-center mb-[10px]">
      <div
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`${!prev && 'hidden' } cursor-pointer lg:px-[10px] lg:py-[8px] bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
      >
        Предыдущая страница
      </div>
      <div
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`ml-[20px] ${!next && 'hidden' } cursor-pointer lg:px-[10px] lg:py-[8px] bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
      >
        Следующая страница
      </div>
    </div>
  </div>}
    </>    
  );
};

export default MonitorCalculations;
