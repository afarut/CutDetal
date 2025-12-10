import module from "./Footer.module.css";

import instagramIcon from "../../images/instagram.svg";
import facebookIcon from "../../images/facebook.svg";
import whatsAppIcon from "../../images/whatsapp.svg";
import telegramIcon from "../../images/telegram.svg";
import cutDetalLogo from "../../images/cutdetallogo.svg";
import logoCutlPro from "../../images/logocutlpro.png";

const Footer = () => {
  const domain = window.location.hostname;

  return (
    <>
      <div className="footer-wrapper w-full xl:items-center">
    
        <div
          className={`${module.footerNavWrapper} appContainer flex xl:flex-row xl:justify-between flex-col xl:items-center `}
        >
          <div className="xl:pl-[42px]">
            <img
              className={`${
                domain === "calc.cutdetal.ru"
                  ? "h-[100px] w-[120px] xl:h-[50px] xl:w-[60px]"
                  : "h-[70px] w-[120px] xl:h-[35px] xl:w-[60px]"
              } cursor-pointer`}
              src={domain === "calc.cutdetal.ru" ? cutDetalLogo : logoCutlPro}
              alt="logo"
            />
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
            className={`${module.contactsWrapper} flex items-start flex-col py-3`}
          >
            <span className={`${module.contacts}`}>Контакты</span>
            {domain === "calc.cutdetal.ru" ? (
              <>
                <a href="tel:+73412460192">+7 (3412) 46-01-92</a>
                <a href="mailto:sales@cutdetal.ru">sales@cutdetal.ru</a>
              </>
            ) : (
              <>
                <a href="tel:+73412650854">+7 (3412) 65-08-54</a>
                <a href="mailto:site@cutl.pro">site@cutl.pro</a>
              </>
            )}
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
        {domain === "calc.cutdetal.ru" ? <span>©2024 CutDetal</span> : <span>© 2024 ООО «Сократ Плюс»</span>}
      </div>
    </>
  );
};

export default Footer;
