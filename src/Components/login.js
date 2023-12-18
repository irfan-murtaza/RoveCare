import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "./footer";

import "./login.css";

function Log() {
  const navigate = useNavigate();
  let [username, setusername] = useState("");
  let [password, setpassword] = useState("");
  let [serverres, setserverres] = useState("");
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const Auth = () => {
    axios({
      url: "http://localhost:4000/signin",
      method: "POST",
      params: { username, password },
    })
      .then((response) => {
        if (response.data == "doctor") {
          navigate("/doctor", { state: { id: username, type: "doctor" } });
        } else if (response.data == "admin") {
          navigate("/admin", { state: { id: username, type: "admin" } });
        } else if (response.data == "patient") {
          navigate("/seedocspat", { state: { id: username, type: "patient" } });
        } else if (response.data == "laboratory") {
          navigate("/lab", { state: { id: username, type: "laboratory" } });
        } else if (
          response.data == "invalid credentials" ||
          response.data == "fill form"
        ) {
          setserverres("**" + response.data + "**");
          setUsernameErr(true);
          setpasswordErr(true);
        } else {
          setserverres("** Service Unavailable **");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div className="container-padtop">
        <div className="container-bord">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">SIGN IN </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div className="form-group row mt-5 pt-2">
                  <div className="col-sm-10">
                    <input
                      style={{
                        border: usernameErr
                          ? "2px solid red"
                          : "1px solid black",
                      }}
                      type="email"
                      className="form-control this.state.inputClass"
                      id="inputemail3"
                      placeholder="Email"
                      onChange={(event) => {
                        setusername(event.target.value);
                      }}
                    />

                    {usernameErr}
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-sm-10">
                    <input
                      style={{
                        border: passwordErr
                          ? "2px solid red"
                          : "1px solid black",
                      }}
                      type="password"
                      className="form-control this.state.inputClass"
                      id="inputPassword3"
                      placeholder="Password"
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                    />
                    {passwordErr}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10 d-flex justify-content-center mt-4 text-danger">
                    {serverres}
                  </div>
                </div>
                <div className="form-group row pb-4">
                  <div className="col-sm-10 d-flex justify-content-center mt-5 paddddd">
                    <button
                      className="button1"
                      // class="btn btn-primary main login-bstyle"
                      type="button"
                      onClick={Auth}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Log;
