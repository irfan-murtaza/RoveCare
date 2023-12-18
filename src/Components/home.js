import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
function Home() {
  const navigate = useNavigate();
  const loginhandler = (e) => {
    navigate("/login", { state: {} });
  };
  const signuphandler = (e) => {
    navigate("/signup", { state: {} });
  };
  return (
    <>
      <Header/>
      <section
        id="hero"
        class="d-flex flex-column justify-content-center align-items-center"
      >
        <div class="container text-center text-md-left" data-aos="fade-up">
          <h1>
            Welcome to <span>Rovecare</span>
          </h1>
          <h2>
            We are a health care team providing facility of Skin Cancer
            Diagnosis
          </h2>
          <button
            className="btn btn-get-started  ms-2 mt-3 mb-3"
            onClick={loginhandler}
          >
            Login
          </button>
          <button
            className="btn btn-get-started ms-2 mt-3 mb-3"
            onClick={signuphandler}
          >
            Signup
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Home;
