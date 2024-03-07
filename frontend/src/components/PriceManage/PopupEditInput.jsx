import { useState } from "react";

import module from "./PriceManage.module.css";

const PopupEditInput = ({start, stop, price, onChange}) => {
    const [value, setValue] = useState(price)

    const handleChange = (e) => {
        setValue(e.target.value)
        onChange(e.target.value)
    }
  return (
    <div>
      <label htmlFor="ranges_1" className={`${module.fieldDesc}`}>
        От {start} до {stop}м:{" "}
      </label>
      <input
        id="ranges_1"
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default PopupEditInput;
