// Line Chart V1 + V2

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#0054E6dd";
const COLOR2 = "#dd8282dd";
const COLOR3 = "#228C1Bdd";
const COLOR4 = "#FFC05B";

// If run on localhost, asume localhost server is also used
let currentURL = window.location.href;
let isDev = currentURL.includes("localhost");
let fetchURL = isDev
  ? "http://localhost:3002" // You need to have the server's .env PORT set as 3002
  : "https://oceans777.herokuapp.com";
fetchURL = "https://oceans777.herokuapp.com"  // Disable this line to benefit from the code above

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

const VisualizationV1 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v1-2");
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        datasets: [
          buildDataset(
            "Global monthly",
            json.v1_g_m,
            COLOR1,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "Global annual",
            json.v1_g_a,
            COLOR1,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "Northern monthly",
            json.v1_n_m,
            COLOR2,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "Northern annual",
            json.v1_n_a,
            COLOR2,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "Southern monthly",
            json.v1_s_m,
            COLOR3,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "Southern annual",
            json.v1_s_a,
            COLOR3,
            "Time",
            "Anomaly (deg C)"
          ),
          buildDataset(
            "2000 year temperatures",
            json.v2_n_h_2000,
            COLOR4,
            "Year",
            "T",
            true
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
        text: "Global historical surface temperature anomalies from January 1850 onwards",
        font: {
          size: 24,
          family: '"Times New Roman", Times, serif',
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
      },
      yAxis: {
        type: "linear",
      },
    },
  };

  return (
    <div className="graph-box">
      <Line options={options} data={data} width={600} height={200} />

      <div className="graph-text-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a orci
          nec nisi egestas vestibulum. Curabitur ut eros elit. Aenean fermentum
          neque odio, scelerisque efficitur justo egestas at. Etiam vulputate
          risus eget faucibus porttitor. Cras blandit, ex quis molestie
          ultrices, elit augue dapibus tortor, eget gravida magna metus quis
          erat. Duis fringilla luctus orci, sit amet rhoncus ipsum commodo et.
          Aenean eget laoreet nunc. Aenean vel libero magna.
        </p>
        <a
          href="https://www.metoffice.gov.uk/hadobs/hadcrut5/"
          target="_blank"
          rel="noreferrer"
        >
          Surface temperature anomalies
        </a>
        <a
          href="https://www.nature.com/articles/nature03265"
          target="_blank"
          rel="noreferrer"
        >
          Northern Hemisphere 2,000-year temperature reconstruction
        </a>
      </div>
      <hr/>
    </div>
    
  );
};

export default VisualizationV1;
