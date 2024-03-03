import emptyImage from "../../images/emptyImage.png";

import MonitoringOrdersItem from "./MonitoringOrdersItem";

const MonitorOrders = () => {
  const data = [
    {
      id: 1,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'подтверждение'
    },
    {
      id: 2,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
    {
      id: 3,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
    {
      id: 4,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
    {
      id: 5,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
    {
      id: 6,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
    {
      id: 7,
      image: emptyImage,
      date: "25.01.2024",
      fileName: "file.dxf",
      material: "Алюминий",
      count: 10000,
      price: 70000,
      dateOfOrder: "25.01.2024",
      customerName: "Владимир",
      phoneNumber: "+729222131",
      email: "example@mail.com",
      typeOfClient: "физ.лицо",
      status:'выполнен'
    },
  ];

  return (
    <div>
      {data.map((el) => (
        <MonitoringOrdersItem
          image={el.image}
          fileName={el.fileName}
          date={el.date}
          count={el.count}
          material={el.material}
          price={el.price}
          dateOfOrder={el.dateOfOrder}
          customerName={el.customerName}
          phoneNumber={el.phoneNumber}
          email={el.email}
          typeOfClient={el.typeOfClient}
          status={el.status}
          key={el.id}
        />
      ))}
    </div>
  );
};

export default MonitorOrders;
