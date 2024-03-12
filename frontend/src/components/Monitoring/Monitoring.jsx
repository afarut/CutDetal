import { useEffect, useState } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "../../axios.js";

import module from "./Monitoring.module.css";

import MonitorCalculations from "./MonitorCalculations";
import MonitorOrders from "./MonitorOrders";
import { NavLink } from "react-router-dom";
import MonitoringFilter from "./MonitoringFilter.jsx";

const Monitoring = () => {
  // const location = useLocation()
  // const {pathname} = location

  const authUser = useAuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculationsChosen, setIsCalculationsChosen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const [orders, setOrders] = useState([]);

  const jwtToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_auth="))
    .split("=")[1];

  useEffect(() => {
    setSelectedOption("");
    setCurrentPage(1);
    setPrev(null);
    setNext(null);
  }, [isCalculationsChosen]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `/detail/${selectedOption}${
          selectedOption === "" ? "?" : "&"
        }page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        if (isCalculationsChosen) {
          setNext(response.data.next);
          setPrev(response.data.previous);
          setData(response.data.results);
          setIsLoading(false);
        } else {
          setOrders(
            response.data.results.filter((item) => item.order !== null)
          );
          setPrev(response.data.previous);
          setNext(response.data.next);
          setIsLoading(false);
        }
      });
  }, [selectedOption, currentPage, isCalculationsChosen]);

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

      <MonitoringFilter
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {isCalculationsChosen ? (
        <MonitorCalculations
          isLoading={isLoading}
          prev={prev}
          next={next}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          data={data}
        />
      ) : (
        <MonitorOrders
          isLoading={isLoading}
          orders={orders}
          prev={prev}
          next={next}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Monitoring;
