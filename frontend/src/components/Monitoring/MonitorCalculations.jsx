import { useState } from "react";
import MonitoringListItem from "./MonitoringListItem";

const MonitorCalculations = ({data}) => {
  

  return (
    <div>
      {data.map((el) => (
        <MonitoringListItem
          image={el.svg_file}
          fileName={el.dxf_file}
          date={el.date}
          count={el.count}
          material={el.material_data.name}
          price={el.price}
          name={el.name}
          key={el.id}
        />
      ))}
    </div>
  );
};

export default MonitorCalculations;
