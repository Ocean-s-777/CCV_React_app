// Multiaxis line chart V7 + V10
// Evolution of global temperature over the past two million years

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 =  "#0054E6dd";
const COLOR2 = "#FFC05B";

// If run on localhost, asume localhost server is also used
let currentURL = window.location.href;
let isDev = currentURL.includes("localhost");
let fetchURL = isDev
  ? "http://localhost:3002" // You need to have the server's .env PORT set as 3002
  : "https://oceans777.herokuapp.com";
fetchURL = "https://oceans777.herokuapp.com"; // Disable this line to benefit from the code above

// Function to build datasets (from json) for a Line
const buildDataset = (label, data, color, x, y, hidden, yAxis) => ({
  label,
  data: data.map((d) => ({
    time: Math.round((d[x])/1000),
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
  yAxisID: yAxis,
});

const VisualizationV7 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v7");
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        datasets: [
          buildDataset(
            "co2 ppm",
            json.v6_800k,
            COLOR1,
            "Time",
            "co2_ppm",
            false,
            "y"
          ),
          buildDataset(
            "surface temperature change",
            json.v7_2m,
            COLOR2,
            "Time",
            "50%",
            false,
            "y2"
          ),
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
        text: "Evolution of global temperature over the past two million years",
        font: {
          size: 24,
          family: '"Times New Roman", Times, serif',
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        ticks: {
          stepSize: 100,
        },
        title: {
          display: true,
          text: "Thousands of years",
          color: "black",
          font: {
            size: 16,
            family: '"Times New Roman", Times, serif',
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "CO2 (ppm)",
          color: COLOR1,
          font: {
            size: 16,
            family: '"Times New Roman", Times, serif',
          },
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Surface temperature (deg C)",
          color: COLOR2,
          font: {
            size: 16,
            family: '"Times New Roman", Times, serif',
          },
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <Line options={options} data={data} width={600} height={200} />

      <div className="graph-text-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          libero quis magna vehicula consequat vel in enim. Maecenas condimentum
          justo magna, vel iaculis elit scelerisque a.
        </p>

        <a
          href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Detailed description
        </a>

        <a
          href="http://carolynsnyder.com/publications.php"
          target="_blank"
          rel="noreferrer"
        >
          Data source
        </a>
      </div>
    </div>
  );
};

export default VisualizationV7;
