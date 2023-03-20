import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDomainLinkData } from "../../../../Store/Actions/DomainAction";
import classes from "./ListItem.module.css";

const ListItem = ({
  isAdmin,
  _id,
  disableEditButton,
  onDisableEditButton,
  onEnableEditButton,
}) => {
  const { domainLinkData } = useSelector((state) => {
    return {
      domainLinkData: state.domainReducer.domainList.filter(
        (item) => item._id == _id
      )[0],
    };
  });

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [domain, setDomain] = useState(domainLinkData.domain);
  const [da, setDA] = useState(domainLinkData.da);
  const [ss, setSs] = useState(domainLinkData.ss);
  const [niche, setNiche] = useState(domainLinkData.niche);
  const [type, setType] = useState(domainLinkData.type);
  const [country, setCountry] = useState(domainLinkData.country);
  const [follow, setfollow] = useState(domainLinkData.isFollow);
  const [isPaid, setIsPaid] = useState(domainLinkData.isPaid);
  const [date, setDate] = useState(domainLinkData.linkdatas.date);
  const [link, setLink] = useState(domainLinkData.linkdatas.url);

  const [linkDtataChange, setLinkDtataChange] = useState(false);
  const [domainDtataChange, setDomainDtataChange] = useState(false);
  const editHandler = () => {
    setDomain(domainLinkData.domain);
    setDA(domainLinkData.da);
    setSs(domainLinkData.ss);
    setNiche(domainLinkData.niche);
    setType(domainLinkData.type);
    setCountry(domainLinkData.country);
    setIsPaid(domainLinkData.isPaid);
    setLink(domainLinkData.linkdatas.url);
    setfollow(domainLinkData.isFollow);
    setIsEdit(true);
    onDisableEditButton();
  };

  const handledDomainChange = (e) => {
    setDomain(e.target.value);
    setDomainDtataChange(true);
  };
  const handleSsChange = (e) => {
    setSs(e.target.value);
    setDomainDtataChange(true);
  };
  const handleDaChange = (e) => {
    setDA(e.target.value);
    setDomainDtataChange(true);
  };
  const handleNicheChange = (e) => {
    setNiche(e.target.value);
    setDomainDtataChange(true);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setDomainDtataChange(true);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setDomainDtataChange(true);
  };
  const handleFollowChange = (e) => {
    setfollow(e.target.value);
    setDomainDtataChange(true);
  };
  const handleIsPaidChange = (e) => {
    setIsPaid(e.target.value);
    setDomainDtataChange(true);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setLinkDtataChange(true);
  };

  const submitHandler = () => {
    let linkData = null;
    let domainData = null;
    if (linkDtataChange) {
      linkData = {
        _id: domainLinkData.linkdatas._id,
        url: link,
        date: new Date(),
      };
    }
    if (domainDtataChange) {
      domainData = {
        _id: domainLinkData._id,
        domain: domain,
        da: da,
        ss: ss,
        type: type,
        niche: niche,
        country: country,
        isFollow: follow,
        isPaid: isPaid,
      };
    }
    dispatch(updateDomainLinkData(linkData, domainData));
    setIsEdit(false);
    onEnableEditButton();
  };

  const cancelHandler = () => {
    setIsEdit(false);
    onEnableEditButton();
  };

  return isEdit ? (
    <tr>
      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.domain}
          onChange={(e) => handledDomainChange(e)}
          disabled={!isAdmin}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="number"
          className="form-control"
          defaultValue={domainLinkData.da}
          onChange={(e) => handleDaChange(e)}
          style={{ width: "80px" }}
          disabled={!isAdmin}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="number"
          className="form-control"
          defaultValue={domainLinkData.ss}
          onChange={(e) => handleSsChange(e)}
          disabled={!isAdmin}
          style={{ width: "80px" }}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.niche}
          onChange={(e) => handleNicheChange(e)}
          disabled={!isAdmin}
          style={{ width: "100px" }}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.type}
          onChange={(e) => handleTypeChange(e)}
          disabled={!isAdmin}
          style={{ width: "100px" }}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.country}
          onChange={(e) => handleCountryChange(e)}
          disabled={!isAdmin}
          style={{ width: "100px" }}
        />
      </td>
      <td className={classes["pt-3-half"]}>
        <select
          className="form-control"
          disabled={!isAdmin}
          onChange={(e) => handleFollowChange(e)}
          style={{ width: "100px" }}
        >
          <option
            defaultValue="No Follow"
            selected={domainLinkData.isFollow === "Nofollow"}
          >
            No Follow
          </option>
          <option
            defaultValue="Do Follow"
            selected={domainLinkData.isFollow === "Dofollow"}
          >
            Do Follow
          </option>
        </select>
      </td>
      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.isPaid}
          onChange={(e) => handleIsPaidChange(e)}
          disabled={!isAdmin}
        />
      </td>

      <td>{new Date(domainLinkData.linkdatas.date).toLocaleDateString()}</td>

      <td className={classes["pt-3-half"]}>
        <input
          type="text"
          className="form-control"
          defaultValue={domainLinkData.linkdatas.url}
          onChange={(e) => handleLinkChange(e)}
          style={{ width: "300px" }}
        />
      </td>

      <td>
        <div className="d-flex ">
          <span className="table-remove">
            <button
              onClick={() => {
                submitHandler();
              }}
              type="button"
              className={" btn btn-success btn-rounded btn-sm my-0 mx-1"}
            >
              Submit
            </button>
          </span>
          <span className="table-remove">
            <button
              type="button"
              className={" btn btn-danger btn-rounded btn-sm my-0 mx-1"}
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </span>
        </div>
      </td>
    </tr>
  ) : (
    <tr key={domainLinkData.id}>
      <td className={classes["pt-3-half"]}>{domainLinkData.domain}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.da}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.ss}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.niche}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.type}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.country}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.isFollow}</td>
      <td className={classes["pt-3-half"]}>{domainLinkData.isPaid}</td>
      <td className={classes["pt-3-half"]}>
        {new Date(domainLinkData.linkdatas.date).toLocaleDateString()}
      </td>
      <td className={classes["pt-3-half"]}>{domainLinkData.linkdatas.url}</td>

      <td>
        <div className="d-flex ">
          <span className="table-remove">
            <button
              onClick={editHandler}
              type="button"
              className="btn btn-success btn-rounded btn-sm my-0 mx-1"
              disabled={disableEditButton}
            >
              Edit
            </button>
          </span>
          {isAdmin && (
            <span className="table-remove">
              <button
                type="button"
                className="btn btn-danger btn-rounded btn-sm my-0 mx-1"
                disabled={disableEditButton}
              >
                Delete
              </button>
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
