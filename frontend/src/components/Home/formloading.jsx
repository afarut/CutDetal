import LoadingProcess from "./loadingProcess";
import module from "./home.module.css";

const FormLoading = () => {
    return ( 
      <div className={`flex flex-col items-center gap-[48px] justify-center h-full ${module.divGap}`}>
          <LoadingProcess/>
          <div className={module.processWindowText}>
              Ваш заказ обрабатывается
          </div>
      </div>
     );
}
 
export default FormLoading;