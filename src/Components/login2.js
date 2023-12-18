import React, { useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [name, setname] = useState("");
  let [contact, setcontact] = useState("");
  let [serverres, setserverres] = useState("");
  const addDoctor = () => {
    axios({
      url: "http://localhost:4000/signup",
      method: "POST",
      params: {
        email: email,
        password: password,
        name: name,
        contact: contact,
        type: "doctor",
      },
    })
      .then((res) => {
        if (res.data == "added") {
          navigate("/doctor", { state: { id: email } });
        } else {
          setserverres(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addPatient = () => {
    axios({
      url: "http://localhost:4000/signup",
      method: "POST",
      params: {
        email: email,
        password: password,
        name: name,
        contact: contact,
        type: "patient",
      },
    })
      .then((res) => {
        if (res.data == "added") {
          navigate("/patient", { state: { id: email } });
        } else {
          setserverres(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addLab = () => {
    axios({
      url: "http://localhost:4000/signup",
      method: "POST",
      params: {
        email: email,
        password: password,
        name: name,
        contact: contact,
        type: "laboratory",
      },
    })
      .then((res) => {
        if (res.data == "added") {
          navigate("/lab", { state: { id: email } });
        } else {
          setserverres(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-4">
          <h4 className="d-flex justify-content-center">Signup </h4>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 ms-5">
            <form>
              <div className="form-group row mt-5 pt-2">
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="inputemail3"
                    placeholder="Email"
                    onChange={(event) => {
                      setemail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mt-5">
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Password"
                    onChange={(event) => {
                      setpassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mt-5 pt-2">
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputemail3"
                    placeholder="Name"
                    onChange={(event) => {
                      setname(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mt-5 pt-2">
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="inputemail3"
                    placeholder="Contact"
                    onChange={(event) => {
                      setcontact(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 d-flex justify-content-center mt-4 text-danger">
                  {serverres}
                </div>
              </div>
              <div className="form-group row pb-4">
                <div className="col-sm-10 d-flex justify-content-center mt-5">
                  <button
                    class="btn btn-primary  lastbutton me-1"
                    type="button"
                    onClick={addDoctor}
                  >
                    Doctor Signup
                  </button>
                  <button
                    class="btn btn-primary  lastbutton me-1"
                    type="button"
                    onClick={addPatient}
                  >
                    Patient Signup
                  </button>
                  <button
                    class="btn btn-primary  lastbutton"
                    type="button"
                    onClick={addLab}
                  >
                    Lab Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
