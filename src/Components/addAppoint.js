import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";

import "./BookAppoinment.css";
import "./review.css";

import { confirmAlert } from "react-confirm-alert";
import DisplayDoctorReview from "./DisplayDoctorReview.jsx";
import Footer from "./footer.js";
import HeaderInSession from "./HeaderInSession.jsx";
import StripeContainer from "./StripeContainer";
import ProgressBar from "react-bootstrap/ProgressBar";

function FixAppoint() {
  const location = useLocation();
  const navigate = useNavigate();
  let [slot, setslot] = useState("");
  const [is_payment, set_is_payment] = useState(false);

  const [slots, sets] = useState([]);
  const [count, setCount] = useState(0);

  const [date_day, set_date_day] = useState();
  const show_satisfaction = () => {
    if (location.state.satisfaction_percentage > 0) {
      return (
        <p class="mb-0 font-size-lg px-2">
          {" "}
          <ProgressBar animated now={location.state.satisfaction_percentage} />
        </p>
      );
    } else {
      return <p class="mb-0 font-size-lg  px-2 mx-4">not rated</p>;
    }
  };
  useEffect(() => {
    // do stuff
    if (date_day) {
      console.log("dayyyy:", date_day.day);
      axios({
        url: "http://localhost:4000/getslots",
        method: "GET",
        params: {
          email: location.state.doc,
          day: date_day.day,
          date: date_day.date,
        },
      })
        .then((response) => {
          const data_ = response.data;
          console.log("data:", data_);
          if (data_ == "enter new date") {
            console.log(data_);
          } else {
            sets(data_);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [date_day]);

  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
          onClick: () => setCount(count + 1),
        },
      ],
    });
  };
  const show_experience = () => {
    if (location.state.exp) {
      return <span>{location.state.exp}</span>;
    } else {
      return <span>0</span>;
    }
  };
  const FixAppoint = () => {
    if (is_payment == false) {
      submit("please pay first");
    } else if (date_day.date === "" || slot === "") {
      submit("Please enter date and time");
    } else {
      console.log(location.stat);
      axios({
        url: "http://localhost:4000/fixappointment",
        method: "POST",
        params: {
          Doc: location.state.doc,
          Pat: location.state.pat,
          Date: date_day.date,
          Slot: slot,
        },
      })
        .then((response) => {
          if (response.data == "added") {
            submit("Appoinment Book Sucessfully");
            navigate("/viewappointments", {
              state: { id: location.state.pat, type: location.state.type },
            });
          } else {
            submit(response.data);
          }
        })
        .catch((err) => {
          submit(err);
        });
    }
  };
  const slots_buttons = slots.map((s) => {
    return (
      <button
        className="button-54 marginleft "
        onClick={(event) => {
          setslot(s.slot);
        }}
      >
        {s.slot}
      </button>
    );
  });

  const show_doctor_reviews = location.state.reviews.map((review) => {
    return (
      <DisplayDoctorReview
        patient_name={review.Patient}
        rating={review.Rating}
        feedback={review.Review}
      />
    );
  });
  const disabledate = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return dd + "-" + mm + "-" + yyyy;
  };

  const show_buttons = () => {
    console.log("slots", slots);
    if (slots.length > 0) {
      return (
        <div class=" shadowww">
          <p class="fontstyle">Select Time Slot</p>
          <p className="text-danger">{slot}</p>
          <div>
            <div id="time_list_1558" data-item-id="app" class="">
              {slots_buttons}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <HeaderInSession
        id={location.state.pat}
        type={location.state.type}
      ></HeaderInSession>

      <div className="OuterParent">
        <div className="row shadowww myfont p-5 flexprop">
          <div className="flexprop mt-2">
            <div className="mt-2">
              {/* Image should come from firebase */}
              <img
                class="rounded doctor-listing-picture mp-event-listing-doctor-picture doctor-img-style"
                src={location.state.imageURL}
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
                {location.state.name}
              </span>
              <span>
                <i class="fa fa-check-circle fa-sm text-primary px-4"></i>
              </span>

              <p class="mb-0  product-meta d-md-block d-none">
                {/* Make the education and specialization in mongoDB */}
                {location.state.qual}
              </p>
              <p class="product-meta d-block font-size-sm mb-0">
                {/* {props.specialization} ({props.country}) */}
                {location.state.spec}
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

                <div className="ms-3">
                  <span>
                    <i class="fa fa-history fa-sm text-primary"></i>
                  </span>
                  <span> Experience</span>
                  {/* <p class="mb-0 font-size-lg  px-5">{props.experience}</p> */}
                  <p class="mb-0 font-size-lg  px-3">
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

                    <i className="fa fa-map-marker fa-sm text-primary pt-1"></i>

                    <h6 className="text-dark font-weight-bold px-2 ">
                      {location.state.address}
                    </h6>
                  </div>
                  <h6 className="text-dark font-weight-bold px-4 ">
                    {/* {props.fee} */} Fee: Rs. {location.state.fee}{" "}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class=" shadowww">
          <div>
            <p class="fontstyle">Please Select Date</p>
            <div class="">
              <input
                type="date"
                className="form-control"
                min="2022-06-28"
                onChange={(event) => {
                  const d = new Date(event.target.value);
                  const days = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ];
                  let day_index = d.getDay();
                  const my_day = days[day_index];
                  set_date_day({ date: event.target.value, day: my_day });
                }}
              />
            </div>
          </div>
        </div>
        {show_buttons()}
        <StripeContainer
          fees={location.state.fee}
          setPayment={set_is_payment}
        ></StripeContainer>
        {/* {ReactDOM.render(<p>Hello</p>, document.getElementById("root"))} */}
        <div className="mt-5 ms-5">
          <div>
            <div class="width25 centrall">
              <button
                class="button-25 irfan-dropdown"
                type="button"
                onClick={FixAppoint}
              >
                Fix Appoinment
              </button>
            </div>
          </div>
        </div>
        <div class="mydd2 p-4">
          <h2 class="mydesign1">Reviews For {location.state.name}</h2>
          <p class="myfont">
            These are the views of the patients and may not necessarily reflect
            the doctor's medical expertise.
          </p>
        </div>
        <div className="pb-5">{show_doctor_reviews}</div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default FixAppoint;
