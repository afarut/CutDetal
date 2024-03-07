import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import settingsIcon from "../../images/settings.svg";
import manageIcon from "../../images/manage.svg";
import module from "./Manage.module.css";

const Manage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fileSize, setFileSize] = useState("");
  const popupRef = useRef(null);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (event) => {
    setFileSize(event.target.value);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
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
  }, [isPopupOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(fileSize);
    setFileSize('')
    closePopup();
  };

  return (
    <div className={`flex justify-center items-center flex-col lg:flex-row my-[60px] gap-[20px] lg:my-[0] lg:h-[70vh]`}>
      <NavLink to={'/manage/price'}>
      <div className={`${module.settingsWrapper} lg:h-[466px] lg:w-[466px] h-[330px] w-[330px] flex justify-center items-center flex-col`}>
        <img className='h-[185px] w-[185px] lg:h-[260px] lg:w-[260px]' src={settingsIcon} alt='settings' />
        <span className={`${module.settingsTitle} text-[28px] lg:text-[40px] leading-[30px] lg:leading-[49px]`}>Управление ценой</span>
      </div>
      </NavLink>
      <div className={`${module.settingsWrapper} lg:h-[466px] lg:w-[466px] h-[330px] w-[330px] flex py-[21px] justify-center items-center flex-col`} onClick={openPopup}>
        <img className='h-[185px] w-[185px] lg:h-[260px] lg:w-[260px]' src={manageIcon} alt='manage' />
        <span className={`${module.settingsTitle} text-[28px] lg:text-[40px] leading-[30px] lg:leading-[49px]`}>Управление размером файлов</span>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
          <div ref={popupRef} className="bg-white rounded-[33px] px-[19px] py-[17px] lg:px-[22px] w-[373px] h-[315px] lg:w-[603px] lg:h-[267px]">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <span className={`${module.priceManageTitle} text-[30px] lg:text-[37px] w-[330px]`}>Управление размером файла</span>
                <button type="button" onClick={closePopup}>
                  <svg
                    width="43"
                    height="43"
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
                </button>
              </div>
              <div className={`${module.inputWrapper} flex items-center`}>
                <label htmlFor="fileSize" className="mr-[5px]">Максимальный: </label>
                <input
                    type="text"
                    id="fileSize"
                    className="w-[75px] lg:w-[130px]"
                    value={fileSize}
                    onChange={handleInputChange}
                />
                <span className="ml-[8px]">Kb</span>
              </div>
              <div className="flex justify-center items-center mt-[25px] flex-col lg:flex-row">
                <div className={`${module.cancelButton} w-full lg:w-1/3 flex justify-center items-center`}>
                    <button>Отмена</button>
                </div>
                <div className={`${module.closeButton} w-full mt-[8px] lg:mt-[0] lg:w-2/3 flex justify-center items-center lg:ml-[13px]`}>
                <button
                    type="submit"
                >
                    Сохранить
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
