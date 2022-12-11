import React, { Component } from "react";
import VisualizationV1 from "../visualizations/VisualizationV1";
import VisualizationV3 from "../visualizations/VisualizationV3";
import VisualizationV4 from "../visualizations/VisualizationV4";
import VisualizationV5 from "../visualizations/VisualizationV5";
import VisualizationV6 from "../visualizations/VisualizationV6";
import VisualizationV7 from "../visualizations/VisualizationV7";

//#479042
//#003798

export default class Sources extends Component {
  render() {
    return (
      <>
        <div className="visualizations">
          <VisualizationV1 />
          <VisualizationV3 />
          <VisualizationV4 />
          <VisualizationV5 />
          <VisualizationV6 />
          <VisualizationV7 />
        </div>
      </>
    );
  }
}
