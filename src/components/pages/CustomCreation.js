import React, { Component } from "react";
import VisualizationV1 from "../visualizations/VisualizationV1";
import VisualizationV3 from "../visualizations/VisualizationV3";
import VisualizationV4 from "../visualizations/VisualizationV4";
import VisualizationV5 from "../visualizations/VisualizationV5";
import VisualizationV6 from "../visualizations/VisualizationV6";
import VisualizationV7 from "../visualizations/VisualizationV7";
import VisualizationV8 from "../visualizations/VisualizationV8";
import VisualizationV9 from "../visualizations/VisualizationV9";
import { useState } from "react";

//const fetchURL = "https://oceans777.herokuapp.com";

// Dummy data
// Will be removed some real data can fetched
// Feel free to experiment by trying out different values
let customViewDummyData = {
  id: "fh340792yt25hgiu3g2ng", // String. This could be used as the URL parameter.
  title: "My very own custom view", // String
  columns: 2, // 1 or 2
  vis: ["V3", "V9", "V1", "V4"], // List of strings. This could be changed to be just numbers (without the letter V).
  descrip: [
    "This is a custom text for the FIRST graph shown on the custom view",
    null,
    "This is a custom text for the THIRD graph shown on the custom view",
    "This is a custom text for the FOURTH graph shown on the custom view",
  ], // Array of strings/null values. Length must match the vis length.
};

function VisToGraph({ visValue, descText }) {
  let result;
  switch (visValue) {
    case "V1":
      result = <VisualizationV1 customDescription={descText} />;
      break;
    case "V3":
      result = <VisualizationV3 customDescription={descText} />;
      break;
    case "V4":
      result = <VisualizationV4 customDescription={descText} />;
      break;
    case "V5":
      result = <VisualizationV5 customDescription={descText} />;
      break;
    case "V6":
      result = <VisualizationV6 customDescription={descText} />;
      break;
    case "V7":
      result = <VisualizationV7 customDescription={descText} />;
      break;
    case "V8":
      result = <VisualizationV8 customDescription={descText} />;
      break;
    case "V9":
      result = <VisualizationV9 customDescription={descText} />;
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
    graphs.push(
      <VisToGraph
        visValue={data.vis[i]}
        descText={data.descrip[i]}
        key={data.vis[i]}
      ></VisToGraph>
    );
  }
  return graphs;
}

/* const GraphSelection = ({ graphId, graphName, graphDesc, graphSetDesc }) => {
  return (
    <>
      <input type="checkbox" id={graphId} />
      <label htmlFor={graphId}>{graphName}</label> <br />
      <input
        type="string"
        value={graphDesc}
        onChange={(e) => {
          graphSetDesc;
        }}
        placeholder="Enter Description"
      ></input>{" "}
      <br />
    </>
  );
} */

export default function CustomCreation() {
  const [customTitle, setCustomTitle] = useState("");
  const [columns, setColumns] = useState(1);
  const [desc1, setDesc1] = useState("");
  const [desc3, setDesc3] = useState("");
  const [desc4, setDesc4] = useState("");
  const [desc5, setDesc5] = useState("");
  const [desc6, setDesc6] = useState("");
  const [desc7, setDesc7] = useState("");
  const [desc8, setDesc8] = useState("");
  const [desc9, setDesc9] = useState("");

  let json = customViewDummyData; // Will be replaced with a fetch function & real data

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${json.columns}, 1fr)`,
    gap: "16px",
  };

  return (
    <>
      <div className="page_title_container">
        <h1 className="page_title">Create your own custom view</h1>
      </div>

      <div className="CustomOptionsBox">
        <div>
          <h3>Write Title for your view</h3>
          <input
            type="string"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter Title"
          ></input>
        </div>

        <div>
          <h3>Choose number of columns</h3>
          <input
            type="radio"
            id="1Columns"
            name="columns"
            value={1}
            onChange={(e) => setColumns(e.target.value)}
          ></input>
          <label htmlFor="1Columns">&nbsp;&nbsp;1</label> &nbsp; &nbsp;
          <input
            type="radio"
            id="2Columns"
            name="columns"
            value={2}
            onChange={(e) => setColumns(e.target.value)}
          ></input>
          <label htmlFor="1Columns">&nbsp;&nbsp;2</label>
        </div>

        <div>
          <h3>Choose graphs to include</h3>
          <p>and write custom descriptions for them if you want</p>
          
          {/*           <GraphSelection
            graphId="graph_1"
            graphName="Global historical surface temperature anomalies from January 1850
          onwards"
            graphDesc={desc1}
            graphSetDesc={setDesc1(e.target.value)}
  /> */}
          <input type="checkbox" id="graph_1" />
          <label htmlFor="graph_1">
            Global historical surface temperature anomalies from January 1850
            onwards
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc1}
            onChange={(e) => setDesc1(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_3" />
          <label htmlFor="graph_3">
            Atmospheric CO2 concentrations from Mauna Loa measurements starting
            1958
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc3}
            onChange={(e) => setDesc3(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_4" />
          <label htmlFor="graph_4">
            Antarctic Ice Core records of atmospheric CO2 ratios combined with
            Mauna Loa measurement
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc4}
            onChange={(e) => setDesc4(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_5" />
          <label htmlFor="graph_5">
            Vostok Ice Core CO2 measurements, 417160 - 2342 years
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc5}
            onChange={(e) => setDesc5(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_6" />
          <label htmlFor="graph_6">
            Ice core 800k year composite study CO2 measurements
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc6}
            onChange={(e) => setDesc6(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_7" />
          <label htmlFor="graph_7">
            Evolution of global temperature over the past two million years
          </label>{" "}
          <br />
          <input
            type="string"
            value={desc7}
            onChange={(e) => setDesc7(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_8" />
          <label htmlFor="graph_8">CO2 emissions by country</label> <br />
          <input
            type="string"
            value={desc8}
            onChange={(e) => setDesc8(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
          <input type="checkbox" id="graph_9" />
          <label htmlFor="graph_9">CO2 emissions by sectors</label> <br />
          <input
            type="string"
            value={desc9}
            onChange={(e) => setDesc9(e.target.value)}
            placeholder="Enter Description"
          ></input>{" "}
          <br />
        </div>

        <div>
          <button type="button" onClick={null}>
            Save
          </button>
        </div>
      </div>

      <hr />
      <div className="page_title_container">
        <h1 className="page_title">{customTitle}</h1>
      </div>
      <br />
      <div style={style} className="visualizations">
        <ChosenGraphs data={json} />
      </div>
    </>
  );
}
