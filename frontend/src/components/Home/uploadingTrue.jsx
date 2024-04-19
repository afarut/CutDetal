import okey from "../../images/okeydownload.svg";
import module from "./home.module.css";
import CloseWindow from "./closewindow";
import { useLocation } from "react-router-dom";

const UploadingTrue = ({ goCalc, windowClose, ids = [] }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className={`flex flex-col items-center gap-[16px] justify-center h-full ${module.divGap}`}
    >
      <div>
        <img className={module.loadPopupOkey} src={okey} alt="okey" />
      </div>
      <div className={module.processWindowText}>Чертежи обработаны!</div>
      {(pathname === "/embed-calc" && ids.length !== 0) ? (
        <a className="w-[90%] h-[50px] mr-[5%] ml-[5%] text-[23px]" href={`/?ids=${ids.join('&ids=')}`} target="_top">
          <div className={module.buttonOkey} onClick={goCalc}>
            К расчету
          </div>
        </a>
      ) : (
        <div className={module.buttonOkey} onClick={goCalc}>
          К расчету
        </div>
      )}
      <CloseWindow windowClose={windowClose} />
    </div>
  );
};

export default UploadingTrue;
