import module from "./home.module.css";
import modal from "../../images/modal.png";
import upload from "../../images/upload_icon.png";
import docIcon from "../../images/doc icon.png";
import fileIcon from "../../images/document-file-sharing.png";
import setting from "../../images/settings icon.png";

const LandingPage = ({getRootProps, getInputProps}) => {
    return ( 
        <div className="homepage">
        <div className={`relative ${module.contentWrapper}`}>
          <div className={`flex h-auto gap-[16px] ${module.mainLabel}`}>
            <div
              className={`${module.leftpanelLabel} flex justify-between items-center pl-[42px]`}
            >
              <div className={`flex flex-col ${module.title}`}>
                <span>Быстрый расчет</span>
                <span>стоимости деталей по чертежам DXF</span>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`min-w-[570px] max-w-[625px] h-full p-[42px] relative ${module.pcInputLabel}`}
                style={{
                  backgroundImage: `url(${modal})`,
                  backgroundSize: "cover",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="rounded-3xl bg-white w-full h-full p-[24px] flex flex-col gap-[24px] justify-between">
                  <div className={`cursor-pointer ${module.windowfile}`}>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="flex flex-col gap-[56px]">
                        <div className="flex justify-center items-center">
                          <img src={upload} alt="upload" />
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
          <div
            className={`mt-[75px] mb-[75px] px-[5vw] lg:px-[125px] md:px-[5%] py-[75px] flex flex-col md:flex-row gap-[5vw] ${module.rowLables}`}
          >
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={fileIcon}
                  className="h-[84px] w-[108px]"
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                  Загрузите <br /> файлы DXF
                </div>
              </div>
              <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div>
            </div>
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={setting}
                  className="h-[84px] w-[84px]"
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                  Загрузите <br /> файлы DXF
                </div>
              </div>
              <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div>
            </div>
            <div className="rounded-3xl flex flex-col gap-[12px] bg-white px-[42px] py-[31px]">
              <div className="flex flex-col gap-[12px] items-center">
                <img
                  src={docIcon}
                  className="h-[84px] w-[75px] "
                  alt="docIcon"
                />
                <div className={module.iconlabel}>
                  Загрузите <br /> файлы DXF
                </div>
              </div>
              <div className={module.textlabelsblock}>
                Загрузить один или несколько DXF файлов для обработки
              </div>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default LandingPage;