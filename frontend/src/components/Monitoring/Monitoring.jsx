import { useEffect, useState } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from '../../axios.js'

import filterIcon from "../../images/filterIcon.svg";

import module from "./Monitoring.module.css";

import MonitorCalculations from "./MonitorCalculations";
import MonitorOrders from "./MonitorOrders";
import { NavLink } from "react-router-dom";

const Monitoring = () => {
  const authUser = useAuthUser();
  const [isCalculationsChosen, setIsCalculationsChosen] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    const jwtToken = document.cookie.split('; ').find(row => row.startsWith('_auth=')).split('=')[1]
    axios.get(`/detail/${selectedOption}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }).then((response) => {
      setData(response.data)
    })
  })

  console.log(selectedOption);

  return (
    <div className="">
      <div
        className={`px-[18px] lg:px-[42px] flex justify-between items-center mt-[9px] lg:mt-[15px]`}
      >
        <span
          className={`${module.MonitoringTitle} lg:text-[37px] text-[32px]`}
        >
          История расчёта и заказов
        </span>
        <div>
          <NavLink to={"/"}>
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

      <div
        className={`lg:px-[42px] mt-[8px] flex-col lg:flex-row flex justify-center items-center`}
      >
        <div
          onClick={() => setIsCalculationsChosen(true)}
          className={`${module.buttonsSelectorWrapper} ${
            isCalculationsChosen ? module.active : ""
          } text-[31px] w-full flex justify-center`}
        >
          <span>Только расчёт</span>
        </div>
        <div
          onClick={() => setIsCalculationsChosen(false)}
          className={`${module.buttonsSelectorWrapper} ${
            !isCalculationsChosen ? module.active : ""
          } lg:ml-[35px] text-[31px] w-full flex justify-center`}
        >
          <span>Оформленные заказы</span>
        </div>
      </div>

      <div
        className={`relative mt-[14px] mb-[13px] lg:mb-[17px] lg:mt-[16px] px-[31px]  flex items-center justify-start lg:justify-end`}
      >
        {/* Блок с селектом */}
        <div className="relative">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className={`${module.filterButton} flex justify-center items-center pl-[17px] py-[13px] lg:pl-[17px] lg:pr-[30px] lg:py-[13px] pr-[30px]`}
          >
            <option value={''}>

                Сортировать

            </option>
            <option value={'?ordering=count'}>Количество</option>
            <option value={'?ordering=date'}>Дата</option>
            <option value={'?ordering=price'}>Цена</option>
            <option value={'?ordering=material'}>Материал</option>
          </select>
          {/* Корректировка положения иконки */}
          <div className="absolute top-0 right-2 flex justify-end items-center h-[100%]">
            <img
              className={`lg:h-[20px] lg:w-[20px]`}
              src={filterIcon}
              alt="filterIcon"
            />
          </div>
        </div>
      </div>

      {isCalculationsChosen ? <MonitorCalculations data={data} /> : <MonitorOrders />}
    </div>
  );
};

export default Monitoring;
