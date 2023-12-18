import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import HeaderInSession from "./HeaderInSession";
import { Table } from "react-bootstrap";
import swal from "sweetalert";

import Footer from "./footer";
import "./addtimeslot.css";

function AddSlots() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dayy, setDay] = useState("");
  const [timee, setTime] = useState("");
  let [myslots, setmyslots] = useState([]);
  const [ser, setser] = useState("");
  const [slots, sets] = useState([]);
  const [filter, setFilter] = useState("");

  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
          onClick: () => navigate(0),
        },
      ],
    });
  };

  useEffect(() => {
    axios({
      url: "http://localhost:4000/getslotsdoctor",
      method: "GET",
      params: { email: location.state.id },
    })
      .then((response) => {
        const data_ = response.data;
        sets(data_);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const add_slot = (day) => {
    if (myslots.length == 0) {
      setser("select slots");
    } else {
      axios({
        url: "http://localhost:4000/addslot",
        method: "POST",
        params: { email: location.state.id, slots: myslots },
      })
        .then((response) => {
          if (response.data == "added") {
            submit("Time slots added");
          } else {
            setser(response.data);
            submit("server error");
          }
        })
        .catch((err) => {
          console.log("error");
        });
    }
  };
  const linkedninHandle = (time, day) => {
    axios({
      url: "http://localhost:4000/deleteslot",
      method: "POST",
      params: { email: location.state.id, slot: time, day: day },
    })
      .then((response) => {
        if (response.data == "deleted") {
          submit("Time slot Removed");
        }
      })
      .catch((err) => {
        alert("Error");
        submit("Server Error");
      });
  };

  const disp = slots.map((s, index) => {
    if (s.day.toLowerCase().includes(filter.toLowerCase())) {
      return (
        <tr>
          <td>
            <div className="td-slots">{index + 1}</div>
          </td>

          <td>
            <div className="td-slots">{s.slot}</div>
          </td>
          <td>
            <div className="td-slots">{s.day}</div>
          </td>

          <td>
            <div>
              <button
                className=" btn recommend-test-button-1 "
                type="button"
                onClick={() => linkedninHandle(s.slot, s.day)}
              >
                Remove
              </button>
            </div>
          </td>
        </tr>
      );
    }
  });
  const chageEvent = (day, time) => {
    console.log("in change event");
    setDay(day);
    setTime(time);
    var slotarray = myslots;
    if (slotarray.indexOf(day + "," + time) == -1) {
      slotarray.push(day + "," + time);
      setmyslots(slotarray);
    }
    console.log(myslots);
  };
  const time_slot_dropdown = (dayy) => {
    return (
      <select
        onChange={(event) => {
          chageEvent(dayy, event.target.value);
        }}
        className="my-border"
      >
        <option value="Please Select">Please Select Time </option>
        <option value="6:00 AM">6:00 AM</option>
        <option value="7:00 AM">7:00 AM</option>
        <option value="8:00 AM">8:00 AM</option>
        <option value="9:00 AM">9:00 AM</option>
        <option value="10:00 AM">10:00 AM</option>
        <option value="11:00 AM">11:00 AM</option>
        <option value="12:00 AM">12:00 AM</option>
        <option value="1:00 PM">1:00 PM</option>
        <option value="2:00 PM">2:00 PM</option>
        <option value="3:00 PM">3:00 PM</option>
        <option value="4:00 PM">4:00 PM</option>
        <option value="5:00 PM">5:00 PM</option>
        <option value="6:00 PM">6:00 PM</option>
        <option value="7:00 PM">7:00 PM</option>
        <option value="8:00 PM">8:00 PM</option>
        <option value="9:00 PM">9:00 PM</option>
        <option value="10:00 PM">10:00 PM</option>
        <option value="10:00 PM">11:00 PM</option>
        <option value="10:00 PM">12:00 PM</option>
      </select>
    );
  };

  return (
    <>
      <HeaderInSession
        id={location.state.id}
        type={location.state.type}
      ></HeaderInSession>

      <div className="row4 d-flex justify-content-center">
        <Table striped bordered hover className="mt-1">
          <thead>
            <tr>
              <th className="td-slots">Monday</th>
              <th className="td-slots">Tuesday</th>
              <th className="td-slots">Wednesday</th>
              <th className="td-slots">Thursday</th>
              <th className="td-slots">Friday</th>
              <th className="td-slots">Saturday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{time_slot_dropdown("Monday")}</td>
              <td>{time_slot_dropdown("Tuesday")}</td>
              <td>{time_slot_dropdown("Wednesday")}</td>
              <td>{time_slot_dropdown("Thursday")}</td>
              <td>{time_slot_dropdown("Friday")}</td>
              <td>{time_slot_dropdown("Saturday")}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center mt-3 pt-1">
        <button
          type="button"
          className="irfan-dropdown d-flex justify-content-center"
          onClick={add_slot}
        >
          Add Slot
        </button>
      </div>
      <div className="row3">
        {/* <div className="mt-5 d-flex justify-content-center">
          <h1>Your Time Slots</h1>
        </div> */}
        <div className="form-group mt-4">
          <label className="me-3">
            <p className="paragraph-text">Filter by Day</p>
          </label>
          <input
            type="text"
            placeholder="Type Day Name"
            className=" paragraph-text rounded text-box"
            onKeyUp={(event) => {
              setFilter(event.target.value);
            }}
          />
        </div>
        <Table striped bordered hover className="mt-1">
          <thead>
            <tr>
              <th className="td-slots">#</th>
              <th className="td-slots">Time Slot</th>
              <th className="td-slots">Day</th>
              <th className="td-slots">Action</th>
            </tr>
          </thead>
          <tbody>{disp}</tbody>
        </Table>
      </div>

      <Footer></Footer>
    </>
  );
}
export default AddSlots;
