import axios from "axios";
import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";
import RecommendDetail from "./recommendDetail";
import { Table } from "react-bootstrap";
import HeaderInSession from "./HeaderInSession";
import Footer from "./footer";

function Diagnose(props) {
  const location = useLocation();
  const [imageUpload, setImageUpload] = useState(null);
  const [label, setLabel] = useState(null);
  const [allTests, setallTests] = useState([]);
  const [test_name_substring, set_test_name_substring] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:4000/getalltests",
      method: "GET",
      params: {},
    })
      .then((response) => {
        setallTests(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  const disp_tests = allTests.map((data, index) => {
    if (
      data.TestName.toLowerCase().includes(test_name_substring.toLowerCase())
    ) {
      return (
        <>
          <tr>
            <RecommendDetail
              email={data.Lab}
              testname={data.TestName}
              price={data.Price}
              skin_cabcer_type={label}
              appID_={location.state.id_}
              count={index + 1}
            ></RecommendDetail>
          </tr>
        </>
      );
    }
  });

  const UploadImageToFirebase = () => {
    console.log(imageUpload);

    if (imageUpload == null) return;
    const ImageID = v4();
    const imageRef = ref(storage, ImageID + imageUpload.name);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("Image Uploaded");
      const filename = ImageID + imageUpload.name;
      axios
        .post("http://localhost:5003/", { filename: filename })
        .then((res) => {
          console.log("response from flask:", res.data.label);
          setLabel(res.data.label);
        });
    });
    axios({
      url: "http://localhost:4000/saveresult",
      method: "POST",
      params: { appID_: location.state.id_, result: label },
    })
      .then((response) => {
        if (response.data == "success") {
          console.log("done");
        }
      })
      .catch((err) => {
        alert("Error");
      });
  };
  const getTests = () => {
    axios({
      url: "http://localhost:4000/getalltests",
      method: "GET",
      params: {},
    })
      .then((response) => {
        setallTests(response.data);
        console.log(allTests);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const showLabel = () => {
    return (
      <>
        <h2 className="mt-4"> {label}</h2>
        <h1
          style={{ color: "#a62869", marginLeft: "50 px", marginTop: "100px" }}
        >
          {" "}
          Recommed Lab Test to patient{" "}
        </h1>
        <div className="test-perdiction mt-5">
          <div>
            <p className="paragraph-text ">Tests Details </p>
          </div>
          <div>
            <form>
              <div className="form-group">
                <label className="me-3">
                  <p className="paragraph-text">Filter by Test Name</p>
                </label>
                <input
                  type="text"
                  placeholder="Type Test name"
                  className=" paragraph-text rounded text-box"
                  onKeyUp={(event) => {
                    set_test_name_substring(event.target.value);
                  }}
                />
              </div>
            </form>
          </div>
        </div>

        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Lab Name</th>
              <th>Lab Email</th>
              <th>Test Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{disp_tests}</tbody>
        </Table>
      </>
    );
  };

  return (
    <>
      <HeaderInSession id={location.state.id} type="doctor"></HeaderInSession>
      <div className="App m-5 medical-history">
        <div className="container mt-3">
          <div className="row ms-3 mb-3 justify-content-center">
            <h1 style={{ color: "#a62869", fontWeight: "Bolder" }}>
              {" "}
              Diagnose Cancer{" "}
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="ms-5 mb-3 mt-3 justify-content-center">
              <input
                style={{
                  marginLeft: "80px",
                  color: "#a62869",
                  fontFamily: "Italic",
                  fontWeight: "Bolder",
                }}
                type="file"
                accept=" image/png, image/jpeg "
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              ></input>
            </div>
          </div>

          <div className="row mt-4 justify-content-center">
            <div className="mt-4 ">
              <button
                style={{ backgroundColor: "#a62869", color: "white" }}
                className="btn irfan-dropdown"
                onClick={() => {
                  UploadImageToFirebase();
                }}
              >
                Diagnose
              </button>

              <div>{showLabel()}</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", bottom: 0, width: "100%" }}>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Diagnose;
