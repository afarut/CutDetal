import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const PopupSvg = ({ image, height, width, setIsClosePopup }) => {
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsClosePopup(false);
      }
    };
    useEffect(() => {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.body.style.overflow = "auto";
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div ref={popupRef} className="bg-white w-[80%] h-[60%] rounded-lg overflow-hidden relative">
      <button className="absolute top-3 right-3 z-20" type="button" onClick={() => setIsClosePopup(false)}>
            <svg
              width="33"
              height="33"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.61578 2.19485L32.5388 33.1178M1.61578 33.1178L32.5388 2.19485"
                stroke="#FF6161"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        <div className="p-4 w-full h-[100%]">
          <TransformWrapper limitToBounds={false} centerOnInit={true}>
            <TransformComponent wrapperClass="!w-full !h-[100%]">
              <svg
                onClick={() => setIsClosePopup(true)}
                height="190"
                viewBox={`0 0 ${width} ${height}`}
                dangerouslySetInnerHTML={{ __html: image }}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin meet"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default PopupSvg;
