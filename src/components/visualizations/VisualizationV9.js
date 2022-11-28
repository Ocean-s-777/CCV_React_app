// Doughnut chart V9
// CO2 emissions by sectors

import React from "react";
import "chartjs-adapter-luxon";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
//const BORDERWIDTH = 2;
//const POINTRADIUS = 0;
const COLOR1 = "red";
const COLOR2 = "blue";
const COLOR3 = "green";
const COLOR4 = "orange";

// If run on localhost, asume localhost server is also used
let currentURL = window.location.href;
let isDev = currentURL.includes("localhost");
let fetchURL = isDev
  ? "http://localhost:3002" // You need to have the server's .env PORT set as 3002
  : "https://oceans777.herokuapp.com";
fetchURL = "https://oceans777.herokuapp.com"; // Disable this line to benefit from the code above

// Function to build datasets (from json) for a Line
/* const buildDataset = (label, data, color, x, y, hidden) => ({
  label,
  data: data.map((d) => ({
    time: d[x],
    value: d[y],
  })),
  borderColor: color,
  backgroundColor: color,
  parsing: {
    xAxisKey: "time",
    yAxisKey: "value",
  },
  borderWidth: BORDERWIDTH,
  pointRadius: POINTRADIUS,
  hidden,
}); */

const VisualizationV9 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v3"); // Change to /v9 once the route exists
      const json = await response.json();
      console.log(json) // Just for testing
      let dataObject = {
        labels: [
            "Energy",
            "Industrial processes",
            "Waste",
            "Agriculture, Forestry & Land Use",
          ],
        datasets: [
          {
            label: "testisektori",
            data: [73.2, 5.2, 3.2, 18.4],
            backgroundColor: [
              COLOR1,
              COLOR2,
              COLOR3,
              COLOR4,
            ],
            hoverOffset: 4,
          },
        ],
      };
      setData(dataObject);
    };
    if (!data) {
      fetchData();
    }
  }, [data]);

  //console.log(data)
  if (!data) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "CO2 emissions by sectors",
        font: {
          size: 20,
          family: 'Arial,"Times New Roman", Times, serif',
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <br />
      <div style={{width: '50vw'}} className="dougnut-chart-container">
        <Doughnut options={options} data={data} />
      </div>

      <div className="graph-text-box">
        <p>The current graph is just a placehoder!</p>

        <p>
          <a
            href="https://ourworldindata.org/emissions-by-sector#co2-emissions-by-sector"
            target="_blank"
            rel="noreferrer"
          >
            Detailed description
          </a>
          &nbsp; & &nbsp;
          <a
            href="https://ourworldindata.org/uploads/2020/09/Global-GHG-Emissions-by-sector-based-on-WRI-2020.xlsx"
            target="_blank"
            rel="noreferrer"
          >
            the data used (download)
          </a>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV9;
