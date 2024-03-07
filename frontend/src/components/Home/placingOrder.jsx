import module from "./home.module.css"

const PlacingOrder = ({name, handleNameChange, phoneNumber, handlePhoneNumberChange, email, handleEmailChange, isIndividual, handleTypeChange, goPrevPlacingOrder, handleSubmit}) => {
    return ( 
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
     );
}
 
export default PlacingOrder;