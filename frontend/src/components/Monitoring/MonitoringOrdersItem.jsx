import module from './Monitoring.module.css'

const MonitoringOrdersItem = ({
  image,
  date,
  fileName,
  material,
  count,
  price,
  dateOfOrder,
  customerName,
  phoneNumber,
  email,
  typeOfClient,
  status
}) => {
  return (
    <div
      className={`${module.listItemWrapper} px-[18px] pb-[10px] mx-[12px] lg:px-[42px] mb-[8px] lg:mb-[14px] lg:mx-[31px]`}
    >
      <div className={`flex-col lg:flex-row flex justify-between lg:items-start py-[15px] lg:py-[20px]`}>
        <div className="lg:w-1/4 lg:flex lg:justify-center">
        <img className="lg:w-[170px] h-[190px] order-1 lg:order-1" src={image} alt="imageofdxf" />
        </div>
        <div
          className={`${module.ItemInfoWrapper} lg:w-1/4 order-3 text-[16px] lg:text-[21px] flex flex-col`}
        >
          <div className='mb-[10px]'>
            <span className={`${module.titles}`}>Данные расчёта</span>
          </div>
          <div>
            <span className="font-semibold">Дата расчёта: </span>
            <span className="text-[16px] lg:text-[21px]">{date}</span>
          </div>
          <div>
            <span className="font-semibold">Имя файла: </span>
            <span className={`${module.fileName} text-[16px] lg:text-[21px]`}>
              {fileName}
            </span>
          </div>
          <div>
            <span className="font-semibold">Материал: </span>
            <span className="text-[16px] lg:text-[21px]">{material}</span>
          </div>
          <div>
            <span className="font-semibold">Количество: </span>
            <span className="text-[16px] lg:text-[21px]">{count}</span>
          </div>
          <div>
            <span className="font-semibold">Итог по цене: </span>
            <span className="text-[16px] lg:text-[21px]">{price} RUB</span>
          </div>
        </div>

        <div
          className={`${module.ItemInfoWrapper} lg:w-1/4 order-4 lg:ml-[10px] text-[16px] lg:text-[21px] flex flex-col`}
        >
          <div className='mb-[10px]'>
            <span className={`${module.titles}`}>Данные клиента:</span>
          </div>
          <div>
            <span className="font-semibold">Дата оформления: </span>
            <span className="text-[16px] lg:text-[21px]">{dateOfOrder}</span>
          </div>
          <div>
            <span className="font-semibold">Имя: </span>
            <span className={`text-[16px] lg:text-[21px]`}>
              {customerName}
            </span>
          </div>
          <div>
            <span className="font-semibold">Телефон: </span>
            <span className={`${module.fileName} text-[16px] lg:text-[21px]`}>{phoneNumber}</span>
          </div>
          <div>
            <span className="font-semibold">Email: </span>
            <span className={`${module.fileName} text-[16px] lg:text-[21px]`}>{email}</span>
          </div>
          <div>
            <span className="font-semibold">Вид клиента: </span>
            <span className="text-[16px] lg:text-[21px]">{typeOfClient}</span>
          </div>
        </div>

        <div className='lg:w-1/4 lg:ml-[10px] mt-[15px] mb-[15px] lg:mt-[0px] lg:order-4 order-2'>
        <div className={`${module.statesWrapper}  flex items-start`}>
        <span>Статус: </span>
        <span className={`${status === 'выполнен' ? module.done : module.waitingForConfirm} ml-[5px]`}>{status}</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringOrdersItem;
