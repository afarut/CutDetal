import { useState, useEffect } from "react";
import module from "./home.module.css"

const PlacingOrder = ({ name, handleNameChange, phoneNumber, handlePhoneNumberChange, email, handleEmailChange, isIndividual, handleTypeChange, goPrevPlacingOrder, handleSubmit, comment, handleCommentChange }) => {
  const [requiredTrue, setRequiredTrue] = useState(true)
  useEffect(() => {
    if (name !== "" && phoneNumber !== "" && email !== "") {
      setRequiredTrue(false);
    } else {
      setRequiredTrue(true);
    }
  }, [name, phoneNumber, email]);
  return (
    <div>
      <div className={`absolute inset-0 flex justify-center pt-[6%] bg-opacity-60 bg-black z-20 h-full ${module.divCalculate}`}>
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
                <div
                  className={`flex flex-col gap-[8px] ${module.inputDivPOrder}`}
                >
                  <label htmlFor="comment">Комментарий</label>
                  <textarea
                    type="text"
                    id="comment"
                    placeholder="Оставьте комментарий"
                    maxLength={210}
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </div>
              </div>
              <div className={`flex gap-[8px] mt-[20px] ${module.buttonPlacing}`}>
                <div
                  className={`lg:!w-1/2 w-full ${module.buttonsOrderRow1} cursor-pointer`}
                  onClick={goPrevPlacingOrder}
                >
                  Вернуться к файлам
                </div>
                <button
                  className={`lg:!w-1/2 w-full ${module.buttonsOrderRow2} cursor-pointer`}
                  onClick={handleSubmit}
                  disabled={requiredTrue}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacingOrder;