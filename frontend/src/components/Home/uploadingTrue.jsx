import okey from "../../images/okeydownload.svg";
import module from "./home.module.css";
import CloseWindow from "./closewindow";

const UploadingTrue = ({goCalc, windowClose}) => {
    return (
        <div className={`flex flex-col items-center gap-[16px] justify-center h-full ${module.divGap}`}>
            <div>
                <img className={module.loadPopupOkey} src={okey} alt="okey" />
            </div>
            <div className={module.processWindowText}>
                Чертежи обработаны!
            </div>
            <div className={module.buttonOkey} onClick={goCalc}>
                К расчету
            </div>
            <CloseWindow windowClose={windowClose}/>
        </div>
        
    );
}

export default UploadingTrue;