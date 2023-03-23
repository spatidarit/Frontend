import React from "react";

const DomainSearch = ({ searchHandle }) => {
  return (
    <div className="col-2">
    <input
      onChange={searchHandle}
      type="search"
      placeholder="Search Domain"
      aria-label="Search"
    />
    </div>
  );
};
export default DomainSearch;
