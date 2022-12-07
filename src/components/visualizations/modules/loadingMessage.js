import React from "react";

function loadingMessage() {
  return (
    <div className="graph-box">
      <br />
      <div
        style={{
          backgroundColor: "#f2f0ed",
          fontSize: "30px",
          alignSelf: "center",
          position: "relative",
        }}
        className="line-box"
      >
        <p
          style={{
            color: "#c757cf",
            fontSize: "30px",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          Loading...
        </p>
      </div>
      <div className="graph-text-box">
        <p>...</p>
      </div>
      <hr />
    </div>
  );
}
//  color: "red", textAlign: "center"
export default loadingMessage;
