import React, { useState, useEffect, useRef } from "react";
import module from "./Header.module.css";

import burgerMenuIcon from "../../images/burgerMenuIcon.svg";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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

  return (
    <div
      className={`${module.wrapper} w-[100%] h-[82px] appContainer flex justify-between`}
    >
      <div className="flex justify-center items-center">
        <span className={`${module.logoTitle}`}>LOGO</span>
      </div>

      <div className="flex items-center">
        <div className={`${module.navigationWrapper} hidden lg:block`}>
          <ul className="flex justify-center items-center mr-[10px]">
            <li>Контакты</li>
            <li>Помощь</li>
            <li>Бизнес</li>
            <li>О нас</li>
          </ul>
        </div>

        <div
          className={`${module.userAuthButtonWrapper} hidden lg:flex items-center`}
        >
          <div
            className={`${module.signUpButton} px-[22px] py-[10px] mr-[20px]`}
          >
            <button>Регистрация</button>
          </div>
          <div className={`${module.logInButton} px-[22px] py-[10px]`}>
            <button>Логин</button>
          </div>
        </div>

        <div className="lg:hidden" onClick={() => setIsPopupOpen(true)}>
          <img src={burgerMenuIcon} alt="Burger Menu Icon" />
        </div>

        {isPopupOpen && (
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50`}>
            <div
              ref={popupRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-[50%]"
            >
              <div
                className={`${module.popupItemsWrapper} flex justify-center items-center flex-col`}
              >
                <div>
                  <span>Контакты</span>
                </div>
                <div>
                  <span>Помощь</span>
                </div>
                <div>
                  <span>Бизнес</span>
                </div>
                <div>
                  <span>О нас</span>
                </div>
              </div>
              <div onClick={togglePopup} className="absolute top-[15px] right-[15px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.61578 2.19485L32.5388 33.1178M1.61578 33.1178L32.5388 2.19485"
                    stroke="#FF6161"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
