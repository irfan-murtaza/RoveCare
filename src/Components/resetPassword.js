import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";
import HeaderInSession from "./HeaderInSession";
import { confirmAlert } from "react-confirm-alert";
import "./resetpassw.css";
const ResetPassword = () => {
  let [old, setold] = useState("");
  let [newp, setnew] = useState("");
  let [confp, setconf] = useState("");
  let [serverres, setserverres] = useState("");
  const [count, setcount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
          onClick: () => setcount(count + 1),
        },
      ],
    });
  };
  const ResetP = () => {
    if (confp == newp) {
      axios({
        url: "http://localhost:4000/resetpassword",
        method: "POST",
        params: {
          email: location.state.id,
          oldpassword: old,
          newpassword: newp,
        },
      })
        .then((response) => {
          if (response.data == "changed") {
            submit("Password Sucessfully Changed");
            navigate(-1);
          } else {
            submit("Server Error");
          }
        })
        .catch((err) => {
          submit("Server Error");
        });
    } else {
      setserverres("password missmatch");
    }
  };
  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>
      <div className="container">
        <div className="ft">
          <div className="row mt-4">
            <h4 className="d-flex justify-content-center">Reset Password </h4>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 ms-5">
              <form>
                <div class="form-group row mt-5 pt-2">
                  <div class="col-sm-10 d-flex justify-content-center">
                    <input
                      type="password"
                      class="form-control"
                      id="inputpassword3"
                      placeholder="Old Password"
                      onChange={(event) => {
                        setold(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="form-group row mt-5">
                  <div class="col-sm-10 d-flex justify-content-center">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword3"
                      placeholder="New Password"
                      onChange={(event) => {
                        setnew(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div class="form-group row mt-5">
                  <div class="col-sm-10 d-flex justify-content-center">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword3"
                      placeholder="Confirm New Password"
                      onChange={(event) => {
                        setconf(event.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-10 d-flex justify-content-center mt-5 text-danger">
                  {serverres}
                </div>
                <div class="form-group row">
                  <div class="col-sm-10 d-flex justify-content-center">
                    <button
                      className="irfan-dropdown mt-4 mb-5"
                      type="button"
                      onClick={ResetP}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default ResetPassword;
