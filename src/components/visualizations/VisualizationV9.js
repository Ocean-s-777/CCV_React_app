// Doughnut chart V9
// CO2 emissions by sectors

import React from "react";
import "chartjs-adapter-luxon";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

const COLOR1 = [0, 84, 230]; //"#0054E6dd";
const COLOR2 = [221, 130, 130]; //"#dd8282dd";
const COLOR3 = [255, 192, 91]; //"#FFC05B";
const COLOR4 = [34, 140, 27]; //"#228C1Bdd";
let dataVersion = 1; // Used by toggleData()
let newData = {}; // Used by toggleData()
let json = {};
const fetchURL = "https://oceans777.herokuapp.com";

const VisualizationV9 = () => {
  const [data, setData] = useState();

  let createColors = (set) => {
    let colorArray = [];
    let colorPush = (colorRGBValues, count) => {
      for (let i = 0; i < count; i++) {
        let red = colorRGBValues[0] + i * 10;
        let green = colorRGBValues[1] + i * 10;
        let blue = colorRGBValues[2] + i * 10;
        let color = "rgb(" + red + ", " + green + ", " + blue + ")";
        colorArray.push(color);
      }
    };
    if (set === "main") {
      colorPush(COLOR1, 1);
      colorPush(COLOR2, 1);
      colorPush(COLOR3, 1);
      colorPush(COLOR4, 1);
    } else {
      colorPush(COLOR1, 18);
      colorPush(COLOR2, 2);
      colorPush(COLOR3, 2);
      colorPush(COLOR4, 7);
    }
    return colorArray;
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
              json.v9_b[0]["Road"],
              json.v9_b[0]["Aviation"],
              json.v9_b[0]["Rail"],
              json.v9_b[0]["Pipeline"],
              json.v9_b[0]["Ship"],
              json.v9_b[0]["Residential"],
              json.v9_b[0]["Commercial"],
              json.v9_b[0]["Iron & Steel"],
              json.v9_b[0]["Non-ferous metals"],
              json.v9_b[0]["Machinery"],
              json.v9_b[0]["Food and tobacco"],
              json.v9_b[0]["Paper, pulp & printing"],
              json.v9_b[0]["Chemical & petrochemical (energy)"],
              json.v9_b[0]["Other industry"],
              json.v9_b[0]["Energy in Agri & Fishing"],
              json.v9_b[0]["Unallocated fuel combustion"],
              json.v9_b[0]["Coal"],
              json.v9_b[0]["Oil & Natural Gas"],
              json.v9_b[0]["Cement"],
              json.v9_b[0]["Chemical & petrochemical (industrial)"],
              json.v9_b[0]["Landfills"],
              json.v9_b[0]["Wastewater"],
              json.v9_b[0]["Livestock & Manure"],
              json.v9_b[0]["Rice Cultivation"],
              json.v9_b[0]["Agricultural Soils"],
              json.v9_b[0]["Crop Burning"],
              json.v9_b[0]["Forest Land"],
              json.v9_b[0]["Cropland"],
              json.v9_b[0]["Grassland"],
            ],
            backgroundColor: createColors("sub"),
            hoverOffset: 16,
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
            data: [
              json.v9_f[0]["Energy"],
              json.v9_f[0]["Industrial processes"],
              json.v9_f[0]["Waste"],
              json.v9_f[0]["Agriculture, Forestry & Land Use (AFOLU)"],
            ],
            backgroundColor: createColors("main"),
            hoverOffset: 13,
          },
        ],
      };
    }
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v9");
      json = await response.json();
      toggleData();
    };
    if (!data) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [data]);

  if (!data) return null;

  const options = {
    animation: {
      duration: 800,
    },
    responsive: true,
    plugins: {
      legend: {
        onClick: null,
        display: true,
        position: "right",
        labels: {
          generateLabels: (chart) => {
            return chart.data.datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]}: ${data}%`,
              fillStyle: chart.data.datasets[0].backgroundColor[i],
            }));
          },
        },
      },
      title: {
        display: true,
        text: "CO2 emissions by sectors (%)",
        font: {
          size: 20,
          family: 'Arial,"Times New Roman", Times, serif',
        },
      },
    },
    onClick: function (evt, element) {
      if (element.length > 0) {
        toggleData();
      }
    },
  };

  return (
    <div className="graph-box">
      <br />
      <div className="doughnut-box">
        <Doughnut options={options} data={data} />
      </div>
      <div className="graph-text-box">
        <p>Here should be some text</p>

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
