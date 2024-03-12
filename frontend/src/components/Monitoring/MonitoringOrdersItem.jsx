import module from "./Monitoring.module.css";

import { useState } from "react";

import PopupSvg from "./PopupSvg.jsx";

const MonitoringOrdersItem = ({
  image,
  date,
  fileName,
  material,
  count,
  price,
  dateOfOrder,
  customerName,
  phoneNumber,
  email,
  typeOfClient,
  status,
  nameOfFile,
  orderId
}) => {
  const [isPopupOpen, setIsClosePopup] = useState(false);

  function getSVGWidth(svgString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgString, "text/xml");
    const svgElement = xmlDoc.getElementsByTagName("svg")[0];
    return svgElement.getAttribute("width");
  }

  function getSVGHeight(svgString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgString, "text/xml");
    const svgElement = xmlDoc.getElementsByTagName("svg")[0];
    return svgElement.getAttribute("height");
  }
  return (
    <div
      className={`${module.listItemWrapper} px-[18px] pb-[10px] mx-[12px] lg:px-[42px] mb-[8px] lg:mb-[14px] lg:mx-[31px] relative`}
    >
      <div
        className={`flex-col lg:flex-row flex justify-between lg:items-start py-[15px] lg:py-[20px]`}
      >
        <div className="lg:w-1/4 lg:flex lg:justify-center">
          <svg
            onClick={() => setIsClosePopup(true)}
            className="cursor-pointer"
            height="190"
            viewBox={`0 0 ${getSVGWidth(image)} ${getSVGHeight(image)}`}
            dangerouslySetInnerHTML={{ __html: image }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          />
        </div>
        <div
          className={`${module.ItemInfoWrapper} lg:w-1/4 order-3 text-[16px] lg:text-[21px] flex flex-col`}
        >
          <div className="mb-[10px]">
            <span className={`${module.titles}`}>Данные расчёта</span>
          </div>
          <div>
            <span className="font-semibold">Дата расчёта: </span>
            <span className="text-[16px] lg:text-[21px]">{date}</span>
          </div>
          <div>
            <span className="font-semibold">Имя файла: </span>
            <a
              href={fileName}
              className={`${module.fileName} text-[16px] lg:text-[21px]`}
            >
              {nameOfFile}
            </a>
          </div>
          <div>
            <span className="font-semibold">Материал: </span>
            <span className="text-[16px] lg:text-[21px]">{material}</span>
          </div>
          <div>
            <span className="font-semibold">Количество: </span>
            <span className="text-[16px] lg:text-[21px]">{count}</span>
          </div>
          <div>
            <span className="font-semibold">Итог по цене: </span>
            <span className="text-[16px] lg:text-[21px]">{price} RUB</span>
          </div>
        </div>

        <div
          className={`${module.ItemInfoWrapper} lg:w-1/4 order-4 lg:ml-[10px] text-[16px] lg:text-[21px] flex flex-col`}
        >
          <div className="mb-[10px]">
            <span className={`${module.titles}`}>Данные клиента:</span>
          </div>
          <div>
            <span className="font-semibold">Дата оформления: </span>
            <span className="text-[16px] lg:text-[21px]">{dateOfOrder}</span>
          </div>
          <div>
            <span className="font-semibold">Имя: </span>
            <span className={`text-[16px] lg:text-[21px]`}>{customerName}</span>
          </div>
          <div>
            <span className="font-semibold">Телефон: </span>
            <a href={`tel:${phoneNumber}`} className={`${module.fileName} text-[16px] lg:text-[21px]`}>
              {phoneNumber}
            </a>
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            <a href={`mailto:${email}`} className={`${module.fileName} text-[16px] lg:text-[21px]`}>
              {email}
            </a>
          </div>
          <div>
            <span className="font-semibold">Вид клиента: </span>
            <span className="text-[16px] lg:text-[21px]">{typeOfClient}</span>
          </div>
        </div>

        <div className="lg:w-1/4 lg:ml-[10px] mt-[15px] mb-[15px] lg:mt-[0px] lg:order-4 order-2">
          <div className={`${module.statesWrapper}  flex items-start`}>
            <span>Статус: </span>
            <span
              className={`${
                status === "выполнен" ? module.done : module.waitingForConfirm
              } ml-[5px]`}
            >
              {status}
            </span>
          </div>
        </div>
        <span className="absolute bottom-5 right-5 text-gray-500">#{orderId}</span>
      </div>

      {isPopupOpen && (
        <PopupSvg
          image={image}
          width={getSVGWidth(image)}
          height={getSVGHeight(image)}
          setIsClosePopup={setIsClosePopup}
        />
      )}
    </div>
  );
};

export default MonitoringOrdersItem;
