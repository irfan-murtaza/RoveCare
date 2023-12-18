import React, { useState, useEffect } from "react";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
import HeaderInSession from "./HeaderInSession";
import Spinner from "react-spinkit";
function PatientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appdata_, Setappdata_] = useState({ data: [] });
  const [loading, setLoading] = useState(true);

  const [imageId, setImageId] = useState("");
  const [url, setUrl] = useState("");
  const storage = getStorage();

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
          <div className="scroll">
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
                                navigate("/editprofile", {
                                  state: {
                                    id: location.state.id,
                                    type: "patient",
                                    name: appdata_.data.name,
                                    contact: appdata_.data.contact,
                                    dob: appdata_.data.dob,
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
                                  state: {
                                    id: location.state.id,
                                    type: "patient",
                                  },
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
                                navigate("/seedocspat", {
                                  state: {
                                    id: location.state.id,
                                    type: "patient",
                                  },
                                });
                              }}
                            >
                              <span class="las la-calendar-check"></span>&nbsp;
                              &nbsp;
                              <span>View Doctors</span>
                            </button>
                          </li>
                          <li>
                            <button
                              className="buttonbtn"
                              onClick={(event) => {
                                navigate("/seelabspat", {
                                  state: {
                                    id: location.state.id,
                                    type: "patient",
                                  },
                                });
                              }}
                            >
                              <span class="las la-calendar-check"></span>&nbsp;
                              &nbsp;
                              <span>View Labs</span>
                            </button>
                          </li>
                          <li>
                            <button
                              className="buttonbtn"
                              onClick={(event) => {
                                navigate("/viewappointments", {
                                  state: {
                                    id: location.state.id,
                                    type: "patient",
                                  },
                                });
                              }}
                            >
                              <span class="las la-calendar-check"></span>&nbsp;
                              &nbsp;
                              <span>My Appointments</span>
                            </button>
                          </li>
                          <li>
                            <button
                              className="buttonbtn"
                              onClick={(event) => {
                                navigate("/myhistory", {
                                  state: location.state,
                                });
                              }}
                            >
                              <span class="las la-history"></span>&nbsp; &nbsp;
                              <span>View History</span>
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
                  <div className="col-8 ps-5">
                    <div className="container bg-light">
                      <div className="row ms-5 ps-5 pt-5 pb-5">
                        <div className="">
                          <div class="card-container bodyyy ">
                            <img className="round w30" src={url} alt="user" />

                            <h3 style={{ color: "white", fontWeight: "bold" }}>
                              {appdata_.data.name}
                            </h3>
                            <h6 style={{ color: "white" }}>
                              {appdata_.data.dob}
                            </h6>
                            <h6 style={{ color: "white" }}>
                              {appdata_.data.email}
                            </h6>
                            <h6 style={{ color: "white" }}>
                              {appdata_.data.contact}
                            </h6>
                          </div>
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
export default PatientDashboard;
