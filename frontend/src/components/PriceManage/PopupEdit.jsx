import React, { useRef, useState, useEffect } from "react";
import trashIcon from "../../images/trash.svg";

import axios from "../../axios.js";

import module from "./PriceManage.module.css";
import PopupEditInput from "./PopupEditInput";

const Popup = ({ setPopupVisible, material, isLoading, setIsLoading }) => {
  const [squaredMeterPrice, setSquaredMeterPrice] = useState(
    material.price_by_square_meter
  );
  const [weight, setWeight] = useState(material.weight);
  const [rangePrices, setRangePrices] = useState(
    material.ranges.map((range) => range.price)
  );
  const [incutPrice, setIncutPrice] = useState(material.price_by_incut);

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleRangePriceChange = (index, newValue) => {
    const newRangePrices = [...rangePrices];
    newRangePrices[index] = parseInt(newValue);
    setRangePrices(newRangePrices);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jwtToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="))
      .split("=")[1];

    try {
      setIsLoading(true);
      const materialResponse = await axios.put(
        `/material/${material.id}/`,
        {
          name: material.name,
          weight: weight,
          price_by_square_meter: squaredMeterPrice,
          price_by_incut: incutPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const rangeRequests = material.ranges.map((range, index) => {
        const rangeId = range.id;
        return axios.put(
          `/range/${rangeId}/`,
          {
            price: rangePrices[index],
            start: range.start,
            stop: range.stop,
            material: material.id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      });

      await Promise.all(rangeRequests);
      setIsLoading(false);
      setPopupVisible(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="px-8 lg:px-12 fixed flex justify-center items-center inset-0 bg-gray-800 bg-opacity-60 z-50">
      <div
        ref={popupRef}
        className="bg-white w-full py-[13px] lg:px-[25px] px-[13px] rounded-[30px]"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <span className={`${module.nameOfMaterial} text-[24px]`}>
              {material.name}
            </span>
            <img src={trashIcon} alt="delete" />
          </div>
          <div
            className={`${module.popupInputsWrapper} mt-[8px] flex flex-col lg:flex-row`}
          >
            <div
              className={`${module.materialInfoContainer} flex flex-col lg:mr-[135px]`}
            >
              <span className={`${module.titleInfo} mb-[5px]`}>
                Цена в зависимости от метража:
              </span>
              <div>
                <label
                  htmlFor="squared_meter"
                  className={`${module.fieldDesc}`}
                >
                  За м&#178;:{" "}
                </label>
                <input
                  id="squared_meter"
                  value={squaredMeterPrice}
                  onChange={(e) => setSquaredMeterPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="weight" className={`${module.fieldDesc}`}>
                  Вес 1м&#178;:{" "}
                </label>
                <input
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <span className={`${module.titleInfo} mb-[5px] mr-[4px]`}>
                Цена врезки:
              </span>
              <div>
                <input
                  id="incutPrice"
                  value={incutPrice}
                  onChange={(e) => setIncutPrice(e.target.value)}
                />
              </div>
            </div>
            <div className={`${module.materialInfoContainer} flex flex-col`}>
              <span className={`${module.titleInfo} mb-[5px]`}>
                За пог. метр:
              </span>
              {material.ranges.map((range, index) => (
                <PopupEditInput
                  start={range.start}
                  stop={range.stop}
                  price={range.price}
                  onChange={(newValue) =>
                    handleRangePriceChange(index, newValue)
                  }
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center mt-[25px] flex-col lg:flex-row">
            <div
              onClick={() => setPopupVisible(false)}
              className={`${module.cancelButton} flex justify-center items-center w-full lg:w-fit px-[50px] py-[10px]`}
            >
              <button>Отмена</button>
            </div>
            <div
              className={`${
                isLoading ? module.closeButtonActive : module.closeButton
              } mt-[8px] lg:mt-[0] flex justify-center items-center lg:ml-[13px] w-full lg:w-fit px-[50px] py-[10px]`}
            >
              <button type="submit">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
