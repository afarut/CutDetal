import CloseWindow from "./closewindow";
import okey from "../../images/okeydownload.svg";
import module from "./home.module.css";

const  FormUpload = ({windowClose}) => {
    return ( 
        <div className={`${module.loadPopup} absolute inset-0 flex justify-center pt-[10%] z-20 h-full`}>
        <div className={`h-[472px] w-[472px] bg-white rounded-3xl ${module.loadPopupDiv}`}>
            <div className=" h-full relative">
            <div className={`flex flex-col items-center gap-[26px] justify-center h-full ${module.divGap}`}>
                <div>
                  <img src={okey} alt="okey" className={module.loadPopupOkey} />
                </div>
                <div className={module.processWindowText}>
                  Ваш заказ принят!
                </div>
                <div className="text-[25px] text-center">
                  Наши менеджеры
                  <br />
                  свяжутся с вами
                </div>
              </div>
              <CloseWindow windowClose={windowClose} />
            </div>
          </div>
        </div>

        
     );
}
 
export default FormUpload;