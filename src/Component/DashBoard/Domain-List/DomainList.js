import React from "react";
import { useSelector } from "react-redux";
import UploadDomains from "../../Overlays/UploadDomains";
import DomainDataList from "../Lists/DomainDataList/DomainDataList";

const DomianList = () => {
  const { role } = useSelector((state) => ({
    role: state.authReducer.role,
  }));
  const isAdmin = role == "ADMIN";
  return (
    <div className="container">
      <UploadDomains />
      <DomainDataList isAdmin={isAdmin} />
    </div>
  );
};
export default DomianList;
