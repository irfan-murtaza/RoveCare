import React from "react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-around mt-3 typ">
        <div className=" color-style">
          <a href="https://www.w3schools.com">Lab Test</a>
        </div>
        <div className="color-style">
          <a href="https://www.w3schools.com">Skin Cancer</a>
        </div>
        <div className="color-style">
          <a href="https://www.w3schools.com">Health Blog</a>
        </div>
        <div>
          <button
            className="btn btn-primary justify-content-"
            type="button"
            onClick={(event) => {
              navigate("/login", { state: {}, replace: true });
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
