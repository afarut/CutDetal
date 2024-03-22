import module from "./home.module.css";
import CloseWindow from "./closewindow";
import error from "../../images/error.jpg"
const ErrorPopup = ({windowClose, idConfirm}) => {
    return (
        <div className={`${module.loadPopup} absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full`}>
            <div className={`h-[472px] w-[472px] bg-white rounded-3xl ${module.loadPopupDiv}`}>
                <div className=" h-full relative">
                    <div className={`flex flex-col items-center gap-[16px] justify-center h-full ${module.divGap}`}>
                        <div>
                        <img src={error} alt="error" />
                        </div>
                        <div className={`${module.processWindowText} justify-center`}>
                            Ошибка оформления заказа!<br/>
                            <div className={module.textErrorPopup}>Для оформления заказа напишите письмо в sales@cutdetal.ru с указанием номера заказа <b>#{idConfirm}</b></div>
                        </div>
                        <CloseWindow windowClose={windowClose}/>
                    </div>
                </div>
            </div >
        </div >
    );
}
 
export default ErrorPopup;