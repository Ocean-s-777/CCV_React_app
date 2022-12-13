import { useState, useContext } from "react";
import axios from "axios";
import { UserAuthContext } from "../../Context";
import { fetchURL } from "../visualizations/modules/fetchURL";
import { useNavigate } from "react-router-dom";

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
  const [chosenVis, setChosenVis] = useState([]);
  const [chosenDesc, setChosenDesc] = useState([]);
  const UserAuthContextValue = useContext(UserAuthContext);
  const navigate = useNavigate();

  // Add/remove visualization identifiers in the chosenVis array when checkboxes are checked/unchecked
  let checkboxChange = (value) => {
    if (chosenVis.includes(value)) {
      let index = chosenVis.indexOf(value);
      if (index > -1) {
        chosenVis.splice(index, 1);
      }
    } else {
      chosenVis.push(value);
    }
    console.log(chosenVis);
  };

  // Function for the "Create View" button
  const createView = async () => {
    // This will be sent to the server:
    let viewStats = {
      title: customTitle,
      columns: columns,
      visualizations: chosenVis,
      descriptions: chosenDesc,
    };

    // Make sure the a title of at least 4 letters is written:
    if (viewStats.title.length < 4) {
      alert("You must include a TITLE of at least 4 characters!");
      return;
    }
    // Make sure at least 1 graph is selected:
    else if (viewStats.visualizations < 1) {
      alert("You must choose at lest one GRAPH!");
      return;
    }
    // Add descriptions to the viewStats object:
    else {
      viewStats.visualizations.forEach((value) => {
        let descToBePushed;
        switch (value) {
          case "V1":
            descToBePushed = desc1;
            break;
          case "V3":
            descToBePushed = desc3;
            break;
          case "V4":
            descToBePushed = desc4;
            break;
          case "V5":
            descToBePushed = desc5;
            break;
          case "V6":
            descToBePushed = desc6;
            break;
          case "V7":
            descToBePushed = desc7;
            break;
          case "V8":
            descToBePushed = desc8;
            break;
          case "V9":
            descToBePushed = desc9;
            break;
        }
        if (descToBePushed.length < 1) {
          descToBePushed = null;
        }
        viewStats.descriptions.push(descToBePushed);
      });

      console.log(viewStats);

      try {
        let config = {
          headers: {
            Authorization: "Bearer " + UserAuthContextValue.jwt,
          },
        };
        await axios
          .post(fetchURL + "/custom/create", viewStats, config)
          .then((res) => {
            navigate(`/custom/${res.data.id}`);
          });

        // Redirected user to the new view
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="page_title_container">
        <h1 className="page_title">Create your own custom view</h1>
      </div>

      <div className="CustomOptionsBox">
        <div>
          <h3>Title of your view</h3>
          <input
            className="text_input_field bigFont"
            type="string"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Enter Title"
          ></input>
          <div className="custom_creation_instuction_text_box">
          <p>The title must be at least four letters long.</p>
          </div>
        </div>

        <div onChange={(e) => setColumns(e.target.value)}>
          <h3>Columns</h3>
          <input
            type="radio"
            id="1Columns"
            name="columns"
            value={1}
            defaultChecked
          ></input>
          <label htmlFor="1Columns" className="noPadding">
            &nbsp;&nbsp;1
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="2Columns" name="columns" value={2}></input>
          <label htmlFor="1Columns" className="noPadding">
            &nbsp;&nbsp;2
          </label>
          <div className="custom_creation_instuction_text_box">
          <p>
            Only one column will be shown on narrow screens regardless of this
            setting.
          </p>
          </div>
        </div>

        <div>
          <h3>Graphs</h3>
          <div className="custom_creation_instuction_text_box">
            <p>Choose graphs to include and write custom descriptions.</p>
            <p>
              If the description box is left empty, the standard description for
              the graph will be used.
            </p>
          </div>
          <div className="custom_creation_graphs_to_include_box">
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_1"
                value="V1"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_1">
                Global historical surface temperature anomalies from January
                1850 onwards
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc1}
                onChange={(e) => setDesc1(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_3"
                value="V3"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_3">
                Atmospheric CO2 concentrations from Mauna Loa measurements
                starting 1958
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc3}
                onChange={(e) => setDesc3(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_4"
                value="V4"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_4">
                Antarctic Ice Core records of atmospheric CO2 ratios combined
                with Mauna Loa measurement
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc4}
                onChange={(e) => setDesc4(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_5"
                value="V5"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_5">
                Vostok Ice Core CO2 measurements, 417160 - 2342 years
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc5}
                onChange={(e) => setDesc5(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_6"
                value="V6"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_6">
                Ice core 800k year composite study CO2 measurements
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc6}
                onChange={(e) => setDesc6(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_7"
                value="V7"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_7">
                Evolution of global temperature over the past two million years
              </label>
            </div>
            <br />
            <div className="text_input_field_container">
              <input
                className="text_input_field"
                type="string"
                value={desc7}
                onChange={(e) => setDesc7(e.target.value)}
                placeholder="Enter Description"
              ></input>
            </div>
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_8"
                value="V8"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_8">CO2 emissions by country</label> <br />
              </div>
              <div className="text_input_field_container">
                <input
                  className="text_input_field"
                  type="string"
                  value={desc8}
                  onChange={(e) => setDesc8(e.target.value)}
                  placeholder="Enter Description"
                ></input>
              </div>
            
            <br />
            <div className="checkbox_div">
              <input
                type="checkbox"
                id="graph_9"
                value="V9"
                onChange={(e) => checkboxChange(e.target.value)}
              />
              <label htmlFor="graph_9">CO2 emissions by sectors</label> <br />
              </div>
              <input
                className="text_input_field"
                type="string"
                value={desc9}
                onChange={(e) => setDesc9(e.target.value)}
                placeholder="Enter Description"
              ></input>
            
          </div>
          <br />
        </div>

        <div className="Create_Custom_View_Button_Container">
          <button
            className="Create_Custom_View_Button"
            type="button"
            onClick={createView}
          >
            Create View
          </button>
        </div>
      </div>
    </>
  );
}
