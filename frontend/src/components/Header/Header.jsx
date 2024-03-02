import React, { useState, useEffect } from "react";
import module from "./Header.module.css";
import burgerMenuIcon from '../../images/burgerMenuIcon.svg'

const Header = () => {
  // State to manage the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle the popup state
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    // Disable scrolling on the body when the popup is open
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupOpen]);

  return (
    <div className={`${module.wrapper} w-[100%] h-[82px] appContainer flex justify-between`}>
      <div className="flex justify-center items-center">
        <span className={`${module.logoTitle}`}>LOGO</span>
      </div>

      <div className="flex items-center">
        <div className={`${module.navigationWrapper} hidden lg:block`}>
          {/* Navigation Links */}
          <ul className="flex justify-center items-center mr-[10px]">
            <li>Контакты</li>
            <li>Помощь</li>
            <li>Бизнес</li>
            <li>О нас</li>
          </ul>
        </div>

        <div className={`${module.userAuthButtonWrapper} hidden lg:flex items-center`}>
          {/* Authentication Buttons */}
          <div className={`${module.signUpButton} px-[22px] py-[10px] mr-[20px]`}>
            <button>Регистрация</button>
          </div>
          <div className={`${module.logInButton} px-[22px] py-[10px]`}>
            <button>Логин</button>
          </div>
        </div>

        {/* Burger Menu Icon */}
        <div className="lg:hidden" onClick={togglePopup}>
          <img src={burgerMenuIcon} alt="Burger Menu Icon" />
        </div>

        {/* Popup */}
        {isPopupOpen && (
          <div className={`${module.popup} fixed inset-0 bg-gray-800 bg-opacity-75 z-50`}>
            {/* Content of the popup */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
              <p>Popup content goes here</p>
              <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
