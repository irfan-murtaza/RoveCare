import React from "react";
import HeaderInSession from "./HeaderInSession";
import "./update.css";
function ReviewDetails(props) {
  const rats = [];
  for (var i = 0; i < 5; i++) {
    rats.push(i);
  }
  const rat = rats.map((d) => {
    if (d < props.rat) {
      return <span class="fa fa-star checked"></span>;
    } else {
      return <span class="fa fa-star "></span>;
    }
  });
  return (
    <>
      <div className="card  mt-4 mb-5">
        <div className="myowncard">
          <p className="myownp">{props.pat}</p>
        </div>
        <div className="card-body">
          <div className="mycard12">
            <div className="myowndesign">Rating:</div>

            <div className="myowndesignn">{rat}</div>
          </div>

          <div className="mycard12">
            <div className="myowndesign">Review:</div>

            <div className="myowndesignn">{props.rev}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewDetails;
