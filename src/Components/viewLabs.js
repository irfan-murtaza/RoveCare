import React, { useState, useEffect } from "react";
import axios from "axios";
import LabProfile from "./labprofile";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import HeaderInSession from "./HeaderInSession";

function ViewLabs() {
  let [appdata_, Setappdata_] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seelabs",
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
  console.log(appdata_);
  const disp = appdata_.map((d) => {
    return (
      <LabProfile
        name={d.name}
        email={d.email}
        contact={d.contact}
        address={d.address}
      ></LabProfile>
    );
  });
  return (
    <>
      {show_Header()}
      <div className="container mt-4">
        <div className="row">
          <h3 className="col-12 d-flex justify-content-center mt-5">
            Laboratories
          </h3>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">{disp}</div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
}

export default ViewLabs;
