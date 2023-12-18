import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderInSession from "./HeaderInSession";
import "./update.css";
import "./login.css";
import "./updatepropat.css";

import Footer from "./footer";

import "./login.css";
import "./update.css";
function UpdateProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  let [name_, setname] = useState(location.state.name);
  let [address, setadr] = useState(location.state.address);
  let [contact, setcont] = useState(location.state.contact);
  let [ser, setser] = useState("");
  const update_ = () => {
    if (name_ == "" || address == "" || contact == "") {
      setser("fill form");
    } else {
      axios({
        url: "http://localhost:4000/updateprofile",
        method: "POST",
        params: {
          email: location.state.id,
          name: name_,
          contact: contact,
          address: address,
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

      <div className="container-pa">
        <div className="container gt">
          <div className="row">
            <h4 className="d-flex justify-content-center">Update Profile </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div class="form-group row mt-4">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Your Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={name_}
                      onChange={(event) => {
                        setname(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row mt-4">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Your Contact</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={contact}
                      onChange={(event) => {
                        setcont(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row mt-4">
                  <div class="col-sm-10">
                    <label className="textdesign">Enter Your Address</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder={address}
                      onChange={(event) => {
                        setadr(event.target.value);
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
                  <div class="col-sm-10 d-flex justify-content-center mt-3">
                    <button
                      type="button"
                      class="btn btn-primary"
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
      <div className="bg">
        <Footer></Footer>
      </div>
    </>
  );
}

export default UpdateProfile;
