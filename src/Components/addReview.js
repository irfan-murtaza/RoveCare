import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import "./addreviewbypat.css";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";

import "./update.css";
import "./login.css";
import "./updatepropat.css";
function Addreview() {
  const location = useLocation();
  let [rev, setrev] = useState("");
  let [rat, setrat] = useState(0);
  let [ser, setser] = useState("");
  const navigate = useNavigate();
  const addReview = () => {
    if (rat < 0 || rat > 5) {
      setser("invalid rating");
    } else if (rev == "") {
      setser("Add a review");
    } else {
      axios({
        url: "http://localhost:4000/addreview",
        method: "POST",
        params: {
          Patient: location.state.pat,
          Lab: location.state.lab,
          Rating: rat,
          Review: rev,
        },
      })
        .then((response) => {
          if (response.data == "added") {
            navigate(-1);
          } else {
            setser(response.data);
          }
        })
        .catch((err) => {
          setser("ERROR");
        });
    }
  };
  return (
    <>
      <HeaderInSession id={location.state.pat} type="patient"></HeaderInSession>
      <div className="container-pa mt-5">
        <div className="container gt">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">Add Review </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div className="form-group row mt-5 pt-2">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Review"
                      onChange={(event) => {
                        setrev(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rating (0-5) "
                      onChange={(event) => {
                        setrat(parseInt(event.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                  {ser}
                </div>
                <div className=" mt-5 col-sm-10 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn irfan-dropdown"
                    onClick={addReview}
                  >
                    Add Review
                  </button>
                </div>
              </form>
            </div>
            <div className="col-3" />
          </div>
        </div>

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

export default Addreview;
