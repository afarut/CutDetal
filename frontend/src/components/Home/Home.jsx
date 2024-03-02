import module from "./home.module.css"
import modal from "../../images/modal.png"
import upload from "../../images/upload_icon.png"

const Home = () => {

    return (
        <div className="">
          <div className={`flex h-[625px]`}>
            <div className="leftpanel w-[48%] flex justify-between items-center pl-[42px]">
              <div className={`flex flex-col ${module.title}`}>
                <span>Быстрый <br/> расчет</span>
                <span>стоимости деталей по чертежам DXF</span>
              </div>
            </div>
            <div className="w-[52%] flex justify-end">
              <div className="w-[100%] max-w-[580px] h-full p-[42px] relative" style={{
                backgroundImage: `url(${modal})`,
                }}>
                <div className="rounded-3xl bg-white w-full h-full p-[24px] flex flex-col justify-between">
                    <label htmlFor="file_DXF" className={module.windowfile}>
                        <div className="flex justify-center items-center h-full">
                            <div className=" flex flex-col gap-[56px]">
                                <div className="flex justify-center items-center"><img src={upload} alt="upload" /></div>
                                <div className={module.underuploadicon}>Или перетащите сюда ваши DXF файлы</div>
                            </div>
                        </div>
                    </label>
                    <label htmlFor="file_DXF" className={module.buttoninputfile}>Загрузить сейчас</label>
                    <input type="file" id="file_DXF" name="file_DXF" className="hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Home;

