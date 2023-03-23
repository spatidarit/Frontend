import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const DaSearch = ({ setDaData, setDaLimit }) => {
  const [check, setCheck] = useState(true);
  const [da, setDa] = useState("");
  useEffect(() => {
    if (da != "") {
      setCheck(false);
    } else setCheck(true);
  }, [da]);
  return (
    <div className="col-2 " style={{ marginLeft:"20px"}}>
      <input
        onChange={(e) => {
          setDa(e.target.value);
          setDaData(e.target.value);
        }}
        type="number"
        placeholder="DA"
        style={{ width: "50px" }}
      />
      <select
        onChange={(e) => {
          setDaLimit(e.target.value);
        }}
        disabled={check}
      >
        <option>choose..</option>
        <option>Equal to</option>
        <option>Grater then</option>
        <option>Less then</option>
      </select>
    </div>
  );
};

export default DaSearch;
