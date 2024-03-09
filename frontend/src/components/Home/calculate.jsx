import module from "./home.module.css";
import CloseWindow from "./closewindow";
import ItemOrder from "./itemOrder";
import { useState } from "react";
import axios from "../../axios.js";
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
  setOrders,
  files,
  setDetailsIds,
  detailsIds,
}) => {
  const [items, setItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  const sendDataToServer = async () => {
    try {
      // const jwtToken = document.cookie.split('; ').find(row => row.startsWith('_auth=')).split('=')[1];

      for (let index = 0; index < data.length; index++) {
        const item = {
          material_id: materialValues[index],
          length: data[index].total_length,
          svg_file: data[index].image,
          dxf_file: files[index],
          height: data[index].size_y,
          width: data[index].size_x,
          name: data[index].image_name,
          count: quantityValues[index],
          price: items[index],
        };

        await axios
          .post("/detail/save/", item)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error.message);
          });
      }

      goPlacingOrder();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };
  console.log(isPopupOpen)
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
                  onClick={sendDataToServer}
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
