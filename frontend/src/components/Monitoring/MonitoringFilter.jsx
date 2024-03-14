import filterIcon from "../../images/filterIcon.svg";

import module from "./Monitoring.module.css";

const MonitoringFilter = ({ selectedOption, setSelectedOption }) => {
  return (
    <div
      className={`relative mt-[14px] mb-[13px] lg:mb-[17px] lg:mt-[16px] px-[31px]  flex items-center justify-start lg:justify-end`}
    >
      {/* Блок с селектом */}
      <div className="relative">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className={`${module.filterButton} cursor-pointer flex justify-center items-center pl-[17px] py-[13px] lg:pl-[17px] lg:pr-[30px] lg:py-[13px] pr-[30px]`}
        >
          <option value={""}>Сортировать</option>
          <option value={"?ordering=count"}>Количество</option>
          <option value={"?ordering=-date"}>Дата</option>
          <option value={"?ordering=price"}>Цена</option>
          <option value={"?ordering=material"}>Материал</option>
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
  );
};

export default MonitoringFilter;
