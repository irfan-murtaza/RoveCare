import ViewAllLabs from "./ViewAllLabs";
import ViewAllDoctors from "./ViewAllDoctors";
import Header from "./Header";
import Footer from "./Components/footer";
import SearchBar from "./SearchBar";
import Spinner from "react-spinkit";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import HeaderInSession from "./Components/HeaderInSession";
const Home = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const show_Header = () => {
    if (location.state) {
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
          {" "}
          {show_Header()}
          <SearchBar />
          <ViewAllDoctors />
          <ViewAllLabs />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
