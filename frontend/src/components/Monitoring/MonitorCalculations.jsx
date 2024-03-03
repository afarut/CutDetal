import emptyImage from "../../images/emptyImage.png";

import MonitoringListItem from "./MonitoringListItem";

const MonitorCalculations = () => {
    const data = [
        {
          id: 1,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 2,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 3,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 4,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 5,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 6,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
        {
          id: 7,
          image: emptyImage,
          date: "25.01.2024",
          fileName: "file.dxf",
          material: "Алюминий",
          count: 10000,
          price: 70000,
        },
      ];

  return (
    <div>
      {data.map((el) => (
        <MonitoringListItem
          image={el.image}
          fileName={el.fileName}
          date={el.date}
          count={el.count}
          material={el.material}
          price={el.price}
          key={el.id}
        />
      ))}
    </div>
  );
};

export default MonitorCalculations;
