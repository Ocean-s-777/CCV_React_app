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
  descrip: ["custom text...", null, "custom text...", "custom text..."], // Array of strings/null values. Length must match the vis length.
};

function VisToGraph({ visValue }) {
  let result;
  switch (visValue) {
    case "V1":
      result = <VisualizationV1 />;
      break;
    case "V3":
      result = <VisualizationV3 />;
      break;
    case "V4":
      result = <VisualizationV4 />;
      break;
    case "V5":
      result = <VisualizationV5 />;
      break;
    case "V6":
      result = <VisualizationV6 />;
      break;
    case "V7":
      result = <VisualizationV7 />;
      break;
    case "V8":
      result = <VisualizationV8 />;
      break;
    case "V9":
      result = <VisualizationV9 />;
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
  for (let i = 0; i < data.length; i++) {
    graphs.push(<VisToGraph visValue={data[i]} key={data[i]}></VisToGraph>);
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
          <h1>{json.title}</h1>
        </div>
        <br />
        <div style={style} className="visualizations">
          <ChosenGraphs data={json.vis} />
        </div>
      </>
    );
  }
}
