// Line Chart V6
// Ice core 800k year composite study CO2 measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";

const COLOR1 = "#dd8282dd";
const fetchURL = "https://oceans777.herokuapp.com";

const VisualizationV6 = () => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif'
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

  return (
    <div className="graph-box">
      <br />
      <div className="line-box">
        <Line options={options} data={data} />
      </div>

      <div className="graph-text-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a orci
          nec nisi egestas vestibulum. Curabitur ut eros elit. Aenean fermentum
          neque odio, scelerisque efficitur justo egestas at. Etiam vulputate
          risus eget faucibus porttitor.
        </p>

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
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV6;
