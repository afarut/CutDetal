import LoadingProcess from "./loadingProcess";
import module from "./home.module.css";

const FormLoading = () => {
    return (
        <div className={`${module.loadPopup} absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full`}>
            <div className={`h-[472px] w-[472px] bg-white rounded-3xl ${module.loadPopupDiv}`}>
                <div className=" h-full relative">
                    <div className={`flex flex-col items-center gap-[48px] justify-center h-full ${module.divGap}`}>
                        <LoadingProcess />
                        <div className={module.processWindowText}>
                            Ваш заказ обрабатывается
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLoading;