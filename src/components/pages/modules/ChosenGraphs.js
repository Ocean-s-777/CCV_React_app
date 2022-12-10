import VisualizationV1 from "../../visualizations/VisualizationV1";
import VisualizationV3 from "../../visualizations/VisualizationV3";
import VisualizationV4 from "../../visualizations/VisualizationV4";
import VisualizationV5 from "../../visualizations/VisualizationV5";
import VisualizationV6 from "../../visualizations/VisualizationV6";
import VisualizationV7 from "../../visualizations/VisualizationV7";
import VisualizationV8 from "../../visualizations/VisualizationV8";
import VisualizationV9 from "../../visualizations/VisualizationV9";

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
  
  export default function ChosenGraphs({ data }) {
    let graphs = [];
    for (let i = 0; i < data.visualizations.length; i++) {
      graphs.push(
        <VisToGraph
          visValue={data.visualizations[i]}
          descText={data.descriptions[i]}
          key={data.visualizations[i]}
        ></VisToGraph>
      );
    }
    return graphs;
  }