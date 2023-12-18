import "./review.css";
import React from "react";
const DisplayDoctorReview = (props) => {
  const display_satisfied = () => {
    if (parseInt(props.rating) > 2) {
      return (
        <a href="#" className=" btn btn-sm inactiveLink mr-2 mt-1 my-color">
          Satisfied
        </a>
      );
    } else {
      return (
        <a href="#" className="btn btn-sm inactiveLink mr-2 mt-1 my-color">
          not satisfied
        </a>
      );
    }
  };

  return (
    <>
      <div className="w-100 pb-5">
        <div class="row">
          <div class="col-md-12 col-12 mt-3 d-sm-block d-none">
            <div class="card box-shadow-sm my-1">
              <div class="card-body">
                <div class="row  pb-3">
                  <div class="col-md-1 text-center">
                    <svg
                      id="Group_4963"
                      data-name="Group 4963"
                      xmlns="http://www.w3.org/2000/svg"
                      width="47.5"
                      height="49.092"
                      viewBox="0 0 47.5 49.092"
                    >
                      <path
                        id="Path_2"
                        data-name="Path 2"
                        d="M1537.561-723.828a1.357,1.357,0,0,0-1.357-1.357h-5.285a1.357,1.357,0,0,0-1.357,1.357v20.806a1.357,1.357,0,0,0,1.357,1.357h5.285a1.357,1.357,0,0,0,1.357-1.357Zm34.233,20.145c-1.109,3.3-5.08,3.5-7.968,3.5-6.225,0-12.471-1.531-18.685-2.035-4.659-.378-6.122-1.486-6.122-5.919,0-4.021.05-10.165.05-14.393,0-2.333,1.632-3.995,3.672-5.84,5.055-4.572,9.729-8.111,12.448-14.582,1.1-2.619.432-6.74,4.278-6.287,2.635.31,3.84,3.689,4.057,6.219a16.4,16.4,0,0,1-2.134,8.773c-1.391,2.434-4.907,5.681-.374,6,3.961.275,14.892-2.954,15.988,3.16a5.116,5.116,0,0,1-1.054,3.617c-1.1,1.868.112,1.425-.036,3.674-.119,1.82-1.274,2.133-1.846,3.416-.5,1.117.448,2.207.278,3.53-.247,1.932-1.594,2.054-2.386,3.362C1571.29-706.385,1572.256-705.059,1571.794-703.683Z"
                        transform="translate(-1529.561 749.274)"
                        fill="#02c782"
                      ></path>
                    </svg>
                  </div>
                  <div class="col-md-10 ">
                    <p class="mydesign1">Verified Patient</p>
                    <p class="mb-0 font-size-sm myfont">{props.patient_name}</p>

                    <p class="font-size-sm pt-1 myfont">{props.feedback}</p>
                    <div class="horizontal-scroll d-sm-block d-none">
                      <p class="mydesign1">Patient Feedback:</p>
                      {display_satisfied()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDoctorReview;
