import CloseWindow from "./closewindow";
import okey from "../../images/okeydownload.svg";

const FormUpload = ({windowClose}) => {
    return ( 
        <div className="absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full">
          <div className="h-[472px] w-[472px] bg-white rounded-3xl ">
            <div className=" h-full relative">
              <div className="flex flex-col items-center gap-[26px] justify-center h-full">
                <div>
                  <img src={okey} alt="okey" />
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