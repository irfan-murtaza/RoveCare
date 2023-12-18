import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appdata_, Setappdata_] = useState({ data: [] });
  useEffect(() => {
    axios({
      url: "http://localhost:4000/viewdetails",
      method: "GET",
      params: { email: location.state.id },
    })
      .then((response) => {
        const data_ = response.data;

        Setappdata_({ data: data_ });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <div class="sidebar">
              <div class="sidebar-brand">
                <h2>
                  <span class="lab la-accusoft"></span>
                  <span>Rovecare</span>
                </h2>
              </div>
              <div class="sidebar-menu">
                <ul>
                  <li>
                    <a href="#" class="active">
                      <span class="las la-igloo"></span>
                      <span>DashBoard</span>
                    </a>
                  </li>
                  <li>
                    <button
                      className="buttonbtn"
                      onClick={(event) => {
                        navigate("/editprofile", { state: location.state });
                      }}
                    >
                      <span class="las la-user"></span>&nbsp; &nbsp;
                      <span>Update Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="buttonbtn"
                      onClick={(event) => {
                        navigate("/resetpassword", { state: location.state });
                      }}
                    >
                      <span class="las la-user"></span>&nbsp; &nbsp;
                      <span>Reset Password</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="buttonbtn"
                      onClick={(event) => {
                        navigate("/seedocs", { state: location.state });
                      }}
                    >
                      <span class="las la-sort"></span>&nbsp; &nbsp;
                      <span>View Doctors</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="buttonbtn"
                      onClick={(event) => {
                        navigate("/seelabs", { state: location.state });
                      }}
                    >
                      <span class="las la-calendar-check"></span>&nbsp; &nbsp;
                      <span>View Labs</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="buttonbtn"
                      onClick={(event) => {
                        navigate("/seepats", { state: location.state });
                      }}
                    >
                      <span class="las la-exclamation"></span>&nbsp; &nbsp;
                      <span>View Patients</span>
                    </button>
                  </li>
                  <li>
                    <button className="buttonbtn">
                      <span class="las la-history"></span>&nbsp; &nbsp;
                      <span>View History</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8 pt-5 ps-5">
            <div className="container bg-light">
              <div className="row">
                <div className="col-12 text-primary pb-3">
                  <h2>Welcome</h2>
                </div>
              </div>
              <div className="row ms-5 ps-5 pt-5 pb-5">
                <div className="card mb-5">
                  <div className="card-header">
                    <h4>Profile</h4>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title pt-2 pb-2 text-danger text center">
                      Admin Account
                    </h5>
                    <h5 className="card-text pt-2 pb-2">
                      Name: {appdata_.data.name}
                    </h5>
                    <h5 className="card-text pt-2 pb-2">
                      Email: {appdata_.data.email}
                    </h5>
                    <h5 className="card-text pt-2 pb-2">
                      DOB: {appdata_.data.dob}
                    </h5>
                    <button
                      className="btn btn-primary mt-4 mb-4"
                      type="button"
                      onClick={(event) => {
                        navigate("/login", { state: {}, replace: true });
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
