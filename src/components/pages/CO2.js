import React, { Component } from 'react'
import VisualizationV1 from '../visualizations/VisualizationV1'
import VisualizationV3 from '../visualizations/VisualizationV3'
//#479042
//#003798
export default class Sources extends Component {
  render() {
    return (
        <>
      <div>current site is CO2 bla bla and should show v1, v2, v3 bla bla(/CO2)</div>
      <div className="visualizations">
        <VisualizationV1/>
        <VisualizationV3/>
      </div>
      </>
    )
  }
}
