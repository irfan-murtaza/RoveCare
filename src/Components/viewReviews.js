import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import HeaderInSession from "./HeaderInSession";
import ReviewDetails from "./reviewDetails";

import "./updatepropat.css";
import Header from "../Header";
function ViewReviews() {
  const location = useLocation();
  let [appdata_, Setappdata_] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seereviews",
      method: "GET",
      params: { email: location.state.Labemail },
    })
      .then((response) => {
        const data_ = response.data;
        Setappdata_(data_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  const show_Header = () => {
    if (location.state.id) {
      return (
        <HeaderInSession
          id={location.state.id}
          type={location.state.type}
        ></HeaderInSession>
      );
    } else {
      return <Header></Header>;
    }
  };

  return (
    <>
      {show_Header()}
      <div className="container mt-4">
        <div className="row">
          <h3 className="col-12 d-flex justify-content-center mt-5">
            Lab Reviews
          </h3>
        </div>
        <div className="row mt-5">
          <div className="col-3"></div>
          <div className="col-6">{disp}</div>
          <div className="col-3"></div>
        </div>
      </div>
      <div style={{ position: "relative", bottom: 0, width: "100%" }}>
        <Footer />
      </div>
    </>
  );
}

export default ViewReviews;
