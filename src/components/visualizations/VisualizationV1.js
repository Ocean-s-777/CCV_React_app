// Line Chart V1 + V2
// Global historical surface temperature anomalies from January 1850 onwards

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const COLOR1 = "#0054E6dd";
const COLOR2 = "#dd8282dd";
const COLOR3 = "#228C1Bdd";
const COLOR4 = "#FFC05B";

const VisualizationV1 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v1-2");
      const json = await response.json();
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
        text: "Global historical surface temperature anomalies from January 1850 onwards",
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
          text: "Temperature anomaly (deg C)",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  let standardDescription = "Surface air temperature anomaly graph from January 1850 onwards depicting how both the temperature on the Northern – more populated – hemisphere begins rising from the average due to human interference. Also shows how rapidly the temperature is escalating with industrialization. Adding the 2000 year temperature shows the rapid incline starting from the 1970s. Data provided by Hadley centre and the Climatic Research Unit at the University of East Anglia.";
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
              href="https://www.metoffice.gov.uk/hadobs/hadcrut5/"
              target="_blank"
              rel="noreferrer"
            >
              Surface temperature anomalies
            </a>
          </p>
          <p>
            <a
              href="https://www.nature.com/articles/nature03265"
              target="_blank"
              rel="noreferrer"
            >
              Northern Hemisphere 2,000-year temperature reconstruction
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualizationV1;
