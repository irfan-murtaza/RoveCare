import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Spinner from "react-spinkit";
import HeaderInSession from "./HeaderInSession";
import "./dashboard.css";
function LabDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appdata_, Setappdata_] = useState({ data: [] });
  const [url, setUrl] = useState("");
  const storage = getStorage();
  const [loading, setLoading] = useState(true);
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
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    const imageRef = ref(storage, `Upload/${location.state.id}`);
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    });
  }, []);
  const delete_ = () => {
    axios({
      url: "http://localhost:4000/deleteuser",
      method: "POST",
      params: { email: location.state.id },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "deleted") {
          navigate("/", { state: {} });
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };
  return (
    <div>
      {loading && (
        <div
          style={{
            display: "flex",
            marginTop: "350px",
            justifyContent: "center",
          }}
        >
          <Spinner name="circle" style={{ width: 100, height: 100 }} />
        </div>
      )}
      {!loading && (
        <>
          <HeaderInSession
            id={location.state.id}
            type={location.state.type}
          ></HeaderInSession>
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
                              navigate("/updateprofile", {
                                state: {
                                  id: location.state.id,
                                  type: "laboratory",
                                  name: appdata_.data.name,
                                  contact: appdata_.data.contact,
                                  address: appdata_.data.address,
                                },
                              });
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
                              navigate("/resetpassword", {
                                state: location.state,
                              });
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
                              navigate("/myappointslab", {
                                state: location.state,
                              });
                            }}
                          >
                            <span class="las la-user"></span>&nbsp; &nbsp;
                            <span>My Appointments</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/addtest", { state: location.state });
                            }}
                          >
                            <span class="las la-sort"></span>&nbsp; &nbsp;
                            <span>Add Test</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/viewtests", { state: location.state });
                            }}
                          >
                            <span class="las la-calendar-check"></span>&nbsp;
                            &nbsp;
                            <span>View Tests</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/viewreviews", {
                                state: {
                                  Labemail: location.state.id,
                                  id: location.state.id,
                                  type: "laboratory",
                                },
                              });
                            }}
                          >
                            <span class="las la-exclamation"></span>&nbsp;
                            &nbsp;
                            <span>View Reviews</span>
                          </button>
                        </li>
                        <li>
                          <button className="buttonbtn" onClick={delete_}>
                            <span class="las la-user"></span>&nbsp; &nbsp;
                            <span>Delete Account</span>
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
                        <h2 style={{ marginLeft: "450px", fontWeight: "bold" }}>
                          Welcome
                        </h2>
                      </div>
                    </div>
                    <div className="row ms-5 ps-5 pt-5 pb-5">
                      <div style={{ marginLeft: "90px" }} className="card mb-5">
                        <div className="card-header">
                          <h4>{appdata_.data.name}</h4>
                        </div>
                        <div className="card-body">
                          <center>
                            <img
                              style={{
                                borderRadius: 150,
                                height: 200,
                                width: 50,
                              }}
                              className="round w30"
                              src={url}
                              alt="user"
                            />

                            <h5 className="card-text pt-2 pb-2">
                              Email: {appdata_.data.email}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Address: {appdata_.data.address}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Phone no: {appdata_.data.contact}
                            </h5>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default LabDashboard;
