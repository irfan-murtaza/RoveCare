import { confirmAlert } from "react-confirm-alert";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";

import "react-confirm-alert/src/react-confirm-alert.css";

const ViewAllLabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const submit = (t) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <div class="margin-80-center shadow-design">
      <div class="row">
        <div class="col-md-12 home-div-style">
          <h4 className="font-design">Are You Looking For A Lab Test?</h4>
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
                  src="https://h7u5d3a4.stackpathcdn.com/assets/images/home-new/labs.png"
                />
              </div>
              <div class="width70 text-center">
                <p class="myfont fontweight">Avail Discounts</p>
                <p class="myfont">on Booking Lab Tests</p>
                <div className="width700">
                  <button
                    class="button-25"
                    type="button"
                    onClick={() => {
                      if (location.state == null) {
                        navigate("/seelabspat", {
                          state: {},
                        });
                      } else {
                        navigate("/seelabspat", {
                          state: {
                            id: location.state.id,
                            type: location.state.type,
                          },
                        });
                      }
                    }}
                  >
                    View All Labs
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

export default ViewAllLabs;
