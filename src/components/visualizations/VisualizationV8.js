// Stacked line chart V8
// CO2 emissions by country

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#dd8282dd";
const COLOR3 = "#0054E6dd";
const COLOR4 = "#0054E6dd";
const COLOR5 = "#0054E6dd";
const COLOR6 = "#0054E6dd";
const COLOR7 = "#0054E6dd";
const COLOR8 = "#0054E6dd";
const COLOR10 = "#0054E6dd";

// If run on localhost, asume localhost server is also used
let currentURL = window.location.href;
let isDev = currentURL.includes("localhost");
let fetchURL = isDev
  ? "http://localhost:3002" // You need to have the server's .env PORT set as 3002
  : "https://oceans777.herokuapp.com";
fetchURL = "https://oceans777.herokuapp.com"; // Disable this line to benefit from the code above

// Function to build datasets (from json) for a Line
const buildDataset = (label, data, color, x, y, hidden) => ({
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
});

const VisualizationV8 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v3"); // Change to /v8 once the route exists
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        datasets: [
          /*           buildDataset(
            "Country_1",
            json.v8,
            COLOR1,
            "year",
            "CO2"
          ),
          buildDataset(
            "Country_2",
            json.v8,
            COLOR2,
            "year",
            "CO2"
          ), */
          {
            label: "testimaa",
            data: [
                { time: 1, value: 1 },
                { time: 2, value: -2 },
                { time: 3, value: 1 },
                { time: 4, value: 1 },
                { time: 5, value: 2 },
                { time: 6, value: 3 },
                { time: 7, value: 5 },
                { time: 8, value: 3 },
                { time: 9, value: -1 },
                { time: 10, value: 3 },
                { time: 11, value: 2 },
                { time: 12, value: 3 },
            ],
            fill: true,
            borderColor: "red",
            backgroundColor: "red",
            parsing: {
              xAxisKey: "time",
              yAxisKey: "value",
            },
            borderWidth: BORDERWIDTH,
            pointRadius: POINTRADIUS,
            hidden: false,
          },
          {
            label: "puuhamaa",
            data: [
              { time: 1, value: -3 },
              { time: 2, value: -2 },
              { time: 3, value: 1 },
              { time: 4, value: -3 },
              { time: 5, value: -2 },
              { time: 6, value: 1 },
              { time: 7, value: -3 },
              { time: 8, value: -2 },
              { time: 9, value: 1 },
              { time: 10, value: -3 },
              { time: 11, value: -2 },
              { time: 12, value: 1 },
            ],
            fill: true,
            borderColor: "blue",
            backgroundColor: "blue",
            parsing: {
              xAxisKey: "time",
              yAxisKey: "value",
            },
            borderWidth: BORDERWIDTH,
            pointRadius: POINTRADIUS,
            hidden: false,
          },
          {
            label: "muumaa",
            data: [
              { time: 1, value: 4 },
              { time: 2, value: 3 },
              { time: 3, value: 2 },
              { time: 4, value: 1 },
              { time: 5, value: 1 },
              { time: 6, value: 1 },
              { time: 7, value: 2 },
              { time: 8, value: 0 },
              { time: 9, value: 3 },
              { time: 10, value: -3 },
              { time: 11, value: -2 },
              { time: 12, value: 3 },
            ],
            fill: true,
            borderColor: "orange",
            backgroundColor: "orange",
            parsing: {
              xAxisKey: "time",
              yAxisKey: "value",
            },
            borderWidth: BORDERWIDTH,
            pointRadius: POINTRADIUS,
            hidden: false,
          }
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
        text: "CO2 emissions by country",
        font: {
          size: 20,
          family: 'Arial,"Times New Roman", Times, serif',
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
        title: {
          display: true,
          text: "Year",
          color: "black",
          font: {
            size: 16,
            family: '"Times New Roman", Times, serif',
          },
        },
      },
      yAxis: {
        stacked: true,
        type: "linear",
        title: {
          display: true,
          text: "CO2",
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
      <br />
      <Line options={options} data={data} width={600} height={200} />

      <div className="graph-text-box">
        <p>The current graph is just a placehoder!</p>

        <p>
          <a
            href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"
            target="_blank"
            rel="noreferrer"
          >
            Detailed description
          </a>
          &nbsp; & &nbsp;
          <a
            href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D"
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

export default VisualizationV8;
