import React, { useState } from "react";
import "./filter.css";

const filters = [
  {
    type: "Color",
    options: [
      { key: "Red", value: false },
      { key: "Blue", value: false },
      { key: "Green", value: false },
    ],
  },
  {
    type: "Gender",
    options: [
      { key: "Men", value: false },
      { key: "Women", value: false },
    ],
  },
  {
    type: "Price",
    options: [
      { key: "0 - Rs. 250", from: 0, to: 250, value: false },
      { key: "Rs. 251 - 450", from: 251, to: 450, value: false },
      { key: "Rs. 451 & above", from: 451, to: Number.MAX_VALUE, value: false },
    ],
  },
  {
    type: "Type",
    options: [
      { key: "Polo", value: false },
      { key: "Hoodie", value: false },
      { key: "Basic", value: false },
    ],
  },
];

export default function Filter(props) {
  const [filtersSelected, setFilters] = useState(filters);

  const onHandleChange = (e, type, option) => {
    const { filterArray } = props;
    let newArr = filtersSelected;

    filtersSelected.forEach((obj, index) => {
      if (obj.type === type) {
        obj.options.forEach((opt, idx) => {
          if (opt.key === option) {
            newArr[index].options[idx].value = e.target.checked;
          }
        });
      }
    });
    // console.log(newArr);
    setFilters(newArr);
    filterArray(newArr);
  };

  return (
    <div className="filter">
      {filters &&
        filters.length &&
        filters.map((filter) => {
          const { type, options } = filter;
          return (
            <div className="wrapper" key={type}>
              <div className="type">{type}</div>
              {options &&
                options.length &&
                options.map((option, index) => (
                  <div className="options" key={option.key}>
                    {" "}
                    <input
                      key={option.key}
                      onChange={(e) => onHandleChange(e, type, option.key)}
                      type="checkbox"
                      id={`${option.key}_${index}`}
                      name={option.key}
                      value=""
                    />
                    <label htmlFor={option.key}> {option.key}</label>
                  </div>
                ))}
            </div>
          );
        })}
    </div>
  );
}
