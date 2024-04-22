import module from "./Footer.module.css";

import instagramIcon from "../../images/instagram.svg";
import facebookIcon from "../../images/facebook.svg";
import whatsAppIcon from "../../images/whatsapp.svg";
import telegramIcon from "../../images/telegram.svg";
import cutDetalLogo from '../../images/cutdetallogo.svg'

const Footer = () => {
  return (
    <>
      <div className="footer-wrapper w-full xl:items-center bg-white ">
        <div
          className={`${module.footerNavWrapper} appContainer flex xl:flex-row xl:justify-between flex-col xl:items-center `}
        >
          <div className="xl:pl-[42px]">
            <img className="h-[100px] w-[120px] xl:h-[50px] xl:w-[60px] cursor-pointer" src={cutDetalLogo} alt="logo" />
          </div>

          {/* <div className={`${module.navigationWrapper}`}>
            <ul className="flex xl:items-center xl:flex-row flex-col items-start">
              <li>О нас</li>
              <li>Помощь</li>
              <li>FAQ</li>
              <li>Бизнес</li>
            </ul>
          </div> */}
          <div
            className={`${module.contactsWrapper} flex items-start flex-col`}
          >
            <span className={`${module.contacts}`}>Контакты</span>
            <a href="tel:+73412460192">+7 (3412) 46-01-92</a>
            <a href="mailto:sales@cutdetal.ru">sales@cutdetal.ru</a>
          </div>
          {/* <div
            className={`${module.imagesWrapper} flex items-center xl:pr-[42px]`}
          >
            <img src={instagramIcon} alt="instagram" />
            <img src={facebookIcon} alt="facebook" />
            <img src={whatsAppIcon} alt="whatsapp" />
            <img src={telegramIcon} alt="telegram" />
          </div> */}
        </div>
      </div>
      <div
        className={`${module.projName} w-full flex justify-center items-center h-[38px]`}
      >
        <span>©2024 CutDetal</span>
      </div>
    </>
  );
};

export default Footer;
