import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import axios from "axios";
import Spinner from "react-spinkit";
import "./dashboard.css";
import HeaderInSession from "./HeaderInSession";
function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
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
          <div style={{ maxHeight: 100 }} className="bg-light what">
            <div className="container-fluid bg-light">
              <div className="row">
                <div className="col col-8">
                  <div className="sidebar">
                    <div className="sidebar-brand">
                      <h2>
                        <span class="lab la-accusoft"></span>
                        <span>Rovecare</span>
                      </h2>
                    </div>
                    <div class="sidebar-menu">
                      <ul>
                        <li>
                          <a href="#" className="active">
                            <span className="las la-igloo"></span>
                            <span>DashBoard</span>
                          </a>
                        </li>
                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/updateprofiledoc", {
                                state: {
                                  id: location.state.id,
                                  type: "doctor",
                                  name: appdata_.data.name,
                                  contact: appdata_.data.contact,
                                  address: appdata_.data.address,
                                  fee: appdata_.data.fee,
                                  qual: appdata_.data.qual,
                                  spec: appdata_.data.spec,
                                  reg: appdata_.data.reg,
                                  stat: appdata_.data.stat,
                                },
                              });
                            }}
                          >
                            <span class="las la-user"></span> &nbsp; &nbsp;
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
                            <span class="las la-user"></span> &nbsp; &nbsp;
                            <span>Reset Password</span>
                          </button>
                        </li>

                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/addslot", { state: location.state });
                            }}
                          >
                            <span class="las la-user"></span> &nbsp; &nbsp;
                            <span>Time Slots</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="buttonbtn"
                            onClick={(event) => {
                              navigate("/viewappointments", {
                                state: {
                                  id: location.state.id,
                                  type: "doctor",
                                },
                              });
                            }}
                          >
                            <span class="las la-calendar-check"></span>&nbsp;
                            &nbsp;
                            <span>Appointments</span>
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
                <div className="col-8 pt-1 ps-5">
                  <div className="container bg-light">
                    <div className="row ms-5 ps-5 pt-2 pb-1">
                      <div style={{ marginLeft: "90px" }} className="card mb-5">
                        <div className="card-header">
                          <h4>{appdata_.data.name}</h4>
                        </div>
                        <div className="card-body">
                          <center>
                            <img
                              style={{
                                borderRadius: 400,
                                height: 200,
                                width: 200,
                              }}
                              className="round"
                              src={url}
                              alt="user"
                            />

                            <h5
                              style={{
                                color: "black",
                                justifycontent: "center",
                              }}
                              className="card-text pt-2 pb-2"
                            >
                              Email: {appdata_.data.email}
                            </h5>
                            <h5 justifycon className="card-text pt-2 pb-2">
                              Address: {appdata_.data.address}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Phone no: {appdata_.data.contact}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Qualification: {appdata_.data.qual}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Specialization: {appdata_.data.spec}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Fee: {appdata_.data.fee}
                            </h5>
                            <h5 className="card-text pt-2 pb-2">
                              Registration ID: {appdata_.data.reg}
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

export default DoctorDashboard;
