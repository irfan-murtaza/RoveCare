import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderInSession = (props) => {
  const navigate = useNavigate();
  return (
    <div className="header-style">
      {console.log(props)}
      <div className="roveLogo">
        <img
          className="logo-Style"
          src="https://i.ibb.co/VJCt4dx/finallll.png"
          alt="logo"
        />
      </div>
      <div className="margin-style11 color-style">
        <label> Doctors</label>
      </div>

      <div className="margin-style color-style">
        <label> Lab Tests</label>
      </div>

      <div className="margin-style color-style">
        <label> Skin Cancer</label>
      </div>

      <div className="margin-style color-style">
        <label> Health Blog</label>
      </div>

      <div className="margin-style13 color-style">
        <div class="dropdown">
          <button alt="RoveCare">
            <i>R</i>
            <i>o</i>
            <i>v</i>
            <i>e</i>
            <i>C</i>
            <i>a</i>
            <i>r</i>
            <i>e</i>
          </button>
          <div class="dropdown-content">
            <button
              className="set-drop-down-background mt-3"
              onClick={(event) => {
                navigate("/", { state: {}, replace: true });
              }}
            >
              Log Out
            </button>
            <button
              className="set-drop-down-background mt-1"
              onClick={(event) => {
                if (props.type == "patient") {
                  navigate("/patient", {
                    state: { id: props.id, type: props.type },
                  });
                } else if (props.type == "doctor") {
                  navigate("/doctor", {
                    state: { id: props.id, type: props.type },
                  });
                } else if (props.type == "laboratory") {
                  navigate("/lab", {
                    state: { id: props.id, type: props.type },
                  });
                }
              }}
            >
              Dashboard
            </button>
            <button
              className="set-drop-down-background mt-1"
              onClick={(event) => {
                navigate("/", { state: { id: props.id, type: props.type } });
              }}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderInSession;
