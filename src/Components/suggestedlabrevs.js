import React, { useState, useEffect } from "react";
import ReviewDetails from "./reviewDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./update.css";
function Revs(props) {
  const location = useLocation();
  let [appdata_, Setappdata_] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seereviews",
      method: "GET",
      params: { email: props.email },
    })
      .then((response) => {
        const data_ = response.data;
        Setappdata_(data_);
        console.log(appdata_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appdata_]);
  const disp = appdata_.map((d) => {
    return (
      <>
        <ReviewDetails
          pat={d.Patient}
          rat={d.Rating}
          rev={d.Review}
        ></ReviewDetails>
      </>
    );
  });
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <h3 className="labtest">Lab Reviews</h3>
        </div>
        <div className="row ms-3">{disp}</div>
      </div>
    </>
  );
}

export default Revs;
