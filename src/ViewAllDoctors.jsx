import { confirmAlert } from "react-confirm-alert";
import { useNavigate, useLocation } from "react-router-dom";

import "react-confirm-alert/src/react-confirm-alert.css";

const ViewAllDoctors = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div class="margin-80-center shadow-design">
      <div class="row">
        <div class="col-md-12 home-div-style">
          <h4 className="font-design">Are You Looking For A Doctor?</h4>
        </div>
      </div>
      <div class="row">
        <div class="width70 homediv2">
          <div class="box-shadow-sm p-3 homediv3">
            <div class="row flexprop">
              <div class="col-md-4  text-center mb-2">
                <img
                  class=" imgdesign"
                  height="119"
                  width="136"
                  alt="physical doctors"
                  src="https://h7u5d3a4.stackpathcdn.com/assets/images/home-new/physical-doctor.png"
                />
              </div>
              <div class="width70 text-center">
                <p class="myfont fontweight ">Find And Book Appointment</p>
                <p class="myfont ">With Verified Doctors</p>
                <div className="width700">
                  <button
                    class="button-25"
                    onClick={() => {
                      if (location.state == null) {
                        navigate("/seedocspat", {
                          state: {},
                        });
                      } else {
                        navigate("/seedocspat", {
                          state: {
                            id: location.state.id,
                            type: location.state.type,
                          },
                        });
                      }
                    }}
                  >
                    View All Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllDoctors;
