import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import module from "./Header.module.css";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import axios from "../../axios";

import burgerMenuIcon from "../../images/burgerMenuIcon.svg";

import cutDetalLogo from "../../images/cutdetallogo.svg";
import logoCutlPro from "../../images/logocutlpro.png";

import Login from "./Login";

const Header = () => {
  const domain = window.location.hostname;

  const [user, setUser] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      const jwtToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_auth="))
        .split("=")[1];

      axios
        .get("/user/", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((userResponse) => {
          // console.log(userResponse.data);
          setUser(userResponse.data);
        })
        .catch((error) => {
          console.log(error.response?.data.message);
        });
    }
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsLoginPopupOpen(false);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupOpen(false);
      setIsLoginPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen || isLoginPopupOpen) {
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
  }, [isPopupOpen, isLoginPopupOpen]);

  return (
    <div
      className={`${module.wrapper} w-[100%] h-[82px] appContainer flex justify-between`}
    >
      <div className="flex justify-center items-center">
        <NavLink to={"/"}>
          <img
            height={50}
            width={60}
            src={domain === "calc.cutdetal.ru" ? cutDetalLogo : logoCutlPro}
            alt="logo"
          />
        </NavLink>
      </div>

      <div className="flex items-center">
        {/* <div className={`${module.navigationWrapper} hidden lg:block`}>
          <ul
            className={`flex justify-center items-center  ${
              !user ? "mr-[10px]" : ""
            }`}
          >
            <li>Контакты</li>
            <li>Помощь</li>
            <li>Бизнес</li>
            <li>О нас</li>
          </ul>
        </div> */}

        {!user ? (
          <>
            <div
              className={`${module.userAuthButtonWrapper} hidden lg:flex items-center gap-4`}
            >
              {/* <div
                className={`${module.signUpButton} px-[22px] py-[10px] mr-[20px] ml-[10px]`}
              >
                <button>Регистрация</button>
              </div> */}
              {domain === "calc.cutdetal.ru" && (
                <div
                  onClick={() =>
                    (window.location.href = "https://cutdetal.ru/instrukciya/")
                  }
                  className={`${module.logInButton} px-[22px] py-[10px]`}
                >
                  <button>Инструкция</button>
                </div>
              )}
              <div
                onClick={toggleLoginPopup}
                className={`${module.logInButton} px-[22px] py-[10px]`}
              >
                <button>Логин</button>
              </div>
            </div>
          </>
        ) : (
          <div
            className={`${module.navigationWrapper} hidden lg:flex items-center`}
          >
            <ul className="lg:flex items-center">
              {/* <li>
                <a href="https://cutdetal.ru/instrukciya/">Инструкция</a>
              </li> */}
              {user.isAdmin && (
                <>
                  <NavLink to={"/monitoring"}>
                    <li>Мониторинг</li>
                  </NavLink>
                </>
              )}
              {user.isSuperAdmin && (
                <NavLink to={"/manage"}>
                  <li>Управление</li>
                </NavLink>
              )}
            </ul>
          </div>
        )}

        <div className="lg:hidden" onClick={togglePopup}>
          <img src={burgerMenuIcon} alt="Burger Menu Icon" />
        </div>

        <div className=" px-3 py-1 bg-blue-800 text-white rounded flex justify-center items-center cursor-pointer" >
            <div onClick={handleUpdateMaterials} className="cursor-pointer">
              <span>Обновить материалы</span>
            </div>
          </div>

        {isPopupOpen && (
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-60 z-50`}>
            {!isLoginPopupOpen ? (
              <div
                ref={popupRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-[50%]"
              >
                <div
                  className={`${module.popupItemsWrapper} flex justify-center items-center flex-col`}
                >
                  <>
                    {/* <div>
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
                    </div> */}
                    {!user ? (
                      <>
                        {/* <div>
                          <span>Регистрация</span>
                        </div> */}
                        {domain === "calc.cutdetal.ru" && (
                          <div
                            onClick={() =>
                              (window.location.href =
                                "https://cutdetal.ru/instrukciya/")
                            }
                          >
                            <span>Инструкция</span>
                          </div>
                        )}
                        <div onClick={toggleLoginPopup}>
                          <span>Логин</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          {user.isAdmin && (
                            <>
                              <NavLink onClick={togglePopup} to={"/monitoring"}>
                                <span>Мониторинг</span>
                              </NavLink>
                            </>
                          )}
                        </div>

                        <div>
                          {user.isSuperAdmin && (
                            <NavLink onClick={togglePopup} to={"/manage"}>
                              <span className="mr-[0]">Управление</span>
                            </NavLink>
                          )}
                        </div>
                      </>
                    )}
                  </>
                </div>
                <div
                  onClick={togglePopup}
                  className="absolute top-[15px] right-[15px]"
                >
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
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <Login
                setUser={setUser}
                popupRef={popupRef}
                togglePopup={togglePopup}
              />
            )}
          </div>
        )}

        {isLoginPopupOpen && !isPopupOpen && (
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-60 z-50`}>
            <Login
              setUser={setUser}
              togglePopup={toggleLoginPopup}
              popupRef={popupRef}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
