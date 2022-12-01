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
const COLOR1 = "#E60000";
const COLOR2 = "#0000E6";
const COLOR3 = "#007300";
const COLOR4 = "#E69500";
let dataVersion = 0; // Used by the function to change the displayed data
let newData = {}; // Used by the function to change the displayed data

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
      // eslint-disable-next-line
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        labels: [
          "Energy",
          "Industrial processes",
          "Waste",
          "Argiculture, Forestry & Land Use",
        ],
        datasets: [
          {
            data: [73.2, 5.2, 3.2, 18.4],
            backgroundColor: [COLOR1, COLOR2, COLOR3, COLOR4],
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
        display: true,
        position: "bottom",
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
    onClick: function (evt, element) {
      if (element.length > 0) {
        //console.log(element[0]);
        toggleData();
      }
    },
  };

  // Function to change the displayed data
  let toggleData = () => {
    if (dataVersion === 0) {
      dataVersion = 1;
      newData = {
        labels: [
          "Road",
          "Aviation",
          "Rail",
          "Pipeline",
          "Ship",
          "Residential",
          "Commercial",
          "Iron & Steel",
          "Non-ferous metals",
          "Machinery",
          "Food and tobacco",
          "Paper, pulp & printing",
          "Chemical & petrochemical (energy)",
          "Other industry",
          "Energy in Agri & Fishing",
          "Unallocated fuel combustion",
          "Coal",
          "Oil & Natural Gas",
          "Cement",
          "Chemical & petrochemical (industrial)",
          "Landfills",
          "Wastewater",
          "Livestock & Manure",
          "Rice Cultivation",
          "Agricultural Soils",
          "Crop Burning",
          "Forest Land",
          "Cropland",
          "Grassland",
        ],
        datasets: [
          {
            data: [
              11.9, 1.9, 0.4, 0.3, 1.7, 10.9, 6.6, 7.2, 0.7, 0.5, 1, 0.6, 3.6,
              10.6, 1.7, 7.8, 1.9, 3.9, 3, 2.2, 1.9, 1.3, 5.8, 1.3, 4.1, 3.5,
              2.2, 1.4, 0.1,
            ],
            backgroundColor: [
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR1,
              COLOR2,
              COLOR2,
              COLOR3,
              COLOR3,
              COLOR4,
              COLOR4,
              COLOR4,
              COLOR4,
              COLOR4,
              COLOR4,
              COLOR4,
            ],
            hoverOffset: 4,
          },
        ],
      };
    } else {
      dataVersion = 0;
      newData = {
        labels: [
          "Energy",
          "Industrial processes",
          "Waste",
          "Argiculture, Forestry & Land Use",
        ],
        datasets: [
          {
            data: [73.2, 5.2, 3.2, 18.4],
            backgroundColor: [COLOR1, COLOR2, COLOR3, COLOR4],
            hoverOffset: 4,
          },
        ],
      };
    }
    setData(newData);
  };

  return (
    <div className="graph-box">
      <br />
      <div style={{ width: "50vw" }} className="dougnut-chart-container">
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
