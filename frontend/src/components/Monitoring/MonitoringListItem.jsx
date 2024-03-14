import { useState } from "react";
import PopupSvg from "./PopupSvg.jsx";

import module from "./Monitoring.module.css";

const MonitoringListItem = ({
  image,
  date,
  fileName,
  name,
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
      className={`${module.listItemWrapper} px-[18px] lg:px-[42px] mb-[8px] lg:mb-[14px] mx-[31px]`}
    >
      <div className={`flex justify-start items-center py-[15px] lg:py-[20px]`}>
        <div className="w-1/4 flex justify-center items-center">
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
          className={`${module.ItemInfoWrapper} ml-[10px] text-[16px] lg:text-[21px] flex flex-col`}
        >
          <div className="lg:mb-[30px] mb-[15px]">
            <span className="font-semibold">Дата расчёта: </span>
            <span className="text-[16px] lg:text-[21px]">{date}</span>
          </div>
          <div>
            <span className="font-semibold">Имя файла: </span>
            <a
              href={fileName}
              className={`${module.fileName} text-[16px] lg:text-[21px]`}
            >
              {name}
            </a>
          </div>
          {/* <div>
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
          </div> */}
        </div>
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

export default MonitoringListItem;
