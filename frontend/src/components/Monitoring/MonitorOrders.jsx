import LoadingProcess from "../Home/loadingProcess.jsx";

import MonitoringOrdersItem from "./MonitoringOrdersItem";

const MonitorOrders = ({ orders, isLoading, prev, next, setCurrentPage, currentPage }) => {

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center mb-[50px]">
          <LoadingProcess />
        </div>
      ) : (
        <div>
          {orders.map((el, index) => (
            <MonitoringOrdersItem
              image={el.svg_file}
              fileName={el.dxf_file}
              date={el.date}
              count={el.count}
              material={el.material_data.name}
              nameOfFile={el.name}
              price={el.price}
              dateOfOrder={el.date}
              customerName={el.order.username}
              phoneNumber={el.order.phone_number}
              email={el.order.email}
              typeOfClient={el.order.is_individual === true ? "физ.лицо" : "юр.лицо"}
              orderId={el.order.id}
              key={index}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mb-[10px]">
        <div
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`${
            !prev && "hidden"
          } lg:px-[10px] lg:py-[8px] cursor-pointer bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
        >
          Предыдущая страница
        </div>
        <div
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`ml-[20px] ${
            !next && "hidden"
          } lg:px-[10px] lg:py-[8px] cursor-pointer bg-blue-800 rounded-[8px] py-[4px] px-[8px] text-[14px] lg:text-[18px] text-white`}
        >
          Следующая страница
        </div>
      </div>
    </div>
  );
};

export default MonitorOrders;
