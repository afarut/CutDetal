import module from "./home.module.css";
import CloseWindow from "./closewindow";
import ItemOrder from "./itemOrder";
import { useState } from "react";
import PopupSvg from "../Monitoring/PopupSvg.jsx";

const Calculate = ({
  goPlacingOrder,
  windowClose,
  data,
  materialValues,
  handleMaterialChange,
  materials,
  quantityValues,
  handleQuantityChange,
  handleItemRemove,
  items,
  setItems
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  return (
    <>
      {isPopupOpen ? (
        <PopupSvg
          image={imageInfo.image}
          height={imageInfo.height}
          width={imageInfo.width}
          setIsClosePopup={setIsPopupOpen}
        />
      ) : (
        <div
          className={`absolute inset-0 flex justify-center pt-[6%] bg-opacity-60 bg-black z-20 h-full ${module.divCalculate}`}
        >
          <div
            className={`bg-white w-full max-h-[740px] mx-[42px] rounded-3xl relative pt-[16px] ${module.ffjjhh}`}
          >
            <div className={module.titleCalc}>Расчет стоимости деталей</div>
            <div
              className={`flex flex-col gap-[14px] max-h-[650px] relative overflow-scroll overflow-x-hidden pt-[12px] ${module.divScroll}`}
            >
              {data.map((item, index) => (
                <ItemOrder
                  materialValues={materialValues}
                  handleMaterialChange={handleMaterialChange}
                  materials={materials}
                  quantityValues={quantityValues}
                  handleQuantityChange={handleQuantityChange}
                  handleItemRemove={handleItemRemove}
                  item={item}
                  key={index}
                  index={index}
                  items={items}
                  setItems={setItems}
                  setImageInfo={setImageInfo}
                  isPopupOpen={isPopupOpen}
                  setIsPopupOpen={setIsPopupOpen}
                />
              ))}
              <div className="flex justify-end">
                <div
                  className={`mr-[16px] ${module.buttonOkey}`}
                  onClick={goPlacingOrder}
                >
                  Далее
                </div>
              </div>
            </div>
            <CloseWindow windowClose={windowClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default Calculate;
