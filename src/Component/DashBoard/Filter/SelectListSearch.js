import React from "react";

const SelectListSearch = ({ dataList, setOption, label }) => {
  return (
    <div className="col-2">
        <label>{label}</label>
      <select
        className="ms-1"
        onChange={(e) => {
          setOption(e.target.value);
        }}
      >
        <option>choose..</option>
        {dataList.map((item, index) => {
          return <option key={index}>{item}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectListSearch;
