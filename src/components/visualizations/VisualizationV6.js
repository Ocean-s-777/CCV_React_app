// Line Chart V6
// Ice core 800k year composite study CO2 measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#dd8282dd";
const fetchURL = "https://oceans777.herokuapp.com";

const buildDataset = (label, data, color, x, y, hidden) => ({
  label,
  data: data.map((d) => ({
    time: d[x], // Thousands of years, Math.round((d[x])/1000), !!!
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

const VisualizationV6 = () => {
  const [data, setData] = useState();
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

  if (!data) return null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ice core 800k year composite study CO2 measurements",
        font: {
          size: 20,
          family: 'Arial, "Times New Roman", Times, serif',
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
              return (value * -1) + " BC"
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
            family: '"Times New Roman", Times, serif',
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
            family: '"Times New Roman", Times, serif',
          },
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <br />
      <Line options={options} data={data} width={600} height={200} />

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
