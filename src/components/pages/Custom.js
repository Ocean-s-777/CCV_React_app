import React, { Component } from "react";
import ChosenGraphs from "./modules/ChosenGraphs";

export default function Custom(customViewData) {
  let aaaClassName = "visualizations OneColumnView";
  if (customViewData.columns == 2) {
    aaaClassName = "visualizations TwoColumnView";
  }

  return (
    <>
      <div className="page_title_container">
        <h1 className="page_title">{customViewData.title}</h1>
      </div>
      <br />
      <div className={aaaClassName}>
        <ChosenGraphs data={customViewData} />
      </div>
    </>
  );
}
