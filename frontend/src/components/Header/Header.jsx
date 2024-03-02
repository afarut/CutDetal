import module from "./Header.module.css";

const Header = () => {
  return (
    <div
      className={`${module.wrapper} w-[100%] h-[82px] appContainer flex justify-between`}
    >
      <div className="flex justify-center items-center">
        <span className={`${module.logoTitle}`}>LOGO</span>
      </div>

      <div className="flex items-center">
        <div className={`${module.navigationWrapper}`}>
          <ul className="flex justify-center items-center mr-[10px]">
            <li>Контакты</li>
            <li>Помощь</li>
            <li>Бизнес</li>
            <li>О нас</li>
          </ul>
        </div>

        <div className={`${module.userAuthButtonWrapper} flex items-center`}>
          <div className={`${module.signUpButton} px-[22px] py-[10px] mr-[20px]`}>
            <button>Регистрация</button>
          </div>
          <div className={`${module.logInButton} px-[22px] py-[10px]`}>
            <button>Логин</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
