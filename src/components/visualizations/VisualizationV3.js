// Line Chart V3
import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "black";
const COLOR2 = "blue";

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

const VisualizationV3 = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v3");
      const json = await response.json();
      //console.log(json)
      let dataObject = {
        datasets: [
          buildDataset(
            "Mauna Loa CO2 monthly mean data",
            json.v3_m,
            COLOR1,
            "time",
            "average"
          ),
          buildDataset(
            "Mauna Loa CO2 annual mean data",
            json.v3_a,
            COLOR2,
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
        text: "Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958",
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
          risus eget faucibus porttitor.
        </p>

        <a
          href="https://gml.noaa.gov/ccgg/about/co2_measurements.html"
          target="_blank"
          rel="noreferrer"
        >
          data measurement description
        </a>
      </div>
    </div>
  );
};

export default VisualizationV3;
