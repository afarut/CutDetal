import UploadingFalse from "./uploadingFalse";
import UploadingTrue from "./uploadingTrue";
import module from "./home.module.css";
import { useLocation } from "react-router-dom";

const LoadingFiles = ({ uploading, goCalc, windowClose, ids = [] }) => {
    const location = useLocation()
    const {pathname} = location

    return (
        <div className={`${!(pathname === "/embed-calc") && module.loadPopup} pt-[10%] absolute inset-0 flex justify-center z-20 h-full`}>
            <div className={`h-[472px] w-[472px] bg-white rounded-3xl ${module.loadPopupDiv}`}>
                <div className=" h-full relative">
                    {uploading === true ? (
                        <UploadingTrue ids={ids} goCalc={goCalc} windowClose={windowClose} />
                    ) : (
                        <UploadingFalse />
                    )}
                </div>
            </div >
        </div >
    );
}

export default LoadingFiles;