import React, { useState, useEffect } from "react";
import axios from "axios";
import LabProfile2 from "./Labprofilepat";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import HeaderInSession from "./HeaderInSession";

import Footer from "./footer";
function ViewLabsPat() {
  const location = useLocation();
  let [appdata_, Setappdata_] = useState([]);
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
  const disp = appdata_.map((d) => {
    if (location.state.id) {
      return (
        <LabProfile2
          name={d.name}
          Labemail={d.email}
          contact={d.contact}
          address={d.address}
          id={location.state.id}
          type={location.state.type}
        ></LabProfile2>
      );
    } else {
      return (
        <LabProfile2
          name={d.name}
          Labemail={d.email}
          contact={d.contact}
          address={d.address}
        ></LabProfile2>
      );
    }
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
            Laboratories
          </h3>
        </div>
        <div className="row">
          <div className="">{disp}</div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ViewLabsPat;
