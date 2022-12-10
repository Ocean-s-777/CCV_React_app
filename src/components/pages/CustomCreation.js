import { useState } from "react";

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

  return (
    <>
      <div className="page_title_container">
        <h1 className="page_title">Create your own custom view</h1>
      </div>

      <div className="CustomOptionsBox">
        <div>
          <h3>Write Title for your view</h3>
          <input
            className="text_input_field"
            type="string"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter Title"
          ></input>
        </div>

        <div onChange={(e) => setColumns(e.target.value)}>
          <h3>Choose number of columns</h3>
          <input type="radio" id="1Columns" name="columns" value={1}></input>
          <label htmlFor="1Columns">&nbsp;&nbsp;1</label> &nbsp; &nbsp;
          <input type="radio" id="2Columns" name="columns" value={2}></input>
          <label htmlFor="1Columns">&nbsp;&nbsp;2</label>
        </div>

        <div>
          <h3>Choose graphs to include</h3>
          <div className="custom_creation_instuction_text_box">
            <p>And write custom descriptions for them if you want</p>
            <p>
              (If description box is left empty, the standard description of the
              graph is used.)
            </p>
          </div>
          <div className="custom_creation_graphs_to_include_box">
            <input type="checkbox" id="graph_1" />
            <label htmlFor="graph_1">
              Global historical surface temperature anomalies from January 1850
              onwards
            </label>{" "}
            <br />
            <input
              className="text_input_field"
              type="string"
              value={desc1}
              onChange={(e) => setDesc1(e.target.value)}
              placeholder="Enter Description"
            ></input>{" "}
            <br />
            <input type="checkbox" id="graph_3" />
            <label htmlFor="graph_3">
              Atmospheric CO2 concentrations from Mauna Loa measurements
              starting 1958
            </label>{" "}
            <br />
            <input
              className="text_input_field"
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
              className="text_input_field"
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
              className="text_input_field"
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
              className="text_input_field"
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
              className="text_input_field"
              type="string"
              value={desc7}
              onChange={(e) => setDesc7(e.target.value)}
              placeholder="Enter Description"
            ></input>{" "}
            <br />
            <input type="checkbox" id="graph_8" />
            <label htmlFor="graph_8">CO2 emissions by country</label> <br />
            <input
              className="text_input_field"
              type="string"
              value={desc8}
              onChange={(e) => setDesc8(e.target.value)}
              placeholder="Enter Description"
            ></input>{" "}
            <br />
            <input type="checkbox" id="graph_9" />
            <label htmlFor="graph_9">CO2 emissions by sectors</label> <br />
            <input
              className="text_input_field"
              type="string"
              value={desc9}
              onChange={(e) => setDesc9(e.target.value)}
              placeholder="Enter Description"
            ></input>{" "}
          </div>
          <br />
        </div>

        <div className="Create_Custom_View_Button_Container">
          <button
            className="Create_Custom_View_Button"
            type="button"
            onClick={null}
          >
            Create View
          </button>
        </div>
      </div>
    </>
  );
}
