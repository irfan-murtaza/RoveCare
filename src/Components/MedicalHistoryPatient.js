import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

import HeaderInSession from "./HeaderInSession";
import { storage } from "./firebase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

function MedicalHistoryPatient(props) {
  let [labname, setlabname] = useState("*");
  const location = useLocation();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const handleDownload = (appID_) => {
    console.log(appID_);
    const fileeRef = ref(storage, `files/${appID_}.pdf`);
    getDownloadURL(fileeRef).then((url) => {
      setUrl(url);
      window.open(url, "_blank");
      console.log("usr", url);
    });
  };
  useEffect(() => {
    axios({
      url: "http://localhost:4000/labname",
      method: "GET",
      params: { email: props.LabEmail },
    })
      .then((response) => {
        setlabname(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const disp_download_pdf = (appID_, status) => {
    if (status == "Completed") {
      return (
        <td className="td-slots">
          <button
            className="btn btn-link"
            type="button"
            onClick={(event) => {
              handleDownload(appID_);
            }}
          >
            View PDF Report
          </button>
        </td>
      );
    }
  };

  return (
    <>
      <td style={{ color: "#a62869" }} className="td-slots">
        {props.count}
      </td>
      <td style={{ color: "#a62869" }} className="td-slots">
        {props.appID}
      </td>
      <td style={{ color: "#a62869" }} className="td-slots">
        {props.result}
      </td>
      <td style={{ color: "#a62869" }} className="td-slots">
        {props.TestName}
      </td>
      <td style={{ color: "#a62869" }} className="td-slots">
        <button
          className="btn btn-link"
          type="button"
          onClick={(event) => {
            navigate("/suggestedlab", {
              state: {
                labemail: props.LabEmail,
                id: props.pat,
                appID: props.appID,
                stat: props.Status,
                type: "patient",
              },
            });
          }}
        >
          {labname}
        </button>
      </td>
      <td style={{ color: "#a62869" }} className="td-slots">
        {props.LabEmail}
      </td>
      <td className="td-slots">{props.Status}</td>
      {disp_download_pdf(props.appID, props.Status)}
    </>
  );
}
export default MedicalHistoryPatient;
