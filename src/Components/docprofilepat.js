import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./central.css";
import "./dashboard.css";

function DocProfile2(props) {
  const navigate = useNavigate();

  let [reviews, setreviews] = useState({ satisfaction: 0, Reviews: [] });

  const [url, setUrl] = useState("");
  const storage = getStorage();

  useEffect(() => {
    axios({
      url: "http://localhost:4000/getdocreviews",
      method: "GET",
      params: { docemail: props.email },
    })
      .then((response) => {
        const data_ = response.data;
        let sum = 0;
        data_.forEach((d) => {
          sum = sum + parseInt(d.Rating);
        });

        let percentage;

        let avg = sum / data_.length;
        percentage = (avg / 5) * 100;
        setreviews({ satisfaction: percentage.toFixed(0), Reviews: data_ });
      })
      .catch((err) => {
        console.log(err);
      });
    const imageRef = ref(storage, `/Upload/${props.email}`);
    getDownloadURL(imageRef).then((url) => {
      setUrl(url);
    });
  }, [props.email, reviews.satisfaction, storage, url]);
  const show_satisfaction = () => {
    if (reviews.satisfaction > 0) {
      return (
        <p class="mb-0 font-size-lg px-2">
          {" "}
          <ProgressBar animated now={reviews.satisfaction} />
        </p>
      );
    } else {
      return <p class="mb-0 font-size-lg px-2 mx-4">Not Rated</p>;
    }
  };
  const submit = () => {
    confirmAlert({
      title: "Please Login !",
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  };

  const BookAppoint = () => {
    if (props.pat) {
      navigate("/fixappoint", {
        state: {
          doc: props.email,
          pat: props.pat,
          name: props.name,
          exp: props.exp,
          address: props.address,
          fee: props.fee,
          qual: props.qual,
          spec: props.spec,
          satisfaction_percentage: reviews.satisfaction,
          reviews: reviews.Reviews,
          type: props.type,
          imageURL: url,
        },
      });
    } else {
      submit();
    }
  };

  const show_experience = () => {
    if (props.exp) {
      return <span>{props.exp}</span>;
    } else {
      return <span>0</span>;
    }
  };

  return (
    <>
      <div className="row shadowww myfont p-5 flexprop mx-4">
        <div className="flexprop mt-2">
          <div className="mt-2">
            {/* Image should come from firebase */}
            <img
              class="rounded doctor-listing-picture mp-event-listing-doctor-picture doctor-img-style"
              src={url}
              alt="Doctor "
              width="170"
              data-width="170"
              height="170"
              data-height="170"
              data-on-error-src="https://h7u5d3a4.stackpathcdn.com/assets/images/doctor-photo-male.png"
            />
          </div>

          <div class="doctordetails ps-5">
            <span className=" h3 font-size-md text-accent font-weight-bold mb-0 ">
              {props.name}
            </span>
            <span>
              <i class="fa fa-check-circle fa-sm text-primary px-4"></i>
            </span>

            <p class="mb-0  product-meta d-md-block d-none">
              {/* Make the education and specialization in mongoDB */}
              {props.qual}
            </p>
            <p class="product-meta d-block font-size-sm mb-0">
              {/* {props.specialization} ({props.country}) */}
              {props.spec}
            </p>
            <p class="font-size-sm mb-0">
              {/* get experience from DB */}
              {show_experience()} year(s) Experience
            </p>
            <div className="flexprop">
              <div>
                <span>
                  <i class="fa fa-thumbs-up fa-sm text-primary"></i>
                </span>
                <span> Satisfaction</span>
                {/* should come from DB  remove the hard coded line after uncommenting below line*/}
                {/* <p class="mb-0 font-size-lg  px-5">{props.satisfaction}%</p> */}

                {show_satisfaction()}
              </div>

              <div>
                <span>
                  <i class="fa fa-history fa-sm text-primary ms-3"></i>
                </span>
                <span> Experience</span>
                {/* <p class="mb-0 font-size-lg  px-5">{props.experience}</p> */}
                <p class="mb-0 font-size-lg  px-5">
                  {show_experience()} Year(s)
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="shadowww2 ">
                <div className="flexprop">
                  {/* doctor address should be clinic name or hospital name props.address*/}

                  <i class="fa fa-map-marker fa-sm text-primary pt-1"></i>

                  <h6 className="text-dark font-weight-bold px-2 ">
                    {props.address}
                  </h6>
                </div>
                <h6 className="text-dark font-weight-bold px-4 ">
                  {/* {props.fee} */} Fee: Rs. {props.fee}{" "}
                </h6>
              </div>
              <div className="mt-5">
                <button className="irfan-dropdown" onClick={BookAppoint}>
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocProfile2;
