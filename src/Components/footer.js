import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="container-fluid footerstyle pt-4 ps-3">
        <div className="row pt-2 pb-2 marginc">
          <div className="col">
            <h2 className="text-white">Rovecare</h2>
          </div>
        </div>
        <div className="row pt-3 pb-3 marginc">
          <div className="col">
            <p className="text-white">Your Health is Our Priority!</p>
          </div>
        </div>
        <div className="row margincn">
          <div className=" width20">
            <p>
              <i class="fa fa-instagram fa-lg text-white"></i>
            </p>
          </div>
          <div className="width20">
            <p>
              <i class="fa fa-facebook-official fa-lg text-white"></i>
            </p>
          </div>
          <div className="width20">
            <p>
              <i class="fa fa-twitter-square fa-lg text-white"></i>
            </p>
          </div>
          <div className="right">
            <p class="text-white">
              <medium> &copy; 2022 Rovecare All rights reserved</medium>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
