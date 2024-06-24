import pencilIcon from "../../images/pencil.svg";
import trashIcon from "../../images/trash.svg";

import axios from '../../axios.js'

import module from "./PriceManage.module.css";

const PriceManageItem = ({
  setPopupVisible,
  name,
  weigth,
  priceForSquareMeter,
  ranges,
  material,
  setCurrentMaterial,
  isDeleting,
  setIsDeleting,
  priseVrezka,
  daval
}) => {
  const editClickHandler = () => {
    setCurrentMaterial(material);
    setPopupVisible(true);
  }; 

  const handleDelete = () => {
    setIsDeleting(true);

    const jwtToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="))
      .split("=")[1];

    axios
      .delete(`/material/${material.id}/`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setIsDeleting(false)
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      className={`${module.PriceManageItem} w-full mb-[10px] py-[13px] lg:px-[25px] px-[13px]`}
    >
      <div className="mb-[8px] flex justify-between ">
        <span className={`${module.nameOfMaterial} text-[24px]`}>{name}</span>
        <div className="flex items-center">
          {/* <img
            height={27}
            className="mr-[15px] lg:ml-[17px] cursor-pointer"
            onClick={editClickHandler}
            src={pencilIcon}
            alt="pencil"
          /> */}
          <img height={27} className="cursor-pointer" onClick={handleDelete} src={trashIcon} alt="trash" />
        </div>
      </div>

      <div
        className={`${module.materialInfoWrapper} flex justify-start flex-col lg:flex-row`}
      >
        <div
          className={`${module.materialInfoContainer} flex flex-col lg:mr-[135px]`}
        >
          <span className={`${module.titleInfo} mb-[5px]`}>
            Цена в зависимости от метража:
          </span>
          <div>
            <span className={`${module.fieldDesc}`}>За м&#178;: </span>
            <span>{priceForSquareMeter} RUB</span>
          </div>
          <div>
            <span className={`${module.fieldDesc}`}>Вес 1м&#178;: </span>
            <span>{weigth}</span>
          </div>
          <div>
            <span className={`${module.fieldDesc}`}>Цена врезки: </span>
            <span>{priseVrezka} RUB</span>
          </div>
          <div>
            <span className={`${module.fieldDesc}`}>Цена, если давальческий: </span>
            <span>{daval} RUB</span>
          </div>
        </div>
        <div className={`${module.materialInfoContainer} flex flex-col`}>
          <span className={`${module.titleInfo} mb-[5px]`}>За пог. метр:</span>
          {ranges.sort((a, b) => a.start - b.start).map((el) => (
            <div key={el.id}>
              <span className={`${module.fieldDesc}`}>
                От {el.start} до {el.finish}м:{" "}
              </span>
              <span>{el.price} RUB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceManageItem;
