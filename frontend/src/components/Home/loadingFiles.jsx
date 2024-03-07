import UploadingFalse from "./uploadingFalse";
import UploadingTrue from "./uploadingTrue";
import module from "./home.module.css";

const LoadingFiles = ({ uploading, goCalc, windowClose }) => {
    return (
        <div className={`${module.loadPopup} absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full`}>
            <div className={`h-[472px] w-[472px] bg-white rounded-3xl ${module.loadPopupDiv}`}>
                <div className=" h-full relative">
                    {uploading === true ? (
                        <UploadingTrue goCalc={goCalc} windowClose={windowClose} />
                    ) : (
                        <UploadingFalse />
                    )}
                </div>
            </div >
        </div >
    );
}

export default LoadingFiles;