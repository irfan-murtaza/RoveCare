import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";
import "./addreviewbypat.css";
import HeaderInSession from "./HeaderInSession";
function AddReviewByPatient() {
  const location = useLocation();
  let [rev, setrev] = useState("");
  let [rat, setrat] = useState(0);
  let [ser, setser] = useState("");
  const navigate = useNavigate();
  const addReview = () => {
    if (rat < 0 || rat > 5) {
      setser("invalid rating");
    } else if (rev == "") {
      setser("Add a review");
    } else {
      axios({
        url: "http://localhost:4000/adddocreview",
        method: "POST",
        params: {
          ID_: location.state.id_,
          Demail: location.state.docemail,
          Dname: location.state.docname,
          Pname: location.state.patname,
          Rating: rat,
          Review: rev,
        },
      })
        .then((response) => {
          if (response.data == "added") {
            navigate(-1);
          } else {
            setser(response.data);
          }
        })
        .catch((err) => {
          setser("ERROR");
        });
    }
  };

  return (
    <>
      <HeaderInSession
        id={location.state.Pemail}
        type="patient"
      ></HeaderInSession>
      <div className="container">
        <div className="container-podds">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">Add Review </h4>
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
                      placeholder="Review"
                      onChange={(event) => {
                        setrev(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row mt-5">
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rating (0-5) "
                      onChange={(event) => {
                        setrat(parseInt(event.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                  {ser}
                </div>
                <div className=" mt-5 col-7 d-flex justify-content-center mx-5">
                  <button
                    className="irfan-dropdown mt-4 mb-5"
                    type="button"
                    onClick={addReview}
                  >
                    Add Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="cont-pod">
        <Footer></Footer>
      </div>
    </>
  );
}

export default AddReviewByPatient;
