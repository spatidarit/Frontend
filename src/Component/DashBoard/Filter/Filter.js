import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domainDataAction } from "../../../Store/AppReducer";
import DaSearch from "./DaSearch";
import DomainSearch from "./DomainSearch";
import SelectListSearch from "./SelectListSearch";
import SsSearch from "./SsSeacrh";
const Filter = () => {
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state.domainReducer);
  const searchHandle = (event) => {
    let regex = new RegExp(`${event.target.value}`);
    const match = reducer.domainList.filter((item) => regex.test(item.domain));
    dispatch(domainDataAction.setSerachDomainList(match));
  };

  const [daData, setDaData] = useState("");
  const [ssData, setSsData] = useState("");
  const [daLimit, setDaLimit] = useState("");
  const [ssLimit, setSsLimit] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [isFollow, setIsFollow] = useState("");

  const search = () => {
    const emptyCheckAray = ["", "choose.."];
    let searchData = reducer.domainList;
    debugger;
    if (!emptyCheckAray.includes(isPaid)) {
      searchData = searchData.filter((item) => {
        if (item.isPaid == isPaid) return item;
      });
    }
    if (!emptyCheckAray.includes(isFollow)) {
      searchData = searchData.filter((item) => {
        if (item.isFollow == isFollow) return item;
      });
    }
    if (!emptyCheckAray.includes(daLimit) && daData != "") {
      searchData = searchDa(searchData, daData, daLimit);
    }
    if (!emptyCheckAray.includes(ssLimit) && ssData != "") {
      searchData = searchSs(searchData, ssData, ssLimit);
    }
    dispatch(domainDataAction.setSerachDomainList(searchData));
  };

  const searchDa = (searchData, da, copamre) => {
    switch (copamre) {
      case "Equal to":
        return searchData.filter((item) => item.da == da);
      case "Grater then":
        return searchData.filter((item) => item.da > da);
      case "Less then":
        return searchData.filter((item) => item.da < da);
    }
  };

  const searchSs = (searchData, ss, copamre) => {
    switch (copamre) {
      case "Equal to":
        return searchData.filter((item) => item.ss == ss);
      case "Grater then":
        return searchData.filter((item) => item.ss > ss);
      case "Less then":
        return searchData.filter((item) => item.ss < ss);
    }
  };
  return (
    <form>
      <div className="row mt-5">
        <DomainSearch searchHandle={searchHandle} />
        <DaSearch setDaData={setDaData} setDaLimit={setDaLimit} />
        <SsSearch setSsData={setSsData} setSsLimit={setSsLimit} />
        <SelectListSearch
          dataList={["NoFollow", "Dofollow"]}
          label={"is Follow"}
          setOption={setIsFollow}
        />
        <SelectListSearch
          dataList={["Paid", "UnPaid"]}
          label={"is Paid"}
          setOption={setIsPaid}
        />
      </div>
     
      <div className="row mt-2">
      <div className="col-4">
        <button
          className="btn btn-warning"
          onClick={(e) => {
            e.preventDefault();
            search();
          }}
        >
          search
        </button>
        <button
          type="reset"
          className="btn btn-danger ms-1"
          onClick={() => {
            dispatch(domainDataAction.setSerachDomainList(reducer.domainList));
          }}
        >
          Reset
        </button>
      </div>
      </div>
    </form>
  );
};
export default Filter;
