import React, { useState, useEffect } from "react";
import axios from "axios";
import DocProfile from "./docprofile";
import Header from "./header";
function ViewDocs() {
  let [appdata_, Setappdata_] = useState([]);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seedocs",
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
      <DocProfile
        name={d.name}
        email={d.email}
        contact={d.contact}
        address={d.address}
      ></DocProfile>
    );
  });
  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <h3 className="col-12 d-flex justify-content-center mt-5">Doctors</h3>
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

export default ViewDocs;
