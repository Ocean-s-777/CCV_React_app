// Line Chart V3
// Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";

const COLOR1 = "#dd8282dd";
const COLOR2 = "#0054E6dd";
const fetchURL = "https://oceans777.herokuapp.com";

const VisualizationV3 = () => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif'
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v3");
      const json = await response.json();
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

  if (!data) return loadingMessage();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958",
        font: {
          size: 20,
          family: fonts,
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
            family: fonts,
          },
        },
      },
      yAxis: {
        type: "linear",
        title: {
          display: true,
          text: "CO2",
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
      <div className="line-box">
        <Line options={options} data={data} />
      </div>

      <div className="graph-text-box">
        <p>
          Monthly and annual mean carbon dioxide measured at Mauna Loa
          Observatory, Hawaii.
        </p>

        <p>
          <a
            href="https://gml.noaa.gov/ccgg/about/co2_measurements.html"
            target="_blank"
            rel="noreferrer"
          >
            Detailed description
          </a>
          &nbsp; & &nbsp;
          <a
            href="https://gml.noaa.gov/ccgg/trends/data.html"
            target="_blank"
            rel="noreferrer"
          >
            the data used
          </a>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV3;
