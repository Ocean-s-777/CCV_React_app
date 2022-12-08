import React, { Component } from "react";
import VisualizationV1 from "../visualizations/VisualizationV1";
import VisualizationV3 from "../visualizations/VisualizationV3";
import VisualizationV4 from "../visualizations/VisualizationV4";
import VisualizationV5 from "../visualizations/VisualizationV5";
import VisualizationV6 from "../visualizations/VisualizationV6";
import VisualizationV7 from "../visualizations/VisualizationV7";
import VisualizationV8 from "../visualizations/VisualizationV8";
import VisualizationV9 from "../visualizations/VisualizationV9";

//const fetchURL = "https://oceans777.herokuapp.com";

// Dummy data
// Will be removed some real data can fetched
// Feel free to experiment by trying out different values
let customViewDummyData = {
  id: "fh340792yt25hgiu3g2ng", // String. This could be used as the URL parameter.
  title: "My very own custom view", // String
  columns: 2, // 1 or 2
  vis: ["V3", "V9", "V1", "V4"], // List of strings. This could be changed to be just numbers (without the letter V).
  descrip: ["This is a custom text for the FIRST graph shown on the custom view", null, "This is a custom text for the THIRD graph shown on the custom view", "This is a custom text for the FOURTH graph shown on the custom view"], // Array of strings/null values. Length must match the vis length.
};

function VisToGraph({ visValue, descText }) {
  let result;
  switch (visValue) {
    case "V1":
      result = <VisualizationV1 customDescription={descText}/>;
      break;
    case "V3":
      result = <VisualizationV3 customDescription={descText}/>;
      break;
    case "V4":
      result = <VisualizationV4 customDescription={descText}/>;
      break;
    case "V5":
      result = <VisualizationV5 customDescription={descText}/>;
      break;
    case "V6":
      result = <VisualizationV6 customDescription={descText}/>;
      break;
    case "V7":
      result = <VisualizationV7 customDescription={descText}/>;
      break;
    case "V8":
      result = <VisualizationV8 customDescription={descText}/>;
      break;
    case "V9":
      result = <VisualizationV9 customDescription={descText}/>;
      break;
    default:
      result = (
        <>
          <br />
          <h3 style={{ color: "red", textAlign: "center" }}>Invalid graph</h3>
          <hr />
        </>
      );
  }
  return result;
}

function ChosenGraphs({ data }) {
  let graphs = [];
  for (let i = 0; i < data.vis.length; i++) {
    graphs.push(<VisToGraph visValue={data.vis[i]} descText={data.descrip[i]} key={data.vis[i]}></VisToGraph>);
  }
  return graphs;
}

export default class Custom extends Component {
  render() {
    let json = customViewDummyData; // Will be replaced with a fetch function & real data

    const style = {
      display: "grid",
      gridTemplateColumns: `repeat(${json.columns}, 1fr)`,
      gap: "16px",
    };
    return (
      <>
        <div>
          <h1 className="page_title">{json.title}</h1>
        </div>
        <br />
        <div style={style} className="visualizations">
          <ChosenGraphs data={json} />
        </div>
      </>
    );
  }
}
