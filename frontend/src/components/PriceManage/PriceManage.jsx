import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import PopupEdit from "./PopupEdit";
import PopupAddMaterial from "./PopupAddMaterial";

import PriceManageItem from "./PriceManageItem";
import trashIcon from "../../images/trash.svg";
import axios from "../../axios.js";

import module from "./PriceManage.module.css";

const PriceManage = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupAddMaterialVisible, setPopupAddMaterialVisible] =
    useState(false);
  const popupRef = useRef(null);
  const [currentMaterial, setCurrentMaterial] = useState(null)
  const [allMaterials, setAllMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("/material")
      .then((response) => {
        setAllMaterials(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [isPopupVisible]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <div className="px-8 mt-6 lg:px-12">
      <div className="flex justify-between items-center mb-[15px]">
        <button
          onClick={() => setPopupAddMaterialVisible(true)}
          className={`${module.buttonWrapper} px-[29px] py-[7px] bg-white`}
        >
          + Добавить материал
        </button>
        <NavLink to="/">
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

      {allMaterials.map((material) => (
        <PriceManageItem
          material={material}
          name={material.name}
          weigth={material.weight}
          ranges={material.ranges}
          priceForSquareMeter={material.price_by_square_meter}
          setPopupVisible={setPopupVisible}
          key={material.id}
          setCurrentMaterial={setCurrentMaterial}
        />
      ))}

      {isPopupVisible && <PopupEdit material={currentMaterial} setPopupVisible={setPopupVisible} />}

      {isPopupAddMaterialVisible && (
        <PopupAddMaterial
          setPopupAddMaterialVisible={setPopupAddMaterialVisible}
        />
      )}
    </div>
  );
};

export default PriceManage;
