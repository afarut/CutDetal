import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import PopupEdit from "./PopupEdit";
import PopupAddMaterial from "./PopupAddMaterial";
import LoadingProcess from "../Home/loadingProcess.jsx";

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
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isPopupVisible && !isPopupAddMaterialVisible) {
      setIsLoading(true)
    }

    axios
      .get(`/material/with_paggination/?page=${currentPage}`)
      .then((response) => {
        setNext(response.data.next);
        setPrev(response.data.previous);
        setAllMaterials(response.data.results);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [isPopupVisible, isPopupAddMaterialVisible, isDeleting, currentPage]);

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
    <>
      {!isLoading ? <div className="px-8 mt-6 lg:px-12">
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
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />
      ))}

      {isPopupVisible && <PopupEdit material={currentMaterial} setIsLoading={setIsLoading} isLoading={isLoading} setPopupVisible={setPopupVisible} />}

      {isPopupAddMaterialVisible && (
        <PopupAddMaterial
          setPopupAddMaterialVisible={setPopupAddMaterialVisible}
        />
      )}

<div className="flex justify-center items-center mb-[10px]">
      <div
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`${!prev && 'hidden' } lg:px-[10px] lg:py-[8px] bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
      >
        Предыдущая страница
      </div>
      <div
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`ml-[20px] ${!next && 'hidden' } lg:px-[10px] lg:py-[8px] bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
      >
        Следующая страница
      </div>
    </div>
    </div> : <div className="mt-[50px] flex justify-center items-center mb-[50px]"><LoadingProcess /></div> }
    </>
  );
};

export default PriceManage;
