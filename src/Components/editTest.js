import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "./footer";
import "./addtest.css";
import HeaderInSession from "./HeaderInSession";

function EditTest() {
  const navigate = useNavigate();
  const location = useLocation();
  let [name, setname] = useState("");
  let [price, setprice] = useState(0);
  let [ser, setser] = useState("");
  const editTest = () => {
    axios({
      url: "http://localhost:4000/edittest",
      method: "POST",
      params: {
        Lab: location.state.id,
        oldname: location.state.oldname,
        TestName: name,
        Price: price,
      },
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
      <HeaderInSession>
        id = {location.state.id}
        type = "laboratory"
      </HeaderInSession>

      <div className="container">
        <div className="container tr">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">Edit Test </h4>
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
                    onClick={editTest}
                  >
                    Edit Test
                  </button>
                </div>
              </form>
            </div>
            <div className="col-3" />
          </div>
        </div>
      </div>
      <div style={{ bottom: 0, position: "absolute", width: "100%" }}>
        <Footer />
      </div>
    </>
  );
}

export default EditTest;
