import { useState } from "react";
import { useDropzone } from "react-dropzone";
import module from "./home.module.css";
import modal from "../../images/modal.png";
import upload from "../../images/upload_icon.png";
import docIcon from "../../images/doc icon.png";
import fileIcon from "../../images/document-file-sharing.png";
import setting from "../../images/settings icon.png";
import okey from "../../images/okeydownload.svg";
import krest from "../../images/krestik.svg";
import trash from "../../images/trash.svg";
import queshion from "../../images/queshion.svg";
import { convertBase64 } from "../../utils/convertBase64";
import { motion } from "framer-motion";

import axios from '../../axios.js'

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [calculate, setCalculate] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isIndividual, setIsIndividual] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formUpload, setFormUpload] = useState(false);
  const [materialValues, setMaterialValues] = useState(Array(6).fill(0));
  const [quantityValues, setQuantityValues] = useState(Array(6).fill(""));

  const handleMaterialChange = (index, value) => {
    const newMaterialValues = [...materialValues];
    newMaterialValues[index] = value;
    setMaterialValues(newMaterialValues);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantityValues = [...quantityValues];
    newQuantityValues[index] = value;
    setQuantityValues(newQuantityValues);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTypeChange = (event) => {
    setIsIndividual(event.target.id === "Физическое лицо");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlacingOrder(false);
    setFormLoading(true);
    ///тут запрос к бд
    //если вернуло статус ок, то
    setFormLoading(false);
    setFormUpload(true);
  };

//   function getJwtTokenFromCookie() {
//     // Code to extract JWT token from cookie, replace 'jwtToken' with your actual cookie name
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('jwtToken='))
//         .split('=')[1];
//     return cookieValue;
// }

  const onDrop = async (acceptedFiles) => {
    setLoading(true);
    let error = false;

    acceptedFiles.forEach((file) => {
      if (!file.name.endsWith(".dxf")) {
        error = true;
        setVisibleError(true);

        setTimeout(() => {
          setVisibleError(false);
        }, 3000);

        return;
      }
    });

    if (error) {
      setLoading(false);
      setUploading(false);
      setFiles([]);
      return;
    }

    try {
      const convertedFiles = await Promise.all(
        acceptedFiles.map(convertBase64)
      );
      setFiles(convertedFiles);
      console.log(convertedFiles[0].replace("data:application/octet-stream;base64,", ""))
      const jwtToken = document.cookie.split('; ').find(row => row.startsWith('_auth=')).split('=')[1]
      console.log(jwtToken)
      axios
        .post(
          "/dxf/",
          { base64file: convertedFiles[0].replace("data:application/octet-stream;base64,", "") },
          {
          headers: {
            Authorization: `Bearer ${jwtToken}` // Include JWT token in Authorization header
        }}
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error.message);
        });
      setUploading(true);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".dxf",
    multiple: true,
  });

  const windowClose = (event) => {
    event.preventDefault();
    setLoading(false);
    setUploading(false);
    setFiles([]);
    setFormUpload(false);
  };

  const goCalc = () => {
    setUploading(false);
    setCalculate(true);
    setLoading(false);
  };

  const goPlacingOrder = () => {
    setCalculate(false);
    setPlacingOrder(true);
  };

  const goPrevPlacingOrder = () => {
    setPlacingOrder(false);
    setCalculate(true);
  };

  return (
    <div className="">
      {visibleError ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 w-full"
        >
          <div className="flex justify-center mt-[24px]">
            <div className="py-[8px] w-[300px] z-50 rounded-3xl text-white bg-red-600 flex justify-center items-center">
              !!! Загрузите только .dxf файлы !!!
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
      {loading && (
        <div className="absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full">
          <div className="h-[472px] w-[472px] bg-white rounded-3xl ">
            <div className=" h-full relative">
              {uploading === true ? (
                <div className="flex flex-col items-center gap-[26px] justify-center h-full">
                  <div>
                    <img src={okey} alt="okey" />
                  </div>
                  <div className={module.processWindowText}>
                    Files are ready!
                  </div>
                  <div className={module.buttonOkey} onClick={goCalc}>
                    К расчету
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-[48px] justify-center h-full">
                  <div className={module.processWindow}></div>
                  <div className={module.processWindowText}>
                    Files in process...
                  </div>
                </div>
              )}
              <div
                className={`${module.rotatedImage} absolute right-0 top-0 m-[16px] cursor-pointer`}
                onClick={windowClose}
              >
                <img src={krest} alt="okey" />
              </div>
            </div>
          </div>
        </div>
      )}
      {formLoading ? (
        <div className="absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full">
          <div className="h-[472px] w-[472px] bg-white rounded-3xl ">
            <div className=" h-full relative">
              <div className="flex flex-col items-center gap-[48px] justify-center h-full">
                <div className={module.processWindow}></div>
                <div className={module.processWindowText}>
                  Обработка запроса...
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {formUpload ? (
        <div className="absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full">
          <div className="h-[472px] w-[472px] bg-white rounded-3xl ">
            <div className=" h-full relative">
              <div className="flex flex-col items-center gap-[26px] justify-center h-full">
                <div>
                  <img src={okey} alt="okey" />
                </div>
                <div className={module.processWindowText}>
                  Ваш заказ принят!
                </div>
                <div className="text-[25px] text-center">
                  Наши менеджеры
                  <br />
                  свяжутся с вами
                </div>
              </div>
              <div
                className={`${module.rotatedImage} absolute right-0 top-0 m-[16px] cursor-pointer`}
                onClick={windowClose}
              >
                <img src={krest} alt="okey" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {calculate ? (
        <div className="absolute inset-0 flex justify-center pt-[6%] bg-opacity-60 bg-black z-20 h-full">
          <div className="bg-white w-full h-[740px] mx-[42px] rounded-3xl relative pt-[16px]">
            <div className={module.titleCalc}>Расчет стоимости деталей</div>
            <div
              className={`flex flex-col gap-[14px] max-h-[650px] relative overflow-scroll overflow-x-hidden pt-[12px] ${module.divScroll}`}
            >
              {[0, 1, 2, 3, 4, 5].map((item, index) => (
                <div key={index} className={module.cartCalc}>
                  <div className="w-[26%] h-[190px] flex justify-center items-center">
                    <img src={trash} alt="trash" className="h-full px-[8px]" />
                  </div>
                  <div className="flex flex-col">
                    <div className={module.calcItemName}>File.dxf</div>
                    <div
                      className={`mt-[28px] ${module.materialInput} flex items-center gap-[8px]`}
                    >
                      <div className="flex items-center">Материал:</div>
                      <select
                        name="material"
                        id="material"
                        className="w-[165px] h-[30px]"
                        value={materialValues[index]} // Привязываем значение материала к состоянию
                        onChange={(e) =>
                          handleMaterialChange(index, e.target.value)
                        } // Обработчик изменения материала
                      >
                        <option value="0">Выберите</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>
                    <div className={module.inputDivCount}>
                      <div className="flex items-center">Количество: </div>
                      <input
                        type="text"
                        className="w-[165px] h-[30px]"
                        placeholder="Введите число"
                        value={quantityValues[index]} // Привязываем значение количества к состоянию
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        } // Обработчик изменения количества
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
                  <div className="absolute top-0 right-0 m-[18px]">
                    <img src={trash} alt="trash" />
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <div className={module.buttonOkey} onClick={goPlacingOrder}>
                  Далее
                </div>
              </div>
            </div>
            <div
              className={`${module.rotatedImage} absolute right-0 top-0 m-[16px] cursor-pointer`}
              onClick={windowClose}
            >
              <img src={krest} alt="okey" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {placingOrder ? (
        <div>
          <div className="absolute inset-0 flex justify-center pt-[10%] bg-opacity-60 bg-black z-20 h-full">
            <div className="h-[max-content] w-[540px] bg-white rounded-3xl px-[36px] py-[28px]">
              <div className="h-full relative">
                <div className="">
                  <div className={`mb-[24px] ${module.placingTitle}`}>
                    Оформление заказа
                  </div>
                  <div className="flex flex-col gap-[22px]">
                    <div
                      className={`flex flex-col gap-[8px] ${module.inputDivPOrder}`}
                    >
                      <label htmlFor="name">Имя*</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Введите ваше имя"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div
                      className={`flex flex-col gap-[8px] ${module.inputDivPOrder}`}
                    >
                      <label htmlFor="phoneNumber">Телефон*</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        placeholder="Введите ваш номер"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                    </div>
                    <div
                      className={`flex flex-col gap-[8px] ${module.inputDivPOrder}`}
                    >
                      <label htmlFor="email">Email*</label>
                      <input
                        type="text"
                        id="email"
                        placeholder="Введите адрес электронной почты"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div
                      className={`flex flex-col gap-[8px] ${module.inputDivPOrder}`}
                    >
                      <label>Вы являетесь:*</label>
                      <div className="items-center flex-row-reverse">
                        <input
                          type="radio"
                          id="Физическое лицо"
                          checked={isIndividual}
                          onChange={handleTypeChange}
                        />
                        <label
                          htmlFor="Физическое лицо"
                          className="ml-[2px] text-[18px]"
                        >
                          Физическое лицо
                        </label>
                      </div>
                      <div className="items-center flex-row-reverse">
                        <input
                          type="radio"
                          id="Юридическое лицо"
                          checked={!isIndividual}
                          onChange={handleTypeChange}
                        />
                        <label
                          htmlFor="Юридическое лицо"
                          className="ml-[2px] text-[18px]"
                        >
                          Юридическое лицо
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={`flex gap-[8px] mt-[20px]`}>
                    <div
                      className={`w-1/2 ${module.buttonsOrderRow1}`}
                      onClick={goPrevPlacingOrder}
                    >
                      Вернуться к файлам
                    </div>
                    <div
                      className={`w-1/2 ${module.buttonsOrderRow2}`}
                      onClick={handleSubmit}
                    >
                      Оформить заказ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
    </div>
  );
};

export default Home;
