import React, { Component } from "react";
//import VisualizationV1 from '../visualizations/VisualizationV1'
//#479042
//#003798

import VisualizationV8 from "../visualizations/VisualizationV8";
import VisualizationV9 from "../visualizations/VisualizationV9";

export default class Sources extends Component {
  render() {
    return (
      <>
        <div className="visualizations">
          <VisualizationV8 />
          <VisualizationV9 />
        </div>
      </>
    );
  }
}
