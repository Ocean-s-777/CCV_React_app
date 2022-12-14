// Line Chart V5
// Vostok Ice Core CO2 measurements, 417160 - 2342 years

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#228C1Bdd";

const buildDataset = (label, data, color, x, y, hidden) => ({
  label,
  data: data.map((d) => ({
    time: d[x] - 2001,
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

const VisualizationV5 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
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

  let standardDescription = 'The data in this graph is a result of the Russian Vostok station measurements where Russia, US and France all collaborated in an ice-drilling project. The chart provides information on the fluctuation of carbon dioxide concentration showing the CO2 levels spiking at an interval of around 100000 years for nearly half a million years. A spike was beginning to happen according to the previous ryhthm.';
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
              href="https://cdiac.ess-dive.lbl.gov/trends/co2/vostok.html"
              target="_blank"
              rel="noreferrer"
            >
              Data description
            </a>
            &nbsp; & &nbsp;
            <a
              href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/vostok.icecore.co2"
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

export default VisualizationV5;
