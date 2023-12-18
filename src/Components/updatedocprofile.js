import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./update.css";

import "./login.css";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";

function UpdateProfileDoc() {
  const location = useLocation();
  const navigate = useNavigate();
  var yr = "";
  var spec_data = [];
  var s_data = [];
  if (location.state.spec) {
    spec_data = location.state.spec.split("(");
    // spec spec_data[0]
    s_data = spec_data[1].split(" ");
    // s_data[0] is country
    yr = parseInt(s_data[1]);
    // yr is year
  }
  let [address, setadr] = useState(location.state.address);
  let [fee, setfee] = useState(location.state.fee);
  let [qual, setqual] = useState(location.state.qual);
  let [country, setcoun] = useState(s_data[0]);
  let [spec, setspec] = useState(spec_data[0]);
  let [year, setyear] = useState(yr);
  let [reg, setreg] = useState(location.state.reg);
  let [ser, setser] = useState("");
  console.log(location.state);
  const update_ = () => {
    if (year.toString().includes("-")) {
      var yy = year.split("-");
      var y = yy[0];
    }

    //spec_data = location.state.spec.split("(");
    if (
      fee == "" ||
      qual == "" ||
      address == "" ||
      country == "" ||
      spec == "" ||
      y == "" ||
      reg == ""
    ) {
      setser("fill form");
    } else {
      axios({
        url: "http://localhost:4000/updateprofiledoc",
        method: "POST",
        params: {
          email: location.state.id,
          fee: fee,
          qual: qual,
          address: address,
          country: country,
          spec: spec,
          year: y,
          reg: reg,
        },
      })
        .then((response) => {
          if (response.data == "done") {
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
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>

      <div className="container mb-5">
        <div className="container-bo">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">Update Profile </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Your Address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={location.state.address}
                      onChange={(event) => {
                        setadr(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row mt-5 pt-2">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Your Fee</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={location.state.fee}
                      onChange={(event) => {
                        setfee(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">
                      Enter Your Qualification
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={location.state.qual}
                      onChange={(event) => {
                        setqual(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Registeration Id</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={location.state.reg}
                      onChange={(event) => {
                        setreg(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">
                      Enter Country of Specialization
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={s_data[0]}
                      onChange={(event) => {
                        setcoun(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">
                      Enter Your Specialization
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={spec_data[0]}
                      onChange={(event) => {
                        setspec(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row mt-5">
                  <div class="col-sm-10">
                    <label className="textdesign">
                      Enter Your Specialization Date
                    </label>
                    <input
                      type="Date"
                      class="form-control"
                      placeholder={yr}
                      onChange={(event) => {
                        setyear(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                    {ser}
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-10 d-flex justify-content-center mt-5">
                    <button
                      type="button"
                      class="btn irfan-dropdown"
                      onClick={update_}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3" />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default UpdateProfileDoc;
