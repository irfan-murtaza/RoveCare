import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";

import "./update.css";
import "./central.css";
import Revs from "./suggestedlabrevs";
import { ref, getStorage, getDownloadURL } from "firebase/storage";

function SugLabProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  let [labdetail, setlabdetail] = useState({});
  const [url, setUrl] = useState("");
  const storage = getStorage();
  useEffect(() => {
    axios({
      url: "http://localhost:4000/viewdetails",
      method: "GET",
      params: { email: location.state.labemail },
    })
      .then((response) => {
        const data_ = response.data;
        console.log(data_);
        setlabdetail(data_);
      })
      .catch((err) => {
        console.log(err);
      });
    const imageRef = ref(storage, `/Upload/${location.state.labemail}`);
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    });
  }, [location.state.labemail]);

  const disp = () => {
    if (location.state.stat == "Pending") {
      return (
        <div
          className="btn irfan-dropdown "
          type="button"
          onClick={(event) => {
            axios({
              url: "http://localhost:4000/fixlabappoint",
              method: "POST",
              params: { appID_: location.state.appID },
            })
              .then((response) => {
                if (response.data == "done") {
                  navigate(-1);
                }
              })
              .catch((err) => {
                console.log("error");
              });
          }}
        >
          Confirm Appointment
        </div>
      );
    }
  };

  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>
      <div className="container">
        <div className="row">
          <div className="col-md-12 labdes">
            <div className="row pt-4 pb-3">
              <div className="col-md-2 col-4 text-center">
                <img
                  className="rounded mll"
                  width="200"
                  height="200"
                  alt="Chughtai Lab"
                  src={url}
                />
              </div>
              <div className="col-md-6 col-8 ple">
                <div className="mytextdesign">{labdetail.name}</div>
                <p className="alltextddd">
                  <p className="mrr">
                    <i class="fa fa-map-marker fa-lg text-primary"></i>
                  </p>

                  {labdetail.address}
                </p>
                <p className="alltextdd">
                  <p className="mrr">
                    <i class="fa fa-address-book fa-lg text-primary"></i>
                  </p>

                  {labdetail.contact}
                </p>
                <p className="alltextdd">
                  <p className="mrr">
                    <i class="fa fa-envelope fa-lg text-primary"></i>
                  </p>
                  {location.state.labemail}
                </p>
                <div className="d-sm-flex justify-content-between d-none pt-5">
                  <div className="d-flex">
                    <div>
                      <label className="alltext">Satisfaction</label>
                      <div className="alltextdd">
                        <p className="mrr">
                          <i class="fa fa-thumbs-up fa-sm text-primary"></i>
                        </p>
                        {labdetail.satisfaction} %
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div>
                      <label className="alltext">Reviews</label>
                      <div className="alltextdd">
                        <p className="mrr">
                          <i class="fa fa-star fa-lg text-primary"></i>
                        </p>
                        {labdetail.rev_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5 mb-5">
              {disp()}
            </div>
          </div>
          <div>
            <div className="row d-flex text-center mt-5">
              <Revs email={labdetail.email}></Revs>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 ms-5">
                &nbsp; &nbsp;
                <button
                  className="btn irfan-dropdown mt-4 mb-4 ms-5 mycolor"
                  type="button"
                  onClick={(event) => {
                    navigate("/addreview", {
                      state: {
                        lab: labdetail.email,
                        pat: location.state.id,
                        type: "patient",
                      },
                    });
                  }}
                >
                  Add Review
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SugLabProfile;
