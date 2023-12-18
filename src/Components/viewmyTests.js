import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TestDetail from "./testDetails";
import Footer from "./footer";
import Header from "./header";
import HeaderInSession from "./HeaderInSession";

function ViewMyTest() {
  const location = useLocation();
  const navigate = useNavigate();
  let [appdata_, Setappdata_] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/viewtests",
      method: "GET",
    })
      .then((response) => {
        const data_ = response.data;
        Setappdata_(data_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const mydata = appdata_.filter((d) => {
    return d.Lab == location.state.id;
  });
  const disp = mydata.map((d) => {
    return (
      <>
        <TestDetail name={d.TestName} price={d.Price} lab={d.Lab}></TestDetail>
      </>
    );
  });
  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>
      <div className="container mt-4">
        <div className="row">
          <h3
            style={{ fontWeight: "bolder" }}
            className="col-12 d-flex justify-content-center mt-5"
          >
            Lab Tests
          </h3>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">{disp}</div>
          <div className="col-3"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewMyTest;
