import trash from "../../images/trash.svg";
import queshion from "../../images/queshion.svg";
import module from "./home.module.css";
import CloseWindow from "./closewindow";

const Calculate = ({goPlacingOrder, windowClose, data, materialValues, handleMaterialChange, materials, quantityValues, handleQuantityChange, handleItemRemove}) => {
  function getSVGWidth(svgString) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(svgString, 'text/xml');
      const svgElement = xmlDoc.getElementsByTagName('svg')[0];
      return svgElement.getAttribute('width');
  }

  function getSVGHeight(svgString) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(svgString, 'text/xml');
      const svgElement = xmlDoc.getElementsByTagName('svg')[0];
      return svgElement.getAttribute('height');
  }
    return ( 
        <div className="absolute inset-0 flex justify-center pt-[6%] bg-opacity-60 bg-black z-20 h-full">
          <div className="bg-white w-full h-[740px] mx-[42px] rounded-3xl relative pt-[16px]">
            <div className={module.titleCalc}>Расчет стоимости деталей</div>
            <div
              className={`flex flex-col gap-[14px] max-h-[650px] relative overflow-scroll overflow-x-hidden pt-[12px] ${module.divScroll}`}
            >
              {data.map((item, index) => (
                <div key={index} className={module.cartCalc}>
                  <div className="w-[26%] flex justify-center items-center relative">
                  <div className="w-full h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <div className="flex justify-center items-center relative">
                        <svg 
                            height="190" 
                            viewBox={`0 0 ${getSVGWidth(item.image)} ${getSVGHeight(item.image)}`} 
                            dangerouslySetInnerHTML={{ __html: item.image }}
                            xmlns="http://www.w3.org/2000/svg" 
                            preserveAspectRatio="xMinYMin meet"
                          />
                      </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className={module.calcItemName}>{item.image_name}</div>
                    <div
                      className={`mt-[28px] ${module.materialInput} flex items-center gap-[8px]`}
                    >
                      <div className="flex items-center">Материал:</div>
                      <select
                        name="material"
                        id="material"
                        className="w-[165px] h-[30px]"
                        value={materialValues[index]}
                        onChange={(e) =>
                          handleMaterialChange(index, e.target.value)
                        }
                      >
                        <option value="0" hidden>Выберите</option>
                        {
                          materials.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className={module.inputDivCount}>
                      <div className="flex items-center">Количество: </div>
                      <input
                        type="text"
                        className="w-[165px] h-[30px]"
                        placeholder="Введите число"
                        value={quantityValues[index]}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                      <span
                        className={`${module.spanPriceItem}  flex items-center`}
                      >
                        цена 70р/деталь{" "}
                        <img
                          src={queshion}
                          alt="queshion"
                          className="ml-[4px] w-[12px] h-[12px] flex items-center"
                        />{" "}
                      </span>
                    </div>
                    <div className={module.AllPriceItem}>
                      ИТОГО: <span>285.000</span> RUB
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 m-[18px]" >
                    <img src={trash} alt="trash" className="cursor-pointer" onClick={() => handleItemRemove(index)}/>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <div className={module.buttonOkey} onClick={goPlacingOrder}>
                  Далее
                </div>
              </div>
            </div>
            <CloseWindow windowClose={windowClose} />
          </div>
        </div>
     );
}
 
export default Calculate;