import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SsSearch = ({ setSsData, setSsLimit }) => {
  const [check, setCheck] = useState(true);
  const [ss, setSs] = useState("");
  useEffect(() => {
    if (ss != "") {
      setCheck(false);
    } else setCheck(true);
  }, [ss]);
  return (
    <>
      <div className="col-2 ms-1">
        <input
          onChange={(e) => {
            setSs(e.target.value);
            setSsData(e.target.value);
          }}
          type="number"
          placeholder="SS"
          style={{ width: "50px" }}
        />
        <select
          onChange={(e) => {
            setSsLimit(e.target.value);
          }}
          disabled={check}
        >
          <option>choose..</option>
          <option>Equal to</option>
          <option>Grater then</option>
          <option>Less then</option>
        </select>
      </div>
    </>
  );
};

export default SsSearch;
