// Line Chart V6
// Ice core 800k year composite study CO2 measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const COLOR1 = "#dd8282dd";

const VisualizationV6 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v6");
      const json = await response.json();
      let dataObject = {
        datasets: [
          buildDataset("co2_ppm", json.v6_800k, COLOR1, "Time", "co2_ppm"),
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
        text: "Ice core 800k year composite study CO2 measurements",
        font: {
          size: 20,
          family: fonts,
        },
      },
    },
    scales: {
      x: {
        offset: true,
        max: 2001,
        min: -803718,
        type: "linear",
        ticks: {
          callback: (value, index, ticks) => {
            if (value < 0) {
              return value * -1 + " BC";
            } else {
              return value;
            }
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
          text: "CO2 (ppm)",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  let standardDescription = "This visualization displays CO2 measurements from over three quarters of the latest millenium. The air found inside the ice cores from Antartica was used in research to study the changes of atmospheric carbon dioxide concentration. As in also previous graphs, this shows the alarming rise in CO2 levels starting from the 1850s.";
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
              href="https://www.ncei.noaa.gov/access/paleo-search/study/17975"
              target="_blank"
              rel="noreferrer"
            >
              data description
            </a>

            <a
              href="https://www.ncei.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt"
              target="_blank"
              rel="noreferrer"
            >
              data source
            </a>
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV6;
