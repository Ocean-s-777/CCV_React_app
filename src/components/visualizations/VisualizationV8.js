// Stacked line chart V8
// CO2 emissions by country

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// If run on localhost, asume localhost server is also used
let currentURL = window.location.href;
let isDev = currentURL.includes("localhost");
let fetchURL = isDev
  ? "http://localhost:3002" // You need to have the server's .env PORT set as 3002
  : "https://oceans777.herokuapp.com";
fetchURL = "https://oceans777.herokuapp.com"; // Disable this line to benefit from the code above

const VisualizationV8 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v8_1"); // Change to /v8 once the route exists
      const json = await response.json();
      //console.log(json)

      // Common variables
      const dataSource = json.v8_ebc_v1;
      const BORDERWIDTH = 2;
      const POINTRADIUS = 0;

      // Function to build datasets (from json) for a V8
      const buildDatasetForV8 = (country, color) => ({
        label: country,
        data: dataSource.map((d) => ({
          time: d["Time"],
          value: d[country],
        })),
        fill: true,
        borderColor: color,
        backgroundColor: color,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      });

      // Loop to build all the data sets
      const buildAllV8DataSets = () => {
        let allV8DataSets = [];
        for (let i = 0; i < Object.keys(dataSource[0]).length - 2; i++) {
          let country = Object.keys(dataSource[0])[i + 2];

          // Generate color for each country
          let red = 50 + i * 11;
          let green = 0 + i * 33;
          let blue = 100 + i * 22;
          while (red > 255) red -= 255;
          while (green > 255) green -= 255;
          while (blue > 255) blue -= 255;
          let color = "rgb(" + red + ", " + green + ", " + blue + ")";
          
          //console.log(country)
          allV8DataSets.push(buildDatasetForV8(country, color));
        }
        //console.log(allV8DataSets);
        return allV8DataSets;
      };

      //console.log(Object.keys(dataSource[0])[2]);

      let dataObject = {
        datasets: buildAllV8DataSets(),
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
    aspectRatio: 1.6,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          pointStyleWidth: 10,
        },
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
        max: 40000,
        stacked: true,
        type: "linear",
        title: {
          display: true,
          text: "Million tonnes of CO2",
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
        <p>WIP</p>

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
