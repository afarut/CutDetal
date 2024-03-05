import { useEffect, useState } from "react";

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

import filterIcon from "../../images/filterIcon.svg";

import module from './Monitoring.module.css'

import MonitorCalculations from "./MonitorCalculations";
import MonitorOrders from './MonitorOrders'
import { NavLink } from "react-router-dom";



const Monitoring = () => {
  const authUser = useAuthUser()
    const [isCalculationsChosen, setIsCalculationsChosen] = useState(true)

  return (
    <div className="">
      <div className={`px-[18px] lg:px-[42px] flex justify-between items-center mt-[9px] lg:mt-[15px]`}>
        <span className={`${module.MonitoringTitle} lg:text-[37px] text-[32px]`}>История расчёта и заказов</span>
        <div>
          <NavLink to={'/'}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.61578 2.19485L32.5388 33.1178M1.61578 33.1178L32.5388 2.19485"
              stroke="#FF6161"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </NavLink>
        </div>
      </div>

      <div className={`lg:px-[42px] mt-[8px] flex-col lg:flex-row flex justify-center items-center`}>
        <div onClick={() => setIsCalculationsChosen(true)} className={`${module.buttonsSelectorWrapper} ${isCalculationsChosen ? module.active : ''} text-[31px] w-full flex justify-center`}>
          <span>Только расчёт</span>
        </div>
        <div onClick={() => setIsCalculationsChosen(false)} className={`${module.buttonsSelectorWrapper} ${!isCalculationsChosen ? module.active : ''} lg:ml-[35px] text-[31px] w-full flex justify-center`}>
          <span>Оформленные заказы</span>
        </div>
      </div>

      <div className={`${module.filterButtonWrapper} mt-[14px] mb-[13px] lg:mb-[17px] lg:mt-[16px] px-[18px] lg:px-[42px] flex items-center justify-start lg:justify-end`}>
        <div className={`${module.filterButton} flex justify-center items-center px-[14px] py-[10px] lg:px-[17px] lg:py-[13px]`}>
        <span className="text-[16px] lg:text-[19px]">Сортировать</span>
        <img className={`lg:h-[20px] lg:w-[20px] h-[16px] w-[16px] ml-[5px]`} src={filterIcon} alt="filterIcon" />
        </div>
      </div>

      {isCalculationsChosen ? <MonitorCalculations /> : <MonitorOrders />}
    </div>
  );
};

export default Monitoring;
