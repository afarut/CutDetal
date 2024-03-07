import LoadingProcess from "./loadingProcess";
import module from "./home.module.css";

const UploadingFalse = () => {
    return (
        <div className="flex flex-col items-center gap-[48px] justify-center h-full">
            <LoadingProcess/>
            <div className={module.processWindowText}>
                Files in process...
            </div>
        </div>
    );
}

export default UploadingFalse;