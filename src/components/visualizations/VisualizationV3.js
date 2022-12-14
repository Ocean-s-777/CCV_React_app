// Line Chart V3
// Atmospheric CO2 concentrations from Mauna Loa measurements starting 1958

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const COLOR1 = "#dd8282dd";
const COLOR2 = "#0054E6dd";

const VisualizationV3 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
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
    layout: {
      padding: {
        right: 20,
      },
    },
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

  let standardDescription = "Measurements done in the rural Mauna Loa Observatory in Hawaii demonstrate the atmospheric carbon dioxide concentration rising steadily from the sixties. Yearly peaks can be seen mid-summer and lows late autumn. The vertical axis shows atmospheric CO2 mole fraction in parts per million (PPM).";
  if (!customDescription) customDescription = standardDescription;

  return (
    <div className="graph-box">
      <br />
      <div className="line-box">
        <Line options={options} data={data} />
      </div>

      <div className="graph-text-box">
        {customDescription}
        <div className="graph-text-box-sources">
          <p>
            <a
              href="https://gml.noaa.gov/ccgg/about/co2_measurements.html"
              target="_blank"
              rel="noreferrer"
            >
              Data description
            </a>
            &nbsp; & &nbsp;
            <a
              href="https://gml.noaa.gov/ccgg/trends/data.html"
              target="_blank"
              rel="noreferrer"
            >
              source
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualizationV3;
