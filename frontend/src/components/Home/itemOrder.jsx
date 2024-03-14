import trash from "../../images/trash.svg";
import queshion from "../../images/queshion.svg";
import module from "./home.module.css";
import { useState, useEffect, useRef } from "react";

const ItemOrder = ({
  item,
  materialValues,
  handleMaterialChange,
  materials,
  quantityValues,
  handleQuantityChange,
  handleItemRemove,
  setItems,
  setIsPopupOpen,
  setImageInfo
}) => {
  const [diapazon, setDiapazon] = useState([]);

  const [onQuestion, setOnQuestion] = useState(false);

  const imgRef = useRef(null);

  const handleIsPopupOpen = () => {
    setImageInfo({
      image: item.image,
      width: getSVGWidth(item.image),
      height: getSVGHeight(item.image)
    })
    setIsPopupOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        imgRef.current &&
        !imgRef.current.contains(event.target) &&
        onQuestion
      ) {
        setOnQuestion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onQuestion]);

  useEffect(() => {
    const priceDetail = getPriceDetailByCount();
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[item.id] = priceDetail;
      return updatedItems;
    });
  }, [quantityValues, materialValues]);

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

  const getResult = () => {
    const X = item.size_x;
    const Y = item.size_y;
    const length = item.total_length;
    const material = materials.find(
      (el) => el.id == parseInt(materialValues[item.id])
    );
    const ranges = material?.ranges;

    const diap = [];

    for (let i = 0; i < ranges?.length; i++) {
      let sum = Math.ceil(ranges[i].start / (length / 1000));

      if (sum === 0) {
        sum = 1;
      }

      const doc = {
        countList: sum,
        start: ranges[i].start,
        stop: ranges[i].stop,
        PriceMaterial:
          ((X * Y) / 1000000) * material.price_by_square_meter * sum,
        PriceRezka: (length / 1000) * sum * ranges[i].price,
        TotalSumOneDetal: Math.ceil(
          (((X * Y) / 1000000) * material.price_by_square_meter * sum +
            (length / 1000) * sum * ranges[i].price) /
          sum
        ),
      };
      diap.push(doc);
    }
    diap.sort((a, b) => a.countList - b.countList);
    setDiapazon(diap);
  };

  useEffect(() => {
    getResult();
  }, [materialValues]);

  const getPriceOneDetailByCount = () => {
    const count = quantityValues[item.id];
    for (let i = 0; i < diapazon.length - 1; i++) {
      if (diapazon[i].countList <= count && diapazon[i + 1].countList > count) {
        return diapazon[i].TotalSumOneDetal;
      }
    }
    return diapazon[diapazon.length - 1]?.TotalSumOneDetal;
  };

  const getPriceDetailByCount = () => {
    const count = quantityValues[item.id];

    for (let i = 0; i < diapazon.length - 1; i++) {
      if (diapazon[i].countList <= count && diapazon[i + 1].countList > count) {
        return diapazon[i].TotalSumOneDetal * count;
      }
    }
    return diapazon[diapazon.length - 1]?.TotalSumOneDetal * count;
  };
  const hintOn = () => {
    setOnQuestion(!onQuestion);
  };

  return (
    <div key={item.id} className={module.cartCalc}>
      <div className={module.TitleMobile}>{item.image_name}</div>
      <div
        className={`${module.divSvgDXF} w-[26%] flex justify-center items-center relative`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex w-full justify-center items-center h-full">
            <div className="flex justify-center w-full items-center relative">
              <svg
              height={190}
                onClick={handleIsPopupOpen}
                viewBox={`0 0 ${getSVGWidth(item.image)} ${getSVGHeight(
                  item.image
                )}`}
                dangerouslySetInnerHTML={{ __html: item.image }}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className={module.calcItemName}>{item.image_name}</div>
        <div
          className={`mt-[28px] ${module.materialInput} flex items-center gap-[8px]`}
        >
          <div className="flex items-center">Материал:</div>
          <select
            name="material"
            id="material"
            className="w-[165px] h-[30px]"
            value={materialValues[item.id]}
            onChange={(e) => handleMaterialChange(item.id, e.target.value)}
          >
            <option value="0" hidden>
              Выберите
            </option>
            {materials.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={module.inputDivCount}>
          <div className="flex items-center">Количество: </div>
          <input
            type="text"
            className="w-[165px] h-[30px]"
            placeholder="Введите число"
            value={quantityValues[item.id]}
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          />
          <span
            className={`${module.spanPriceItem} flex items-center relative`}
          >
            цена {getPriceOneDetailByCount()}р/деталь
            <img
              ref={imgRef}
              src={queshion}
              alt="queshion"
              className="ml-[4px] w-[12px] h-[12px] flex items-center"
              onClick={hintOn}
            />
            {onQuestion && (
              <div className={module.questionWindow}>
                <div>
                  {diapazon.map((item, i) => (
                    <div key={i}>
                      От {item.countList} шт. - цена {item.TotalSumOneDetal}{" "}
                      р/деталь
                    </div>
                  ))}
                </div>
              </div>
            )}
          </span>
        </div>
        <div className={module.AllPriceItem}>
          ИТОГО: <span>{getPriceDetailByCount()} RUB</span>
        </div>
      </div>
      <div className="absolute top-0 right-0 m-[18px]">
        <img
          src={trash}
          alt="trash"
          className="cursor-pointer"
          onClick={() => handleItemRemove(item.id)}
        />
      </div>
    </div>
  );
};

export default ItemOrder;
