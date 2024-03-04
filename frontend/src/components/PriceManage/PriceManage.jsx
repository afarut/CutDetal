import module from "./PriceManage.module.css";

import { NavLink } from "react-router-dom";
import PriceManageItem from "./PriceManageItem";

const PriceManage = () => {
  return (
    <div className="px-[30px] mt-[15px] lg:px-[36px]">
        <div className="flex justify-between items-center mb-[15px]">
        <button className={`${module.buttonWrapper} px-[29px] py-[7px] bg-white`}>+ Добавить материал</button>
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

        <PriceManageItem />
        <PriceManageItem />
        <PriceManageItem />
        <PriceManageItem />
    </div>
  );
};

export default PriceManage;
