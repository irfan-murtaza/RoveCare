import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, getStorage, getDownloadURL } from "firebase/storage";

import "./central.css";

function LabProfile2(props) {
  const navigate = useNavigate();
  let [revs, setrevs] = useState();
  let [labdetail, setlabdetail] = useState({});
  const [url, setUrl] = useState("");
  const storage = getStorage();
  useEffect(() => {
    axios({
      url: "http://localhost:4000/seereviews",
      method: "GET",
      params: { email: props.Labemail },
    })
      .then((response) => {
        const data_ = response.data;
        setrevs(data_);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:4000/viewdetails",
      method: "GET",
      params: { email: props.Labemail },
    })
      .then((response) => {
        const data_ = response.data;
        console.log(data_);
        setlabdetail(data_);
      })
      .catch((err) => {
        console.log(err);
      });
    const imageRef = ref(storage, `/Upload/${props.Labemail}`);
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    });
  }, [props.Labemail]);
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12 labdes">
          <div class="row pt-4 pb-3">
            <div class="col-md-2 col-4 text-center">
              <img
                className="rounded mll"
                width="200"
                height="200"
                alt={props.name}
                src={url}
              />
            </div>
            <div class="col-md-6 col-8 ple">
              <div className="mytextdesign">{props.name}</div>
              <p className="alltextddd">
                <p className="mrr">
                  <i class="fa fa-map-marker fa-lg text-primary"></i>
                </p>

                {props.address}
              </p>
              <p className="alltextdd">
                <p className="mrr">
                  <i class="fa fa-address-book fa-lg text-primary"></i>
                </p>

                {props.contact}
              </p>

              <p className="alltextdd">
                <p className="mrr">
                  <i class="fa fa-envelope fa-lg text-primary"></i>
                </p>

                {props.Labemail}
              </p>

              <div class="d-sm-flex justify-content-between d-none pt-5">
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
          <div class="row">
            <div class="d-flex justify-content-center pb-5 ">
              <button
                className="btn irfan-dropdown mt-4 mb-4"
                type="button"
                onClick={(event) => {
                  if (props.id) {
                    navigate("/viewreviews", {
                      state: {
                        Labemail: props.Labemail,
                        id: props.id,
                        type: props.type,
                      },
                    });
                  } else {
                    navigate("/viewreviews", {
                      state: { Labemail: props.Labemail },
                    });
                  }
                }}
              >
                See Reviews
              </button>
              &nbsp; &nbsp;
              {/* <button
                className="btn btn-primary mt-4 mb-4"
                type="button"
                onClick={(event) => {
                  navigate("/addreview", {
                    state: { lab: props.email, pat: props.pat },
                  });
                }}
              >
                Add Review
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabProfile2;
