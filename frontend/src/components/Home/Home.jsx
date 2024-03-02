import module from "./home.module.css"
import modal from "../../images/modal.png"

const Home = () => {

  return (
    <div className = "">
      <div className={`flex h-[625px]`}>
        <div className="leftpanel w-[48%] flex justify-between items-center pl-[42px]">
            <div className={`flex flex-col  ${module.title}`}><span>Быстрый <br/> расчет</span><span>стоимости деталей по чертежам DXF</span></div>
        </div>
        <div className="w-[52%] flex justify-end">
            <div className="w-[580px] h-full" style={{
                backgroundImage: `url(${modal})`,
                }}>
                <label htmlFor="file_DXF" className="p-[24px]">
                    <div></div>
                </label>
                <input type="file" id="file_DXF" name="file_DXF"  className=""/>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;

