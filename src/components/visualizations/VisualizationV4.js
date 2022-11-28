// Line Chart V4 + V3 + V10
// Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;


const COLOR3 = "#FFC05B";
const COLOR2 = "#0054E6dd";
const COLOR1 = "#dd8282dd";
const COLOR4 = "#228C1Bdd";

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

const VisualizationV4 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v4");
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        datasets: [
          buildDataset(
            "DE08",
            json.v4_de08,
            COLOR1,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "DE08-2",
            json["v4_de08-2"],
            COLOR2,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "DSS",
            json.v4_dss,
            COLOR3,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "Mauna Loa CO2 annual mean data",
            json.v3_a,
            COLOR4,
            "year",
            "mean"
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
        text: "\nAntarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurement",
        font: {
          size: 20,
          family: 'Arial, "Times New Roman", Times, serif',
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
          text: "Years",
          color: "black",
          font: {
            size: 16,
            family: '"Times New Roman", Times, serif',
          },
        },
      },
      yAxis: {
        type: "linear",
        title: {
          display: true,
          text: "CO2 Mixing Ratio (ppm)",
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
      <br/>
      <Line options={options} data={data} width={600} height={200} />

      <div className="graph-text-box">
        <p>
          This chart combines the Ice core measurements DE08, DE08-02 and DSS to
          Mauna Loa CO2 annual mean data.
        </p>

        <a
          href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html"
          target="_blank"
          rel="noreferrer"
        >
          Historical CO2 Records from the Law Dome DE08, DE08-2, and DSS Ice
          Cores
        </a>

        <a
          href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat"
          target="_blank"
          rel="noreferrer"
        >
          Data source
        </a>

        <a
          href="https://gml.noaa.gov/ccgg/about/co2_measurements.html"
          target="_blank"
          rel="noreferrer"
        >
          Mauna Loa CO2 measurements
        </a>

        <a
          href="https://gml.noaa.gov/ccgg/trends/data.html"
          target="_blank"
          rel="noreferrer"
        >
          Data source
        </a>
      </div>
    </div>
  );
};

export default VisualizationV4;
