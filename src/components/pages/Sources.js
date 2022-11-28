import React, { Component } from "react";
//import VisualizationV1 from '../visualizations/VisualizationV1'
//#479042
//#003798

import VisualizationV8 from "../visualizations/VisualizationV8";

export default class Sources extends Component {
  render() {
    return (
      <>
        <div>
          current site is (emission) sources (/Sources) and will include v8 and
          v9 or smt
        </div>
        <div className="visualizations">
          <VisualizationV8 />
        </div>
      </>
    );
  }
}
