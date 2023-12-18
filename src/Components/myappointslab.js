import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import HeaderInSession from "./HeaderInSession";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import Footer from "./footer";
function MyAppointsLab() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filee, setFilee] = useState(null);

  const [url, setUrl] = useState("");
  const storage = getStorage();

  let [patdata, setpatdata] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/patientappointlab",
      method: "GET",
      params: { email: location.state.id },
    })
      .then((response) => {
        setpatdata(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, [patdata]);

  const handleUpload = (appID_) => {
    const fileeRef = ref(storage, `files/${appID_}.pdf`);
    uploadBytes(fileeRef, filee).then(() => {
      console.log("file Uploaded");
    });
    axios({
      url: "http://localhost:4000/completelabappoint",
      method: "POST",
      params: { appID_: appID_ },
    })
      .then((response) => {
        if (response.data == "done") {
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const display_upload = (data) => {
    if (data.Status == "InProgress") {
      return (
        <button
          className="btn irfan-dropdown"
          type="button"
          onClick={(event) => {
            handleUpload(data.appID_);
          }}
        >
          Upload Result
        </button>
      );
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFilee(e.target.files[0]);
    }
  };
  const disp = patdata.map((data) => {
    return (
      <div className="card  mt-5 mb-5 ms-4 me-4">
        <div className="card-header d-flex justify-content-center">
          <h4>Appointment ID: {data.appID_}</h4>
        </div>
        <div className="card-body mt-3 pb-5">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-3">
              <h5>Result:</h5>
            </div>
            <div className="col-3">
              <h5> {data.result}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-3">
              <h5> Suggested Test:</h5>
            </div>
            <div className="col-3">
              <h5> {data.TestName}</h5>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-4"></div>
            <div className="col-3">
              <input type="file" onChange={handleChange}></input>
            </div>
            <div className="col-3">{display_upload(data)}</div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>
      <div className="container">
        <h4 className="text-center mt-5 mb-3">My Appointments</h4>
        {disp}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default MyAppointsLab;
