import upload from "../../images/upload_icon.png";

import module from "./home.module.css";

const EmbedCalcView = ({getRootProps, getInputProps}) => {
    return (
        <div className="">
              <div
                className={`h-full p-[42px] relative ${module.pcInputLabel}`}
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
    )
}

export default EmbedCalcView