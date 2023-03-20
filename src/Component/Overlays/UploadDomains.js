import React, { useState } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.css";
import { toast } from "react-toastify";
import DomainListApi from "../../API/DomainListApi";

const UploadDomains = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const api = new DomainListApi();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    let file = document.getElementById("csvFile").files[0];
    formData.append("file", file);
    api.addDomains(formData).then((response) => {
      toast(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const element = (
    <div
      className="modal fade"
      id="domainModal"
      tabndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" align="center">
        <div className={"modal-content " + style.mod}>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Domain List
            </h5>
            <button
              type="button"
              className="btn text-warning"
              data-bs-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className={"modal-body " + style.modBody}>
              <div className="form-group">
                <label
                  htmlFor="recipient-name"
                  className={"col-form-label " + style.modLabel}
                >
                  List Csv:
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="form-control"
                  id="csvFile"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Upload List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(element, document.getElementById("overlays"));
};
export default UploadDomains;
