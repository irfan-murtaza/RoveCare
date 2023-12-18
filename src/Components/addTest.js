import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";
import "./addtest.css";

function AddTest() {
  const navigate = useNavigate();
  const location = useLocation();
  let [name, setname] = useState("");
  let [price, setprice] = useState(0);
  let [ser, setser] = useState("");
  const addTest = () => {
    axios({
      url: "http://localhost:4000/addtest",
      method: "POST",
      params: { Lab: location.state.id, TestName: name, Price: price },
    })
      .then((response) => {
        if (response.data == "success") {
          navigate(-1);
        } else {
          setser(response.data);
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };
  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>

      <div className="container">
        <div className="container tr">
          <div className="row mt-4">
            <h4
              style={{ fontweight: "bolder" }}
              className="d-flex justify-content-center"
            >
              Add Test{" "}
            </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div className="form-group row mt-5 pt-2">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Test Name"
                      onChange={(event) => {
                        setname(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      onChange={(event) => {
                        setprice(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                  {ser}
                </div>
                <div className=" mt-5 col-sm-10 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addTest}
                  >
                    Add Test
                  </button>
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

export default AddTest;
