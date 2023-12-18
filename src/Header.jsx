import React from "react";

const Header = () => {
  return (
    <div className="header-style">
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
            <a href="/login">SIGN IN</a>
            <a href="/signup">SIGN Up</a>
            <a href="/">HOME</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
