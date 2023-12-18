import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DocAppoinmentDetail from "./DocAppoinmentDetail";
import AppointData from "./appointmentDetail";
import HeaderInSession from "./HeaderInSession";
import "./appointdoc.css";

import Footer from "./footer";
function ViewAppoints() {
  const location = useLocation();
  let [appdata_, Setappdata_] = useState([]);
  const [filter, setFilter] = useState("pending");
  useEffect(() => {
    axios({
      url: "http://localhost:4000/viewappointments",
      method: "GET",
    })
      .then((response) => {
        const data_ = response.data;
        console.log(data_);
        Setappdata_(data_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  var mydata = [];
  if (location.state.type == "doctor") {
    mydata = appdata_.filter((d) => {
      return d.Doctor == location.state.id;
    });
  } else if (location.state.type == "patient") {
    mydata = appdata_.filter((d) => {
      return d.Patient == location.state.id;
    });
  }
  const disp = mydata.map((d) => {
    if (location.state.type == "doctor") {
      if (d.Status == filter) {
        return (
          <DocAppoinmentDetail
            demail={d.Doctor}
            pemail={d.Patient}
            doc={d.Dname}
            pat={d.Pname}
            id_={d.ID_}
            date={d.Date}
            slot={d.Slot}
            status={d.Status}
            type={location.state.type}
          />
        );
      }
    } else if (location.state.type == "patient") {
      if (d.Status == filter) {
        return (
          <AppointData
            doc={d.Dname}
            Demail={d.Doctor}
            Pemail={d.Patient}
            pat={d.Pname}
            id_={d.ID_}
            date={d.Date}
            slot={d.Slot}
            status={d.Status}
            type={location.state.type}
          />
        );
      }
    }
  });
  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "79vh",
          paddingBottom: "2.5rem",
        }}
      >
        <HeaderInSession
          id={location.state.id}
          type={location.state.type}
        ></HeaderInSession>
        <h1
          style={{
            color: "#a62869",
            fontWeight: "bolder",
            fontFamily: "italic",
          }}
          className="d-flex justify-content-center mt-5 mb-5"
        >
          Your Appoinments
        </h1>
        <div className="container mt-3 myfont">
          <div className="row pt-2 pb-2">
            <div className="col-3 d-flex justify-content-center">
              <button
                className="btn irfan-dropdown"
                type="button"
                onClick={(event) => {
                  setFilter("pending");
                }}
              >
                Pending
              </button>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <button
                className="btn irfan-dropdown"
                type="button"
                onClick={(event) => {
                  setFilter("approved");
                }}
              >
                Approved
              </button>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <button
                className="btn irfan-dropdown"
                type="button"
                onClick={(event) => {
                  setFilter("completed");
                }}
              >
                Compeleted
              </button>
            </div>
            <div className="col-3 d-flex justify-content-center">
              <button
                className="btn irfan-dropdown"
                type="button"
                onClick={(event) => {
                  setFilter("cancelled");
                }}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
        {disp}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            height: "2.5rem",
            width: "100%",
          }}
        >
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default ViewAppoints;
