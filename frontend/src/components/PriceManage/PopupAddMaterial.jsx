import React, { useRef, useState, useEffect } from "react";

import module from "./PriceManage.module.css";

const PopupAddMaterial = ({ setPopupAddMaterialVisible }) => {
  const [materialName, setMaterialName] = useState("");
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState("");
  const [weightPerSquareMeter, setWeightPerSquareMeter] = useState("");
  const [pricePerMeter, setPricePerMeter] = useState("");
  const [from, setFrom] = useState(null);
  const [till, setTill] = useState(null);
  const [price, setPrice] = useState(null);

  const [ranges, setRanges] = useState([])

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupAddMaterialVisible(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddRange = () => {
    setRanges([...ranges, `От ${from} до ${till}м: ${price} RUB;`])
    setFrom(null)
    setTill(null)
    setPrice(null)
  }

  const handleSave = () => {
    
  };

  return (
    <div
      className={`px-8 lg:px-12 fixed flex justify-center items-center inset-0 bg-gray-800 bg-opacity-60 z-50`}
    >
      <div
        ref={popupRef}
        className={`bg-white lg:w-[600px] w-[334px] py-[13px] lg:px-[25px] px-[13px] rounded-[30px]`}
      >
        <span className={`${module.addMaterialTitle}`}>
          Добавление материала
        </span>
        <div className={`${module.addMaterialFormWrapper} flex flex-col`}>
          <div className={`${module.singleInput}`}>
            <label htmlFor="materialName">Название: </label>
            <input
            className="lg:w-[400px] w-[170px]"
              type="text"
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="Название"
            />
          </div>
          <div className={`${module.singleInput}`}>
            <label htmlFor="pricePerSquareMeter">Цена за м&#178;: </label>
            <input
            className="lg:w-[400px]"
              type="number"
              id="pricePerSquareMeter"
              value={pricePerSquareMeter}
              onChange={(e) => setPricePerSquareMeter(e.target.value)}
              placeholder="Введите цену"
            />
          </div>
          <div className={`${module.singleInput}`}>
            <label htmlFor="weightPerSquareMeter">Вес за м&#178;: </label>

            <input
            className="lg:w-[400px]"
              type="number"
              id="weightPerSquareMeter"
              value={weightPerSquareMeter}
              onChange={(e) => setWeightPerSquareMeter(e.target.value)}
              placeholder="Введите число"
            />
          </div>
          <span className="mb-[10px]">Цена за пог. метр:</span>
          <div className="mb-[20px]">
          {ranges.map(el => (
            <span className={`${module.range} block w-full`}>{el}</span>
            ))}
          </div>
          <div className="mb-[8px]">
            <label htmlFor="from">От: </label>
            <input
              type="number"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Введите число"
            />
          </div>
          <div className="mb-[8px]">
            <label htmlFor="till">До: </label>
            <input
              type="number"
              id="till"
              value={till}
              onChange={(e) => setTill(e.target.value)}
              placeholder="Введите число"
            />
          </div>
          <div className="mb-[8px]">
            <label htmlFor="price">Цена: </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Введите цену"
            />
          </div>
        </div>
        <button onClick={handleAddRange} className={`${module.AddRangeButton} px-[14.5px] py-[6.5px] mt-[8px]`}>
          Добавить этот диапазон
        </button>
        <div className="flex justify-end items-center mt-[25px] flex-col lg:flex-row">
            <div onClick={() => setPopupAddMaterialVisible(false)} className={`${module.cancelButton} flex justify-center items-center w-full lg:w-1/3 px-[50px] py-[10px]`}>
              <button>Отмена</button>
            </div>
            <div className={`${module.closeButton} mt-[8px] lg:mt-[0] flex justify-center items-center lg:ml-[13px] w-full lg:w-2/3 px-[50px] py-[10px]`}>
              <button type="submit">Сохранить</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default PopupAddMaterial;
