import React, { useState, useEffect } from "react";
import axios from "axios";
import PatProfile from "./patprofile";
import Header from "./header";
function ViewPats() {
  let [appdata_, Setappdata_] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seepats",
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
    return (
      <PatProfile
        name={d.name}
        email={d.email}
        contact={d.contact}
        dob={d.dob}
      ></PatProfile>
    );
  });
  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <h3 className="col-12 d-flex justify-content-center mt-5">
            Patients
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

export default ViewPats;
