import React, { useState, useEffect } from "react";
import axios from "axios";
import DocProfile2 from "./docprofilepat";
import { useLocation, useNavigate } from "react-router-dom";

import { DropdownButton, Dropdown } from "react-bootstrap";
import { v4 } from "uuid";
import Footer from "./footer";
import HeaderInSession from "./HeaderInSession";
import Header from "../Header";
import Spinner from "react-spinkit";
import SearchBar from "../SearchBar";
import "./update.css";

function ViewDocsPat() {
  const navigate = useNavigate();
  const location = useLocation();

  let [disp_data, setdisp] = useState([]);
  const [temp, settemp] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      url: "http://localhost:4000/seedocs",
      method: "GET",
    })
      .then((response) => {
        let data_ = response.data;

        var newData = data_.filter(function (d) {
          return d.stat == "active";
        });
        setdisp(newData);
      })
      .catch((err) => {
        console.log(err);
      });
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const filter = (param) => {
    if (param == "price") {
      console.log(param);
      const data = disp_data;
      data.sort((a, b) => parseInt(a.fee) - parseInt(b.fee));
      setdisp(data);
      console.log("sorted", data);
      settemp(v4());
    } else if (param == "rating") {
      console.log(param);

      const data = disp_data;
      data.sort((a, b) => b.percent_rating - a.percent_rating);
      setdisp(data);
      settemp(v4());
    } else if (param == "reset") {
      console.log(param);
      axios({
        url: "http://localhost:4000/seedocs",
        method: "GET",
      })
        .then((response) => {
          const data_ = response.data;
          var newData = data_.filter(function (d) {
            return d.stat == "active";
          });
          setdisp(newData);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(disp_data);
      settemp(v4());
    }
  };
  const delete_ = () => {
    axios({
      url: "http://localhost:4000/deleteuser",
      method: "POST",
      params: { email: location.state.id },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data == "deleted") {
          navigate("/", { state: {} });
        }
      })
      .catch((err) => {
        console.log("err");
      });
  };
  var disp = disp_data.map((d) => {
    const input_ = d.spec.split(" ");
    const input_year = input_[2];
    var yy = parseInt(input_year);
    const dd = new Date();
    const ddd = dd.getFullYear();
    var exp = ddd - yy;

    if (d.stat == "active") {
      if (location.state.id) {
        return (
          <DocProfile2
            name={d.name}
            email={d.email}
            contact={d.contact}
            address={d.address}
            fee={d.fee}
            qual={d.qual}
            spec={d.spec}
            exp={exp}
            pat={location.state.id}
            type={location.state.type}
          ></DocProfile2>
        );
      } else {
        return (
          <DocProfile2
            name={d.name}
            email={d.email}
            contact={d.contact}
            address={d.address}
            fee={d.fee}
            qual={d.qual}
            spec={d.spec}
            exp={exp}
          ></DocProfile2>
        );
      }
    }
  });

  const show_Header = () => {
    if (location.state.id) {
      return (
        <HeaderInSession
          id={location.state.id}
          type={location.state.type}
        ></HeaderInSession>
      );
    } else {
      return <Header></Header>;
    }
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            display: "flex",
            marginTop: "350px",
            justifyContent: "center",
          }}
        >
          <Spinner name="circle" style={{ width: 100, height: 100 }} />
        </div>
      )}
      {!loading && (
        <>
          {show_Header()}

          <div className="container">
            <div className="row">
              <div className="col-12 ">
                <div className="row mt-5">
                  <div className=" d-flex justify-content-between">
                    <div className="container">
                      <div className="">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h1
                            style={{
                              color: "#a62869",
                              fontWeight: "bolder",
                              fontFamily: "italic",
                            }}
                            className="d-flex justify-content-center mt-5 mb-5"
                          >
                            Skin Specialists
                          </h1>
                        </div>
                      </div>

                      <div className="mymargin">
                        <DropdownButton
                          id="dropdown-basic-button"
                          title="Sort Doctor"
                          className="mt-3"
                        >
                          <Dropdown.Item
                            onClick={() => {
                              filter("price");
                            }}
                          >
                            Sort by Price
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              filter("rating");
                            }}
                          >
                            Sort By Rating
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">{disp}</div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default ViewDocsPat;
