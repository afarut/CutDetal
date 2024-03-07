import krest from "../../images/krestik.svg";
import module from "./home.module.css";

const CloseWindow = ({windowClose}) => {
    return (
        <div
            className={`${module.rotatedImage} absolute right-0 top-0 m-[16px] cursor-pointer`}
            onClick={windowClose}
        >
            <img src={krest} alt="okey" />
        </div>
    );
}

export default CloseWindow;