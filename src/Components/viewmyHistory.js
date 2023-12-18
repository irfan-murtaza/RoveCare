import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./footer";
import HeaderInSession from "./HeaderInSession";
import MedicalHistoryPatient from "./MedicalHistoryPatient";
import { Table } from "react-bootstrap";
import Spinner from "react-spinkit";

function MyHistory() {
  const location = useLocation();
  let [histdata, sethistdata] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      url: "http://localhost:4000/patienthistory",
      method: "GET",
      params: { email: location.state.id },
    })
      .then((response) => {
        sethistdata(response.data);
        console.log(histdata);
      })
      .catch((err) => {
        console.log("error");
      });
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const disp = histdata.map((hist, index) => {
    console.log(hist);
    return (
      <tr>
        <MedicalHistoryPatient
          pat={location.state.id}
          TestName={hist.TestName}
          result={hist.result}
          LabEmail={hist.LabEmail}
          appID={hist.appID_}
          count={index + 1}
          Status={hist.Status}
        ></MedicalHistoryPatient>
      </tr>
    );
  });
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
          <div
            style={{
              position: "relative",
              minHeight: "65vh",
              // paddingBottom: "2.5rem",
            }}
          >
            <div className="medical-history-1">
              <HeaderInSession
                id={location.state.id}
                type={location.state.type}
              ></HeaderInSession>
              <div className="container">
                <div className="text-center">
                  <h2
                    style={{ color: "#a62869", fontWeight: "bold" }}
                    className="mb-5 mt-3"
                    text-center
                  >
                    Your Medical History
                  </h2>
                  <Table striped bordered hover className="mt-1">
                    <thead>
                      <tr>
                        <th className="td-slots">#</th>
                        <th className="td-slots">Appoinment ID</th>
                        <th className="td-slots">Result</th>
                        <th className="td-slots">Test Name</th>
                        <th className="td-slots">Lab Name</th>
                        <th className="td-slots">Lab Email</th>
                        <th className="td-slots">Status</th>
                        <th className="td-slots">Action</th>
                      </tr>
                    </thead>
                    <tbody>{disp}</tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "11.5rem",
              height: "2.5rem",
              width: "100%",
            }}
          >
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default MyHistory;
