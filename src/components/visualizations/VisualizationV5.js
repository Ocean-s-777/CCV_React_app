// Line Chart V5
// Vostok Ice Core CO2 measurements, 417160 - 2342 years

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#228C1Bdd";
const fetchURL = "https://oceans777.herokuapp.com";

const buildDataset = (label, data, color, x, y, hidden) => ({
  label,
  data: data.map((d) => ({
    time: (d[x] -2001), // yr BP = years before present, !!!
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

const VisualizationV5 = () => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif'
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v5");
      const json = await response.json();
      let dataObject = {
        datasets: [
          buildDataset(
            "CO2 concentration",
            json.v5_vostok,
            COLOR1,
            "Mean age of the air (yr BP)",
            "CO2 concentration (ppmv)"
          ),
        ],
      };
      setData(dataObject);
    };
    if (!data) {
      fetchData();
    }
  }, [data]);

  if (!data) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Vostok Ice Core CO2 measurements, 417160 - 2342 years",
        font: {
          size: 20,
          family: fonts,
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        max: 415159,
        min: 341,
        reverse: true,
        ticks: {
          callback: (value, index, ticks) => {
            return value + " BC";
          },
        },
        title: {
          display: true,
          text: "Year",
          color: "black",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
      yAxis: {
        type: "linear",
        title: {
          display: true,
          text: "CO2 concentration (ppmv)",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <br />
      <Line options={options} data={data} /* width={600} height={200} */ />

      <div className="graph-text-box">
        <p>Historical Carbon Dioxide Record from the Vostok Ice Core</p>

        <a
          href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html"
          target="_blank"
          rel="noreferrer"
        >
          Detailed description
        </a>

        <a
          href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2"
          target="_blank"
          rel="noreferrer"
        >
          Data source
        </a>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV5;
