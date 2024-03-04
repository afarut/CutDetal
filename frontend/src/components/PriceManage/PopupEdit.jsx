import React, { useRef, useState, useEffect } from "react";
import trashIcon from "../../images/trash.svg";

import module from "./PriceManage.module.css";

const Popup = ({ setPopupVisible }) => {
  const [squaredMeterPrice, setSquaredMeterPrice] = useState('100 RUB');
  const [weight, setWeight] = useState(5);
  const [range1, setRange1] = useState('100 RUB');
  const [range2, setRange2] = useState('80 RUB');
  const [range3, setRange3] = useState('60 RUB');
  const [range4, setRange4] = useState('40 RUB');
  const [range5, setRange5] = useState('20 RUB');
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Squared Meter Price:", squaredMeterPrice);
    console.log("Weight:", weight);
    console.log("Range 1:", range1);
    console.log("Range 2:", range2);
    console.log("Range 3:", range3);
    console.log("Range 4:", range4);
    console.log("Range 5:", range5);
    // You can do further processing or API calls here

    // Close the popup after submitting
    setPopupVisible(false);
  };

  return (
    <div className="px-8 lg:px-12 fixed flex justify-center items-center inset-0 bg-gray-800 bg-opacity-60 z-50">
      <div ref={popupRef} className="bg-white w-full py-[13px] lg:px-[25px] px-[13px] rounded-[30px]">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <span className={`${module.nameOfMaterial} text-[24px]`}>{"Аллюминий"}</span>
            <img src={trashIcon} alt="delete" />
          </div>
          <div className={`${module.popupInputsWrapper} mt-[8px] flex flex-col lg:flex-row`}>
            <div className={`${module.materialInfoContainer} flex flex-col lg:mr-[135px]`}>
              <span className={`${module.titleInfo} mb-[5px]`}>Цена в зависимости от метража:</span>
              <div>
                <label htmlFor="squared_meter" className={`${module.fieldDesc}`}>За м&#178;: </label>
                <input id="squared_meter" value={squaredMeterPrice} onChange={(e) => setSquaredMeterPrice(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="weight" className={`${module.fieldDesc}`}>Вес 1м&#178;: </label>
                <input id="weight" value={weight} onChange={(e) => setWeight(e.target.value)}/>
              </div>
            </div>
            <div className={`${module.materialInfoContainer} flex flex-col`}>
              <span className={`${module.titleInfo} mb-[5px]`}>За пог. метр:</span>
              <div>
                <label htmlFor="ranges_1" className={`${module.fieldDesc}`}>От {0.001} до {10}м: </label><input id="ranges_1" value={range1} onChange={(e) => setRange1(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ranges_2" className={`${module.fieldDesc}`}>От {10} до {50}м: </label><input id="ranges_2" value={range2} onChange={(e) => setRange2(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ranges_3" className={`${module.fieldDesc}`}>От {50} до {100}м: </label><input id="ranges_3" value={range3} onChange={(e) => setRange3(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ranges_4" className={`${module.fieldDesc}`}>От {100} до {200}м: </label><input id="ranges_4" value={range4} onChange={(e) => setRange4(e.target.value)} />
              </div>
              <div>
                <label htmlFor="ranges_5" className={`${module.fieldDesc}`}>От {200} до {300}м: </label><input id="ranges_5" value={range5} onChange={(e) => setRange5(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-[25px] flex-col lg:flex-row">
            <div onClick={() => setPopupVisible(false)} className={`${module.cancelButton} flex justify-center items-center w-full lg:w-fit px-[50px] py-[10px]`}>
              <button>Отмена</button>
            </div>
            <div className={`${module.closeButton} mt-[8px] lg:mt-[0] flex justify-center items-center lg:ml-[13px] w-full lg:w-fit px-[50px] py-[10px]`}>
              <button type="submit">Сохранить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
