import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./testdetail.css";
function TestDetail(props) {
  const navigate = useNavigate();
  const promo = () => {
    axios({
      url: "http://localhost:4000/addpromotion",
      method: "POST",
      params: { Lab: props.lab, TestName: props.name },
    })
      .then((response) => {
        if (response.data == "added") {
          navigate(0);
        } else {
          console.log("invalid");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };
  const delete_ = () => {
    axios({
      url: "http://localhost:4000/deletetest",
      method: "POST",
      params: { Lab: props.lab, TestName: props.name },
    })
      .then((response) => {
        if (response.data == "success") {
          navigate(0);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };
  return (
    <>
      <div className="card mt-5 mt-2 mb-5">
        <div className="card-header">
          <h4>Test</h4>
        </div>
        <div className="card-body">
          <h5 className="card-text pt-2 pb-2">Test Name: {props.name} </h5>
          <h5 className="card-text pt-2 pb-2">Price: {props.price} </h5>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              className="btn btn-primary mt-4 mb-4 hj"
              type="button"
              onClick={delete_}
            >
              Delete Test
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-primary mt-4 mb-4 hj"
              type="button"
              onClick={(event) => {
                navigate("/edittest", {
                  state: { id: props.lab, oldname: props.name },
                });
              }}
            >
              Edit Test
            </button>
            &nbsp; &nbsp;
          </div>
        </div>
      </div>
    </>
  );
}

export default TestDetail;
