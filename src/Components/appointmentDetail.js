import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import "./update.css";
function AppointData(props) {
  const navigate = useNavigate();
  let [review_data, Set_review_data] = useState([]);
  const [doctor_data, set_doctor_data] = useState([]);
  const [count, setcount] = useState(0);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/getappointreview",
      method: "GET",
      params: { id_: props.id_ },
    })
      .then((response) => {
        const data_ = response.data;
        Set_review_data(data_);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:4000/getdocdetail",
      method: "GET",
      params: { docemail: props.Demail },
    })
      .then((response) => {
        const data_ = response.data;
        set_doctor_data(data_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  };

  const cancel_ = () => {
    axios({
      url: "http://localhost:4000/cancelappoint",
      method: "POST",
      params: { id_: props.id_ },
    })
      .then((response) => {
        if (response.data == "done") {
          submit("Appoinment Canceled Successfully");
          setcount(count + 1);
        } else {
          submit("Server Error");
        }
      })
      .catch((err) => {
        submit("Server Error");
      });
  };

  const disp_add_review = () => {
    if (props.status == "completed" && review_data == "invalid") {
      return (
        <button
          className="irfan-dropdown mt-4 mb-4"
          type="button"
          onClick={(event) => {
            navigate("/reviewbypatient", {
              state: {
                docemail: props.Demail,
                docname: props.doc,
                patname: props.pat,
                id_: props.id_,
                Pemail: props.Pemail,
              },
            });
          }}
        >
          Add Review
        </button>
      );
    }
  };
  const disp_cancel_appointment = () => {
    if (props.status == "pending") {
      return (
        <button className="irfan-dropdown mt-4 mb-4" onClick={cancel_}>
          Cancel Appointment
        </button>
      );
    }
  };
  const rats = [];
  for (var i = 0; i < 5; i++) {
    rats.push(i);
  }
  const rat = rats.map((d) => {
    if (d < review_data.Rating) {
      return <span className="fa fa-star checked"></span>;
    }
  });
  const disp_review = () => {
    if (review_data != "invalid") {
      return (
        <>
          <div className="row pt-3 pb-3 px-5 review-background">
            <div className="row">
              <div className="col-3">
                <h5
                  style={{ color: "#a62869", fontWeight: "Bolder" }}
                  className="pt-2 pb-2"
                >
                  Rating given by patient:
                </h5>
              </div>
              <div className="col-9">
                <h5 className="pt-2 pb-2">{rat}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5
                  style={{ color: "#a62869", fontWeight: "Bolder" }}
                  className="pt-2 pb-2"
                >
                  Feedback:
                </h5>
              </div>
              <div className="col-9">
                <h5 className="pt-2 pb-2">{review_data.Review}</h5>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="container mt-5 shadowww myfont">
        <div
          style={{ backgroundColor: "white" }}
          className="row appoinment-heading pt-3 pb-3"
        >
          <div className="d-flex justify-content-center">
            <h4>Appointment ID # {props.id_}</h4>
          </div>
        </div>

        <div className="row mt-4 px-5 pb-4">
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <h5 className="myhead">Patient</h5>
              </div>
              <div className="col-3">
                <h5>{props.pat}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="myhead">Doctor</h5>
              </div>
              <div className="col-9">
                <h5>{props.doc}</h5>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-3">
                  <h5 className="myhead">Date</h5>
                </div>
                <div className="col-3">
                  <h5>{props.date}</h5>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-3">
                  <h5 className="myhead">Time</h5>
                </div>
                <div className="col-3">
                  <h5>{props.slot}</h5>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-3">
                  <h5 className="myhead">Status</h5>
                </div>
                <div className="col-3">
                  <h5>{props.status}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="d-flex justify-content-center">
                {disp_cancel_appointment()}
              </div>
            </div>
            <div className="row">
              <div style={{ marginLeft: "70%" }} className="hhhhhhhhh">
                {disp_add_review()}
              </div>
            </div>
          </div>
        </div>
        {disp_review()}
      </div>
    </>
  );
}

export default AppointData;
