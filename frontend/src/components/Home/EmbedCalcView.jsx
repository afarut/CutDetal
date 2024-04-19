import upload from "../../images/upload_icon.png";

import module from "./home.module.css";

// import styles from './EmbedCalcView.css'

const EmbedCalcView = ({getRootProps, getInputProps}) => {
    return (
        <div className="embedCalcView h-[100vh]">
              <div
                className={`h-full p-4 relative`}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="rounded-3xl bg-white w-full h-full flex flex-col gap-[24px] justify-between">
                  <div style={{borderColor: 'rgb(148, 148, 148)'}} className={`cursor-pointer border-[5px] border-dashed rounded-3xl h-[90%] w-full`}>
                    <div className="flex justify-center items-center h-full w-full">
                      <div className="flex flex-col gap-8">
                        <div className="flex justify-center items-center">
                          <img className="w-[35%]" src={upload} alt="upload" />
                        </div>
                        <div className={`${module.underuploadicon} !text-2xl`}>
                          Или перетащите сюда ваши DXF файлы
                        </div>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="file_DXF" className={`${module.buttoninputfile} !p-3 !text-2xl`}>
                    Загрузить сейчас
                  </label>
                </div>
              </div>
            </div>
    )
}

export default EmbedCalcView