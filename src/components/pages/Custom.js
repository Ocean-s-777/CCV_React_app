import React, { Component } from "react";

import ChosenGraphs from "./modules/ChosenGraphs";

//const fetchURL = "https://oceans777.herokuapp.com";

// Dummy data
// Will be removed when the real data can be fetched
// Feel free to experiment by trying out different values
// let customViewDummyData = {
//   _id: "123123",
//   id: "456456",
//   title: "My very own custom view",
//   columns: 2,
//   visualizations: ["V7", "V3", "V9", "V5"],
//   descriptions: [
//     "This is a custom text for the FIRST graph shown on the custom view",
//     null,
//     "This is a custom text for the THIRD graph shown on the custom view",
//     "This is a custom text for the FOURTH graph shown on the custom view",
//   ],
//   owner: "789789",
// };

export default function Custom(customViewData) {
  let json = customViewData; // Will be replaced with a fetch function & real data

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${json.columns}, 1fr)`,
    gap: "16px",
  };
  return (
    <>
      <div className="page_title_container">
        <h1 className="page_title">{json.title}</h1>
      </div>
      <br />
      <div style={style} className="visualizations">
        <ChosenGraphs data={json} />
      </div>
    </>
  );
}
