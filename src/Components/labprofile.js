import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LabProfile(props) {
  const navigate = useNavigate();
  const delete_ = () => {
    axios({
      url: "http://localhost:4000/deleteuser",
      method: "POST",
      params: { email: props.email },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "deleted") {
          navigate(0);
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };
  return (
    <>
      <div className="card mt-5 mt-2 mb-5">
        <div className="card-header">
          <h4>Lab</h4>
        </div>
        <div className="card-body">
          <h5 className="card-text pt-2 pb-2">Name: {props.name} </h5>
          <h5 className="card-text pt-2 pb-2"> Email: {props.email}</h5>
          <h5 className="card-text pt-2 pb-2">Address: {props.address}</h5>
          <h5 className="card-text pt-2 pb-2">Contact: {props.contact}</h5>
          <button
            className="btn btn-primary mt-4 mb-4"
            type="button"
            onClick={delete_}
          >
            Delete Lab
          </button>
        </div>
      </div>
    </>
  );
}

export default LabProfile;
