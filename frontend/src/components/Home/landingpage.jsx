import module from "./home.module.css";
import modal from "../../images/modal.png";
import upload from "../../images/upload_icon.png";
import docIcon from "../../images/doc icon.png";
import fileIcon from "../../images/document-file-sharing.png";
import setting from "../../images/settings icon.png";

const LandingPage = ({getRootProps, getInputProps}) => {
    return ( 
        <div className="homepage">
        <div className={`relative`}>
          <div className={`flex h-auto gap-[16px] ${module.mainLabel}`}>
            <div
              className={`${module.leftpanelLabel} flex xl:w-2/3 justify-between items-center pl-[42px]`}
            >
              <div className={`flex flex-col ${module.title}`}>
                <span className="xl:!text-[70px]">Онлайн расчет</span>
                <span className="xl:!text-[70px]">стоимости деталей по <br /> чертежам DXF</span>
              </div>
            </div>
            <div className="xl:w-1/3 p-0">
            <div className="flex w-full justify-end">
              <div
                className={`min-w-[450px] max-w-[575px] h-full px-10 py-6 relative ${module.pcInputLabel}`}
                style={{
                  backgroundImage: `url(${modal})`,
                  backgroundSize: "cover",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="rounded-3xl bg-white w-full h-full p-[16px] flex flex-col gap-4 justify-between">
                  <div className={`cursor-pointer ${module.windowfile}`}>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="flex flex-col gap-8">
                        <div className="flex justify-center items-center">
                          <img src={upload} alt="upload" className="w-[18%]"/>
                        </div>
                        <div className={module.underuploadicon}>
                          Или перетащите сюда ваши DXF файлы
                        </div>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="file_DXF" className={module.buttoninputfile}>
                    Загрузить сейчас
                  </label>
                </div>
              </div>
              <div className={module.buttonMobileDiv}>
                <label
                  htmlFor="file_DXF"
                  {...getRootProps()}
                  className={module.buttoninputfileMobile}
                >
                  Загрузить сейчас
                </label>
              </div>
            </div>
            </div>
          </div>
          <div
            className={`mt-16 mb-16 px-[5vw] lg:px-[125px] md:px-[5%] py-12 flex flex-col md:flex-row justify-around gap-[5vw] ${module.rowLables}`}
          >
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-7 flex-1">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={fileIcon}
                  className="w-[6rem]"
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                  Загрузите <br /> файлы DXF
                </div>
              </div>
              {/* <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div> */}
            </div>
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-7 flex-1">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={setting}
                  className="w-[4.75rem]"
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                  Выберите материал <br/> и количество
                </div>
              </div>
              {/* <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div> */}
            </div>
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-7 flex-1">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={docIcon}
                  className="w-[4.5rem] "
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                Отправьте детали <br/> на изготовление
                </div>
              </div>
              {/* <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div> */}
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default LandingPage;