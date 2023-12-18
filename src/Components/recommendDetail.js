import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

function RecommendDetail(props) {
  const [labname, setlabname] = useState("");
  useEffect(() => {
    axios({
      url: "http://localhost:4000/labname",
      method: "GET",
      params: { email: props.email },
    })
      .then((response) => {
        setlabname(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  const submit = (status) => {
    confirmAlert({
      title: status,
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  };

  const recommend_test = () => {
    axios({
      url: "http://localhost:4000/savehistory",
      method: "POST",
      params: {
        appID_: props.appID_,
        result: props.skin_cabcer_type,
        LabEmail: props.email,
        TestName: props.testname,
        Status: "Pending",
      },
    })
      .then((response) => {
        console.log(response.data);
        submit("Test Recommended Sucessfully !");
      })
      .catch((err) => {
        console.log("error");
        submit("Server error");
      });
  };
  return (
    <>
      <td>
        <p className="mt-3">{props.count}</p>
      </td>
      <td>
        <p className="mt-3">{props.testname}</p>
      </td>
      <td>
        <p className="mt-3">{labname}</p>
      </td>
      <td>
        <p className="mt-3">{props.email}</p>
      </td>
      <td>
        <p className="mt-3">{props.price}</p>
      </td>

      <td>
        <button
          className=" btn mt-1 recommend-test-button "
          type="button"
          onClick={recommend_test}
        >
          Recommed Test
        </button>
      </td>
    </>
  );
}
export default RecommendDetail;
