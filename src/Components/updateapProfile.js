import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./update.css";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";
import { confirmAlert } from "react-confirm-alert";
function UpdateaptProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  let [name_, setname] = useState("");
  let [dob, setdob] = useState("");
  const [count, setcount] = useState(0);
  let [contact, setcont] = useState("");
  let [ser, setser] = useState("");
  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
          onClick: () => setcount(count + 1),
        },
      ],
    });
  };
  const update_ = () => {
    if (name_ == "" || dob == "" || contact == "") {
      setser("fill form");
    } else {
      axios({
        url: "http://localhost:4000/editprofile",
        method: "POST",
        params: {
          email: location.state.id,
          name: name_,
          contact: contact,
          dob: dob,
        },
      })
        .then((response) => {
          if (response.data == "done") {
            submit("Profile Updated Sucessfully");
          } else {
            submit("Server Error");
          }
        })
        .catch((err) => {
          submit("Server Error");
        });
    }
  };
  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>

      <div className="container">
        <div className="row mt-4">
          <h4 className="d-flex justify-content-center">Update Profile </h4>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 ms-5">
            <form>
              <div class="form-group row mt-5 pt-2">
                <div class="col-sm-10">
                  <label className="textdesign">Enter Your Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={location.state.name}
                    onChange={(event) => {
                      setname(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group row mt-5">
                <div class="col-sm-10">
                  <label className="textdesign">Enter Your Contact</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder={location.state.contact}
                    onChange={(event) => {
                      setcont(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div class="form-group row mt-5">
                <div class="col-sm-10">
                  <label className="textdesign">Enter Your DOB</label>
                  <input
                    type="date"
                    class="form-control"
                    placeholder={location.state.dob}
                    onChange={(event) => {
                      setdob(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                  {ser}
                </div>
              </div>
              <div class="form-group row mb-5">
                <div class="col-sm-10 d-flex justify-content-center mt-5">
                  <button
                    className="irfan-dropdown mt-4 mb-5"
                    type="button"
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
      <Footer></Footer>
    </>
  );
}

export default UpdateaptProfile;
